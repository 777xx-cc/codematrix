import { NavLink, Outlet } from 'react-router'
import { Terminal, BookOpen, Puzzle, Dumbbell, FlaskConical, Home } from 'lucide-react'

const navItems = [
  { to: '/', label: '首页', icon: Home },
  { to: '/learn', label: '语言教程', icon: BookOpen },
  { to: '/patterns', label: '题型剖析', icon: Puzzle },
  { to: '/practice', label: '题库训练', icon: Dumbbell },
  { to: '/playground', label: '代码演练场', icon: FlaskConical },
]

export default function Layout() {
  return (
    <div className="min-h-screen relative tech-grid">
      {/* 漂浮光斑背景 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb w-[480px] h-[480px] bg-cyan-500 -top-40 -left-32" />
        <div className="orb w-[420px] h-[420px] bg-violet-600 top-1/3 -right-32" style={{ animationDelay: '-5s' }} />
        <div className="orb w-[380px] h-[380px] bg-fuchsia-600 -bottom-32 left-1/4" style={{ animationDelay: '-9s' }} />
      </div>

      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#070a13]/80 backdrop-blur-xl">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-400/40 transition-shadow">
              <Terminal size={18} className="text-[#070a13]" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="font-bold tracking-wide text-[15px]">Code<span className="text-cyan-400">Matrix</span></div>
              <div className="text-[10px] text-slate-500 tracking-[0.2em]">编程学习矩阵</div>
            </div>
          </NavLink>

          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${
                    isActive ? 'active text-cyan-300 bg-cyan-400/5' : 'text-slate-400 hover:text-slate-100'
                  }`
                }
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-white/5 mt-16">
        <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot text-emerald-400" />
            CodeMatrix · 系统运行正常 · 五大语言模块已加载
          </div>
          <div className="tracking-widest">LEARN · ANALYZE · PRACTICE · RUN</div>
        </div>
      </footer>
    </div>
  )
}
