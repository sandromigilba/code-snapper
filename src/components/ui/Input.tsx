import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-app-text/80 px-4">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-app-bg border border-app-border rounded-30 px-5 py-2.5 text-app-text focus-ring text-base placeholder:text-app-text/40 transition-colors hover:border-app-border/80 ${
            error ? 'border-red-500 focus-visible:outline-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 px-4 mt-0.5">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
