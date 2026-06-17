import React, { useRef } from 'react'
import Editor from '@monaco-editor/react'
import type { Monaco } from '@monaco-editor/react'
import { useSnapStore } from '../../store/useSnapStore'
import { defineMonacoThemes } from '../../utils/monacoThemes'

export const CodeEditorWindow: React.FC = () => {
  const { activeSnap, updateActiveSnap } = useSnapStore()
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor
    defineMonacoThemes(monaco)
  }

  // Calculate dynamic editor height to avoid vertical scrollbars in snapshot
  const lineCount = activeSnap.code.split('\n').length
  const estimatedLineHeight = Math.round(activeSnap.fontSize * 1.35)
  const editorHeight = lineCount * estimatedLineHeight + 12

  // Mapping shadows
  const shadowClasses = {
    none: 'shadow-none',
    soft: 'shadow-[0_8px_30px_rgb(0,0,0,0.06)]',
    medium: 'shadow-[0_12px_40px_rgba(0,0,0,0.18)]',
    strong: 'shadow-[0_25px_60px_rgba(0,0,0,0.45)]',
  }

  // Map aspect ratio for wrapper container
  const aspectClasses = {
    free: '',
    '1:1': 'aspect-square flex items-center justify-center',
    '16:9': 'aspect-video flex items-center justify-center',
    '4:5': 'aspect-[4/5] flex items-center justify-center',
  }

  // Handle language mappings for Monaco
  const getMonacoLanguage = (lang: string) => {
    switch (lang) {
      case 'react':
        return 'typescript'
      case 'vue':
        return 'html'
      default:
        return lang
    }
  }

  // Get theme background colors to match window padding exactly
  const getThemeBgColor = (themeName: string) => {
    switch (themeName) {
      case 'dracula':
        return '#282a36'
      case 'purple-dracula':
        return '#1d1729'
      case 'nord':
        return '#2e3440'
      case 'one-dark':
        return '#282c34'
      case 'github-light':
        return '#ffffff'
      case 'tokyo-night':
        return '#1a1b26'
      default:
        return '#1d1729'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto overflow-hidden">
      {/* Target element for html-to-image export */}
      <div
        id="snap-export-node"
        className={`w-full overflow-hidden transition-all duration-200 ${aspectClasses[activeSnap.aspectRatio]}`}
        style={{
          padding: `${activeSnap.padding}px`,
          background: activeSnap.bgType === 'image' && activeSnap.customBgImage
            ? `url(${activeSnap.customBgImage}) center center / cover no-repeat`
            : activeSnap.background,
        }}
      >
        {/* Editor Window Container */}
        <div
          className={`w-full overflow-hidden border transition-all duration-200 ${shadowClasses[activeSnap.shadow]}`}
          style={{
            borderRadius: `${activeSnap.borderRadius}px`,
            backgroundColor: getThemeBgColor(activeSnap.editorTheme),
            borderColor: activeSnap.editorTheme === 'github-light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Window Header Style */}
          {activeSnap.windowStyle !== 'minimal' && (
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b select-none"
              style={{
                borderColor: activeSnap.editorTheme === 'github-light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                backgroundColor: activeSnap.editorTheme === 'github-light' ? '#f8fafc' : 'rgba(0, 0, 0, 0.15)',
              }}
            >
              {/* macOS Style Controls */}
              {activeSnap.windowStyle === 'macOS' && (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                </div>
              )}

              {/* Modern Title / Divider Placeholder if not macOS */}
              {(activeSnap.windowStyle === 'modern' || activeSnap.windowStyle === 'windows') && (
                <div className="flex items-center gap-2">
                  {activeSnap.windowStyle === 'modern' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-app-primary" />
                  )}
                </div>
              )}

              {/* Editable Filename/Title */}
              <input
                type="text"
                value={activeSnap.title}
                onChange={(e) => updateActiveSnap({ title: e.target.value }, true)}
                className={`text-xs font-semibold text-center border-none focus:outline-none focus:ring-1 focus:ring-app-primary rounded-full px-2.5 py-0.5 select-all shrink-0 max-w-[180px] bg-transparent ${
                  activeSnap.editorTheme === 'github-light' ? 'text-gray-700' : 'text-gray-300'
                }`}
              />

              {/* Windows Style Controls */}
              {activeSnap.windowStyle === 'windows' ? (
                <div className="flex items-center gap-3">
                  <svg className="w-3 h-3 opacity-60" viewBox="0 0 10 10" fill="none" stroke="currentColor">
                    <path d="M0 5H10" strokeWidth="1" />
                  </svg>
                  <svg className="w-3 h-3 opacity-60" viewBox="0 0 10 10" fill="none" stroke="currentColor">
                    <rect x="0.5" y="0.5" width="9" height="9" fill="none" strokeWidth="1" />
                  </svg>
                  <svg className="w-3.5 h-3.5 opacity-60" viewBox="0 0 10 10" fill="none" stroke="currentColor">
                    <path d="M0.5 0.5L9.5 9.5M9.5 0.5L0.5 9.5" strokeWidth="1" />
                  </svg>
                </div>
              ) : (
                <div className="w-[52px]" /> /* spacer to center the title text */
              )}
            </div>
          )}

          {/* Monaco Editor Container */}
          <div className="py-4 overflow-hidden">
            <Editor
              height={`${editorHeight}px`}
              language={getMonacoLanguage(activeSnap.language)}
              value={activeSnap.code}
              theme={activeSnap.editorTheme}
              onChange={(value) => updateActiveSnap({ code: value || '' }, true)}
              onMount={handleEditorDidMount}
              loading={<div className="flex justify-center items-center h-32 text-sm text-app-text/60">Loading editor...</div>}
              options={{
                fontSize: activeSnap.fontSize,
                lineHeight: estimatedLineHeight,
                fontFamily: "'Fira Code', 'JetBrains Mono', 'Source Code Pro', Menlo, Monaco, Consolas, monospace",
                fontLigatures: true,
                lineNumbers: activeSnap.showLineNumbers ? 'on' : 'off',
                minimap: { enabled: false },
                scrollbar: {
                  vertical: 'hidden',
                  horizontal: 'hidden',
                  verticalScrollbarSize: 0,
                  horizontalScrollbarSize: 0,
                },
                scrollBeyondLastLine: false,
                wordWrap: (activeSnap.wordWrap ?? true) ? 'on' : 'off',
                lineDecorationsWidth: activeSnap.showLineNumbers ? 10 : 0,
                lineNumbersMinChars: activeSnap.showLineNumbers ? 3 : 0,
                folding: false,
                guides: {
                  indentation: false,
                },
                renderLineHighlight: 'none',
                selectionHighlight: false,
                occurrencesHighlight: 'off',
                quickSuggestions: false,
                suggestOnTriggerCharacters: false,
                parameterHints: { enabled: false },
                domReadOnly: false,
                readOnly: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
