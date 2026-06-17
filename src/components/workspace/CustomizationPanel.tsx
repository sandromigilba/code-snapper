import React from 'react'
import { useSnapStore } from '../../store/useSnapStore'
import { Slider } from '../ui/Slider'
import { Switch } from '../ui/Switch'
import { Dropdown } from '../ui/Dropdown'
import { Card } from '../ui/Card'
import { Upload, Trash2 } from 'lucide-react'

// Background gradient presets
const GRADIENTS = [
  { name: 'Purple Rain', value: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' },
  { name: 'Sunset Glow', value: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)' },
  { name: 'Aurora', value: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' },
  { name: 'Oceanic Calm', value: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
  { name: 'Cyber Rose', value: 'linear-gradient(135deg, #f43f5e 0%, #b91c1c 100%)' },
  { name: 'Steel Core', value: 'linear-gradient(135deg, #64748b 0%, #1e293b 100%)' },
]

// Background solid color presets
const SOLIDS = [
  { name: 'Dark Slate', value: '#1e293b' },
  { name: 'Deep Purple', value: '#3b0764' },
  { name: 'Slate Gray', value: '#475569' },
  { name: 'Pure Ink', value: '#0a0a0a' },
  { name: 'Pure Snow', value: '#ffffff' },
  { name: 'Clear', value: 'transparent' },
]

export const CustomizationPanel: React.FC = () => {
  const { activeSnap, updateActiveSnap } = useSnapStore()

  // Languages Options
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React (TSX)' },
    { value: 'vue', label: 'Vue' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'python', label: 'Python' },
    { value: 'php', label: 'PHP' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ]

  // Window Styles Options
  const windowStyles = [
    { value: 'macOS', label: 'macOS Classic' },
    { value: 'windows', label: 'Windows Modern' },
    { value: 'modern', label: 'Minimal Topbar' },
    { value: 'minimal', label: 'No Header' },
  ]

  // Editor Themes Options
  const editorThemes = [
    { value: 'dracula', label: 'Dracula' },
    { value: 'purple-dracula', label: 'Purple Dracula' },
    { value: 'nord', label: 'Nord' },
    { value: 'one-dark', label: 'One Dark' },
    { value: 'github-light', label: 'Github Light' },
    { value: 'tokyo-night', label: 'Tokyo Night' },
  ]

  // Shadows Options
  const shadows = [
    { value: 'none', label: 'None' },
    { value: 'soft', label: 'Soft Shadow' },
    { value: 'medium', label: 'Medium Shadow' },
    { value: 'strong', label: 'Strong Shadow' },
  ]

  // Aspect Ratios Options
  const aspectRatios = [
    { value: 'free', label: 'Auto (Free-form)' },
    { value: '1:1', label: 'Square (1:1)' },
    { value: '16:9', label: 'Twitter/Blog (16:9)' },
    { value: '4:5', label: 'LinkedIn (4:5)' },
  ]

  // File upload reader for Custom Image background
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateActiveSnap({
          bgType: 'image',
          customBgImage: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="flex flex-col gap-6 w-full h-full lg:max-h-[calc(100vh-140px)] overflow-y-auto no-scrollbar rounded-30">
      <h3 className="text-lg font-bold border-b border-app-border pb-3 text-app-text select-none">
        Canvas Configuration
      </h3>

      {/* Editor Language */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-app-text/60 px-1 select-none">Language</label>
        <Dropdown
          value={activeSnap.language}
          onChange={(val) => updateActiveSnap({ language: val })}
          options={languages}
          className="w-full"
        />
      </div>
      
      {/* Editor Theme */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-app-text/60 px-1 select-none">Editor Theme</label>
        <Dropdown
          value={activeSnap.editorTheme}
          onChange={(val) => updateActiveSnap({ editorTheme: val as any })}
          options={editorThemes}
          className="w-full"
        />
      </div>

      <hr className="border-app-border" />

      {/* Window Header */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-app-text/60 px-1 select-none">Window Header</label>
        <Dropdown
          value={activeSnap.windowStyle}
          onChange={(val) => updateActiveSnap({ windowStyle: val as any })}
          options={windowStyles}
          className="w-full"
        />
      </div>

      {/* Shadow Intensity */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-app-text/60 px-1 select-none">Shadow Intensity</label>
        <Dropdown
          value={activeSnap.shadow}
          onChange={(val) => updateActiveSnap({ shadow: val as any })}
          options={shadows}
          className="w-full"
        />
      </div>

      <hr className="border-app-border" />

      {/* Layout Aspect Ratio */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-app-text/60 px-1 select-none">Canvas Aspect Ratio</label>
        <Dropdown
          value={activeSnap.aspectRatio}
          onChange={(val) => updateActiveSnap({ aspectRatio: val as any })}
          options={aspectRatios}
          className="w-full"
        />
      </div>

      <hr className="border-app-border" />

      {/* Layout sliders */}
      <div className="flex flex-col gap-4">
        <Slider
          value={activeSnap.padding}
          onValueChange={(val) => updateActiveSnap({ padding: val })}
          min={0}
          max={100}
          label="Padding"
          suffix="px"
        />

        <Slider
          value={activeSnap.borderRadius}
          onValueChange={(val) => updateActiveSnap({ borderRadius: val })}
          min={0}
          max={50}
          label="Window Corners"
          suffix="px"
        />

        <Slider
          value={activeSnap.fontSize}
          onValueChange={(val) => updateActiveSnap({ fontSize: val })}
          min={12}
          max={24}
          label="Code Font Size"
          suffix="px"
        />
      </div>

      <hr className="border-app-border" />

      {/* Line number Toggle */}
      <div className="flex justify-between items-center px-1">
        <span className="text-sm font-medium text-app-text/80 select-none">Show Line Numbers</span>
        <Switch
          checked={activeSnap.showLineNumbers}
          onCheckedChange={(val) => updateActiveSnap({ showLineNumbers: val })}
          id="show-line-numbers"
        />
      </div>

      <hr className="border-app-border" />

      {/* Word wrap Toggle */}
      <div className="flex justify-between items-center px-1">
        <span className="text-sm font-medium text-app-text/80 select-none">Word Wrap</span>
        <Switch
          checked={activeSnap.wordWrap}
          onCheckedChange={(val) => updateActiveSnap({ wordWrap: val })}
          id="word-wrap"
        />
      </div>

      <hr className="border-app-border" />

      {/* Background Section */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-app-text/80 select-none">Background Style</label>
        
        {/* Style tabs */}
        <div className="flex bg-app-bg border border-app-border p-1 rounded-30 gap-1 w-full text-center">
          <button
            onClick={() => updateActiveSnap({ bgType: 'gradient' })}
            className={`flex-1 py-1.5 text-xs font-bold rounded-30 cursor-pointer ${
              activeSnap.bgType === 'gradient' ? 'bg-app-primary text-white' : 'text-app-text/60'
            }`}
          >
            Gradients
          </button>
          <button
            onClick={() => updateActiveSnap({ bgType: 'solid' })}
            className={`flex-1 py-1.5 text-xs font-bold rounded-30 cursor-pointer ${
              activeSnap.bgType === 'solid' ? 'bg-app-primary text-white' : 'text-app-text/60'
            }`}
          >
            Solids
          </button>
          <button
            onClick={() => updateActiveSnap({ bgType: 'image' })}
            className={`flex-1 py-1.5 text-xs font-bold rounded-30 cursor-pointer ${
              activeSnap.bgType === 'image' ? 'bg-app-primary text-white' : 'text-app-text/60'
            }`}
          >
            Custom Image
          </button>
        </div>

        {/* Picker contents */}
        {activeSnap.bgType === 'gradient' && (
          <div className="grid grid-cols-3 gap-2.5 mt-1">
            {GRADIENTS.map((g) => (
              <button
                key={g.value}
                onClick={() => updateActiveSnap({ background: g.value })}
                className={`w-full aspect-square rounded-full border-2 cursor-pointer transition-all ${
                  activeSnap.background === g.value ? 'border-app-primary scale-105' : 'border-transparent hover:scale-102'
                }`}
                style={{ background: g.value }}
                title={g.name}
              />
            ))}
          </div>
        )}

        {activeSnap.bgType === 'solid' && (
          <div className="grid grid-cols-3 gap-2.5 mt-1">
            {SOLIDS.map((s) => (
              <button
                key={s.value}
                onClick={() => updateActiveSnap({ background: s.value })}
                className={`w-full aspect-square rounded-full border-2 cursor-pointer transition-all ${
                  activeSnap.background === s.value ? 'border-app-primary scale-105' : 'border-app-border hover:scale-102'
                }`}
                style={{ backgroundColor: s.value }}
                title={s.name}
              />
            ))}
          </div>
        )}

        {activeSnap.bgType === 'image' && (
          <div className="flex flex-col gap-3 mt-1">
            {activeSnap.customBgImage ? (
              <div className="relative group rounded-2xl overflow-hidden border border-app-border aspect-[2/1] w-full">
                <img
                  src={activeSnap.customBgImage}
                  alt="Custom Background Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button
                    onClick={() => updateActiveSnap({ customBgImage: null, bgType: 'gradient', background: GRADIENTS[0].value })}
                    className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform hover:scale-105 cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-app-border hover:border-app-primary/60 rounded-30 p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-app-primary/5 transition-all text-center">
                <Upload className="w-6 h-6 text-app-primary" />
                <span className="text-xs font-bold">Upload Background Image</span>
                <span className="text-[10px] text-app-text/40">PNG, JPG, SVG supported</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
