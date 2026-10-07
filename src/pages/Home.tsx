import { Link } from 'react-router'
import { languages } from '../data'
import { ArrowRight, BookOpen, Puzzle, Dumbbell, FlaskConical, Zap, Code2, Target, CheckCircle2 } from 'lucide-react'

const features = [
  { icon: BookOpen, title: '系统化教程', desc: '五大语言从入门到进阶，章节式知识体系，语法、示例、陷阱一网打尽。' },
  { icon: Puzzle, title: '题型深度剖析', desc: '选择题、读程序、填空、改错、编程题五大题型逐一拆解，考点与陷阱全标注。' },
  { icon: Dumbbell, title: '实战题库', desc: '按语言 / 题型 / 难度三维筛选，即做即判，配详细解析与提示。' },
  { icon: FlaskConical, title: '在线演练场', desc: '浏览器内直接编写并运行代码，实时错误标注，HTML 即时渲染预览。' },
]

const stats = [
  { num: '5', label: '编程语言' },
  { num: '75', label: '教程章节' },
  { num: '34', label: '题型剖析' },
  { num: '206', label: '精选习题' },
  { num: '830+', label: '名词批注' },
]

export default function HomePage() {
  return (
    <div className="scanline relative">
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 text-xs tracking-widest mb-8 pop-in">
          <Zap size={13} />
          ONLINE JUDGE · 五语言一体化学习终端
        </div>
        <h1 className="fade-up text-4xl sm:text-6xl font-black tracking-tight leading-tight">
          在 <span className="neon-text">CodeMatrix</span> 中
          <br />
          掌握编程的每一种语言
        </h1>
        <p className="fade-up mt-6 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-7" style={{ animationDelay: '0.15s' }}>
          Java · Python · C++ · C · HTML —— 从语法精讲到题型拆解，从题库实战到在线运行，
          一个暗黑高科技座舱，装下你的整个编程学习之旅。
        </p>
        <div className="fade-up mt-9 flex items-center justify-center gap-4 flex-wrap" style={{ animationDelay: '0.25s' }}>
          <Link
            to="/playground"
            className="btn-glow inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-[#070a13] font-bold text-sm"
          >
            <Code2 size={16} strokeWidth={2.5} />
            立即开始写代码
          </Link>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/15 text-sm text-slate-200 hover:border-violet-400/50 hover:text-white hover:bg-violet-500/10 transition-all"
          >
            浏览教程
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 数据统计 */}
        <div className="stagger mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map(s => (
            <div key={s.label} className="tech-card rounded-2xl py-5 px-4">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-violet-400">
                {s.num}
              </div>
              <div className="mt-1 text-xs text-slate-400 tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 语言矩阵 */}
      <section className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="text-xs tracking-[0.3em] text-cyan-400/80 mb-2">LANGUAGE MATRIX</div>
            <h2 className="text-2xl font-bold">选择你的武器</h2>
          </div>
        </div>
        <div className="stagger grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {languages.map(l => (
            <Link
              key={l.id}
              to={`/learn/${l.id}`}
              className="tech-card rounded-2xl p-5 group relative overflow-hidden"
            >
              <div
                className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ background: l.color }}
              />
              <div className="text-3xl mb-3">{l.icon}</div>
              <div className="font-bold text-lg">{l.name}</div>
              <div className="text-xs mt-1 mb-3" style={{ color: l.color }}>{l.tagline}</div>
              <p className="text-xs text-slate-400 leading-5 line-clamp-3">{l.description}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                进入学习 <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 功能矩阵 */}
      <section className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="text-xs tracking-[0.3em] text-violet-400/80 mb-2">CORE MODULES</div>
        <h2 className="text-2xl font-bold mb-7">四大核心模块</h2>
        <div className="stagger grid sm:grid-cols-2 gap-4">
          {features.map(f => (
            <div key={f.title} className="tech-card rounded-2xl p-6 flex gap-4">
              <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-400/20 flex items-center justify-center">
                <f.icon size={20} className="text-cyan-300" />
              </div>
              <div>
                <div className="font-bold mb-1.5">{f.title}</div>
                <p className="text-sm text-slate-400 leading-6">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 学习路径 */}
      <section className="max-w-[1440px] mx-auto px-6 py-12 pb-8">
        <div className="tech-card rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Target size={18} className="text-fuchsia-400" />
            <h2 className="text-xl font-bold">推荐学习路径</h2>
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { step: '01', title: '读教程', desc: '按章节系统学习语法，配合示例代码理解', to: '/learn' },
              { step: '02', title: '拆题型', desc: '研究五大题型的出题套路与解题模板', to: '/patterns' },
              { step: '03', title: '刷题库', desc: '选择/填空/编程三维训练，即时判分', to: '/practice' },
              { step: '04', title: '实战演练', desc: '在演练场自由编码，运行验证所学', to: '/playground' },
            ].map(s => (
              <Link key={s.step} to={s.to} className="group rounded-xl border border-white/5 p-4 hover:border-cyan-400/30 transition-colors bg-white/[0.02]">
                <div className="text-2xl font-black text-white/10 group-hover:text-cyan-400/30 transition-colors">{s.step}</div>
                <div className="font-bold mt-1 mb-1 flex items-center gap-1.5">
                  {s.title}
                  <CheckCircle2 size={13} className="text-cyan-400/60" />
                </div>
                <p className="text-xs text-slate-500 leading-5">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
