import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SnapConfig {
  code: string
  language: string
  windowStyle: 'macOS' | 'windows' | 'minimal' | 'modern'
  bgType: 'solid' | 'gradient' | 'image'
  background: string
  customBgImage: string | null
  padding: number
  borderRadius: number
  shadow: 'none' | 'soft' | 'medium' | 'strong'
  editorTheme: 'dracula' | 'purple-dracula' | 'nord' | 'one-dark' | 'github-light' | 'tokyo-night'
  showLineNumbers: boolean
  wordWrap: boolean
  fontSize: number
  title: string
  aspectRatio: 'free' | '1:1' | '16:9' | '4:5'
}

export interface SavedSnap extends SnapConfig {
  id: string
  createdAt: number
}

interface SnapStoreState {
  // Active Snap Configuration
  activeSnap: SnapConfig
  
  // App Theme
  theme: 'light' | 'purple-dracula'
  
  // Saved Snaps
  savedSnaps: SavedSnap[]
  
  // History Stacks (Exclude from persistence)
  past: SnapConfig[]
  future: SnapConfig[]
  isExporting: boolean
  exportProgress: number
}

interface SnapStoreActions {
  // Configuration modifiers
  updateActiveSnap: (updates: Partial<SnapConfig>, skipHistory?: boolean) => void
  resetActiveSnap: () => void
  applyTemplate: (templateName: string) => void
  
  // Theme Action
  setTheme: (theme: 'light' | 'purple-dracula') => void
  
  // CRUD Actions
  saveSnap: (title?: string) => string // returns snap ID
  deleteSnap: (id: string) => void
  loadSnap: (id: string) => void
  
  // Undo / Redo Actions
  undo: () => void
  redo: () => void
  setIsExporting: (status: boolean, progress?: number) => void
}

type SnapStore = SnapStoreState & SnapStoreActions

const initialSnap: SnapConfig = {
  code: `// Code Snapper 🚀
// Try editing me or applying templates!

function greetUser(name = 'Developer') {
  console.log(\`Hello, \${name}!\`);
  return {
    status: 'ready',
    features: ['Modern UI', 'PWA Ready', 'High Resolution Export']
  };
}

const result = greetUser();`,
  language: 'javascript',
  windowStyle: 'macOS',
  bgType: 'gradient',
  background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
  customBgImage: null,
  padding: 48,
  borderRadius: 16,
  shadow: 'medium',
  editorTheme: 'purple-dracula',
  showLineNumbers: true,
  wordWrap: true,
  fontSize: 16,
  title: 'Untitled Snap',
  aspectRatio: 'free',
}

// Preset Templates
export const templatesMap: Record<string, Partial<SnapConfig>> = {
  'twitter-post': {
    padding: 64,
    borderRadius: 24,
    bgType: 'gradient',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    aspectRatio: '16:9',
    windowStyle: 'macOS',
    shadow: 'strong',
  },
  'instagram-post': {
    padding: 80,
    borderRadius: 30,
    bgType: 'gradient',
    background: 'radial-gradient(circle, #ec4899 0%, #8b5cf6 100%)',
    aspectRatio: '1:1',
    windowStyle: 'macOS',
    shadow: 'strong',
  },
  'linkedin-post': {
    padding: 48,
    borderRadius: 16,
    bgType: 'gradient',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
    aspectRatio: '4:5',
    windowStyle: 'modern',
    shadow: 'medium',
  },
  'blog-cover': {
    padding: 32,
    borderRadius: 12,
    bgType: 'gradient',
    background: 'linear-gradient(135deg, #14111d 0%, #1d1729 100%)',
    aspectRatio: '16:9',
    windowStyle: 'minimal',
    shadow: 'strong',
  },
  'documentation-snippet': {
    padding: 24,
    borderRadius: 8,
    bgType: 'solid',
    background: '#1d1729',
    aspectRatio: 'free',
    windowStyle: 'modern',
    shadow: 'soft',
  },
  'presentation-slide': {
    padding: 96,
    borderRadius: 20,
    bgType: 'gradient',
    background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
    aspectRatio: '16:9',
    windowStyle: 'windows',
    shadow: 'strong',
  },
}

export const useSnapStore = create<SnapStore>()(
  persist(
    (set, get) => ({
      // State
      activeSnap: { ...initialSnap },
      theme: 'purple-dracula',
      savedSnaps: [],
      past: [],
      future: [],
      isExporting: false,
      exportProgress: 0,

      // Actions
      setIsExporting: (isExporting, progress = 0) => set({ isExporting, exportProgress: progress }),
      updateActiveSnap: (updates, skipHistory = false) => {
        const { activeSnap, past } = get()
        
        if (!skipHistory) {
          // Push current active state to past, limit history size to 30
          const newPast = [...past, { ...activeSnap }]
          if (newPast.length > 30) {
            newPast.shift()
          }
          set({
            past: newPast,
            future: [], // Clear redo stack on new action
          })
        }

        set({
          activeSnap: {
            ...activeSnap,
            ...updates,
          },
        })
      },

      resetActiveSnap: () => {
        const { activeSnap, past } = get()
        set({
          past: [...past, { ...activeSnap }],
          future: [],
          activeSnap: { ...initialSnap },
        })
      },

      applyTemplate: (templateName) => {
        const template = templatesMap[templateName]
        if (template) {
          get().updateActiveSnap({
            ...template,
            title: `Snap (${templateName.replace('-', ' ')})`,
          })
        }
      },

      setTheme: (theme) => {
        set({ theme })
        // Dynamically toggle HTML dark attribute or data-theme
        document.documentElement.setAttribute('data-theme', theme)
        if (theme === 'purple-dracula') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      saveSnap: (title) => {
        const { activeSnap, savedSnaps } = get()
        const id = crypto.randomUUID()
        const finalTitle = title || activeSnap.title || 'Untitled Snap'
        
        const newSnap: SavedSnap = {
          ...activeSnap,
          id,
          title: finalTitle,
          createdAt: Date.now(),
        }

        set({
          savedSnaps: [newSnap, ...savedSnaps],
          activeSnap: {
            ...activeSnap,
            title: finalTitle,
          }
        })
        
        return id
      },

      deleteSnap: (id) => {
        const { savedSnaps } = get()
        set({
          savedSnaps: savedSnaps.filter((s) => s.id !== id),
        })
      },

      loadSnap: (id) => {
        const { savedSnaps, activeSnap, past } = get()
        const snap = savedSnaps.find((s) => s.id === id)
        if (snap) {
          // Strip id and createdAt before loading
          const { id: _, createdAt: __, ...config } = snap
          set({
            past: [...past, { ...activeSnap }],
            future: [],
            activeSnap: config,
          })
        }
      },

      undo: () => {
        const { past, activeSnap, future } = get()
        if (past.length === 0) return

        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)

        set({
          past: newPast,
          future: [{ ...activeSnap }, ...future],
          activeSnap: previous,
        })
      },

      redo: () => {
        const { past, activeSnap, future } = get()
        if (future.length === 0) return

        const next = future[0]
        const newFuture = future.slice(1)

        set({
          past: [...past, { ...activeSnap }],
          future: newFuture,
          activeSnap: next,
        })
      },
    }),
    {
      name: 'custom-code-snaper-settings',
      // Store savedSnaps, activeSnap, and general app theme. Exclude past/future stack.
      partialize: (state) => ({
        theme: state.theme,
        savedSnaps: state.savedSnaps,
        activeSnap: state.activeSnap,
      }),
    }
  )
)
