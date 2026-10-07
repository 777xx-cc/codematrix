import { useState } from 'react'
import type { Exercise, LangId } from '../data/types'
import CodeEditor from './CodeEditor'
import { runCode, type RunResult } from '../utils/runner'
import { Play, RotateCcw, Loader2, CheckCircle2, XCircle } from 'lucide-react'

interface Props {
  lang: LangId
  exercise: Exercise
}

/** 编程题内嵌训练器：编辑器 + 运行 + 自动比对输出 */
export default function CodingTrainer({ lang, exercise }: Props) {
  const [code, setCode] = useState(exercise.starterCode ?? '')
  const [result, setResult] = useState<RunResult | null>(null)
  const [running, setRunning] = useState(false)
  const [verdict, setVerdict] = useState<'pass' | 'fail' | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)

  const run = async () => {
    setRunning(true)
    setVerdict(null)
    try {
      if (lang === 'html') {
        const r = await runCode(lang, code)
        setResult(r)
        setPreviewSrc(code) // 刷新右侧 iframe 实时预览
        return
      }
      const r = await runCode(lang, code)
      setResult(r)
      if (!r.error && exercise.expectedOutput) {
        const norm = (s: string) => s.replace(/\s+$/gm, '').trim()
        setVerdict(norm(r.output) === norm(exercise.expectedOutput) ? 'pass' : 'fail')
      }
    } finally {
      setRunning(false)
    }
  }

  const reset = () => {
    setCode(exercise.starterCode ?? '')
    setResult(null)
    setVerdict(null)
    setPreviewSrc(null)
  }

  return (
    <div className="space-y-3">
      <div className="grid lg:grid-cols-2 gap-3">
        {/* 编辑区 */}
        <div className="rounded-xl overflow-hidden border border-white/10">
          <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.03] border-b border-white/5">
            <span className="text-[11px] tracking-widest text-slate-500">EDITOR · {lang.toUpperCase()}</span>
            <span className="text-[10px] text-slate-600">错误会以波浪线实时标注</span>
          </div>
          <CodeEditor value={code} onChange={setCode} lang={lang} height="300px" />
        </div>

        {/* 输出区 */}
        <div className="rounded-xl overflow-hidden border border-white/10 flex flex-col">
          <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.03] border-b border-white/5">
            <span className="text-[11px] tracking-widest text-slate-500">{lang === 'html' ? 'PREVIEW' : 'CONSOLE'}</span>
            <div className="flex gap-2">
              <button
                onClick={reset}
                className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md border border-white/10 text-slate-400 hover:text-white hover:border-white/25 transition-colors"
              >
                <RotateCcw size={11} /> 重置
              </button>
              <button
                onClick={run}
                disabled={running}
                className="btn-glow flex items-center gap-1 text-[11px] px-3 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#070a13] font-bold disabled:opacity-60"
              >
                {running ? <Loader2 size={11} className="animate-spin" /> : <Play size={11} />}
                {running ? '运行中' : '运行'}
              </button>
            </div>
          </div>
          {lang === 'html' ? (
            <div className="flex-1 flex flex-col min-h-[120px]">
              {previewSrc !== null ? (
                <iframe
                  sandbox="allow-scripts"
                  srcDoc={previewSrc}
                  title="HTML 实时预览"
                  className="w-full flex-1 min-h-[260px] max-h-[300px] bg-white"
                />
              ) : (
                <div className="flex-1 p-3 font-mono text-[13px] text-slate-600">// 点击「运行」在此实时渲染页面…</div>
              )}
              {result && result.diagnostics.length > 0 && (
                <div className="px-3 py-2 border-t border-white/5 text-amber-300/90 text-xs font-mono">
                  {result.diagnostics.map((d, i) => (
                    <div key={i}>⚠ 第 {d.line} 行：{d.message}</div>
                  ))}
                </div>
              )}
            </div>
          ) : (
          <div className="console-output flex-1 p-3 font-mono text-[13px] whitespace-pre-wrap min-h-[120px] max-h-[300px] overflow-auto rounded-b-xl">
            {result ? (
              <>
                {result.output && <div className="text-slate-200">{result.output}</div>}
                {result.error && <div className="text-red-400 mt-1">{result.error}</div>}
                {result.diagnostics.filter(d => d.severity === 'error').length > 0 && (
                  <div className="mt-2 pt-2 border-t border-white/5 text-amber-300/90 text-xs">
                    {result.diagnostics.filter(d => d.severity === 'error').map((d, i) => (
                      <div key={i}>⚠ 第 {d.line} 行：{d.message}</div>
                    ))}
                  </div>
                )}
                {result.simulated !== undefined && (
                  <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-slate-600">
                    {lang === 'python' ? (result.simulated ? '内置模拟引擎（Pyodide 未加载）' : 'Pyodide · 浏览器内真实执行') : 'CodeMatrix 内置执行引擎'}
                  </div>
                )}
              </>
            ) : (
              <span className="text-slate-600">// 点击「运行」查看输出…</span>
            )}
          </div>
          )}
        </div>
      </div>

      {/* 判题结果 */}
      {verdict && (
        <div className={`pop-in flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border ${
          verdict === 'pass'
            ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-300'
            : 'bg-red-500/10 border-red-400/40 text-red-300'
        }`}>
          {verdict === 'pass' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {verdict === 'pass' ? '通过！输出与预期完全一致 🎉' : '输出与预期不一致，对照下方期望输出再调试一下'}
        </div>
      )}
      {verdict === 'fail' && exercise.expectedOutput && (
        <div className="rounded-xl border border-white/10 p-3 text-xs font-mono">
          <div className="text-slate-500 mb-1">期望输出：</div>
          <pre className="text-cyan-300 whitespace-pre-wrap">{exercise.expectedOutput}</pre>
        </div>
      )}
    </div>
  )
}
