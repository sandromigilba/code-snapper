import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  side?: 'left' | 'right'
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'left',
}) => {
  const isLeft = side === 'left'

  const sidebarVariants = {
    closed: { x: isLeft ? '-100%' : '100%', opacity: 0.8 },
    open: { x: 0, opacity: 1 },
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

            {/* Drawer sheet */}
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className={`fixed top-0 bottom-0 ${isLeft ? 'left-0' : 'right-0'} w-[300px] bg-app-surface border-${isLeft ? 'r' : 'l'} border-app-border text-app-text p-6 shadow-2xl z-50 flex flex-col focus-ring rounded-none`}
                style={{
                  borderTopRightRadius: isLeft ? '30px' : '0px',
                  borderBottomRightRadius: isLeft ? '30px' : '0px',
                  borderTopLeftRadius: isLeft ? '0px' : '30px',
                  borderBottomLeftRadius: isLeft ? '0px' : '30px',
                }}
              >
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-app-border shrink-0">
                  <DialogPrimitive.Title className="text-lg font-bold tracking-tight text-app-text">
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

                <div className="flex-1 overflow-y-auto no-scrollbar">{children}</div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </AnimatePresence>
  )
}
