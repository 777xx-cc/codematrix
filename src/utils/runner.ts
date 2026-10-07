// ============================================================
// CodeMatrix 运行引擎：静态诊断 + 浏览器内执行
//  - Python：优先加载 Pyodide（浏览器内真实运行），失败时降级为内置模拟器
//  - Java / C / C++：内置迷你解释器，支持变量、循环、分支与标准输出
//  - HTML：由调用方用 iframe 真实渲染
// ============================================================

import type { LangId } from '../data/types'

export interface Diagnostic {
  line: number // 1-based
  col: number // 1-based
  message: string
  severity: 'error' | 'warning'
}

export interface RunResult {
  output: string
  error?: string
  simulated?: boolean // 是否为内置引擎执行
  diagnostics: Diagnostic[]
}

// ---------------- 静态诊断 ----------------

function checkBrackets(code: string, langName: string): Diagnostic[] {
  const diags: Diagnostic[] = []
  const stack: { ch: string; line: number; col: number }[] = []
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
  let line = 1
  let col = 0
  let inStr: string | null = null
  let inLineComment = false
  let inBlockComment = false
  for (let i = 0; i < code.length; i++) {
    const ch = code[i]
    const next = code[i + 1]
    if (ch === '\n') { line++; col = 0; inLineComment = false; continue }
    col++
    if (inLineComment) continue
    if (inBlockComment) { if (ch === '*' && next === '/') { inBlockComment = false; i++ } continue }
    if (inStr) {
      if (ch === '\\') { i++; if (next === '\n') { line++; col = 0 } continue }
      if (ch === inStr) inStr = null
      continue
    }
    if (ch === '/' && next === '/' && langName !== 'html') { inLineComment = true; continue }
    if (ch === '/' && next === '*' && langName !== 'html') { inBlockComment = true; continue }
    if (ch === '#' && langName === 'python') { inLineComment = true; continue }
    if (ch === '"' || ch === "'" || ch === '`') { inStr = ch; continue }
    if (ch === '(' || ch === '[' || ch === '{') stack.push({ ch, line, col })
    else if (ch === ')' || ch === ']' || ch === '}') {
      const top = stack.pop()
      if (!top || top.ch !== pairs[ch]) {
        diags.push({ line, col, message: `括号不匹配：多余的 "${ch}"`, severity: 'error' })
        if (top) stack.push(top)
      }
    }
  }
  for (const s of stack) {
    diags.push({ line: s.line, col: s.col, message: `"${s.ch}" 没有闭合`, severity: 'error' })
  }
  return diags
}

function isStatementLine(t: string): boolean {
  if (!t) return false
  if (/^(if|else|for|while|do|switch|case|default|try|catch|finally|class|public|private|protected|static|return\s*$|import|package|#|\/\/|\/\*|\*)/.test(t)) return false
  if (/^\}/.test(t)) return false
  if (/^(public|private|protected)?\s*(static\s+)?[\w<>\[\]]+\s+\w+\s*\([^)]*\)\s*(throws\s+\w+\s*)?$/.test(t)) return false // 方法声明
  return /[\w\)\]\+\-='"<>&|!]/.test(t)
}

function checkMissingSemicolons(code: string): Diagnostic[] {
  const diags: Diagnostic[] = []
  const lines = code.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const t = raw.replace(/\/\/.*$/, '').trim()
    if (!t) continue
    if (t.endsWith(';') || t.endsWith('{') || t.endsWith('}') || t.endsWith(':') || t.endsWith(',') || t.endsWith('(') || t.endsWith('<<') || t.endsWith('&&') || t.endsWith('||')) continue
    if (!isStatementLine(t)) continue
    // for 语句括号内的分号在括号里，整行以 ) 结尾的 for/if/while 不需要分号
    if (/^(if|for|while|switch|catch)\b/.test(t) && t.endsWith(')')) continue
    diags.push({ line: i + 1, col: raw.length, message: '可能缺少分号 ";"', severity: 'warning' })
  }
  return diags
}

export function analyze(lang: LangId, code: string): Diagnostic[] {
  const diags: Diagnostic[] = []
  if (lang === 'html') {
    // 简单标签配对检查
    const voidTags = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'wbr', 'area', 'base', 'col', 'embed', 'track', 'param'])
    const stack: { tag: string; line: number }[] = []
    const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*?(\/?)>/g
    let m: RegExpExecArray | null
    while ((m = re.exec(code))) {
      const tag = m[1].toLowerCase()
      if (tag === '!doctype' || tag.startsWith('!')) continue
      const line = code.slice(0, m.index).split('\n').length
      const isClose = m[0].startsWith('</')
      const selfClose = m[2] === '/' || voidTags.has(tag)
      if (isClose) {
        const idx = stack.map(s => s.tag).lastIndexOf(tag)
        if (idx === -1) diags.push({ line, col: 1, message: `闭合标签 </${tag}> 没有对应的开始标签`, severity: 'error' })
        else stack.splice(idx, 1)
      } else if (!selfClose) {
        stack.push({ tag, line })
      }
    }
    for (const s of stack) diags.push({ line: s.line, col: 1, message: `<${s.tag}> 标签未闭合`, severity: 'error' })
    if (!/^\s*$/m.test(code) && !code.toLowerCase().includes('<')) {
      diags.push({ line: 1, col: 1, message: '没有发现任何 HTML 标签', severity: 'warning' })
    }
    return diags
  }

  diags.push(...checkBrackets(code, lang))

  const lines = code.split('\n')
  if (lang === 'python') {
    let sawTabIndent = false
    let sawSpaceIndent = false
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i].trimEnd()
      const stripped = t.trim()
      if (!stripped || stripped.startsWith('#')) continue
      if (/^(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(stripped) && !stripped.endsWith(':') && !stripped.endsWith('\\')) {
        diags.push({ line: i + 1, col: t.length, message: '语句块声明行应以冒号 ":" 结尾', severity: 'error' })
      }
      if (/^print\s+[^(]/.test(stripped)) {
        diags.push({ line: i + 1, col: 1, message: 'Python 3 中 print 是函数，应写作 print(...)', severity: 'error' })
      }
      if (/^\t/.test(lines[i])) sawTabIndent = true
      if (/^ +/.test(lines[i])) sawSpaceIndent = true
    }
    if (sawTabIndent && sawSpaceIndent) {
      diags.push({ line: 1, col: 1, message: '缩进混用了 Tab 与空格，请统一为 4 个空格', severity: 'warning' })
    }
    return diags
  }

  // java / c / cpp
  diags.push(...checkMissingSemicolons(code))
  if (lang === 'java') {
    if (!/public\s+static\s+void\s+main/.test(code)) {
      diags.push({ line: 1, col: 1, message: '缺少程序入口 public static void main(String[] args)', severity: 'warning' })
    }
    if (/System\.out\.println?(?!\s*\()(?!\w)/.test(code)) {
      diags.push({ line: 1, col: 1, message: 'System.out.println 后应有括号', severity: 'error' })
    }
  }
  if (lang === 'c' && /printf|scanf/.test(code) && !/#include\s*<stdio\.h>/.test(code)) {
    diags.push({ line: 1, col: 1, message: '使用 printf/scanf 需要 #include <stdio.h>', severity: 'error' })
  }
  if (lang === 'cpp' && /cout|cin/.test(code) && !/#include\s*<iostream>/.test(code)) {
    diags.push({ line: 1, col: 1, message: '使用 cout/cin 需要 #include <iostream>', severity: 'error' })
  }
  return diags
}

// ---------------- C 系语言迷你解释器 ----------------

type Value = number | string | boolean

interface Var { value: Value; type: 'int' | 'float' | 'string' | 'bool' | 'char' }

class Interpreter {
  env = new Map<string, Var>()
  out = ''
  limit = 100000 // 防死循环
  lang: LangId

  constructor(lang: LangId) { this.lang = lang }

  error(msg: string): never { throw new Error(msg) }

  getVar(name: string): Var {
    const v = this.env.get(name)
    if (!v) this.error(`使用了未定义的变量 "${name}"`)
    return v
  }

  toNum(v: Value): number {
    if (typeof v === 'number') return v
    if (typeof v === 'boolean') return v ? 1 : 0
    if (v.length === 1) return v.charCodeAt(0)
    const n = parseFloat(v)
    if (Number.isNaN(n)) this.error(`无法把 "${v}" 当作数字`)
    return n
  }

  truthy(v: Value): boolean {
    if (typeof v === 'boolean') return v
    if (typeof v === 'number') return v !== 0
    return v.length !== 0
  }

  // --- 递归下降表达式求值 ---
  tokens: string[] = []
  pos = 0

  tokenize(src: string): string[] {
    const toks: string[] = []
    const re = /\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[A-Za-z_]\w*|\d+\.?\d*|==|!=|<=|>=|&&|\|\||[+\-*/%()<>!,.\[\]])/g
    let m: RegExpExecArray | null
    while ((m = re.exec(src))) toks.push(m[1])
    return toks
  }

  peek(): string | undefined { return this.tokens[this.pos] }
  nextTok(): string { const t = this.tokens[this.pos++]; if (t === undefined) this.error('表达式不完整'); return t }

  evalExpr(src: string): Value {
    this.tokens = this.tokenize(src)
    this.pos = 0
    const v = this.parseOr()
    return v
  }

  parseOr(): Value {
    let l = this.parseAnd()
    while (this.peek() === '||') { this.nextTok(); const r = this.parseAnd(); l = this.truthy(l) || this.truthy(r) }
    return l
  }
  parseAnd(): Value {
    let l = this.parseCmp()
    while (this.peek() === '&&') { this.nextTok(); const r = this.parseCmp(); l = this.truthy(l) && this.truthy(r) }
    return l
  }
  parseCmp(): Value {
    let l = this.parseAdd()
    while (['==', '!=', '<=', '>=', '<', '>'].includes(this.peek() ?? '')) {
      const op = this.nextTok()
      const r = this.parseAdd()
      const ln = typeof l === 'number' || typeof r === 'number' ? this.toNum(l) : l
      const rn = typeof l === 'number' || typeof r === 'number' ? this.toNum(r) : r
      switch (op) {
        case '==': l = ln === rn; break
        case '!=': l = ln !== rn; break
        case '<=': l = this.toNum(ln) <= this.toNum(rn); break
        case '>=': l = this.toNum(ln) >= this.toNum(rn); break
        case '<': l = this.toNum(ln) < this.toNum(rn); break
        case '>': l = this.toNum(ln) > this.toNum(rn); break
      }
    }
    return l
  }
  parseAdd(): Value {
    let l = this.parseMul()
    while (this.peek() === '+' || this.peek() === '-') {
      const op = this.nextTok()
      const r = this.parseMul()
      const lIsChar = typeof l === 'string' && l.length === 1
      const rIsChar = typeof r === 'string' && r.length === 1
      // C/C++ 中 char 与数字做算术 → 按 ASCII 数值计算
      const charArith = (this.lang === 'c' || this.lang === 'cpp') &&
        ((lIsChar && typeof r === 'number') || (rIsChar && typeof l === 'number'))
      if (op === '+' && !charArith && (typeof l === 'string' || typeof r === 'string')) {
        l = this.stringify(l) + this.stringify(r)
      } else if (op === '+') l = this.toNum(l) + this.toNum(r)
      else l = this.toNum(l) - this.toNum(r)
    }
    return l
  }
  parseMul(): Value {
    let l = this.parseUnary()
    while (this.peek() === '*' || this.peek() === '/' || this.peek() === '%') {
      const op = this.nextTok()
      const r = this.parseUnary()
      const ln = this.toNum(l); const rn = this.toNum(r)
      if (op === '*') l = ln * rn
      else if (op === '/') {
        if (rn === 0) this.error('除数为 0')
        // 双方都是整数 → C/Java 整数除法截断
        l = (Number.isInteger(ln) && Number.isInteger(rn)) ? Math.trunc(ln / rn) : ln / rn
      } else l = ln % rn
    }
    return l
  }
  parseUnary(): Value {
    if (this.peek() === '-') { this.nextTok(); return -this.toNum(this.parseUnary()) }
    if (this.peek() === '!') { this.nextTok(); return !this.truthy(this.parseUnary()) }
    // 强制类型转换：(int)expr / (double)expr / (char)expr 等
    if (this.peek() === '(') {
      const typeTok = this.tokens[this.pos + 1]
      const close = this.tokens[this.pos + 2]
      if (close === ')' && /^(int|long|short|byte|double|float|char|boolean)$/.test(typeTok ?? '')) {
        this.pos += 3
        const v = this.parseUnary()
        if (typeTok === 'double' || typeTok === 'float') return this.toNum(v)
        if (typeTok === 'boolean') return this.truthy(v)
        if (typeTok === 'char') {
          if (typeof v === 'string' && v.length === 1) return v
          return String.fromCharCode(Math.trunc(this.toNum(v)) & 0xff)
        }
        return Math.trunc(this.toNum(v))
      }
    }
    return this.parsePrimary()
  }
  parsePrimary(): Value {
    const t = this.nextTok()
    if (t === '(') { const v = this.parseOr(); if (this.nextTok() !== ')') this.error('表达式括号不匹配'); return v }
    if (/^".*"$/.test(t)) return t.slice(1, -1).replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\\\/g, '\\')
    if (/^'.*'$/.test(t)) {
      const inner = t.slice(1, -1)
      const ch = inner.startsWith('\\') ? (inner === '\\n' ? '\n' : inner === '\\t' ? '\t' : inner === '\\0' ? '\0' : inner[1]) : inner
      return ch // char 视为长度为 1 的字符串
    }
    if (/^\d/.test(t)) {
      if (t.includes('.')) {
        const n = parseFloat(t)
        // 浮点字面量：值恰为整数时附加微小量，确保按浮点语义参与除法（10.0 / 4 = 2.5）
        return Number.isInteger(n) ? n + Number.EPSILON * Math.max(1, Math.abs(n)) : n
      }
      return parseInt(t, 10)
    }
    if (t === 'true') return true
    if (t === 'false') return false
    if (t === 'Math') {
      // Math.sqrt(x)
      const dot = this.nextTok(); if (dot !== '.') this.error('Math 后应有 .')
      const fn = this.nextTok()
      if (this.nextTok() !== '(') this.error('Math.' + fn + ' 后应有 (')
      const arg = this.parseOr()
      if (this.nextTok() !== ')') this.error('Math.' + fn + ' 缺少 )')
      const fns: Record<string, (x: number) => number> = { sqrt: Math.sqrt, floor: Math.floor, ceil: Math.ceil, abs: Math.abs, round: Math.round }
      if (!fns[fn]) this.error(`不支持 Math.${fn}`)
      return fns[fn](this.toNum(arg))
    }
    if (t === 'String' && this.peek() === '.') return this.error('暂不支持该调用')
    // 变量（可带下标或 length/charAt 调用）
    const v = this.getVar(t)
    if (this.peek() === '[') {
      this.nextTok()
      const idx = this.toNum(this.parseOr())
      if (this.nextTok() !== ']') this.error('数组下标缺少 ]')
      const arr = (v as any).arr as Value[] | undefined
      if (arr) {
        if (idx < 0 || idx >= arr.length) this.error(`数组下标越界：${t}[${idx}]`)
        return arr[idx]
      }
      if (typeof v.value === 'string') {
        // C/C++ 允许读取字符串末尾的 '\0' 终止符
        if (idx === v.value.length && (this.lang === 'c' || this.lang === 'cpp')) return '\0'
        if (idx < 0 || idx >= v.value.length) this.error(`字符串下标越界：${t}[${idx}]`)
        return v.value[idx]
      }
      this.error(`"${t}" 不是数组或字符串`)
    }
    if (this.peek() === '.') {
      this.nextTok()
      const method = this.nextTok()
      const arr = (v as any).arr as Value[] | undefined
      const len = arr ? arr.length : (typeof v.value === 'string' ? v.value.length : undefined)
      if (method === 'length') {
        if (this.peek() === '(') { this.nextTok(); if (this.nextTok() !== ')') this.error('length() 括号不匹配') }
        if (len === undefined) this.error(`"${t}" 没有 length`)
        return len
      }
      if (method === 'size' || method === 'charAt') {
        if (this.nextTok() !== '(') this.error(`${method} 后应有 (`)
        if (method === 'size') {
          if (this.nextTok() !== ')') this.error('size() 括号不匹配')
          if (len === undefined) this.error(`"${t}" 没有 size()`)
          return len
        }
        const idx = this.toNum(this.parseOr())
        if (this.nextTok() !== ')') this.error('charAt 缺少 )')
        if (typeof v.value !== 'string') this.error(`"${t}" 不是字符串`)
        if (idx < 0 || idx >= v.value.length) this.error(`charAt(${idx}) 越界`)
        return v.value[idx]
      }
      this.error(`不支持的方法调用（${t}.${method}…）`)
    }
    return v.value
  }

  stringify(v: Value): string {
    if (typeof v === 'boolean') return v ? 'true' : 'false'
    // 浮点数显示时收敛到 12 位有效数字，避免 0.30000000000000004 之类的输出
    if (typeof v === 'number' && !Number.isInteger(v)) return String(parseFloat(v.toPrecision(12)))
    return String(v)
  }

  // --- 语句执行 ---
  exec(block: string) {
    const stmts = this.splitStatements(block)
    for (const s of stmts) this.execOne(s.trim())
  }

  splitStatements(block: string): string[] {
    const list: string[] = []
    let cur = ''
    let depth = 0 // 花括号
    let paren = 0
    let inStr: string | null = null
    for (let i = 0; i < block.length; i++) {
      const ch = block[i]
      if (inStr) {
        cur += ch
        if (ch === '\\') { cur += block[++i] ?? ''; continue }
        if (ch === inStr) inStr = null
        continue
      }
      if (ch === '"' || ch === "'") { inStr = ch; cur += ch; continue }
      if (ch === '(') paren++
      if (ch === ')') paren--
      if (ch === '{') depth++
      if (ch === '}') depth--
      if (ch === ';' && depth === 0 && paren === 0) {
        // 无花括号的 if ... ; else ... 链：else 紧跟分号时不断句
        const rest = block.slice(i + 1).replace(/^\s+/, '')
        if (/^else\b/.test(rest) && /^\s*if\b/.test(cur)) { cur += ch; continue }
        list.push(cur); cur = ''; continue
      }
      cur += ch
      if (depth === 0 && ch === '}') {
        // 若后面紧跟 else（else / else if），则不断句，继续累积
        const rest = block.slice(i + 1).replace(/^\s+/, '')
        if (!/^else\b/.test(rest)) { list.push(cur); cur = '' }
      }
    }
    if (cur.trim()) list.push(cur)
    return list
  }

  execOne(s: string) {
    if (!s) return
    if (this.limit-- < 0) this.error('执行次数超限（可能存在死循环）')

    // 去掉行注释与语句末尾的分号
    s = s.replace(/\/\/[^\n]*/g, '').trim()
    s = s.replace(/;+\s*$/, '').trim()
    if (!s) return

    // for 循环
    let m = s.match(/^for\s*\(([^;]+);([^;]+);([^)]+)\)\s*/s)
    if (m) {
      const body = s.slice(m[0].length)
      const init = m[1].trim()
      if (/^(int|long|short|byte|double|float|boolean|String|string|char|auto)\s/.test(init)) {
        this.execOne(init + ';') // 声明处理器内部支持逗号多声明
      } else {
        for (const part of this.splitTopLevel(init, ',')) this.execOne(part.trim() + ';')
      }
      let guard = 100000
      while (this.truthy(this.evalExpr(m[2]))) {
        if (guard-- < 0) this.error('循环次数超限（可能存在死循环）')
        this.execBody(body)
        for (const upd of this.splitTopLevel(m[3], ',')) this.execOne(upd.trim() + ';')
      }
      return
    }
    // while 循环（条件可能含括号调用，手工做括号配对）
    if (/^while\s*\(/.test(s)) {
      const { cond, rest } = this.extractCond(s, 'while')
      let guard = 100000
      while (this.truthy(this.evalExpr(cond))) {
        if (guard-- < 0) this.error('循环次数超限（可能存在死循环）')
        this.execBody(rest)
      }
      return
    }
    // if / else
    if (/^if\s*\(/.test(s)) {
      const { cond, rest: after } = this.extractCond(s, 'if')
      let rest = after
      let thenPart = rest
      let elsePart = ''
      if (rest.startsWith('{')) {
        const end = this.findBlockEnd(rest)
        thenPart = rest.slice(0, end)
        rest = rest.slice(end).trim()
        if (/^else/.test(rest)) elsePart = rest.replace(/^else\s*/, '')
      } else {
        // 非块级 then 语句：在顶层寻找 else 关键字进行拆分
        const idx = this.findTopLevelElse(rest)
        if (idx >= 0) {
          thenPart = rest.slice(0, idx)
          elsePart = rest.slice(idx).replace(/^else\s*/, '')
        }
      }
      if (this.truthy(this.evalExpr(cond))) this.execBody(thenPart)
      else if (elsePart) this.execBody(elsePart)
      return
    }

    // 输出语句
    m = s.match(/^System\.out\.(println|print)\s*\((.*)\)$/s)
    if (m) {
      const arg = m[2].trim()
      const v = arg ? this.evalExpr(arg) : ''
      this.out += this.stringify(v)
      if (m[1] === 'println') this.out += '\n'
      return
    }
    m = s.match(/^printf\s*\((.*)\)$/s)
    if (m) { this.out += this.evalPrintf(m[1]); return }
    m = s.match(/^cout\s*<<(.*)$/s)
    if (m) {
      const parts = this.splitTopLevel(m[1], '<<')
      for (const p of parts) {
        const t = p.trim()
        if (t === 'endl' || t === '"\\n"') this.out += '\n'
        else this.out += this.stringify(this.evalExpr(t))
      }
      return
    }

    // 数组声明：int[] a = {...} / int a[] = {...} / int a[] = new int[N] / char s[] = "..."
    const arrDecl = s.match(/^(?:(int|long|short|byte|double|float|char|String|string|auto)\s*(?:\[\s*\]\s*|\s+))(\w+)\s*(?:\[\s*\w*\s*\])?\s*=\s*(.+)$/s)
    if (arrDecl && (/^\{[^}]*\}$/s.test(arrDecl[3].trim()) || /^new\s+\w+\s*\[/.test(arrDecl[3].trim()) || /^"([^"\\]|\\.)*"$/.test(arrDecl[3].trim()))) {
      const name = arrDecl[2]
      const rhs = arrDecl[3].trim()
      const nm = rhs.match(/^new\s+(\w+)\s*\[\s*(.+?)\s*\]$/)
      if (nm) {
        const len = this.toNum(this.evalExpr(nm[2]))
        this.env.set(name, { value: '', type: 'string' })
        ;(this.env.get(name) as any).arr = new Array(len).fill(0)
        return
      }
      if (/^"([^"\\]|\\.)*"$/.test(rhs)) {
        // char s[] = "..." 视为字符串
        const str = this.evalExpr(rhs)
        this.env.set(name, { value: str, type: 'string' })
        return
      }
      const inner = rhs.slice(1, -1)
      const items = this.splitTopLevel(inner, ',').map(x => this.evalExpr(x.trim()))
      this.env.set(name, { value: items.map(v => this.stringify(v)).join(','), type: 'string' })
      ;(this.env.get(name) as any).arr = items
      return
    }
    // 数组元素赋值 a[i] = x
    m = s.match(/^(\w+)\s*\[\s*(.+?)\s*\]\s*=\s*(.+)$/s)
    if (m) {
      const v = this.env.get(m[1]) as any
      if (!v || !v.arr) this.error(`"${m[1]}" 不是数组`)
      const idx = this.toNum(this.evalExpr(m[2]))
      if (idx < 0 || idx >= v.arr.length) this.error(`数组下标越界：${m[1]}[${idx}]`)
      v.arr[idx] = this.evalExpr(m[3])
      v.value = v.arr.map((x: Value) => this.stringify(x)).join(',')
      return
    }

    // 变量声明（可多个：int a = 1, b = 2）
    m = s.match(/^(int|long|short|byte|double|float|boolean|String|string|char|auto)\s+(.+)$/s)
    if (m) {
      const typeName = m[1]
      const decls = this.splitTopLevel(m[2], ',')
      for (const d of decls) {
        const dm = d.trim().match(/^(\w+)(?:\s*=\s*(.+))?$/s)
        if (!dm) continue
        const name = dm[1]
        let value: Value = 0
        let type: Var['type'] = 'int'
        if (typeName === 'double' || typeName === 'float') { type = 'float'; value = 0 }
        else if (typeName === 'boolean') { type = 'bool'; value = false }
        else if (typeName === 'String' || typeName === 'string') { type = 'string'; value = '' }
        else if (typeName === 'char') { type = 'char'; value = '\0' }
        else if (typeName === 'auto') type = 'int'
        if (dm[2] !== undefined) {
          const v = this.evalExpr(dm[2])
          value = v
          if (typeName === 'auto' || typeName === 'int' || typeName === 'long') {
            type = typeof v === 'string' ? 'string' : typeof v === 'boolean' ? 'bool' : 'int'
          }
          if (type === 'int' && typeof value === 'number') value = Math.trunc(value)
        }
        this.env.set(name, { value, type })
      }
      return
    }

    // 赋值 / 复合赋值 / 自增自减
    m = s.match(/^(\+\+|--)(\w+)$/)
    if (m) {
      const v = this.getVar(m[2])
      v.value = this.toNum(v.value) + (m[1] === '++' ? 1 : -1)
      return
    }
    m = s.match(/^(\w+)(\+\+|--)$/)
    if (m) {
      const v = this.getVar(m[1])
      v.value = this.toNum(v.value) + (m[2] === '++' ? 1 : -1)
      return
    }
    m = s.match(/^(\w+)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/s)
    if (m) {
      const v = this.getVar(m[1])
      const r = this.evalExpr(m[3])
      const op = m[2][0]
      if (op === '+') {
        v.value = (typeof v.value === 'string' || typeof r === 'string')
          ? this.stringify(v.value) + this.stringify(r)
          : this.toNum(v.value) + this.toNum(r)
      }
      else if (op === '-') v.value = this.toNum(v.value) - this.toNum(r)
      else if (op === '*') v.value = this.toNum(v.value) * this.toNum(r)
      else if (op === '/') {
        const rn = this.toNum(r)
        if (rn === 0) this.error('除数为 0')
        const ln = this.toNum(v.value)
        v.value = Number.isInteger(ln) && Number.isInteger(rn) ? Math.trunc(ln / rn) : ln / rn
      }
      else v.value = this.toNum(v.value) % this.toNum(r)
      return
    }
    m = s.match(/^(\w+)\s*=\s*(.+)$/s)
    if (m && !/==/.test(s)) {
      const v = this.getVar(m[1])
      const nv = this.evalExpr(m[2])
      v.value = (v.type === 'int' && typeof nv === 'number') ? Math.trunc(nv) : nv
      return
    }

    if (/^return\b/.test(s)) return
    if (/^(else|break|continue)\b/.test(s)) return
    this.error(`无法执行的语句：${s.length > 60 ? s.slice(0, 60) + '…' : s}`)
  }

  execBody(body: string) {
    body = body.trim()
    if (body.startsWith('{')) {
      const end = this.findBlockEnd(body)
      this.exec(body.slice(1, end - 1))
    } else if (body) {
      this.execOne(body)
    }
  }

  findBlockEnd(s: string): number {
    let depth = 0
    let inStr: string | null = null
    for (let i = 0; i < s.length; i++) {
      const ch = s[i]
      if (inStr) { if (ch === '\\') { i++; continue } if (ch === inStr) inStr = null; continue }
      if (ch === '"' || ch === "'") { inStr = ch; continue }
      if (ch === '{') depth++
      if (ch === '}') { depth--; if (depth === 0) return i + 1 }
    }
    return s.length
  }

  /** 在顶层（不深入 {}、() 与字符串）寻找 else 关键字的位置，找不到返回 -1 */
  findTopLevelElse(s: string): number {
    let depth = 0
    let paren = 0
    let inStr: string | null = null
    for (let i = 0; i < s.length; i++) {
      const ch = s[i]
      if (inStr) { if (ch === '\\') { i++; continue } if (ch === inStr) inStr = null; continue }
      if (ch === '"' || ch === "'") { inStr = ch; continue }
      if (ch === '{') { depth++; continue }
      if (ch === '}') { depth--; continue }
      if (ch === '(') { paren++; continue }
      if (ch === ')') { paren--; continue }
      if (depth === 0 && paren === 0 && s.startsWith('else', i)) {
        const before = i > 0 ? s[i - 1] : ' '
        const after = s[i + 4] ?? ' '
        if (!/[\w$]/.test(before) && !/[\w$]/.test(after)) return i
      }
    }
    return -1
  }

  /** 提取 keyword(...) 的平衡括号条件与后续部分 */
  extractCond(s: string, keyword: string): { cond: string; rest: string } {
    const open = s.indexOf('(', keyword.length)
    let depth = 0
    let inStr: string | null = null
    for (let i = open; i < s.length; i++) {
      const ch = s[i]
      if (inStr) { if (ch === '\\') { i++; continue } if (ch === inStr) inStr = null; continue }
      if (ch === '"' || ch === "'") { inStr = ch; continue }
      if (ch === '(') depth++
      if (ch === ')') {
        depth--
        if (depth === 0) return { cond: s.slice(open + 1, i), rest: s.slice(i + 1).trim() }
      }
    }
    this.error(`${keyword} 条件括号未闭合`)
  }

  splitTopLevel(s: string, sep: string): string[] {
    const parts: string[] = []
    let cur = ''
    let depth = 0
    let inStr: string | null = null
    for (let i = 0; i < s.length; i++) {
      const ch = s[i]
      if (inStr) { cur += ch; if (ch === '\\') { cur += s[++i] ?? ''; continue } if (ch === inStr) inStr = null; continue }
      if (ch === '"' || ch === "'") { inStr = ch; cur += ch; continue }
      if (ch === '(') depth++
      if (ch === ')') depth--
      if (depth === 0 && s.startsWith(sep, i)) { parts.push(cur); cur = ''; i += sep.length - 1; continue }
      cur += ch
    }
    if (cur.trim()) parts.push(cur)
    return parts
  }

  evalPrintf(argsSrc: string): string {
    const args = this.splitTopLevel(argsSrc, ',')
    if (!args.length) return ''
    const fmtV = this.evalExpr(args[0])
    let fmt = this.stringify(fmtV)
    let ai = 1
    return fmt.replace(/%([-0.\d]*)([dfs%c%])/g, (_whole, spec, conv) => {
      if (conv === '%') return '%'
      const v = ai < args.length ? this.evalExpr(args[ai++]) : ''
      if (conv === 'd') return String(Math.trunc(this.toNum(v)))
      if (conv === 'f') {
        const pm = spec.match(/\.(\d+)/)
        const n = this.toNum(v)
        return pm ? n.toFixed(parseInt(pm[1], 10)) : String(n)
      }
      if (conv === 'c') {
        if (typeof v === 'number') return String.fromCharCode(v)
        return this.stringify(v)[0] ?? ''
      }
      return this.stringify(v)
    })
  }
}

function extractMainBody(code: string, _lang: LangId): string {
  const m = code.match(/main\s*\([^)]*\)\s*\{/)
  if (!m) throw new Error('找不到 main 函数/方法，请确保代码包含程序入口')
  const start = m.index! + m[0].length
  let depth = 1
  let inStr: string | null = null
  for (let i = start; i < code.length; i++) {
    const ch = code[i]
    if (inStr) { if (ch === '\\') { i++; continue } if (ch === inStr) inStr = null; continue }
    if (ch === '"' || ch === "'") { inStr = ch; continue }
    if (ch === '{') depth++
    if (ch === '}') { depth--; if (depth === 0) return code.slice(start, i) }
  }
  throw new Error('main 函数的大括号未闭合')
}

/**
 * 运行前置检测：识别引擎暂不支持的热门写法，
 * 返回明确的指引性错误（而不是跑到一半报晦涩错误）。
 */
function precheck(lang: LangId, code: string): string | null {
  const rules: [RegExp, string][] = []

  if (lang === 'java') {
    rules.push(
      [/\bScanner\b|System\.in/, '暂不支持键盘输入（Scanner / System.in）。请把测试数据直接写成变量初始值，例如 int n = 5;'],
      [/\bStringBuilder\b|\bStringBuffer\b/, '暂不支持 StringBuilder。循环内拼接字符串可直接用 +（本引擎不模拟性能差异）'],
      [/\b(ArrayList|LinkedList|HashMap|HashSet|TreeMap|TreeSet)\b|\b(Map|List|Set)\s*</, '暂不支持集合类（List/Map/Set 等）。请改用数组 + 下标实现同样的逻辑'],
      [/\b(Arrays|Collections)\s*\./, '暂不支持 Arrays / Collections 工具类。排序可用冒泡/选择排序手写实现'],
      [/\b(Integer|Double|Character|Boolean)\s*\./, '暂不支持包装类的静态方法（如 Integer.parseInt）。数字可直接写字面量'],
      [/\btry\b|\bcatch\b|\bthrows?\s+\w+\s*[{;]/, '暂不支持异常机制（try/catch/throw）。教学示例代码通常可以直接去掉异常处理部分'],
      [/\bswitch\s*\(/, '暂不支持 switch 语句。请改写为 if-else if 链'],
      [/\bdo\s*\{/, '暂不支持 do-while 循环。请改写为 while 循环（先手动执行一次循环体）'],
    )
  }
  if (lang === 'c' || lang === 'cpp') {
    rules.push(
      [/\bscanf\s*\(|\bcin\s*>>|\bgets\s*\(|\bfgets\s*\(|\bgetchar\s*\(\s*\)|\bgetline\s*\(/, '暂不支持键盘输入（scanf / cin 等）。请把测试数据直接写成变量初始值，例如 int n = 5;'],
      [/\bdo\s*\{/, '暂不支持 do-while 循环。请改写为 while 循环（先手动执行一次循环体）'],
      [/\bswitch\s*\(/, '暂不支持 switch 语句。请改写为 if-else if 链'],
      [/\bstruct\b/, '暂不支持结构体。可用多个平行数组代替（如 names[]、ages[]）'],
      [/\b(malloc|calloc|realloc|free)\s*\(/, '暂不支持动态内存分配（malloc/free）。请使用固定长度的数组'],
      [/\->/, '暂不支持指针成员访问（->）。本引擎暂不支持结构体与指针操作'],
      [/\b(?:int|char|double|float|long|short)\s*\*+\s*\w+/, '暂不支持指针声明。请用数组下标代替指针运算'],
      [/\b(strlen|strcpy|strcmp|strcat|strncpy|memset|memcpy)\s*\(/, '暂不支持 string.h 库函数。可用循环遍历字符数组实现同样逻辑（以 \\0 结尾）'],
    )
  }
  if (lang === 'cpp') {
    rules.push(
      [/\b(vector|map|set|stack|queue|deque|list|pair)\s*</, '暂不支持 STL 容器（vector/map/set 等）。请改用固定长度数组 + 下标'],
      [/\bsort\s*\(/, '暂不支持 sort() 算法函数。可手写冒泡或选择排序'],
      [/\bstd::/, '请写 using namespace std; 并省略 std:: 前缀（引擎识别 cout/endl/string 的无前缀形式）'],
      [/\bclass\s+\w+/, '暂不支持自定义类。面向对象示例请改用基本类型和数组模拟数据'],
    )
  }
  if (lang === 'java') {
    rules.push(
      [/\bnew\s+(?!int\s*\[|double\s*\[|float\s*\[|long\s*\[|short\s*\[|byte\s*\[|char\s*\[|boolean\s*\[|String\s*\[)\w+\s*\(/, '暂不支持 new 创建对象（仅支持 new 数组）。请改用基本类型变量和数组模拟'],
    )
  }

  // 通用：自定义函数（main 之外的函数定义）
  const fnRe = lang === 'java'
    ? /(?:public|private|protected)?\s*static\s+[\w\[\]]+\s+(?!main\b)\w+\s*\([^)]*\)\s*\{/m
    : /^\s*(?:int|void|double|float|char|long|short|bool)\s+(?!main\b)\w+\s*\([^;{}]*\)\s*\{/m
  if (fnRe.test(code)) {
    return '暂不支持自定义函数（包括递归调用）。请把逻辑展开写在 main 中'
  }

  for (const [re, msg] of rules) if (re.test(code)) return msg
  return null
}

function runCLike(lang: LangId, code: string): RunResult {
  const diagnostics = analyze(lang, code)
  const interp = new Interpreter(lang)
  try {
    const blocked = precheck(lang, code)
    if (blocked) return { output: '', error: blocked, simulated: true, diagnostics }
    const body = extractMainBody(code, lang)
    interp.exec(body)
    return { output: interp.out || '（程序运行完毕，没有输出）', simulated: true, diagnostics }
  } catch (e) {
    return { output: interp.out, error: `运行错误：${(e as Error).message}`, simulated: true, diagnostics }
  }
}

// ---------------- Python：Pyodide + 降级模拟 ----------------

declare global {
  interface Window { loadPyodide?: (opts: { indexURL: string }) => Promise<any> }
}

let pyodidePromise: Promise<any> | null = null

/** 依次尝试本地内置 / CDN 两个来源加载 Pyodide */
function loadPyodide(): Promise<any> {
  if (!pyodidePromise) {
    const local = `${import.meta.env.BASE_URL}pyodide/`
    const cdn = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
    const tryLoad = (base: string, timeoutMs: number) =>
      new Promise<any>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = base + 'pyodide.js'
        const timer = setTimeout(() => reject(new Error('Pyodide 加载超时')), timeoutMs)
        script.onload = async () => {
          try { resolve(await window.loadPyodide!({ indexURL: base })) }
          catch (e) { clearTimeout(timer); reject(e) }
          clearTimeout(timer)
        }
        script.onerror = () => { clearTimeout(timer); reject(new Error('Pyodide 脚本加载失败')) }
        document.head.appendChild(script)
      })
    // 优先本地内置运行时（离线可用、公网部署无 CDN 依赖），失败再退回 CDN
    pyodidePromise = tryLoad(local, 15000).catch(() => tryLoad(cdn, 30000))
    // 彻底失败时重置，下次运行可重试
    pyodidePromise.catch(() => { pyodidePromise = null })
  }
  return pyodidePromise
}

async function runPythonReal(code: string): Promise<RunResult> {
  const diagnostics = analyze('python', code)
  const py = await loadPyodide()
  let out = ''
  py.setStdout({ batched: (s: string) => { out += s + '\n' } })
  py.setStderr({ batched: (s: string) => { out += s + '\n' } })
  try {
    await py.runPythonAsync(code)
    return { output: out || '（程序运行完毕，没有输出）', simulated: false, diagnostics }
  } catch (e) {
    const msg = String((e as Error).message || e)
    // 提取 Python 报错最后一行
    const last = msg.trim().split('\n').filter(Boolean).pop() ?? msg
    return { output: out, error: last, simulated: false, diagnostics }
  }
}

// 极简 Python 模拟器（离线降级）
function runPythonSim(code: string): RunResult {
  const diagnostics = analyze('python', code)
  const env = new Map<string, number | string>()
  let out = ''
  try {
    const lines = code.split('\n')
    const evalPy = (expr: string): number | string => {
      expr = expr.trim()
      const fm = expr.match(/^f"(.*)"$/)
      if (fm) {
        return fm[1].replace(/\{([^}]+)\}/g, (_, e) => String(evalPy(e)))
      }
      if (/^".*"$/.test(expr) || /^'.*'$/.test(expr)) return expr.slice(1, -1)
      if (/^[\d\s+\-*/%().]+$/.test(expr)) {
        // 安全数值表达式
        return Function(`"use strict"; return (${expr.replace(/\/\//g, '/')})`)() as number
      }
      const vm = expr.match(/^(\w+)$/)
      if (vm) {
        if (!env.has(vm[1])) throw new Error(`未定义的变量 ${vm[1]}`)
        return env.get(vm[1])!
      }
      const bm = expr.match(/^(\w+)\s*([+\-*/])\s*(\w+|\d+)$/)
      if (bm) {
        const a = Number(env.get(bm[1]) ?? bm[1]); const b = Number(bm[3])
        const r = bm[2] === '+' ? a + b : bm[2] === '-' ? a - b : bm[2] === '*' ? a * b : a / b
        return r
      }
      throw new Error(`离线模式暂不支持表达式：${expr}`)
    }
    const runBlock = (start: number, indent: number): number => {
      let j = start
      while (j < lines.length) {
        const line = lines[j]
        const cur = line.match(/^ */)![0].length
        if (line.trim() && cur < indent) break
        if (!line.trim() || line.trim().startsWith('#')) { j++; continue }
        const t = line.trim()
        const pm = t.match(/^print\((.*)\)$/)
        if (pm) {
          const parts = pm[1] ? splitArgs(pm[1]) : []
          out += parts.map(p => String(evalPy(p))).join(' ') + '\n'
          j++; continue
        }
        const am = t.match(/^(\w+)\s*(\+?=)\s*(.+)$/)
        if (am) {
          const rv = evalPy(am[3])
          if (am[2] === '+=') env.set(am[1], Number(env.get(am[1]) ?? 0) + Number(rv))
          else env.set(am[1], rv)
          j++; continue
        }
        const fm = t.match(/^for\s+(\w+)\s+in\s+range\((\d+)(?:\s*,\s*(\d+))?\):$/)
        if (fm) {
          const from = fm[3] ? parseInt(fm[2], 10) : 0
          const to = fm[3] ? parseInt(fm[3], 10) : parseInt(fm[2], 10)
          const bodyStart = j + 1
          for (let k = from; k < to; k++) {
            env.set(fm[1], k)
            runBlock(bodyStart, cur + 1)
          }
          j = bodyStart
          while (j < lines.length && (!lines[j].trim() || lines[j].match(/^ */)![0].length > cur)) j++
          continue
        }
        throw new Error(`离线模式暂不支持：${t}`)
      }
      return j
    }
    const splitArgs = (s: string): string[] => {
      const res: string[] = []
      let cur = '', q: string | null = null
      for (const ch of s) {
        if (q) { cur += ch; if (ch === q) q = null; continue }
        if (ch === '"' || ch === "'") { q = ch; cur += ch; continue }
        if (ch === ',') { res.push(cur); cur = ''; continue }
        cur += ch
      }
      if (cur.trim()) res.push(cur)
      return res
    }
    runBlock(0, 0)
    return { output: out || '（程序运行完毕，没有输出）', simulated: true, diagnostics }
  } catch (e) {
    return { output: out, error: (e as Error).message, simulated: true, diagnostics }
  }
}

async function runPython(code: string): Promise<RunResult> {
  try {
    return await runPythonReal(code)
  } catch {
    return runPythonSim(code)
  }
}

// ---------------- 入口 ----------------

export async function runCode(lang: LangId, code: string): Promise<RunResult> {
  if (lang === 'python') return runPython(code)
  if (lang === 'html') return { output: '', simulated: false, diagnostics: analyze('html', code) }
  return runCLike(lang, code)
}
