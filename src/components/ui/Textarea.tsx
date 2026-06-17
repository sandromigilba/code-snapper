import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-app-text/80 px-4">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full bg-app-bg border border-app-border rounded-30 px-5 py-3 text-app-text focus-ring text-base placeholder:text-app-text/40 transition-colors hover:border-app-border/80 min-h-[100px] resize-y ${
            error ? 'border-red-500 focus-visible:outline-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 px-4 mt-0.5">{error}</span>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
