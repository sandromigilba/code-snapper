import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapStore } from '../store/useSnapStore'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Code, Clock, Star, Plus, Trash2, ArrowRight } from 'lucide-react'
import { showToast } from '../store/useToastStore'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { savedSnaps, deleteSnap, loadSnap, applyTemplate } = useSnapStore()

  const handleLoadSnap = (id: string) => {
    loadSnap(id)
    navigate('/editor')
    showToast.success('Snapshot loaded!')
  }

  const handleDeleteSnap = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    deleteSnap(id)
    showToast.success('Snapshot deleted!')
  }

  const handleApplyTemplate = (templateKey: string) => {
    applyTemplate(templateKey)
    navigate('/editor')
    showToast.success(`${templateKey.replace('-', ' ')} template applied!`)
  }

  // Favorite template list
  const templates = [
    { key: 'twitter-post', label: 'Twitter Post', desc: 'Sized for social timelines', color: 'bg-blue-500/10 text-blue-500' },
    { key: 'instagram-post', label: 'Instagram Post', desc: 'Square 1:1 format', color: 'bg-pink-500/10 text-pink-500' },
    { key: 'linkedin-post', label: 'LinkedIn Post', desc: 'Optimized vertical layout', color: 'bg-indigo-500/10 text-indigo-500' },
  ]

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Dashboard</h2>
          <p className="text-sm text-app-text/60">Manage your saved snapshots and template configurations</p>
        </div>
        <Button
          onClick={() => {
            navigate('/editor')
          }}
          variant="primary"
          icon={<Plus className="w-5 h-5" />}
        >
          Create New Snap
        </Button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-5 p-6">
          <div className="p-4 bg-app-primary/10 rounded-full text-app-primary">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold">{savedSnaps.length}</div>
            <div className="text-xs text-app-text/60 font-semibold uppercase tracking-wider">Total Saved Snaps</div>
          </div>
        </Card>

        <Card className="flex items-center gap-5 p-6">
          <div className="p-4 bg-purple-500/10 rounded-full text-purple-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold">
              {savedSnaps.length > 0
                ? new Date(savedSnaps[0].createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })
                : '-'}
            </div>
            <div className="text-xs text-app-text/60 font-semibold uppercase tracking-wider">Last Created Snap</div>
          </div>
        </Card>

        <Card className="flex items-center gap-5 p-6">
          <div className="p-4 bg-yellow-500/10 rounded-full text-yellow-500">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold">3</div>
            <div className="text-xs text-app-text/60 font-semibold uppercase tracking-wider">Ready-to-use Presets</div>
          </div>
        </Card>
      </div>

      {/* Workspace Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Snaps Section */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-bold">Recent Saved Snaps</h3>
            {savedSnaps.length > 0 && (
              <Button onClick={() => navigate('/history')} variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            )}
          </div>

          {savedSnaps.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-16 text-center gap-3 border-dashed">
              <div className="p-4 bg-app-border/40 rounded-full text-app-text/40">
                <Code className="w-8 h-8" />
              </div>
              <h4 className="font-bold">No saved snapshots yet</h4>
              <p className="text-xs text-app-text/60 max-w-xs leading-relaxed">
                Create beautiful layouts in the workspace and save them to access version histories here.
              </p>
              <Button onClick={() => navigate('/editor')} variant="secondary" size="sm" className="mt-2">
                Launch Code Editor
              </Button>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {savedSnaps.slice(0, 4).map((snap) => (
                <div
                  key={snap.id}
                  onClick={() => handleLoadSnap(snap.id)}
                  className="flex items-center justify-between p-4 bg-app-surface border border-app-border rounded-30 cursor-pointer hover:border-app-primary/40 transition-colors group select-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-app-bg border border-app-border rounded-xl font-mono text-[10px] uppercase font-bold text-app-primary">
                      {snap.language.substring(0, 3)}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold group-hover:text-app-primary transition-colors">
                        {snap.title}
                      </h5>
                      <span className="text-[10px] text-app-text/40">
                        {new Date(snap.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDeleteSnap(e, snap.id)}
                      className="p-2 text-app-text/40 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                      title="Delete Snap"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-app-primary" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favorite Templates Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold px-1">Favorite Layout Presets</h3>
          <div className="flex flex-col gap-3">
            {templates.map((tpl) => (
              <Card
                key={tpl.key}
                onClick={() => handleApplyTemplate(tpl.key)}
                hoverEffect
                className="flex items-center justify-between p-5 cursor-pointer"
              >
                <div>
                  <h5 className="font-bold text-sm text-app-text">{tpl.label}</h5>
                  <p className="text-[11px] text-app-text/60 mt-0.5">{tpl.desc}</p>
                </div>
                <div className={`p-2.5 rounded-full shrink-0 ${tpl.color}`}>
                  <Plus className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
