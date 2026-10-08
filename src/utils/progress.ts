import { useState } from 'react'

/** 单章学习进度 */
export interface ChapterProgress {
  completed?: boolean
  picks?: Record<number, string> // 课后练习选择题作答（题号 -> 选项字母）
  reveals?: Record<number, boolean> // 填空/简答题是否已看答案
}

/** 全站学习进度（localStorage 持久化，关机不丢） */
export interface ProgressData {
  lastLang?: string // 最近学习的语言
  lastChapter: Record<string, string> // langId -> chapterId
  chapters: Record<string, ChapterProgress> // chapterId -> 进度
  marks: Record<string, boolean> // 点击标注（词条/句子）key -> true
}

const KEY = 'codematrix-progress-v1'

const EMPTY: ProgressData = { lastChapter: {}, chapters: {}, marks: {} }

export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return structuredClone(EMPTY)
    const d = JSON.parse(raw)
    return {
      lastLang: d.lastLang,
      lastChapter: d.lastChapter ?? {},
      chapters: d.chapters ?? {},
      marks: d.marks ?? {},
    }
  } catch {
    return structuredClone(EMPTY)
  }
}

/**
 * 进度 store：读取 localStorage 并监听变更。
 * update(fn) 以不可变方式修改并立即持久化。
 */
export function useProgress(): [ProgressData, (fn: (d: ProgressData) => void) => void] {
  const [data, setData] = useState<ProgressData>(loadProgress)
  const update = (fn: (d: ProgressData) => void) => {
    const next = structuredClone(data)
    fn(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* 存储满/隐私模式下静默失败 */
    }
    setData(next)
  }
  return [data, update]
}
