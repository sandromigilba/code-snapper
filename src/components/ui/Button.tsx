import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-ring cursor-pointer rounded-30 select-none disabled:opacity-50 disabled:cursor-not-allowed border'
  
  const variants = {
    primary: 'bg-app-primary border-transparent text-white hover:bg-opacity-90 active:scale-[0.98]',
    secondary: 'bg-app-surface border-app-border text-app-text hover:bg-app-border active:scale-[0.98]',
    accent: 'bg-app-accent border-transparent text-app-bg hover:opacity-90 active:scale-[0.98]',
    danger: 'bg-red-500 border-transparent text-white hover:bg-red-600 active:scale-[0.98]',
    ghost: 'bg-transparent border-transparent text-app-text hover:bg-app-surface active:scale-[0.98]',
  }

  const sizes = {
    sm: 'px-4 py-1.5 text-sm gap-1.5 min-h-[36px]',
    md: 'px-6 py-2.5 text-base gap-2 min-h-[46px]',
    lg: 'px-8 py-3.5 text-lg gap-2.5 min-h-[54px]',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props as any}
    >
      {icon && <span className="flex items-center justify-center shrink-0">{icon}</span>}
      {children}
    </motion.button>
  )
}
