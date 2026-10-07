import { useMemo, useState } from 'react'
import { languages, getLang, difficultyLabel } from '../data'
import CodeBlock from '../components/CodeBlock'
import { AlertTriangle, KeyRound, ChevronDown, SearchCheck } from 'lucide-react'

const categories = ['全部', '选择题', '读程序写结果', '程序填空', '程序改错', '编程题']

function Stars({ n }: { n: number }) {
  return (
    <span className="text-xs tracking-tight">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= n ? 'star-on' : 'star-off'}>★</span>
      ))}
      <span className="ml-1.5 text-slate-500">{difficultyLabel[n]}</span>
    </span>
  )
}

export default function PatternsPage() {
  const [langId, setLangId] = useState('java')
  const [cat, setCat] = useState('全部')
  const [openId, setOpenId] = useState<string | null>(null)
  const lang = getLang(langId)

  const list = useMemo(
    () => lang.patterns.filter(p => cat === '全部' || p.category === cat),
    [lang, cat]
  )

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-slate-500 mb-2">
        <SearchCheck size={13} />
        QUESTION PATTERN LAB
      </div>
      <h1 className="text-3xl font-black mb-1">题型<span className="neon-text">剖析</span></h1>
      <p className="text-sm text-slate-400 mb-6">拆解每一类题的出题逻辑、解题模板与致命陷阱。</p>

      {/* 语言 + 题型筛选 */}
      <div className="flex flex-wrap gap-2 mb-3">
        {languages.map(l => (
          <button
            key={l.id}
            onClick={() => { setLangId(l.id); setOpenId(null) }}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
              l.id === langId ? 'border-transparent text-[#070a13]' : 'border-white/10 text-slate-400 hover:text-white'
            }`}
            style={l.id === langId ? { background: `linear-gradient(135deg, ${l.color}, ${l.color}cc)` } : {}}
          >
            {l.icon} {l.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-7">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3.5 py-1.5 rounded-lg text-xs transition-all ${
              c === cat
                ? 'bg-violet-500/20 text-violet-300 border border-violet-400/40'
                : 'bg-white/[0.03] text-slate-400 border border-white/5 hover:border-white/20 hover:text-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 剖析卡片 */}
      <div className="space-y-4 stagger">
        {list.map(p => {
          const open = openId === p.id
          return (
            <div key={p.id} className="tech-card rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenId(open ? null : p.id)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-cyan-400/30 text-cyan-300 tracking-wider">{p.category}</span>
                    <span className="font-bold text-[15px] truncate">{p.title}</span>
                  </div>
                  <div className="mt-1.5"><Stars n={p.difficulty} /></div>
                </div>
                <ChevronDown size={18} className={`shrink-0 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180 text-cyan-300' : ''}`} />
              </button>

              {open && (
                <div className="px-5 sm:px-6 pb-6 space-y-5 pop-in">
                  {/* 剖析 */}
                  <div>
                    <div className="text-xs tracking-widest text-cyan-300/80 mb-2">◈ 题型剖析</div>
                    <div className="space-y-2">
                      {p.analysis.map((a, i) => (
                        <p key={i} className="text-sm text-slate-300 leading-7">{a}</p>
                      ))}
                    </div>
                  </div>

                  {/* 考点 */}
                  <div>
                    <div className="text-xs tracking-widest text-violet-300/80 mb-2 flex items-center gap-1"><KeyRound size={12} /> 核心考点</div>
                    <div className="flex flex-wrap gap-2">
                      {p.keyPoints.map(k => (
                        <span key={k} className="text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-400/25 text-violet-200">{k}</span>
                      ))}
                    </div>
                  </div>

                  {/* 例题 */}
                  <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                    <div className="text-xs tracking-widest text-amber-300/80 mb-2">◈ 典型例题</div>
                    <p className="text-sm text-slate-200 leading-7 mb-2">{p.example.question}</p>
                    {p.example.code && <CodeBlock code={p.example.code} lang={lang.id} />}
                    <div className="mt-3 text-sm">
                      <span className="text-emerald-400 font-bold">答案：</span>
                      <span className="text-slate-200">{p.example.answer}</span>
                    </div>
                    <div className="mt-1.5 text-sm">
                      <span className="text-cyan-300 font-bold">解析：</span>
                      <span className="text-slate-400 leading-7">{p.example.explanation}</span>
                    </div>
                  </div>

                  {/* 陷阱 */}
                  <div>
                    <div className="text-xs tracking-widest text-red-300/80 mb-2 flex items-center gap-1"><AlertTriangle size={12} /> 易错陷阱</div>
                    <ul className="space-y-1.5">
                      {p.traps.map((t, i) => (
                        <li key={i} className="text-sm text-slate-400 flex gap-2 leading-6">
                          <span className="text-red-400/70 shrink-0">✗</span>{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {list.length === 0 && (
        <div className="text-center py-20 text-slate-500 text-sm">该分类下暂无内容，换个题型试试。</div>
      )}
    </div>
  )
}
