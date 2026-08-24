import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const designTabs = [
  { id: 'showcase', label: 'UI/UX Showcase', icon: 'fa-layer-group' },
  { id: 'palettes', label: 'Color Palettes', icon: 'fa-swatchbook' },
  { id: 'components', label: 'Design System', icon: 'fa-cubes' },
  { id: 'skills', label: 'Tool Proficiency', icon: 'fa-sliders-h' },
];

const showcases = [
  {
    title: 'AuroraOS Glassmorphic Interface',
    category: 'Web App & OS Design',
    desc: 'Futuristic browser desktop UI built with dark glassmorphism, dynamic window management, and custom micro-animations.',
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    title: 'Cyberpunk Game Dashboard',
    category: 'Game UI / HUD',
    desc: 'Interactive sci-fi HUD interface designed for action RPGs with neon telemetry widgets and status indicators.',
    tags: ['Figma', 'Unity UI', 'Blender'],
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    color: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Minimalist E-Commerce Experience',
    category: 'Mobile & Web App',
    desc: 'Clean, typography-driven shopping app concept emphasizing smooth checkout micro-interactions and dark mode elegance.',
    tags: ['UI/UX', 'Figma', 'Tailwind'],
    preview: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    color: 'from-cyan-500 to-blue-600',
  },
];

const colorPalettes = [
  {
    name: 'Cyberpunk Neon',
    colors: ['#0f172a', '#1e1b4b', '#818cf8', '#f43f5e', '#38bdf8'],
  },
  {
    name: 'Glassmorphism Sunset',
    colors: ['#1e293b', '#475569', '#f97316', '#e11d48', '#a855f7'],
  },
  {
    name: 'Emerald Dark Mode',
    colors: ['#064e3b', '#047857', '#10b981', '#34d399', '#a7f3d0'],
  },
  {
    name: 'Minimal Slate',
    colors: ['#09090b', '#18181b', '#27272a', '#a1a1aa', '#f4f4f5'],
  },
];

const tools = [
  { name: 'Figma / UI Design', level: 92, icon: 'fa-figma', color: 'from-purple-500 to-pink-500' },
  { name: 'Tailwind CSS & Styling', level: 95, icon: 'fa-css3-alt', color: 'from-cyan-400 to-blue-500' },
  { name: 'React UI Engineering', level: 90, icon: 'fa-react', color: 'from-blue-400 to-cyan-500' },
  { name: 'Blender 3D Modeling', level: 78, icon: 'fa-cube', color: 'from-orange-500 to-amber-500' },
  { name: 'Photoshop & Graphics', level: 85, icon: 'fa-image', color: 'from-blue-600 to-indigo-600' },
  { name: 'Framer Motion & FX', level: 88, icon: 'fa-magic', color: 'from-pink-500 to-purple-600' },
];

export default function DesignWindow() {
  const [activeTab, setActiveTab] = useState('showcase');
  const [copiedColor, setCopiedColor] = useState(null);

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0f17] text-white select-none">
      {/* Header Banner */}
      <div className="px-6 py-4 bg-[#141724] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <i className="fas fa-palette text-white text-base" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">RK Design Studio</h2>
            <p className="text-[11px] text-white/50">UI/UX Architecture, Color Systems & Motion Design</p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for UI/UX Freelance
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 px-6 py-2 bg-[#10121d] border-b border-white/5 overflow-x-auto">
        {designTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <i className={`fas ${tab.icon} text-xs`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#0b0c14]">
        {/* Showcase Tab */}
        {activeTab === 'showcase' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {showcases.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col rounded-2xl bg-[#151826] border border-white/10 overflow-hidden hover:border-pink-500/40 transition-all shadow-xl"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={item.preview} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151826] via-transparent to-black/20" />
                  <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${item.color} shadow-md`}>
                    {item.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <h3 className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-auto pt-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Color Palettes Tab */}
        {activeTab === 'palettes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {colorPalettes.map((pal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-[#151826] border border-white/10 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white">{pal.name}</h3>
                  <span className="text-[10px] text-white/40">Click color to copy HEX</span>
                </div>
                <div className="flex h-14 rounded-xl overflow-hidden shadow-lg">
                  {pal.colors.map((hex, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => copyToClipboard(hex)}
                      style={{ backgroundColor: hex }}
                      className="flex-1 h-full relative group transition-transform hover:z-10 hover:scale-105"
                    >
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 text-[10px] font-mono text-white">
                        {copiedColor === hex ? 'Copied!' : hex}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Design System Components Tab */}
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-[#151826] border border-white/10 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <i className="fas fa-hand-pointer text-pink-400" /> Glassmorphic Buttons
              </h3>
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold shadow-lg shadow-pink-500/25 hover:opacity-90 active:scale-95 transition-all">
                  Primary Gradient
                </button>
                <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md hover:bg-white/20 active:scale-95 transition-all">
                  Glass Secondary
                </button>
                <button className="px-4 py-2 rounded-xl border border-blue-500/50 text-blue-400 text-xs font-semibold hover:bg-blue-500/10 active:scale-95 transition-all">
                  Neon Outline
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#151826] border border-white/10 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <i className="fas fa-layer-group text-cyan-400" /> UI Card Tokens
              </h3>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">
                    ⚡
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Glassmorphic Card</h4>
                    <p className="text-[10px] text-white/50">Blur: 20px, Border: 1px rgba(255,255,255,0.1)</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-mono">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-4 rounded-2xl bg-[#151826] border border-white/10 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <i className={`fab ${tool.icon} text-sm text-pink-400`} />
                    {tool.name}
                  </span>
                  <span className="font-mono text-white/60 font-bold">{tool.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${tool.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${tool.level}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
