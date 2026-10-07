import { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { java } from '@codemirror/lang-java'
import { python } from '@codemirror/lang-python'
import { cpp } from '@codemirror/lang-cpp'
import { html } from '@codemirror/lang-html'
import { linter, lintGutter, type Diagnostic as CMDiagnostic } from '@codemirror/lint'
import { EditorView } from '@codemirror/view'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import type { LangId } from '../data/types'
import { analyze } from '../utils/runner'

interface Props {
  value: string
  onChange?: (v: string) => void
  lang: LangId
  height?: string
  readOnly?: boolean
}

export default function CodeEditor({ value, onChange, lang, height = '380px', readOnly = false }: Props) {
  const extensions = useMemo(() => {
    const langExt =
      lang === 'java' ? java() :
      lang === 'python' ? python() :
      lang === 'html' ? html() : cpp()

    const lint = linter((view) => {
      const code = view.state.doc.toString()
      const diags = analyze(lang, code)
      const out: CMDiagnostic[] = []
      for (const d of diags) {
        try {
          const lineInfo = view.state.doc.line(Math.min(d.line, view.state.doc.lines))
          const from = Math.min(lineInfo.from + d.col - 1, lineInfo.to)
          out.push({
            from,
            to: Math.max(from + 1, Math.min(lineInfo.to, from + 1)),
            severity: d.severity,
            message: d.message,
          })
        } catch { /* 行号越界时跳过 */ }
      }
      return out
    }, { delay: 400 })

    return [langExt, lint, lintGutter(), EditorView.lineWrapping]
  }, [lang])

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      height={height}
      theme={tokyoNight}
      extensions={extensions}
      readOnly={readOnly}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        foldGutter: true,
      }}
    />
  )
}
