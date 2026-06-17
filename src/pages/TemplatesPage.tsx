import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnapStore } from '../store/useSnapStore'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ArrowUpRight, Share2, Compass, Layers, Presentation, BookOpen, MessageSquare } from 'lucide-react'
import { showToast } from '../store/useToastStore'

interface TemplateInfo {
  key: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate()
  const { applyTemplate } = useSnapStore()

  const templates: TemplateInfo[] = [
    {
      key: 'twitter-post',
      name: 'Twitter Post',
      description: 'Sized at 16:9 ratio, perfect for displaying code screenshots on social media timelines.',
      icon: <Share2 className="w-6 h-6" />,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      key: 'instagram-post',
      name: 'Instagram Post',
      description: 'A 1:1 square ratio preset with a vibrant pink and purple radial gradient background.',
      icon: <Compass className="w-6 h-6" />,
      color: 'from-pink-500 via-purple-500 to-indigo-500',
    },
    {
      key: 'linkedin-post',
      name: 'LinkedIn Post',
      description: '4:5 ratio template with a dark slate tone, optimized for professional feeds and documents.',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-slate-700 to-slate-900',
    },
    {
      key: 'blog-cover',
      name: 'Blog Cover',
      description: '16:9 ratio with minimal border padding. Designed to be a drop-in cover image for blog posts.',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-purple-900 via-indigo-950 to-purple-950',
    },
    {
      key: 'documentation-snippet',
      name: 'Documentation Snippet',
      description: 'A clean, borderless layout with soft shadows. Sized for markdown readmes and doc sites.',
      icon: <Layers className="w-6 h-6" />,
      color: 'from-neutral-700 to-neutral-900',
    },
    {
      key: 'presentation-slide',
      name: 'Presentation Slide',
      description: 'Generous padding and high contrast. Perfect for inserting code screenshots inside presentation slides.',
      icon: <Presentation className="w-6 h-6" />,
      color: 'from-rose-500 to-red-600',
    },
  ]

  const handleApply = (key: string) => {
    applyTemplate(key)
    navigate('/editor')
    showToast.success(`Template applied!`)
  }

  return (
    <div className="flex flex-col gap-8 select-none">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Template Presets</h2>
        <p className="text-sm text-app-text/60">Choose a layout configuration tuned for specific platforms</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <Card
            key={tpl.key}
            onClick={() => handleApply(tpl.key)}
            hoverEffect
            className="flex flex-col h-full cursor-pointer group"
          >
            {/* Visual template box header */}
            <div className={`w-full aspect-[2/1] rounded-2xl bg-gradient-to-r ${tpl.color} mb-5 flex items-center justify-center text-white relative overflow-hidden shadow-inner`}>
              <div className="absolute top-3 right-3 p-1.5 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div className="p-4 bg-black/20 backdrop-blur-md rounded-2xl flex items-center gap-3 border border-white/10 max-w-[80%]">
                <div className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
                <div className="w-12 h-2.5 bg-white/20 rounded-full shrink-0" />
                <div className="w-3 h-2.5 bg-white/20 rounded-full shrink-0" />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-app-primary/10 rounded-lg text-app-primary">
                  {tpl.icon}
                </span>
                <h4 className="font-bold text-base text-app-text group-hover:text-app-primary transition-colors">
                  {tpl.name}
                </h4>
              </div>
              
              <p className="text-xs text-app-text/70 leading-relaxed mt-2 flex-1">
                {tpl.description}
              </p>
              
              <Button
                onClick={() => handleApply(tpl.key)}
                variant="secondary"
                size="sm"
                className="w-full mt-4 group-hover:bg-app-primary group-hover:text-white group-hover:border-transparent transition-all"
              >
                Use Template
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
