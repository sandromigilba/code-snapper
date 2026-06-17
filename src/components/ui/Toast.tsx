import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToastStore } from '../../store/useToastStore'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

export const ToastProvider: React.FC = () => {
  const { toasts, removeToast } = useToastStore()

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            layout
            className="pointer-events-auto flex items-center justify-between bg-app-surface border border-app-border text-app-text p-4 shadow-xl rounded-30 gap-3"
          >
            <div className="flex items-center gap-3">
              {icons[toast.type]}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="text-app-text/40 hover:text-app-text rounded-full p-1 hover:bg-app-border/40 transition-colors focus-ring cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
