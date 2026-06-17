import React from 'react'
import { useSnapStore } from '../store/useSnapStore'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { showToast } from '../store/useToastStore'
import { Moon, Sun, Keyboard, ShieldAlert, Monitor, Sparkles } from 'lucide-react'

export const SettingsPage: React.FC = () => {
  const { theme, setTheme, savedSnaps, resetActiveSnap } = useSnapStore()

  const handleWipeData = () => {
    if (window.confirm('Are you sure you want to delete all saved snaps and history? This cannot be undone.')) {
      localStorage.clear()
      showToast.success('All app data cleared successfully!')
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  const handleResetSettings = () => {
    resetActiveSnap()
    showToast.success('Workspace settings reset to defaults!')
  }

  return (
    <div className="flex flex-col gap-8 select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Settings</h2>
        <p className="text-sm text-app-text/60">Configure application themes and data preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Settings Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Theme card */}
          <Card className="flex flex-col gap-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Sun className="w-5 h-5 text-app-primary" />
              <span>Appearance Theme</span>
            </h3>
            <p className="text-xs text-app-text/60 leading-relaxed">
              Choose the visual skin of the dashboard, workspace menus, and sidebar panels.
            </p>
            
            <div className="flex gap-4 mt-2">
              {/* Light Option */}
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex flex-col items-center gap-3 p-4 bg-app-bg border rounded-30 cursor-pointer hover:border-app-primary/45 transition-colors ${
                  theme === 'light' ? 'border-app-primary ring-1 ring-app-primary' : 'border-app-border'
                }`}
              >
                <Sun className="w-6 h-6 text-orange-500" />
                <span className="text-sm font-bold">Light Mode</span>
              </button>

              {/* Purple Dracula Option */}
              <button
                onClick={() => setTheme('purple-dracula')}
                className={`flex-1 flex flex-col items-center gap-3 p-4 bg-app-bg border rounded-30 cursor-pointer hover:border-app-primary/45 transition-colors ${
                  theme === 'purple-dracula' ? 'border-app-primary ring-1 ring-app-primary' : 'border-app-border'
                }`}
              >
                <Moon className="w-6 h-6 text-purple-400" />
                <span className="text-sm font-bold">Purple Dracula</span>
              </button>
            </div>
          </Card>

          {/* Shortcuts card */}
          <Card className="flex flex-col gap-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-app-primary" />
              <span>Keyboard Shortcuts</span>
            </h3>
            <p className="text-xs text-app-text/60">
              Boost your layout productivity using these global editor keyboard hotkeys.
            </p>
            
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center py-2 border-b border-app-border/40 text-sm">
                <span className="text-app-text/70">Save Snapshot to History</span>
                <kbd className="px-2.5 py-1 bg-app-bg border border-app-border rounded-lg text-xs font-mono font-bold shadow-sm">
                  Ctrl + S
                </kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-app-border/40 text-sm">
                <span className="text-app-text/70">Export Canvas to File</span>
                <kbd className="px-2.5 py-1 bg-app-bg border border-app-border rounded-lg text-xs font-mono font-bold shadow-sm">
                  Ctrl + E
                </kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-app-border/40 text-sm">
                <span className="text-app-text/70">Undo Action</span>
                <kbd className="px-2.5 py-1 bg-app-bg border border-app-border rounded-lg text-xs font-mono font-bold shadow-sm">
                  Ctrl + Z
                </kbd>
              </div>
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-app-text/70">Redo Action</span>
                <kbd className="px-2.5 py-1 bg-app-bg border border-app-border rounded-lg text-xs font-mono font-bold shadow-sm">
                  Ctrl + Shift + Z
                </kbd>
              </div>
            </div>
          </Card>

          {/* Reset options */}
          <Card className="flex flex-col gap-4 border-red-500/20">
            <h3 className="font-bold text-base text-red-500 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              <span>Danger Zone</span>
            </h3>
            <p className="text-xs text-app-text/60 leading-relaxed">
              Actions that wipe local variables or delete saved files from browser memory.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Button onClick={handleResetSettings} variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/5 hover:border-red-500/20 border">
                Reset Workspace defaults
              </Button>
              <Button onClick={handleWipeData} variant="danger" size="sm">
                Clear all saved Snaps ({savedSnaps.length})
              </Button>
            </div>
          </Card>

        </div>

        {/* PWA / App Info Sidebar */}
        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-4">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Monitor className="w-5 h-5 text-app-primary" />
              <span>Platform Specs</span>
            </h3>
            
            <div className="flex flex-col gap-3 text-xs leading-relaxed">
              <div className="flex justify-between border-b border-app-border/40 pb-2">
                <span className="text-app-text/60">PWA Manifest Status</span>
                <span className="font-bold text-green-500">Ready</span>
              </div>
              <div className="flex justify-between border-b border-app-border/40 pb-2">
                <span className="text-app-text/60">Offline Syncing</span>
                <span className="font-bold text-green-500">Enabled</span>
              </div>
              <div className="flex justify-between border-b border-app-border/40 pb-2">
                <span className="text-app-text/60">Browser Memory</span>
                <span className="font-bold text-app-primary">LocalStorage</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-app-text/60">Version</span>
                <span className="font-bold">v1.0.0</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-app-primary/10 to-app-accent/5 border-app-primary/20 flex flex-col gap-3 p-5">
            <h4 className="font-bold text-sm text-app-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Developer-Centric UX</span>
            </h4>
            <p className="text-[11px] text-app-text/80 leading-relaxed">
              Code Snaper is designed for high performance, smooth micro-interactions (&lt;200ms), keyboard accessibility, and absolute privacy. None of your code ever leaves your computer.
            </p>
          </Card>
        </div>

      </div>
    </div>
  )
}
