import PlaygroundCore from '../components/PlaygroundCore'

export default function PlaygroundPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-black flex items-center gap-2">
          代码<span className="neon-text">演练场</span>
        </h1>
        <div className="text-[11px] text-slate-500 mt-0.5 tracking-wider">
          同一页面编写 · 运行 · 审错 —— 波浪线实时标注语法问题
        </div>
      </div>
      <PlaygroundCore />
    </div>
  )
}
