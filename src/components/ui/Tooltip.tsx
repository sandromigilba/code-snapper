import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipProps {
  content: string
  children: React.ReactElement
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={4}
            className="z-50 bg-gray-900 dark:bg-purple-100 text-white dark:text-gray-900 px-3 py-1.5 text-xs rounded-full shadow-md font-medium max-w-xs text-center animate-in fade-in zoom-in-95 duration-100 select-none border border-transparent dark:border-purple-200"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-gray-900 dark:fill-purple-100" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
