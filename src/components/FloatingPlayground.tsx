import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { LangId } from '../data/types'
import PlaygroundCore from './PlaygroundCore'
import { X, FlaskConical, Minimize2, Maximize2 } from 'lucide-react'

interface Props {
  lang: LangId
  code?: string
  onClose: () => void
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

/**
 * 悬浮代码演练场：可拖拽 / 可缩放 / 可最小化的分窗口，
 * 通过 Portal 挂到 body，学习页面内容保持可见可滚动。
 */
export default function FloatingPlayground({ lang, code, onClose }: Props) {
  const [pos, setPos] = useState(() => ({
    x: Math.max(16, window.innerWidth - 956),
    y: 76,
  }))
  const [size, setSize] = useState(() => ({
    w: Math.min(920, window.innerWidth - 32),
    h: Math.min(660, window.innerHeight - 96),
  }))
  const [minimized, setMinimized] = useState(false)
  const dragOff = useRef<{ dx: number; dy: number } | null>(null)
  const resizeOff = useRef<{ sx: number; sy: number; sw: number; sh: number } | null>(null)

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragOff.current) {
        setPos({
          x: clamp(e.clientX - dragOff.current.dx, 0, window.innerWidth - 120),
          y: clamp(e.clientY - dragOff.current.dy, 0, window.innerHeight - 48),
        })
      } else if (resizeOff.current) {
        const r = resizeOff.current
        setSize({
          w: clamp(r.sw + e.clientX - r.sx, 520, window.innerWidth - 16),
          h: clamp(r.sh + e.clientY - r.sy, 400, window.innerHeight - 16),
        })
      }
    }
    const up = () => {
      dragOff.current = null
      resizeOff.current = null
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  if (minimized) {
    return createPortal(
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 px-4 py-2.5 rounded-full border border-cyan-400/40 bg-[#0b0f1c]/95 backdrop-blur-xl text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-500/20 hover:border-cyan-300 transition-colors"
      >
        <FlaskConical size={14} />
        代码演练场（点击展开）
      </button>,
      document.body
    )
  }

  return createPortal(
    <div
      className="fixed z-[70] flex flex-col rounded-2xl border border-cyan-400/25 bg-[#0b0f1c]/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/15 overflow-hidden"
      style={{ left: pos.x, top: pos.y, width: size.w, height: size.h }}
    >
      {/* 标题栏（拖拽把手） */}
      <div
        onPointerDown={e => {
          if (e.button !== 0) return
          dragOff.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y }
        }}
        className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/[0.03] cursor-move select-none shrink-0 touch-none"
      >
        <FlaskConical size={14} className="text-cyan-400" />
        <span className="text-xs font-bold text-slate-200">代码演练场 · 悬浮窗</span>
        <span className="text-[10px] text-slate-600 hidden sm:inline">可拖拽标题栏移动 · 拖右下角缩放 · 不影响阅读</span>
        <div className="ml-auto flex items-center gap-1">
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={() => setMinimized(true)}
            className="p-1.5 rounded-md text-slate-500 hover:text-cyan-300 hover:bg-white/5 transition-colors"
            title="最小化"
          >
            <Minimize2 size={13} />
          </button>
          <button
            onPointerDown={e => e.stopPropagation()}
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-500 hover:text-red-300 hover:bg-white/5 transition-colors"
            title="关闭"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* 演练场主体 */}
      <div className="flex-1 min-h-0 flex flex-col p-3">
        <PlaygroundCore initialLang={lang} initialCode={code} compact />
      </div>

      {/* 缩放把手 */}
      <div
        onPointerDown={e => {
          if (e.button !== 0) return
          resizeOff.current = { sx: e.clientX, sy: e.clientY, sw: size.w, sh: size.h }
        }}
        className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize touch-none"
        title="拖拽缩放"
      >
        <Maximize2 size={10} className="absolute bottom-1 right-1 text-slate-600 rotate-90" />
      </div>
    </div>,
    document.body
  )
}
