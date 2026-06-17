import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-app-surface border border-app-border rounded-30 p-6 ${
        hoverEffect ? 'hover:border-app-primary/40 hover:shadow-lg transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
