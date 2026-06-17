import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

interface TabItem {
  value: string
  label: string
  content?: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className = '',
}) => {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue || tabs[0]?.value}
      value={value}
      onValueChange={onValueChange}
      className={`w-full flex flex-col ${className}`}
    >
      <TabsPrimitive.List className="flex bg-app-bg border border-app-border p-1 rounded-30 gap-1 select-none w-max max-w-full overflow-x-auto no-scrollbar mb-4">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className="px-5 py-2 text-sm font-semibold rounded-30 cursor-pointer text-app-text/60 hover:text-app-text data-[state=active]:bg-app-primary data-[state=active]:text-white focus-ring transition-all"
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {tabs.map((tab) => (
        <TabsPrimitive.Content
          key={tab.value}
          value={tab.value}
          className="focus-ring outline-none w-full"
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
