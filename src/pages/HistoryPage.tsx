import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapStore } from '../store/useSnapStore'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Trash2, History, RotateCcw, ArrowRight } from 'lucide-react'
import { showToast } from '../store/useToastStore'

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate()
  const { savedSnaps, loadSnap, deleteSnap } = useSnapStore()

  const handleRestore = (id: string) => {
    loadSnap(id)
    navigate('/editor')
    showToast.success('Snapshot restored!')
  }

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    deleteSnap(id)
    showToast.success('Snapshot deleted!')
  }

  return (
    <div className="flex flex-col gap-8 select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Saved History</h2>
        <p className="text-sm text-app-text/60">Restore and manage previously saved code layouts</p>
      </div>

      {savedSnaps.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-24 text-center gap-4 border-dashed">
          <div className="p-4 bg-app-border/40 rounded-full text-app-text/40">
            <History className="w-10 h-10" />
          </div>
          <div>
            <h4 className="font-bold text-lg">No history found</h4>
            <p className="text-sm text-app-text/60 max-w-sm mt-1 leading-relaxed">
              When working in the editor workspace, hit Ctrl + S or the Save button to store layouts here.
            </p>
          </div>
          <Button onClick={() => navigate('/editor')} variant="primary" size="sm" className="mt-2">
            Go to Editor
          </Button>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {savedSnaps.map((snap) => {
            const lines = snap.code.split('\n').length

            return (
              <div
                key={snap.id}
                onClick={() => handleRestore(snap.id)}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-app-surface border border-app-border rounded-30 cursor-pointer hover:border-app-primary/40 transition-colors group gap-4"
              >
                {/* Details */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-app-bg border border-app-border rounded-xl font-mono text-xs uppercase font-bold text-app-primary min-w-[50px] text-center">
                    {snap.language.substring(0, 3)}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-app-text group-hover:text-app-primary transition-colors">
                      {snap.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-app-text/50 mt-1">
                      <span>{lines} line{lines !== 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span>{snap.editorTheme} theme</span>
                      <span>•</span>
                      <span>
                        {new Date(snap.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto md:justify-end">
                  <Button
                    onClick={() => handleRestore(snap.id)}
                    variant="secondary"
                    size="sm"
                    icon={<RotateCcw className="w-4 h-4" />}
                    className="shrink-0"
                  >
                    Restore
                  </Button>
                  <button
                    onClick={(e) => handleDelete(e, snap.id)}
                    className="p-2.5 text-app-text/40 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer shrink-0"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-app-primary shrink-0 hidden md:block" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
