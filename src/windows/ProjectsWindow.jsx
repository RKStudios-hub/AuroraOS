import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All Files', iconClass: 'fa-folder' },
  { id: 'github', label: 'GitHub', iconClass: 'fa-github' },
  { id: 'modrinth', label: 'Modrinth', iconClass: 'fa-cube' },
  { id: 'youtube', label: 'YouTube', iconClass: 'fa-play' },
];

const demoProjects = [
  { id: 1, title: 'Star Forge', category: 'github' },
  { id: 2, title: 'Dungeon Core', category: 'github' },
  { id: 3, title: 'Neon Racer', category: 'github' },
  { id: 4, title: 'Puzzle Nexus', category: 'github' },
  { id: 5, title: 'Shader Lab', category: 'github' },
  { id: 6, title: 'Skyrim Mods', category: 'modrinth' },
  { id: 7, title: 'Game Assets', category: 'all' },
  { id: 8, title: 'Tutorials', category: 'youtube' },
];

export default function ProjectsWindow() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? demoProjects 
    : demoProjects.filter(p => p.category === activeCategory || p.category === 'all');

  return (
    <div className="flex h-full" style={{ background: '#ffffff' }}>
      {/* Sidebar */}
      <div 
        className="w-40 p-2 flex flex-col gap-0.5"
        style={{ background: 'rgba(0,0,0,0.03)' }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all text-left
              ${activeCategory === cat.id 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-black/50 hover:bg-black/5 hover:text-black'
              }
            `}
          >
            <i className={`fas ${cat.iconClass} text-xs w-4`} />
            <span className="text-xs">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 h-full overflow-auto">
        {/* Path bar */}
        <div className="flex items-center gap-1 text-xs text-black/40 mb-4">
          <i className="fas fa-folder" />
          <span>Home</span>
          <i className="fas fa-chevron-right" />
          <span className="text-black/60">{categories.find(c => c.id === activeCategory)?.label}</span>
        </div>

        {/* Grid - icons scale with window size using vw */}
        <div className="grid gap-2 p-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href="#"
                target="_blank"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -2 }}
                className="flex flex-col items-center gap-1 p-1 rounded-xl cursor-pointer group"
              >
                <div 
                  className="rounded-lg flex items-center justify-center"
                  style={{ 
                    width: 'min(6vw, 70px)',
                    aspectRatio: '1',
                    background: 'linear-gradient(135deg, #00a8ff, #0099ff)',
                    boxShadow: '0 2px 10px rgba(0,168,255,0.3)',
                  }}
                >
                  <i className="fas fa-folder text-white" style={{ fontSize: 'min(2vw, 16px)' }} />
                </div>
                <span className="text-xs text-black/70 text-center group-hover:text-black truncate w-full">
                  {project.title}
                </span>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
