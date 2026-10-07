import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface Props {
  code: string
  lang?: string
  caption?: string
}

/** 静态代码展示块：行号 + 复制 */
export default function CodeBlock({ code, lang = '', caption }: Props) {
  const [copied, setCopied] = useState(false)
  const lines = code.replace(/\n$/, '').split('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* 忽略剪贴板权限失败 */ }
  }

  return (
    <div className="code-block overflow-hidden my-3">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <span className="text-[11px] tracking-widest text-cyan-300/70 uppercase">
          {caption || lang || 'CODE'}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <div className="overflow-x-auto p-3">
        <pre className="font-mono text-[13px] leading-6">
          {lines.map((l, i) => (
            <div key={i} className="flex">
              <span className="w-8 shrink-0 select-none text-right pr-3 text-slate-600">{i + 1}</span>
              <code className="text-slate-200 whitespace-pre">{l || ' '}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
