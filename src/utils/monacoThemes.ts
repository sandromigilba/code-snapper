import type { Monaco } from '@monaco-editor/react'

export const defineMonacoThemes = (monaco: Monaco) => {
  // Dracula
  monaco.editor.defineTheme('dracula', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff79c6' },
      { token: 'identifier', foreground: 'f8f8f2' },
      { token: 'string', foreground: 'f1fa8c' },
      { token: 'number', foreground: 'bd93f9' },
      { token: 'regexp', foreground: 'ffb86c' },
      { token: 'type', foreground: '8be9fd' },
      { token: 'class', foreground: '50fa7b' },
      { token: 'function', foreground: '50fa7b' },
    ],
    colors: {
      'editor.background': '#282a36',
      'editor.foreground': '#f8f8f2',
      'editor.lineHighlightBackground': '#44475a30',
      'editorCursor.foreground': '#f8f8f0',
      'editorLineNumber.foreground': '#6272a4',
      'editorLineNumber.activeForeground': '#ff79c6',
    },
  });

  // Purple Dracula
  monaco.editor.defineTheme('purple-dracula', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '7c6f8f', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'a855f7' },
      { token: 'identifier', foreground: 'f5f3ff' },
      { token: 'string', foreground: 'c084fc' },
      { token: 'number', foreground: 'd8b4fe' },
      { token: 'type', foreground: 'e9d5ff' },
      { token: 'function', foreground: 'c084fc' },
    ],
    colors: {
      'editor.background': '#1d1729',
      'editor.foreground': '#f5f3ff',
      'editor.lineHighlightBackground': '#2e243f60',
      'editorCursor.foreground': '#c084fc',
      'editorLineNumber.foreground': '#7c6f8f',
      'editorLineNumber.activeForeground': '#c084fc',
    },
  });

  // Nord
  monaco.editor.defineTheme('nord', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '4c566a', fontStyle: 'italic' },
      { token: 'keyword', foreground: '81a1c1' },
      { token: 'identifier', foreground: 'd8dee9' },
      { token: 'string', foreground: 'a3be8c' },
      { token: 'number', foreground: 'b48ead' },
      { token: 'type', foreground: '8fbcbb' },
      { token: 'function', foreground: '88c0d0' },
    ],
    colors: {
      'editor.background': '#2e3440',
      'editor.foreground': '#d8dee9',
      'editor.lineHighlightBackground': '#434c5e50',
      'editorCursor.foreground': '#d8dee9',
      'editorLineNumber.foreground': '#4c566a',
      'editorLineNumber.activeForeground': '#88c0d0',
    },
  });

  // One Dark
  monaco.editor.defineTheme('one-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c678dd' },
      { token: 'identifier', foreground: 'abb2bf' },
      { token: 'string', foreground: '98c379' },
      { token: 'number', foreground: 'd19a66' },
      { token: 'type', foreground: 'e5c07b' },
      { token: 'function', foreground: '61afef' },
    ],
    colors: {
      'editor.background': '#282c34',
      'editor.foreground': '#abb2bf',
      'editor.lineHighlightBackground': '#2c313c',
      'editorCursor.foreground': '#528bff',
      'editorLineNumber.foreground': '#4b5263',
      'editorLineNumber.activeForeground': '#61afef',
    },
  });

  // Github Light
  monaco.editor.defineTheme('github-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6a737d', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'd73a49' },
      { token: 'identifier', foreground: '24292e' },
      { token: 'string', foreground: '032f62' },
      { token: 'number', foreground: '005cc5' },
      { token: 'type', foreground: '6f42c1' },
      { token: 'function', foreground: '005cc5' },
    ],
    colors: {
      'editor.background': '#ffffff',
      'editor.foreground': '#24292e',
      'editor.lineHighlightBackground': '#f6f8fa',
      'editorCursor.foreground': '#044289',
      'editorLineNumber.foreground': '#babbbc',
      'editorLineNumber.activeForeground': '#24292e',
    },
  });

  // Tokyo Night
  monaco.editor.defineTheme('tokyo-night', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '565f89', fontStyle: 'italic' },
      { token: 'keyword', foreground: '9d7cd8' },
      { token: 'identifier', foreground: 'a9b1d6' },
      { token: 'string', foreground: '9ece6a' },
      { token: 'number', foreground: 'ff9e64' },
      { token: 'type', foreground: '7becb3' },
      { token: 'function', foreground: '7aa2f7' },
    ],
    colors: {
      'editor.background': '#1a1b26',
      'editor.foreground': '#a9b1d6',
      'editor.lineHighlightBackground': '#292e4240',
      'editorCursor.foreground': '#c0caf5',
      'editorLineNumber.foreground': '#565f89',
      'editorLineNumber.activeForeground': '#7aa2f7',
    },
  });
}
