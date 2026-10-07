export type LangId = 'java' | 'python' | 'cpp' | 'c' | 'html'

export interface Section {
  title: string
  content: string[] // paragraphs, supports inline `code`
  code?: { lang: string; source: string; caption?: string }
}

export interface QuizItem {
  question: string
  options?: string[] // 有选项为选择题，无则为填空/简答（点击显示答案）
  answer: string
  explanation: string
}

export interface Chapter {
  id: string
  title: string
  intro: string
  sections: Section[]
  quiz: QuizItem[] // 课后练习 3~5 道
}

export interface Pattern {
  id: string
  title: string
  category: string // 选择题 / 读程序写结果 / 程序填空 / 程序改错 / 编程题 ...
  difficulty: 1 | 2 | 3 | 4 | 5
  analysis: string[] // 题型剖析
  keyPoints: string[] // 考点清单
  example: { question: string; code?: string; answer: string; explanation: string }
  traps: string[] // 易错陷阱
}

export type ExerciseType = 'choice' | 'fill' | 'coding'

export interface Exercise {
  id: string
  type: ExerciseType
  title: string
  difficulty: 1 | 2 | 3 | 4 | 5
  tags: string[]
  question: string
  code?: string // 题干附带的代码
  options?: string[] // choice
  answer: string // choice: 选项字母; fill: 答案; coding: 参考答案说明
  explanation: string
  starterCode?: string // coding
  expectedOutput?: string // coding
  hints?: string[]
}

export interface LanguagePack {
  id: LangId
  name: string
  zhName: string
  color: string // accent hex
  gradient: string
  icon: string // emoji/symbol
  tagline: string
  description: string
  chapters: Chapter[]
  patterns: Pattern[]
  exercises: Exercise[]
  playgroundTemplate: string
}
