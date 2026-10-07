import type { LanguagePack, LangId } from './types'
import { java } from './java'
import { python } from './python'
import { cpp } from './cpp'
import { c } from './c'
import { html } from './html'

export const languages: LanguagePack[] = [java, python, cpp, c, html]

export const langMap: Record<LangId, LanguagePack> = { java, python, cpp, c, html }

export function getLang(id: string | undefined): LanguagePack {
  return langMap[(id as LangId) ?? 'java'] ?? java
}

export const difficultyLabel = ['', '入门', '基础', '进阶', '提高', '挑战'] as const
