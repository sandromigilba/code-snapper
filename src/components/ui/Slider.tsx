import React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

interface SliderProps {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  label?: string
  suffix?: string
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  suffix = '',
}) => {
  return (
    <div className="flex flex-col gap-2 w-full select-none">
      <div className="flex justify-between items-center px-1">
        {label && <span className="text-sm font-medium text-app-text/80">{label}</span>}
        <span className="text-xs font-semibold text-app-primary bg-app-primary/10 px-2.5 py-0.5 rounded-full">
          {value}
          {suffix}
        </span>
      </div>
      
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
        value={[value]}
        onValueChange={(val) => onValueChange(val[0])}
        max={max}
        min={min}
        step={step}
      >
        <SliderPrimitive.Track className="bg-app-border relative grow h-1.5 rounded-full">
          <SliderPrimitive.Range className="absolute bg-app-primary h-full rounded-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block w-4 h-4 bg-white border-2 border-app-primary rounded-full hover:scale-110 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-app-primary focus-visible:ring-offset-2"
          aria-label={label}
        />
      </SliderPrimitive.Root>
    </div>
  )
}
