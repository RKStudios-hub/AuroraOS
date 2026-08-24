import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllProjects } from '../services/projectService';

// Content SVG Vector Icons
const GitHubSVG = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-md">
    <path fill="#24292E" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const YouTubeSVG = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-md">
    <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const SketchfabSVG = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-md">
    <path fill="#1CAAD9" d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm-1.2 3.2L18 7.3l-3 1.7-7.2-4.1 3-1.7zm-6.6 4.8l7.2 4.1v7.6l-7.2-4.2V8zm15.6 7.5l-7.2 4.2v-7.6l7.2-4.1v7.5z" />
  </svg>
);

const ModrinthSVG = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 drop-shadow-md">
    <path fill="#57C585" d="M12.252.004a11.78 11.768 0 0 0-8.92 3.73a11 10.999 0 0 0-2.17 3.11a11.37 11.359 0 0 0-1.16 5.169c0 1.42.17 2.5.6 3.77c.24.759.77 1.899 1.17 2.529a12.3 12.298 0 0 0 8.85 5.639c.44.05 2.54.07 2.76.02c.2-.04.22.1-.26-1.7l-.36-1.37l-1.01-.06a8.5 8.489 0 0 1-5.18-1.8a5.34 5.34 0 0 1-1.3-1.26c0-.05.34-.28.74-.5a37.572 37.545 0 0 1 2.88-1.629c.03 0 .5.45 1.06.98l1 .97l2.07-.43l2.06-.43l1.47-1.47c.8-.8 1.48-1.5 1.48-1.52c0-.09-.42-1.63-.46-1.7c-.04-.06-.2-.03-1.02.18c-.53.13-1.2.3-1.45.4l-.48.15l-.53.53l-.53.53l-.93.1l-.93.07l-.52-.5a2.7 2.7 0 0 1-.96-1.7l-.13-.6l.43-.57c.68-.9.68-.9 1.46-1.1c.4-.1.65-.2.83-.33c.13-.099.65-.579 1.14-1.069l.9-.9l-.7-.7l-.7-.7l-1.95.54c-1.07.3-1.96.53-1.97.53c-.03 0-2.23 2.48-2.63 2.97l-.29.35l.28 1.03c.16.56.3 1.16.31 1.34l.03.3l-.34.23c-.37.23-2.22 1.3-2.84 1.63c-.36.2-.37.2-.44.1c-.08-.1-.23-.6-.32-1.03c-.18-.86-.17-2.75.02-3.73a8.84 8.839 0 0 1 7.9-6.93c.43-.03.77-.08.78-.1c.06-.17.5-2.999.47-3.039c-.01-.02-.1-.02-.2-.03Zm3.68.67c-.2 0-.3.1-.37.38c-.06.23-.46 2.42-.46 2.52c0 .04.1.11.22.16a8.51 8.499 0 0 1 2.99 2a8.38 8.379 0 0 1 2.16 3.449a6.9 6.9 0 0 1 .4 2.8c0 1.07 0 1.27-.1 1.73a9.37 9.369 0 0 1-1.76 3.769c-.32.4-.98 1.06-1.37 1.38c-.38.32-1.54 1.1-1.7 1.14c-.1.03-.1.06-.07.26c.03.18.64 2.56.7 2.78l.06.06a12.07 12.058 0 0 0 7.27-9.4c.13-.77.13-2.58 0-3.4a11.96 11.948 0 0 0-5.73-8.578c-.7-.42-2.05-1.06-2.25-1.06Z" />
  </svg>
);

const FolderSVG = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md">
    <path fill="#FFC107" d="M56 16H28l-4-6H8c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h48c2.2 0 4-1.8 4-4V20c0-2.2-1.8-4-4-4z" />
    <path fill="#FFD54F" d="M56 20H8c-2.2 0-4 1.8-4 4v32c0 2.2 1.8 4 4 4h48c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4z" />
  </svg>
);

const categories = [
  { id: 'all', label: 'All Files', iconClass: 'fa-folder' },
  { id: 'github', label: 'GitHub', iconClass: 'fa-github' },
  { id: 'modrinth', label: 'Modrinth', iconClass: 'fa-gamepad' },
  { id: 'sketchfab', label: 'Sketchfab', iconClass: 'fa-cube' },
  { id: 'youtube', label: 'YouTube', iconClass: 'fa-youtube' },
];

export default function ProjectsWindow() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState({ github: [], modrinth: [], sketchfab: [], youtube: [] });
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchAllProjects();
      setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  const allProjects = [
    ...projects.github.map(p => ({ ...p, category: 'github' })),
    ...projects.modrinth.map(p => ({ ...p, category: 'modrinth' })),
    ...projects.sketchfab.map(p => ({ ...p, category: 'sketchfab' })),
    ...projects.youtube.map(p => ({ ...p, category: 'youtube' })),
  ];

  const filteredProjects = activeCategory === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  const getBadgeColor = (category) => {
    switch(category) {
      case 'youtube': return 'bg-red-500 text-white';
      case 'sketchfab': return 'bg-cyan-500 text-white';
      case 'github': return 'bg-slate-800 text-white';
      case 'modrinth': return 'bg-emerald-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const renderSVGIcon = (cat) => {
    switch(cat) {
      case 'github': return <GitHubSVG />;
      case 'youtube': return <YouTubeSVG />;
      case 'sketchfab': return <SketchfabSVG />;
      case 'modrinth': return <ModrinthSVG />;
      default: return <FolderSVG />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center" style={{ background: '#ffffff' }}>
        <div className="text-black/50 text-xs font-medium">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full select-none relative overflow-hidden text-slate-800" style={{ background: '#ffffff' }}>
      {/* Left Sidebar */}
      <div 
        className="w-40 p-2 flex flex-col gap-0.5"
        style={{ background: 'rgba(0,0,0,0.03)' }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedProject(null);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all text-left ${
              activeCategory === cat.id 
                ? 'bg-blue-100 text-blue-600 font-medium' 
                : 'text-black/50 hover:bg-black/5 hover:text-black'
            }`}
          >
            <i className={`fab ${cat.iconClass} text-xs w-4 ${cat.id === 'youtube' ? 'text-red-500' : cat.id === 'sketchfab' ? 'text-cyan-500' : 'text-blue-500'}`} />
            <span className="text-xs">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Main Grid Content Area - Balanced Padding */}
      <div className="flex-1 p-3.5 h-full overflow-y-auto flex flex-col">
        {/* Path bar */}
        <div className="flex items-center gap-1 text-xs text-black/40 mb-3">
          <i className="fas fa-folder text-yellow-500" />
          <span>Home</span>
          <i className="fas fa-chevron-right" />
          <span className="text-black/60 font-medium">{categories.find(c => c.id === activeCategory)?.label}</span>
        </div>

        {/* Content SVG Icons Grid */}
        <div 
          className="grid gap-3 p-1 flex-1" 
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))' }}
          onClick={() => setSelectedProject(null)}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ y: -2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl cursor-pointer group transition-all ${
                  selectedProject?.id === project.id 
                    ? 'bg-blue-50 border border-blue-300 shadow-sm ring-2 ring-blue-500/20' 
                    : 'hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  {renderSVGIcon(project.category)}
                </div>
                <span className="text-xs text-black/80 font-medium text-center group-hover:text-blue-600 truncate w-full">
                  {project.title}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-black/40 mt-8 text-xs">
            No projects found
          </div>
        )}
      </div>

      {/* Slim 6:16 Ratio PowerToys Style Preview Sidebar Pane */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ x: 220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 220, opacity: 0 }}
            className="w-52 bg-slate-50 border-l border-slate-200 p-3 flex flex-col gap-2.5 shadow-xl z-20 overflow-y-auto"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                <i className="fas fa-eye text-blue-500" /> PowerToys Peek
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-5 h-5 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <i className="fas fa-times text-[10px]" />
              </button>
            </div>

            {/* Slim 6:16 Aspect Thumbnail Preview Card */}
            <div className="relative w-full aspect-[6/16] max-h-44 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden shadow-inner">
              <img 
                src={selectedProject.thumbnail} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <span className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[9px] font-bold ${getBadgeColor(selectedProject.category)} shadow-sm`}>
                {selectedProject.category.toUpperCase()}
              </span>
            </div>

            {/* Project Details */}
            <div className="flex flex-col gap-1 text-[11px]">
              <h3 className="font-bold text-slate-800 leading-tight">{selectedProject.title}</h3>
              <p className="text-[10px] text-slate-500 leading-relaxed">{selectedProject.description}</p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-2 text-[10px] text-slate-600 font-medium pt-1.5 border-t border-slate-200 mt-1">
                {selectedProject.stars && <span>⭐ {selectedProject.stars} stars</span>}
                {selectedProject.views && <span>👁️ {selectedProject.views} views</span>}
                {selectedProject.likes && <span>❤️ {selectedProject.likes} likes</span>}
                {selectedProject.downloads && <span>📥 {selectedProject.downloads} downloads</span>}
              </div>
            </div>

            {/* Action Link Button */}
            <a
              href={selectedProject.url}
              target="_blank"
              rel="noreferrer"
              className="mt-auto w-full py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs text-center hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5"
            >
              <span>Open {selectedProject.category.toUpperCase()}</span>
              <i className="fas fa-external-link-alt text-[10px]" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
