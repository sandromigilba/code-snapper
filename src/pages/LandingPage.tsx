import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ArrowRight, Code, Share2, Sparkles, Zap } from 'lucide-react'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-text selection:bg-app-primary selection:text-white pb-16">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden opacity-30 z-0">
        <div className="absolute -top-[200px] left-1/4 w-[500px] h-[500px] bg-app-primary/40 rounded-full blur-[120px]" />
        <div className="absolute -top-[150px] right-1/4 w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-[100px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 pt-24 relative z-10 flex flex-col items-center text-center gap-8"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-app-primary/10 border border-app-primary/20 rounded-full text-sm font-semibold text-app-primary select-none"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Meet the Next-Gen Code Beautifier</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] text-app-text select-none"
        >
          Create Beautiful Code Snaps <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-app-primary to-app-accent">
            in Seconds.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-app-text/70 max-w-2xl leading-relaxed select-none"
        >
          Generate stunning, customizable code screenshots for your social media posts, blog covers, slides, and documentation. Fast, lightweight, and offline-ready.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex gap-4 mt-2">
          <Button
            onClick={() => navigate('/editor')}
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start Creating
          </Button>
          <Button
            onClick={() => {
              const el = document.getElementById('features')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
            variant="secondary"
            size="lg"
          >
            Explore Features
          </Button>
        </motion.div>

        {/* Live Preview Demo Card */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl mt-12 border border-app-border rounded-30 bg-app-surface/50 backdrop-blur-md p-4 md:p-8 shadow-2xl relative"
        >
          {/* Top Bar Decoration */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500" />
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
              <span className="w-3.5 h-3.5 rounded-full bg-green-500" />
            </div>
            <div className="px-4 py-1 bg-app-bg border border-app-border rounded-full text-xs font-bold text-app-text/60">
              live_preview.js
            </div>
            <div className="w-[52px]" />
          </div>

          {/* Dummy Code Display */}
          <div className="text-left font-mono text-sm md:text-base leading-relaxed bg-[#14111d] text-[#f5f3ff] p-6 rounded-2xl overflow-x-auto shadow-inner border border-purple-900/20">
            <p className="text-purple-400">{'// Quick Example'}</p>
            <p className="mt-2">
              <span className="text-[#a855f7]">import</span> {'{ snap }'} <span className="text-[#a855f7]">from</span> <span className="text-[#c084fc]">'custom-code-snapper'</span>
            </p>
            <p className="mt-1">
              <span className="text-[#a855f7]">const</span> config = {'{'}
            </p>
            <p className="pl-6 text-[#c084fc]">
              theme: <span className="text-white">'dracula'</span>,
            </p>
            <p className="pl-6 text-[#c084fc]">
              padding: <span className="text-orange-400">48</span>,
            </p>
            <p className="pl-6 text-[#c084fc]">
              corners: <span className="text-orange-400">24</span>,
            </p>
            <p className="pl-6 text-[#c084fc]">
              resolution: <span className="text-orange-400">4</span>
            </p>
            <p className="">{'}'}</p>
            <p className="mt-3">
              <span className="text-[#a855f7]">await</span> snap.export(<span className="text-green-400">'#my-code'</span>, config)
            </p>
          </div>
        </motion.div>

        {/* Feature Showcase Grid */}
        <section id="features" className="w-full max-w-6xl mt-24 flex flex-col gap-12 scroll-mt-16 select-none">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-extrabold tracking-tight">Supercharged Developer Toolkit</h2>
            <p className="text-sm text-app-text/60 mt-2">Everything you need to showcase code like a pro</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hoverEffect className="flex flex-col items-start text-left gap-3">
              <div className="p-3 bg-app-primary/10 rounded-full text-app-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold">Instantly Fast</h4>
              <p className="text-sm text-app-text/75">
                Powered by Vite and lightweight rendering modules. Generates high-res PNG/JPG/SVG/PDF under 200ms.
              </p>
            </Card>

            <Card hoverEffect className="flex flex-col items-start text-left gap-3">
              <div className="p-3 bg-app-primary/10 rounded-full text-app-primary">
                <Code className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold">Monaco Engine</h4>
              <p className="text-sm text-app-text/75">
                Enjoy VS Code's core editor capabilities, with syntax highlighting for 11+ languages and auto-matching themes.
              </p>
            </Card>

            <Card hoverEffect className="flex flex-col items-start text-left gap-3">
              <div className="p-3 bg-app-primary/10 rounded-full text-app-primary">
                <Share2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold">1-Click Clipboard</h4>
              <p className="text-sm text-app-text/75">
                Skip downloading completely. Hit copy and paste the clean, high-resolution PNG image directly into Twitter or Slack.
              </p>
            </Card>
          </div>
        </section>

        {/* Pricing Mockup Section */}
        <section className="w-full max-w-6xl mt-24 flex flex-col gap-12 select-none">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-extrabold tracking-tight">Simple Pricing</h2>
            <p className="text-sm text-app-text/60 mt-2">Free forever core features, upgrade for team features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <Card className="flex flex-col gap-4 text-left border-app-border">
              <h4 className="text-lg font-bold text-app-text/60">Free</h4>
              <div className="text-4xl font-extrabold">$0</div>
              <p className="text-xs text-app-text/60">Ideal for personal developers and quick sharing.</p>
              <ul className="text-sm text-app-text/80 flex flex-col gap-2 my-4">
                <li>✓ Unlimited snaps</li>
                <li>✓ 1x and 2x PNG Export</li>
                <li>✓ Monaco Syntax Highlighting</li>
                <li>✓ Local history logs</li>
              </ul>
              <Button onClick={() => navigate('/editor')} variant="secondary" className="w-full">
                Get Started
              </Button>
            </Card>

            {/* Pro (Highlighted) */}
            <Card className="flex flex-col gap-4 text-left border-app-primary relative overflow-hidden bg-app-surface shadow-2xl">
              <div className="absolute top-3 right-3 bg-app-primary text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                Popular
              </div>
              <h4 className="text-lg font-bold text-app-primary">Pro</h4>
              <div className="text-4xl font-extrabold">$8<span className="text-sm font-medium text-app-text/50"> /mo</span></div>
              <p className="text-xs text-app-text/60">Unlock high-definition capabilities and presets.</p>
              <ul className="text-sm text-app-text/80 flex flex-col gap-2 my-4">
                <li>✓ Everything in Free</li>
                <li>✓ 4x Ultra PNG/JPG/SVG Export</li>
                <li>✓ PDF document output support</li>
                <li>✓ Custom background image uploads</li>
                <li>✓ Access to premium pre-built layouts</li>
              </ul>
              <Button onClick={() => navigate('/editor')} variant="primary" className="w-full">
                Upgrade Now
              </Button>
            </Card>

            {/* Teams */}
            <Card className="flex flex-col gap-4 text-left border-app-border">
              <h4 className="text-lg font-bold text-app-text/60">Team</h4>
              <div className="text-4xl font-extrabold">$24<span className="text-sm font-medium text-app-text/50"> /mo</span></div>
              <p className="text-xs text-app-text/60">For developer groups and content creators.</p>
              <ul className="text-sm text-app-text/80 flex flex-col gap-2 my-4">
                <li>✓ Everything in Pro</li>
                <li>✓ Brand watermark overlays</li>
                <li>✓ Team template sync (Cloud)</li>
                <li>✓ Priority support & API access</li>
              </ul>
              <Button onClick={() => navigate('/editor')} variant="secondary" className="w-full">
                Contact Sales
              </Button>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-4xl mt-24 flex flex-col gap-10 select-none text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-center">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-6">
            <Card>
              <h5 className="font-bold text-base">Is my code secure?</h5>
              <p className="text-sm text-app-text/70 mt-1">
                Absolutely. Code Snapper runs entirely in your browser. None of your source codes are transmitted or stored on external servers.
              </p>
            </Card>
            <Card>
              <h5 className="font-bold text-base">Does it work offline?</h5>
              <p className="text-sm text-app-text/70 mt-1">
                Yes! The application is PWA-ready, meaning you can install it on your machine and use it to format and export code snippets without an active internet connection.
              </p>
            </Card>
            <Card>
              <h5 className="font-bold text-base">Can I export transparent code blocks?</h5>
              <p className="text-sm text-app-text/70 mt-1">
                Yes, simply choose "Solids" as the background style and click the "Clear" color option. When exported, the background will be transparent.
              </p>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-6xl mt-32 border-t border-app-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-app-text/40 gap-4">
          <div className="flex items-center gap-2 font-bold text-app-text/60">
            <Sparkles className="w-4 h-4 text-app-primary" />
            <span>Code Snapper</span>
          </div>
          <div>© {new Date().getFullYear()} Code Snapper. All rights reserved. Built for developers.</div>
        </footer>
      </motion.div>
    </div>
  )
}
