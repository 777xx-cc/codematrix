import { useMemo, useState } from 'react'
import { languages, getLang, difficultyLabel } from '../data'
import type { Exercise, LangId } from '../data/types'
import CodeBlock from '../components/CodeBlock'
import CodingTrainer from '../components/CodingTrainer'
import { Lightbulb, KeySquare, CheckCircle2, XCircle, Dumbbell } from 'lucide-react'

const types = [
  { id: 'all', label: '全部题型' },
  { id: 'choice', label: '选择题' },
  { id: 'fill', label: '填空题' },
  { id: 'coding', label: '编程题' },
]

function DiffStars({ n }: { n: number }) {
  return (
    <span className="text-[11px]">
      {[1, 2, 3, 4, 5].map(i => <span key={i} className={i <= n ? 'star-on' : 'star-off'}>★</span>)}
      <span className="ml-1 text-slate-500">{difficultyLabel[n]}</span>
    </span>
  )
}

function ChoiceCard({ ex }: { ex: Exercise }) {
  const [picked, setPicked] = useState<string | null>(null)
  const [shakeKey, setShakeKey] = useState(0)
  const letters = ['A', 'B', 'C', 'D']

  const pick = (l: string) => {
    if (picked === l) return
    setPicked(l)
    if (l !== ex.answer) setShakeKey(k => k + 1)
  }

  return (
    <div className="space-y-2.5">
      {ex.options!.map((opt, i) => {
        const letter = letters[i]
        const isRight = picked !== null && letter === ex.answer
        const isWrongPick = picked === letter && letter !== ex.answer
        return (
          <button
            key={i}
            onClick={() => pick(letter)}
            className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${
              isRight
                ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
                : isWrongPick
                ? 'border-red-400/60 bg-red-500/10 text-red-200'
                : picked
                ? 'border-white/5 text-slate-500'
                : 'border-white/10 text-slate-300 hover:border-cyan-400/40 hover:bg-cyan-400/5'
            }`}
          >
            <span className="flex items-center gap-2">
              {isRight && <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />}
              {isWrongPick && <XCircle size={15} className="text-red-400 shrink-0" />}
              {opt}
            </span>
          </button>
        )
      })}
      {picked && (
        <div key={shakeKey} className={`${picked === ex.answer ? 'pop-in' : 'shake'} mt-2 rounded-xl border p-3.5 text-sm leading-7 ${
          picked === ex.answer ? 'border-emerald-400/30 bg-emerald-500/5' : 'border-red-400/30 bg-red-500/5'
        }`}>
          <div className={`font-bold mb-1 ${picked === ex.answer ? 'text-emerald-300' : 'text-red-300'}`}>
            {picked === ex.answer ? '✓ 回答正确' : `✗ 正确答案：${ex.answer}`}
          </div>
          <div className="text-slate-400">{ex.explanation}</div>
        </div>
      )}
    </div>
  )
}

function FillCard({ ex }: { ex: Exercise }) {
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)
  const norm = (s: string) => s.replace(/\s+/g, '').toLowerCase()
  const correct = checked && norm(input) === norm(ex.answer)

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => { setInput(e.target.value); setChecked(false) }}
          onKeyDown={e => e.key === 'Enter' && setChecked(true)}
          placeholder="输入答案后回车或点击判定…"
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#0b0f1c] border border-white/10 text-sm font-mono text-cyan-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
        />
        <button
          onClick={() => setChecked(true)}
          className="btn-glow px-5 rounded-xl bg-gradient-to-r from-violet-500 to-violet-400 text-sm font-bold text-[#070a13]"
        >
          判定
        </button>
      </div>
      {checked && (
        <div className={`pop-in rounded-xl border p-3.5 text-sm leading-7 ${
          correct ? 'border-emerald-400/30 bg-emerald-500/5' : 'border-red-400/30 bg-red-500/5'
        }`}>
          <div className={`font-bold mb-1 ${correct ? 'text-emerald-300' : 'text-red-300'}`}>
            {correct ? '✓ 回答正确' : `✗ 参考答案：${ex.answer}`}
          </div>
          <div className="text-slate-400">{ex.explanation}</div>
        </div>
      )}
    </div>
  )
}

function CodingCard({ ex, langId }: { ex: Exercise; langId: string }) {
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  return (
    <div className="space-y-3">
      <CodingTrainer lang={langId as any} exercise={ex} />
      <div className="flex gap-2">
        {ex.hints && (
          <button
            onClick={() => setShowHint(v => !v)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 transition-colors"
          >
            <Lightbulb size={13} /> {showHint ? '收起提示' : '查看提示'}
          </button>
        )}
        <button
          onClick={() => setShowAnswer(v => !v)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs border border-emerald-400/30 text-emerald-300 hover:bg-emerald-400/10 transition-colors"
        >
          <KeySquare size={13} /> {showAnswer ? '收起解析' : '参考答案解析'}
        </button>
      </div>
      {showHint && ex.hints && (
        <div className="pop-in rounded-xl border border-amber-400/25 bg-amber-500/5 p-3.5 space-y-1">
          {ex.hints.map((h, i) => (
            <div key={i} className="text-xs text-amber-200/90 font-mono">💡 {h}</div>
          ))}
        </div>
      )}
      {showAnswer && (
        <div className="pop-in rounded-xl border border-emerald-400/25 bg-emerald-500/5 p-3.5 text-sm leading-7">
          <div className="font-bold text-emerald-300 mb-1">参考思路</div>
          <div className="text-slate-300">{ex.answer}</div>
          <div className="mt-2 text-slate-400">{ex.explanation}</div>
        </div>
      )}
    </div>
  )
}

export default function PracticePage() {
  const [langId, setLangId] = useState('java')
  const [type, setType] = useState('all')
  const [diff, setDiff] = useState(0)
  const lang = getLang(langId)

  const list = useMemo(
    () => lang.exercises.filter(e =>
      (type === 'all' || e.type === type) && (diff === 0 || e.difficulty === diff)
    ),
    [lang, type, diff]
  )

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-slate-500 mb-2">
        <Dumbbell size={13} />
        TRAINING GROUND
      </div>
      <h1 className="text-3xl font-black mb-1">题库<span className="neon-text">训练</span></h1>
      <p className="text-sm text-slate-400 mb-6">编程题支持在页面内直接编写、运行并自动判题。</p>

      {/* 筛选条 */}
      <div className="tech-card rounded-2xl p-4 mb-7 space-y-3">
        <div className="flex flex-wrap gap-2">
          {languages.map(l => (
            <button
              key={l.id}
              onClick={() => setLangId(l.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
                l.id === langId ? 'border-transparent text-[#070a13]' : 'border-white/10 text-slate-400 hover:text-white'
              }`}
              style={l.id === langId ? { background: `linear-gradient(135deg, ${l.color}, ${l.color}cc)` } : {}}
            >
              {l.icon} {l.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {types.map(t => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition-all ${
                t.id === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
          <span className="w-px h-5 bg-white/10 mx-1" />
          {[0, 1, 2, 3, 4, 5].map(d => (
            <button
              key={d}
              onClick={() => setDiff(d)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                d === diff
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                  : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              {d === 0 ? '全部难度' : difficultyLabel[d]}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-500">命中 {list.length} 题</span>
        </div>
      </div>

      {/* 题目列表 */}
      <div className="space-y-5">
        {list.map((ex, idx) => (
          <div key={`${langId}-${ex.id}`} className="tech-card rounded-2xl p-5 sm:p-6 fade-up" style={{ animationDelay: `${Math.min(idx * 0.05, 0.3)}s` }}>
            <div className="flex items-center gap-2 flex-wrap mb-2.5">
              <span className={`text-[10px] px-2 py-0.5 rounded-full border tracking-wider ${
                ex.type === 'choice' ? 'border-sky-400/40 text-sky-300' :
                ex.type === 'fill' ? 'border-violet-400/40 text-violet-300' :
                'border-emerald-400/40 text-emerald-300'
              }`}>
                {ex.type === 'choice' ? '选择题' : ex.type === 'fill' ? '填空题' : '编程题'}
              </span>
              {ex.tags.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400">{t}</span>
              ))}
              <DiffStars n={ex.difficulty} />
            </div>
            <h3 className="font-bold text-[15px] mb-1.5">{ex.title}</h3>
            <p className="text-sm text-slate-300 leading-7 whitespace-pre-wrap mb-4">{ex.question}</p>
            {ex.code && <CodeBlock code={ex.code} lang={langId} />}

            {ex.type === 'choice' && <ChoiceCard ex={ex} />}
            {ex.type === 'fill' && <FillCard ex={ex} />}
            {ex.type === 'coding' && <CodingCard ex={ex} langId={langId as LangId} />}
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-20 text-slate-500 text-sm">当前筛选条件下没有题目，放宽条件试试。</div>
      )}
    </div>
  )
}
