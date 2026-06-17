import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSnapStore } from '../../store/useSnapStore'
import { Drawer } from '../ui/Drawer'
import { Button } from '../ui/Button'
import { ToastProvider } from '../ui/Toast'
import {
  LayoutDashboard,
  FileCode,
  Layers,
  History,
  Settings,
  Menu,
  Sun,
  Moon,
  Sparkles,
  ArrowLeft
} from 'lucide-react'

interface SidebarItem {
  path: string
  label: string
  icon: React.ReactNode
}

export const WorkspaceLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, setTheme, isExporting, exportProgress } = useSnapStore()
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  // Sync theme attribute to HTML on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (theme === 'purple-dracula') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const menuItems: SidebarItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/editor', label: 'Snappers Workspace', icon: <FileCode className="w-5 h-5" /> },
    { path: '/templates', label: 'Templates', icon: <Layers className="w-5 h-5" /> },
    { path: '/history', label: 'Saved History', icon: <History className="w-5 h-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'purple-dracula' : 'light')
  }

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full select-none">
      {/* Brand logo */}
      <div className="flex items-center gap-2 mb-10 px-2 shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-app-primary to-app-accent flex items-center justify-center text-white shadow-md shadow-app-primary/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-extrabold text-base tracking-tight text-app-text">
          Code Snapper
        </span>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => {
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileDrawerOpen(false)}
              className={`flex items-center gap-3.5 px-5 py-3 rounded-30 text-sm font-semibold transition-all duration-150 outline-none focus-ring ${
                active
                  ? 'bg-app-primary text-white shadow-md shadow-app-primary/10'
                  : 'text-app-text/60 hover:text-app-text hover:bg-app-surface border border-transparent hover:border-app-border/40'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer / Theme switch */}
      <div className="mt-auto pt-6 border-t border-app-border shrink-0 flex flex-col gap-4">
        {/* Toggle Theme button */}
        <button
          onClick={handleToggleTheme}
          className="flex items-center justify-between w-full px-5 py-3 bg-app-bg border border-app-border rounded-30 cursor-pointer hover:bg-app-surface transition-colors focus-ring text-sm font-bold text-app-text/75"
        >
          <span className="flex items-center gap-2">
            {theme === 'light' ? <Sun className="w-4 h-4 text-orange-500" /> : <Moon className="w-4 h-4 text-purple-400" />}
            <span>Theme Toggle</span>
          </span>
          <span className="text-[10px] uppercase font-extrabold text-app-primary">
            {theme === 'light' ? 'Light' : 'Dracula'}
          </span>
        </button>

        {/* Back to Home landing page button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-dashed border-app-border rounded-30 text-xs font-bold text-app-text/45 hover:text-app-text hover:border-app-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Workspace</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen w-screen bg-app-bg text-app-text overflow-hidden">
      {/* Toast notification portal */}
      <ToastProvider />

      {/* Exporting loading progress overlay */}
      <AnimatePresence>
        {isExporting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center pointer-events-auto cursor-wait"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-app-surface border border-app-border p-8 rounded-30 max-w-sm w-full mx-4 shadow-2xl flex flex-col items-center gap-5 text-center select-none"
            >
              <div className="w-12 h-12 rounded-full border-4 border-app-primary/20 border-t-app-primary animate-spin shrink-0" />
              
              <div>
                <h4 className="font-extrabold text-base text-app-text">Generating Code Snap</h4>
                <p className="text-xs text-app-text/60 mt-1 leading-relaxed">
                  Formatting layout and building high-resolution image file...
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-app-bg border border-app-border h-3 rounded-full overflow-hidden relative">
                <motion.div
                  className="bg-app-primary h-full rounded-full"
                  style={{ width: `${exportProgress}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>

              <span className="text-xs font-bold text-app-primary">
                {exportProgress}% Completed
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Left side) */}
      <aside className="hidden lg:flex flex-col w-[260px] h-full bg-app-surface border-r border-app-border p-6 shrink-0 rounded-none">
        {renderSidebarContent()}
      </aside>

      {/* Main viewport (Right side) */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        
        {/* Mobile Top Navbar */}
        <header className="flex lg:hidden justify-between items-center px-6 py-4 bg-app-surface border-b border-app-border shrink-0 select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-app-primary to-app-accent flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-app-text">
              Code Snapper
            </span>
          </div>

          <Button
            onClick={() => setIsMobileDrawerOpen(true)}
            variant="secondary"
            size="sm"
            icon={<Menu className="w-5 h-5" />}
            className="p-2"
          />
        </header>

        {/* Mobile Sidebar Slide Drawer */}
        <Drawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          title="Menu Navigation"
          side="left"
        >
          {renderSidebarContent()}
        </Drawer>

        {/* Content Wrapper */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-app-bg">
          <div className="max-w-6xl mx-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  )
}
