import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogPrimitive.Portal forceMount>
            {/* Backdrop */}
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
              />
            </DialogPrimitive.Overlay>

            {/* Content Container */}
            <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4 z-50 pointer-events-none">
              <DialogPrimitive.Content asChild forceMount>
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 15 }}
                  transition={{ duration: 0.15 }}
                  className={`w-full ${sizeClasses[size]} bg-app-surface border border-app-border text-app-text p-6 shadow-2xl rounded-30 relative pointer-events-auto overflow-hidden focus-ring`}
                >
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-app-border">
                    <DialogPrimitive.Title className="text-xl font-bold tracking-tight text-app-text">
                      {title}
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Close asChild>
                      <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-app-text/60 hover:text-app-text hover:bg-app-border/40 transition-colors focus-ring cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </DialogPrimitive.Close>
                  </div>
                  
                  <div className="text-base leading-relaxed">{children}</div>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </AnimatePresence>
  )
}
