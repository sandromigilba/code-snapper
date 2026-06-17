import React, { useEffect, useState } from 'react'
import { useSnapStore } from '../store/useSnapStore'
import { CodeEditorWindow } from '../components/workspace/CodeEditorWindow'
import { CustomizationPanel } from '../components/workspace/CustomizationPanel'
import { Button } from '../components/ui/Button'
import { Dropdown } from '../components/ui/Dropdown'
import { exportSnap, copyToClipboard } from '../utils/export'
import { showToast } from '../store/useToastStore'
import {
  Undo,
  Redo,
  Save,
  Copy,
  Download,
  FileCode
} from 'lucide-react'

export const EditorPage: React.FC = () => {
  const {
    activeSnap,
    undo,
    redo,
    past,
    future,
    saveSnap,
    updateActiveSnap
  } = useSnapStore()

  // Local state for export choices
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg' | 'svg' | 'pdf'>('png')
  const [exportResolution, setExportResolution] = useState<1 | 2 | 4>(2)

  // Keyboard Shortcuts implementation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey
      const isShift = e.shiftKey
      const key = e.key.toLowerCase()

      if (isCtrl && key === 'z') {
        e.preventDefault()
        if (isShift) {
          redo()
          showToast.info('Redo')
        } else {
          undo()
          showToast.info('Undo')
        }
      } else if (isCtrl && key === 'y') {
        e.preventDefault()
        redo()
        showToast.info('Redo')
      } else if (isCtrl && key === 's') {
        e.preventDefault()
        saveSnap()
        showToast.success('Snapshot saved to history!')
      } else if (isCtrl && key === 'e') {
        e.preventDefault()
        handleExport()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSnap, exportFormat, exportResolution])

  const handleExport = () => {
    exportSnap({
      nodeId: 'snap-export-node',
      format: exportFormat,
      resolution: exportResolution,
      filename: activeSnap.title || 'untitled_snap',
    })
  }

  const handleSave = () => {
    saveSnap()
    showToast.success('Snapshot saved to history!')
  }

  const handleCopy = () => {
    copyToClipboard('snap-export-node')
  }

  const formats = [
    { value: 'png', label: 'PNG Image' },
    { value: 'jpg', label: 'JPG Image' },
    { value: 'svg', label: 'SVG Vector' },
    { value: 'pdf', label: 'PDF Document' },
  ]

  return (
    <div className="flex flex-col gap-6 h-full select-none">
      
      {/* Workspace Sub-Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-app-surface border border-app-border px-6 py-4 rounded-30 gap-4 shrink-0 shadow-sm">
        
        {/* Title & History status */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="p-2 bg-app-primary/10 rounded-full text-app-primary">
            <FileCode className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={activeSnap.title}
              onChange={(e) => updateActiveSnap({ title: e.target.value }, true)}
              className="font-bold text-base bg-transparent text-app-text border-none focus:outline-none focus:ring-1 focus:ring-app-primary rounded-full px-2.5 py-0.5 select-all"
              placeholder="Untitled Snap"
            />
            <div className="text-[10px] text-app-text/40 font-semibold px-2.5">
              Autosaves locally • Ctrl + S to manual save
            </div>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex items-center flex-wrap gap-3 w-full md:w-auto md:justify-end">
          
          {/* Undo / Redo */}
          <div className="flex bg-app-bg border border-app-border p-1 rounded-30 gap-0.5">
            <button
              onClick={undo}
              disabled={past.length === 0}
              className="p-2 text-app-text/60 hover:text-app-text disabled:opacity-30 disabled:hover:text-app-text/60 rounded-full cursor-pointer hover:bg-app-surface transition-colors"
              title="Undo (Ctrl + Z)"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={future.length === 0}
              className="p-2 text-app-text/60 hover:text-app-text disabled:opacity-30 disabled:hover:text-app-text/60 rounded-full cursor-pointer hover:bg-app-surface transition-colors"
              title="Redo (Ctrl + Shift + Z)"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions */}
          <Button
            onClick={handleSave}
            variant="secondary"
            size="sm"
            icon={<Save className="w-4 h-4" />}
            title="Save Snapshot (Ctrl + S)"
          />
          
          <Button
            onClick={handleCopy}
            variant="secondary"
            size="sm"
            icon={<Copy className="w-4 h-4" />}
            title="Copy to Clipboard"
          >
            Copy
          </Button>

          {/* Export Controls */}
          <div className="flex bg-app-bg border border-app-border p-1 rounded-30 items-center gap-1.5 pl-3">
            <Dropdown
              value={exportFormat}
              onChange={(val) => setExportFormat(val as any)}
              options={formats}
              className="border-none bg-transparent hover:bg-transparent min-w-[80px] p-0 font-bold"
            />
            
            {/* Resolution scale toggles */}
            <div className="flex bg-app-surface rounded-full p-0.5 border border-app-border">
              {([1, 2, 4] as const).map((res) => (
                <button
                  key={res}
                  onClick={() => setExportResolution(res)}
                  className={`w-7 h-7 rounded-full text-xs font-bold cursor-pointer transition-all ${
                    exportResolution === res
                      ? 'bg-app-primary text-white shadow-sm'
                      : 'text-app-text/50 hover:text-app-text'
                  }`}
                  title={`${res}x Resolution`}
                >
                  {res}x
                </button>
              ))}
            </div>

            <Button
              onClick={handleExport}
              variant="primary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              title="Export Snapshot (Ctrl + E)"
            >
              Export
            </Button>
          </div>

        </div>
      </div>

      {/* Workspace Canvas & Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        
        {/* Monaco Editor Display Box */}
        <div className="w-full lg:w-3/4 flex flex-col items-center justify-start p-4 md:p-8 bg-app-surface border border-app-border rounded-30 overflow-x-auto no-scrollbar shadow-inner min-h-[400px]">
          <div className="w-full flex justify-center py-2">
            <CodeEditorWindow />
          </div>
        </div>

        {/* Customizer Option controls */}
        <div className="w-full lg:w-1/4 shrink-0">
          <CustomizationPanel />
        </div>

      </div>
    </div>
  )
}
