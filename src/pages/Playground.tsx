import { useMemo, useState } from 'react'
import { languages, getLang } from '../data'
import type { LangId } from '../data/types'
import CodeEditor from '../components/CodeEditor'
import { runCode, analyze, type RunResult, type Diagnostic } from '../utils/runner'
import { Play, RotateCcw, Loader2, Trash2, MonitorPlay, TerminalSquare, AlertTriangle, CircleAlert } from 'lucide-react'

type Tab = 'console' | 'preview'

export default function PlaygroundPage() {
  const [langId, setLangId] = useState<LangId>('java')
  const [codes, setCodes] = useState<Record<LangId, string>>(() =>
    Object.fromEntries(languages.map(l => [l.id, l.playgroundTemplate])) as Record<LangId, string>
  )
  const [result, setResult] = useState<RunResult | null>(null)
  const [running, setRunning] = useState(false)
  const [tab, setTab] = useState<Tab>('console')
  const [previewSrc, setPreviewSrc] = useState('')
  const lang = getLang(langId)
  const code = codes[langId]

  const diags: Diagnostic[] = useMemo(() => analyze(langId, code), [langId, code])
  const errCount = diags.filter(d => d.severity === 'error').length
  const warnCount = diags.filter(d => d.severity === 'warning').length

  const switchLang = (id: LangId) => {
    setLangId(id)
    setResult(null)
    setTab(id === 'html' ? 'preview' : 'console')
    if (id === 'html') setPreviewSrc(codes[id])
  }

  const run = async () => {
    setRunning(true)
    try {
      if (langId === 'html') {
        setPreviewSrc(code)
        setTab('preview')
        setResult({ output: '', simulated: false, diagnostics: diags })
      } else {
        setTab('console')
        setResult(await runCode(langId, code))
      }
    } finally {
      setRunning(false)
    }
  }

  const reset = () => {
    setCodes(prev => ({ ...prev, [langId]: lang.playgroundTemplate }))
    setResult(null)
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-4rem)] flex flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            代码<span className="neon-text">演练场</span>
          </h1>
          <div className="text-[11px] text-slate-500 mt-0.5 tracking-wider">
            同一页面编写 · 运行 · 审错 —— 波浪线实时标注语法问题
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {languages.map(l => (
            <button
              key={l.id}
              onClick={() => switchLang(l.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                l.id === langId ? 'border-transparent text-[#070a13]' : 'border-white/10 text-slate-400 hover:text-white'
              }`}
              style={l.id === langId ? { background: `linear-gradient(135deg, ${l.color}, ${l.color}cc)`, boxShadow: `0 0 14px ${l.color}44` } : {}}
            >
              {l.icon} {l.name}
            </button>
          ))}
        </div>
      </div>

      {/* 主区域：左编辑器 / 右输出 */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-2 gap-4">
        {/* 左：编辑器 + 问题面板 */}
        <div className="flex flex-col min-h-0 gap-3">
          <div className="rounded-xl overflow-hidden border border-white/10 flex flex-col flex-1 min-h-[300px]">
            <div className="flex items-center justify-between px-3 py-2 bg-white/[0.03] border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-2 text-[11px] text-slate-500 font-mono">
                  main.{langId === 'java' ? 'java' : langId === 'python' ? 'py' : langId === 'cpp' ? 'cpp' : langId === 'c' ? 'c' : 'html'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md border border-white/10 text-slate-400 hover:text-white hover:border-white/25 transition-colors"
                >
                  <RotateCcw size={11} /> 重置模板
                </button>
                <button
                  onClick={run}
                  disabled={running}
                  className="btn-glow flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 text-[#070a13] font-black disabled:opacity-60"
                >
                  {running ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} strokeWidth={3} />}
                  {running ? '运行中…' : '▶ 运行'}
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
              <CodeEditor
                value={code}
                onChange={v => setCodes(prev => ({ ...prev, [langId]: v }))}
                lang={langId}
                height="100%"
              />
            </div>
          </div>

          {/* 问题面板 */}
          <div className="rounded-xl border border-white/10 bg-[#0b0f1c]/80 shrink-0">
            <div className="flex items-center gap-4 px-3 py-2 border-b border-white/5 text-[11px]">
              <span className="tracking-widest text-slate-500">代码审核 · PROBLEMS</span>
              <span className="flex items-center gap-1 text-red-400"><CircleAlert size={11} /> {errCount}</span>
              <span className="flex items-center gap-1 text-amber-400"><AlertTriangle size={11} /> {warnCount}</span>
            </div>
            <div className="max-h-28 overflow-auto p-2 space-y-0.5">
              {diags.length === 0 ? (
                <div className="text-xs text-emerald-400/80 px-2 py-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                  未发现问题，代码看起来很干净 ✨
                </div>
              ) : (
                diags.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1 rounded text-xs hover:bg-white/[0.03]">
                    {d.severity === 'error'
                      ? <CircleAlert size={12} className="text-red-400 shrink-0" />
                      : <AlertTriangle size={12} className="text-amber-400 shrink-0" />}
                    <span className="text-slate-300">{d.message}</span>
                    <span className="ml-auto text-slate-600 font-mono shrink-0">行 {d.line}:{d.col}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 右：控制台 / 预览 */}
        <div className="rounded-xl overflow-hidden border border-white/10 flex flex-col min-h-[300px]">
          <div className="flex items-center gap-1 px-2 py-1.5 bg-white/[0.03] border-b border-white/5 shrink-0">
            <button
              onClick={() => setTab('console')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                tab === 'console' ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <TerminalSquare size={13} /> 控制台
            </button>
            <button
              onClick={() => { setTab('preview'); if (langId === 'html' && !previewSrc) setPreviewSrc(code) }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                tab === 'preview' ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <MonitorPlay size={13} /> 页面预览
              {langId !== 'html' && <span className="text-[9px] text-slate-600">(HTML)</span>}
            </button>
            {result && tab === 'console' && (
              <button
                onClick={() => setResult(null)}
                className="ml-auto flex items-center gap-1 text-[11px] px-2 py-1 rounded text-slate-500 hover:text-slate-300"
              >
                <Trash2 size={11} /> 清空
              </button>
            )}
          </div>

          {tab === 'console' ? (
            <div className="console-output flex-1 p-4 font-mono text-[13px] whitespace-pre-wrap overflow-auto">
              {result ? (
                <>
                  {result.output && <div className="text-slate-100">{result.output}</div>}
                  {result.error && <div className="text-red-400 mt-1">{result.error}</div>}
                  {!result.output && !result.error && (
                    <div className="text-emerald-400">✓ 运行成功，无输出</div>
                  )}
                  <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-slate-600">
                    {langId === 'python'
                      ? (result.simulated ? '⚡ 内置模拟引擎（Pyodide 未加载时的兜底）' : '🐍 Pyodide · 本地内置运行时，浏览器内真实执行（离线可用）')
                      : '⚡ CodeMatrix 内置执行引擎（支持变量 / 循环 / 分支 / 标准输出）'}
                  </div>
                </>
              ) : (
                <div className="text-slate-600 leading-7">
                  <div>$ codematrix run --lang {langId}</div>
                  <div className="typing-caret text-slate-500">等待运行指令</div>
                  <div className="mt-4 text-[11px] text-slate-600">
                    提示：Python 由本地内置的 Pyodide 运行时在浏览器中真实执行（离线可用）；Java / C / C++ 由内置引擎模拟运行，
                    遇到暂不支持的写法（键盘输入、STL、指针等）会在运行前给出明确提示；HTML 请切换到「页面预览」查看实时渲染。
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 bg-white relative">
              {langId === 'html' ? (
                <iframe
                  title="preview"
                  sandbox="allow-scripts"
                  srcDoc={previewSrc || code}
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full bg-[#070a13] flex items-center justify-center text-slate-500 text-sm p-8 text-center leading-7">
                  页面预览仅适用于 HTML。
                  <br />
                  点击右上角切换到 HTML 语言，即可边写边看渲染效果。
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
