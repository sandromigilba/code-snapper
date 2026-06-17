import React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronDown } from 'lucide-react'

interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface DropdownProps {
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  trigger?: React.ReactNode
  placeholder?: string
  align?: 'start' | 'center' | 'end'
  className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  trigger,
  placeholder = 'Select option',
  align = 'end',
  className = '',
}) => {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger || (
          <button className={`inline-flex items-center justify-between bg-app-surface border border-app-border text-app-text px-5 py-2.5 rounded-30 focus-ring cursor-pointer text-sm font-medium gap-2 min-w-[140px] hover:bg-app-border/40 select-none ${className}`}>
            <span className="flex items-center gap-2">
              {selectedOption?.icon}
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown className="w-4 h-4 opacity-60" />
          </button>
        )}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          sideOffset={6}
          className="z-50 min-w-[160px] bg-app-surface border border-app-border text-app-text p-2 shadow-xl rounded-[20px] animate-in fade-in slide-in-from-top-2 duration-100"
        >
          {options.map((option) => (
            <DropdownMenuPrimitive.Item
              key={option.value}
              onClick={() => onChange(option.value)}
              className="flex items-center justify-between px-4 py-2 text-sm rounded-full cursor-pointer hover:bg-app-primary hover:text-white outline-none select-none transition-colors"
            >
              <span className="flex items-center gap-2">
                {option.icon}
                {option.label}
              </span>
              {value === option.value && <Check className="w-4 h-4 shrink-0" />}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}
