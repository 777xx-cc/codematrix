import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { languages, getLang } from '../data'
import type { QuizItem } from '../data/types'
import { annotations, type TermNote } from '../data/annotations'
import CodeBlock from '../components/CodeBlock'
import FloatingPlayground from '../components/FloatingPlayground'
import { useProgress } from '../utils/progress'
import { ChevronRight, ListTree, GraduationCap, Eye, CheckCircle2, XCircle, StickyNote, FlaskConical, BookmarkCheck, Highlighter, Eraser } from 'lucide-react'

const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

type Marks = Record<string, boolean>
type Toggle = (key: string) => void

/** 渲染段内联 `代码`；批注栏名词用琥珀色标注，点击名词可着重标记 */
function renderInline(text: string, terms: string[] | undefined, keyPrefix: string, marks: Marks, toggleMark: Toggle) {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((p, i) => {
    if (p.startsWith('`') && p.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 mx-0.5 rounded bg-cyan-400/10 text-cyan-300 text-[0.85em] font-mono border border-cyan-400/15">
          {p.slice(1, -1)}
        </code>
      )
    }
    if (!terms || terms.length === 0) return <span key={i}>{p}</span>
    // 长的名词优先匹配（如"指针数组"先于"指针"）
    const sorted = [...terms].sort((a, b) => b.length - a.length)
    const re = new RegExp(`(${sorted.map(escRe).join('|')})`, 'g')
    const segs = p.split(re)
    return (
      <span key={i}>
        {segs.map((s, j) => {
          if (j % 2 !== 1) return <span key={j}>{s}</span>
          const mKey = `${keyPrefix}~${s}`
          const marked = !!marks[mKey]
          return (
            <span
              key={j}
              onClick={e => { e.stopPropagation(); toggleMark(mKey) }}
              className={`font-semibold border-b border-dashed cursor-pointer rounded-sm px-0.5 transition-all ${
                marked
                  ? 'bg-amber-400/30 text-amber-100 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                  : 'text-amber-300 border-amber-300/60 hover:bg-amber-400/10'
              }`}
              title={marked ? '再次点击取消着重标记' : '点击着重标记该名词（批注栏有解释）'}
            >
              {s}
            </span>
          )
        })}
      </span>
    )
  })
}

/** 段落渲染：按句切分，点击句子可整条着重标注（自动保存） */
function renderParagraph(text: string, terms: string[] | undefined, prefix: string, marks: Marks, toggleMark: Toggle) {
  const sentences = text.split(/(?<=[。！？!?；;])/).filter(s => s.length > 0)
  return sentences.map((sent, si) => {
    const key = `${prefix}#${si}`
    const marked = !!marks[key]
    return (
      <span
        key={si}
        onClick={() => toggleMark(key)}
        className={`cursor-pointer rounded-sm transition-colors duration-150 ${
          marked
            ? 'bg-cyan-400/15 text-cyan-50 box-decoration-clone shadow-[0_0_0_1px_rgba(34,211,238,0.15)]'
            : 'hover:bg-white/[0.05]'
        }`}
        title={marked ? '点击取消标注' : '点击标注这句话'}
      >
        {renderInline(sent, terms, `${key}:`, marks, toggleMark)}
      </span>
    )
  })
}

/** 课后练习单题：作答结果持久化保存 */
function QuizCard({ quiz, index, picked, revealed, onPick, onToggleReveal }: {
  quiz: QuizItem
  index: number
  picked: string | null
  revealed: boolean
  onPick: (letter: string) => void
  onToggleReveal: () => void
}) {
  const letters = ['A', 'B', 'C', 'D']
  const isChoice = !!quiz.options

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
      <div className="text-sm text-slate-200 leading-7">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-cyan-500/15 text-cyan-300 text-[11px] font-bold mr-2 align-middle">
          {index + 1}
        </span>
        {renderInline(quiz.question, undefined, '', {}, () => {})}
      </div>

      {isChoice ? (
        <div className="mt-3 grid sm:grid-cols-2 gap-2">
          {quiz.options!.map((opt, i) => {
            const letter = letters[i]
            const isRight = picked !== null && letter === quiz.answer
            const isWrong = picked === letter && letter !== quiz.answer
            return (
              <button
                key={i}
                onClick={() => onPick(letter)}
                className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                  isRight ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
                  : isWrong ? 'border-red-400/60 bg-red-500/10 text-red-200'
                  : picked ? 'border-white/5 text-slate-500'
                  : 'border-white/10 text-slate-300 hover:border-cyan-400/40 hover:bg-cyan-400/5'
                }`}
              >
                {isRight && <CheckCircle2 size={12} className="inline mr-1.5 text-emerald-400" />}
                {isWrong && <XCircle size={12} className="inline mr-1.5 text-red-400" />}
                {opt}
              </button>
            )
          })}
        </div>
      ) : (
        <button
          onClick={onToggleReveal}
          className="mt-3 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 transition-colors"
        >
          <Eye size={12} /> {revealed ? '收起答案' : '显示答案'}
        </button>
      )}

      {(picked || revealed) && (
        <div className="pop-in mt-3 pt-3 border-t border-white/5 text-xs leading-6">
          <div className="text-emerald-300 font-bold mb-0.5">答案：{quiz.answer}</div>
          <div className="text-slate-400">{quiz.explanation}</div>
        </div>
      )}
    </div>
  )
}

/** 小节旁的名词批注栏（类似旁批/注释） */
function AnnotationRail({ notes, color }: { notes: TermNote[]; color: string }) {
  return (
    <aside className="xl:w-64 shrink-0">
      <div className="xl:sticky xl:top-20 rounded-xl border border-amber-300/20 bg-amber-300/[0.04] p-3.5 space-y-3">
        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-amber-300/80">
          <StickyNote size={11} />
          名词解释 · 批注
        </div>
        {notes.map((n, i) => (
          <div key={i} className="border-l-2 pl-2.5 py-0.5" style={{ borderColor: `${color}66` }}>
            <div className="text-xs font-bold text-amber-200/95">{n.term}</div>
            <div className="mt-0.5 text-[11.5px] leading-5 text-slate-400">{n.def}</div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default function LearnPage() {
  const { langId } = useParams()
  const navigate = useNavigate()
  const lang = getLang(langId)
  const [progress, update] = useProgress()
  const [chapterId, setChapterId] = useState(lang.chapters[0].id)
  const [pg, setPg] = useState<{ nonce: number; code?: string } | null>(null)

  // 语言切换 / 直达链接时：恢复该语言上次学习的章节
  useEffect(() => {
    const stored = progress.lastChapter[lang.id]
    setChapterId(stored && lang.chapters.some(c => c.id === stored) ? stored : lang.chapters[0].id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang.id])

  // 从导航「语言教程」进入且无语言参数时：回到上次学习的语言
  useEffect(() => {
    if (!langId && progress.lastLang && progress.lastLang !== lang.id) {
      navigate(`/learn/${progress.lastLang}`, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chapter = useMemo(
    () => lang.chapters.find(c => c.id === chapterId) ?? lang.chapters[0],
    [lang, chapterId]
  )

  const setChapter = (cid: string) => {
    setChapterId(cid)
    update(d => { d.lastChapter[lang.id] = cid })
  }

  const switchLang = (id: string) => {
    update(d => { d.lastLang = id })
    navigate(`/learn/${id}`)
  }

  const toggleMark = (key: string) =>
    update(d => { if (d.marks[key]) delete d.marks[key]; else d.marks[key] = true })

  const openPlayground = (code?: string) =>
    setPg(p => ({ nonce: (p?.nonce ?? 0) + 1, code }))

  const chapterProg = progress.chapters[chapter.id]
  const completed = !!chapterProg?.completed
  const doneCount = lang.chapters.filter(c => progress.chapters[c.id]?.completed).length
  const markCount = Object.keys(progress.marks).filter(k => k.startsWith(`m:${chapter.id}:`)).length
  const clearChapterMarks = () =>
    update(d => {
      for (const k of Object.keys(d.marks)) if (k.startsWith(`m:${chapter.id}:`)) delete d.marks[k]
    })

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
      {/* 语言切换 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {languages.map(l => (
          <button
            key={l.id}
            onClick={() => switchLang(l.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
              l.id === lang.id
                ? 'border-transparent text-[#070a13]'
                : 'border-white/10 text-slate-400 hover:text-white hover:border-white/25'
            }`}
            style={l.id === lang.id ? { background: `linear-gradient(135deg, ${l.color}, ${l.color}cc)`, boxShadow: `0 0 18px ${l.color}44` } : {}}
          >
            {l.icon} {l.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 章节侧边栏 */}
        <aside className="lg:w-72 shrink-0">
          <div className="tech-card rounded-2xl p-4 lg:sticky lg:top-20">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-slate-500 mb-3 px-1">
              <ListTree size={13} />
              CHAPTER INDEX · {lang.name}
            </div>

            {/* 学习进度条 */}
            <div className="mb-3 px-1">
              <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
                <span>学习进度（自动保存）</span>
                <span className="text-emerald-300 font-bold">{doneCount}/{lang.chapters.length}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${(doneCount / lang.chapters.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              {lang.chapters.map(c => {
                const done = !!progress.chapters[c.id]?.completed
                return (
                  <button
                    key={c.id}
                    onClick={() => setChapter(c.id)}
                    className={`chapter-item w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-2 ${
                      c.id === chapter.id ? 'active font-bold' : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.03]'
                    }`}
                  >
                    <ChevronRight size={13} className={c.id === chapter.id ? 'text-cyan-400' : 'text-slate-600'} />
                    <span className="flex-1 min-w-0 truncate">{c.title}</span>
                    {done && <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />}
                  </button>
                )
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 px-1 text-[11px] text-slate-500 leading-5">
              本章含 {chapter.sections.length} 个小节 · 全语言共 {lang.chapters.length} 章
            </div>
          </div>
        </aside>

        {/* 章节内容 */}
        <article key={chapter.id} className="flex-1 min-w-0 fade-up">
          <div className="tech-card rounded-2xl p-6 sm:p-9">
            <div className="text-xs tracking-[0.25em] mb-2" style={{ color: lang.color }}>
              {lang.name} COURSE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-3 flex-wrap">
              {chapter.title}
              {completed && (
                <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-bold">
                  <CheckCircle2 size={12} /> 已学完
                </span>
              )}
            </h1>
            <p className="mt-3 text-slate-400 text-sm leading-6 border-l-2 border-cyan-400/40 pl-4">{chapter.intro}</p>

            {/* 操作栏：悬浮演练场 / 学完打卡 / 标注 */}
            <div className="mt-5 flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => openPlayground()}
                className="btn-glow flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-[#070a13] text-xs font-black"
              >
                <FlaskConical size={14} strokeWidth={2.5} />
                边学边练 · 悬浮演练场
              </button>
              <button
                onClick={() => update(d => { const c = (d.chapters[chapter.id] ??= {}); c.completed = !c.completed })}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
                  completed
                    ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-300'
                    : 'border-white/10 text-slate-400 hover:text-emerald-300 hover:border-emerald-400/40'
                }`}
              >
                <BookmarkCheck size={14} />
                {completed ? '取消已学完标记' : '标记本章已学完'}
              </button>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Highlighter size={12} className="text-cyan-400/70" />
                点击句子或琥珀色名词可着重标注（已存 {markCount} 处）
                {markCount > 0 && (
                  <button
                    onClick={clearChapterMarks}
                    className="flex items-center gap-1 text-slate-500 hover:text-red-300 transition-colors ml-1"
                  >
                    <Eraser size={11} /> 清除本章标注
                  </button>
                )}
              </span>
            </div>

            <div className="mt-8 space-y-10">
              {chapter.sections.map((sec, si) => {
                const notes = annotations[chapter.id]?.[si]
                const terms = notes?.map(n => n.term)
                return (
                <section key={si}>
                  <h2 className="text-lg font-bold flex items-center gap-2.5 mb-4">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-[#070a13]"
                      style={{ background: `linear-gradient(135deg, ${lang.color}, ${lang.color}aa)` }}
                    >
                      {si + 1}
                    </span>
                    {sec.title}
                  </h2>
                  <div className="flex flex-col xl:flex-row gap-5">
                    <div className="flex-1 min-w-0">
                      <div className="space-y-3 text-[15px] leading-8 text-slate-300">
                        {sec.content.map((p, pi) => (
                          <p key={pi}>{renderParagraph(p, terms, `m:${chapter.id}:s${si}:p${pi}`, progress.marks, toggleMark)}</p>
                        ))}
                      </div>
                      {sec.code && (
                        <CodeBlock
                          code={sec.code.source}
                          lang={sec.code.lang}
                          caption={sec.code.caption}
                          onTry={code => openPlayground(code)}
                        />
                      )}
                    </div>
                    {notes && notes.length > 0 && <AnnotationRail notes={notes} color={lang.color} />}
                  </div>
                </section>
                )
              })}
            </div>

            {/* 课后练习 */}
            {chapter.quiz && chapter.quiz.length > 0 && (
              <div className="mt-12 rounded-2xl border border-violet-400/20 bg-violet-500/[0.04] p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap size={17} className="text-violet-300" />
                  <h2 className="text-lg font-bold">课后练习</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 tracking-wider">
                    {chapter.quiz.length} 题 · 附答案解析 · 作答自动保存
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">围绕本章知识点出题，做完立即核对答案。</p>
                <div className="space-y-3">
                  {chapter.quiz.map((q, qi) => (
                    <QuizCard
                      key={qi}
                      quiz={q}
                      index={qi}
                      picked={progress.chapters[chapter.id]?.picks?.[qi] ?? null}
                      revealed={!!progress.chapters[chapter.id]?.reveals?.[qi]}
                      onPick={letter => update(d => {
                        const c = (d.chapters[chapter.id] ??= {})
                        ;(c.picks ??= {})[qi] = letter
                      })}
                      onToggleReveal={() => update(d => {
                        const c = (d.chapters[chapter.id] ??= {})
                        const r = (c.reveals ??= {})
                        r[qi] = !r[qi]
                      })}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 章节导航 */}
            <div className="mt-12 pt-6 border-t border-white/5 flex justify-between gap-4">
              {(() => {
                const idx = lang.chapters.findIndex(c => c.id === chapter.id)
                const prev = lang.chapters[idx - 1]
                const next = lang.chapters[idx + 1]
                return (
                  <>
                    {prev ? (
                      <button onClick={() => setChapter(prev.id)} className="text-sm text-slate-400 hover:text-cyan-300 transition-colors">
                        ← {prev.title}
                      </button>
                    ) : <span />}
                    {next ? (
                      <button onClick={() => setChapter(next.id)} className="btn-glow px-5 py-2 rounded-lg bg-cyan-500/90 text-[#070a13] text-sm font-bold">
                        {next.title} →
                      </button>
                    ) : <span />}
                  </>
                )
              })()}
            </div>
          </div>
        </article>
      </div>

      {/* 悬浮代码演练场（分窗口，不影响阅读） */}
      {pg && (
        <FloatingPlayground
          key={pg.nonce}
          lang={lang.id}
          code={pg.code}
          onClose={() => setPg(null)}
        />
      )}
    </div>
  )
}
