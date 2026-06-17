import React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: string
  id?: string
  disabled?: boolean
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  label,
  id = 'switch-id',
  disabled = false,
}) => {
  return (
    <div className="flex items-center gap-3 select-none">
      <SwitchPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`w-12 h-6 rounded-full relative cursor-pointer outline-none transition-colors border border-app-border ${
          checked ? 'bg-app-primary' : 'bg-app-bg'
        } disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-app-primary focus-visible:ring-offset-2`}
      >
        <SwitchPrimitive.Thumb
          className={`block w-4 h-4 rounded-full bg-white transition-transform duration-100 ${
            checked ? 'translate-x-[24px]' : 'translate-x-[2px]'
          }`}
          style={{
            backgroundColor: checked ? '#ffffff' : 'var(--app-text)',
            opacity: checked ? 1 : 0.6
          }}
        />
      </SwitchPrimitive.Root>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-app-text cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
}
