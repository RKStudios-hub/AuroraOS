import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { id: 'skills', label: 'Skills & Stack', icon: 'fa-sliders-h' },
  { id: 'palettes', label: 'Color Palettes', icon: 'fa-swatchbook' },
  { id: 'components', label: 'UI Components', icon: 'fa-cubes' },
];

const skillCategories = {
  frontend: {
    title: '🌐 Frontend Development',
    color: 'from-blue-500 to-cyan-500',
    items: [
      { name: 'HTML / CSS / JavaScript', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'React & Vite', level: 88 },
      { name: 'TypeScript', level: 75 },
    ],
  },
  languages: {
    title: '🐍 Programming Languages',
    color: 'from-emerald-500 to-teal-400',
    items: [
      { name: 'Python', level: 90 },
      { name: 'C++', level: 75 },
      { name: 'Java', level: 70 },
    ],
  },
  gamedev: {
    title: '🎮 Game Dev & 3D',
    color: 'from-purple-500 to-pink-500',
    items: [
      { name: 'Unity', level: 88 },
      { name: 'Unreal Engine', level: 80 },
      { name: 'Blender 3D', level: 75 },
      { name: 'Godot', level: 40 },
    ],
  },
  focus: {
    title: '🧠 Current Focus',
    color: 'from-amber-500 to-orange-500',
    items: [
      { name: 'Linux / Bash Scripting', level: 65 },
      { name: 'Cybersecurity & Networking', level: 50 },
      { name: 'Rust', level: 30 },
    ],
  },
};

const colorPalettes = [
  {
    name: 'Aurora Light',
    colors: ['#ffffff', '#f1f5f9', '#3b82f6', '#8b5cf6', '#06b6d4'],
  },
  {
    name: 'Pastel Sunset',
    colors: ['#fff7ed', '#ffedd5', '#f97316', '#ec4899', '#a855f7'],
  },
  {
    name: 'Emerald Fresh',
    colors: ['#f0fdf4', '#dcfce7', '#10b981', '#059669', '#047857'],
  },
  {
    name: 'Classic macOS Slate',
    colors: ['#f8fafc', '#e2e8f0', '#64748b', '#334155', '#0f172a'],
  },
];

export default function DesignWindow() {
  const [activeTab, setActiveTab] = useState('skills');
  const [copiedColor, setCopiedColor] = useState(null);

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] text-slate-800 select-none">
      {/* Light Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <i className="fas fa-palette text-lg" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Design Studio & Skills</h2>
            <p className="text-xs text-slate-500">Light Theme Workspace & Expertise Overview</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          RK Studios Design System
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-100/80 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-md shadow-slate-200 border border-slate-200'
                : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            <i className={`fas ${tab.icon} text-xs`} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#f8fafc]">
        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.values(skillCategories).map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3"
                >
                  <h3 className="text-sm font-bold text-slate-800">{cat.title}</h3>
                  <div className="space-y-3 pt-1">
                    {cat.items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1 text-xs">
                          <span className="font-medium text-slate-700">{skill.name}</span>
                          <span className="font-semibold text-slate-500">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Developer Status Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <span>🔥</span> Developer & Design Philosophy
                </h4>
                <p className="text-xs text-slate-600">
                  Strong in core fundamentals • Hands-on real project experience • Continuously learning & improving
                </p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-semibold whitespace-nowrap">
                Production Ready
              </span>
            </div>
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
                transition={{ delay: idx * 0.08 }}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800">{pal.name}</h3>
                  <span className="text-[10px] text-slate-400">Click color to copy HEX</span>
                </div>
                <div className="flex h-14 rounded-xl overflow-hidden shadow-inner border border-slate-200">
                  {pal.colors.map((hex, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => copyToClipboard(hex)}
                      style={{ backgroundColor: hex }}
                      className="flex-1 h-full relative group transition-transform hover:z-10 hover:scale-105"
                    >
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 text-[10px] font-mono text-white">
                        {copiedColor === hex ? 'Copied!' : hex}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <i className="fas fa-hand-pointer text-blue-500" /> Light Theme Buttons
              </h3>
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all">
                  Primary Button
                </button>
                <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 hover:bg-slate-200 active:scale-95 transition-all">
                  Secondary Light
                </button>
                <button className="px-4 py-2 rounded-xl border border-blue-500 text-blue-600 text-xs font-semibold hover:bg-blue-50 active:scale-95 transition-all">
                  Outline Button
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <i className="fas fa-layer-group text-purple-500" /> Card Tokens
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center text-sm">
                    💡
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">Light Glassmorphic Token</h4>
                    <p className="text-[10px] text-slate-500">Bg: #ffffff, Border: #e2e8f0</p>
                  </div>
                </div>
                <span className="text-xs text-blue-600 font-semibold">Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
