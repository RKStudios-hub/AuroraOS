import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllProjects } from '../services/projectService';

const categories = [
  { id: 'all', label: 'All Media & Projects', icon: 'fa-layer-group' },
  { id: 'youtube', label: 'Videos & Demos', icon: 'fa-youtube' },
  { id: 'sketchfab', label: '3D Models', icon: 'fa-cube' },
  { id: 'github', label: 'Code & Repos', icon: 'fa-github' },
  { id: 'modrinth', label: 'Minecraft Mods', icon: 'fa-gamepad' },
];

export default function ProjectsWindow() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState({ github: [], modrinth: [], sketchfab: [], youtube: [] });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchAllProjects();
      setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  const allProjects = [
    ...projects.youtube.map(p => ({ ...p, category: 'youtube' })),
    ...projects.sketchfab.map(p => ({ ...p, category: 'sketchfab' })),
    ...projects.github.map(p => ({ ...p, category: 'github' })),
    ...projects.modrinth.map(p => ({ ...p, category: 'modrinth' })),
  ];

  const filteredProjects = allProjects.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getBadgeColor = (category) => {
    switch(category) {
      case 'youtube': return 'bg-red-500 text-white';
      case 'sketchfab': return 'bg-cyan-500 text-white';
      case 'github': return 'bg-gray-800 text-white';
      case 'modrinth': return 'bg-emerald-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-slate-900 text-white/70 gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-sm font-medium">Fetching media & 3D models...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-[#12141c] text-white select-none">
      {/* Sidebar */}
      <div className="w-48 p-3 flex flex-col gap-1 bg-[#181a26] border-r border-white/5">
        <div className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
          Library
        </div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
              activeCategory === cat.id 
                ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/20' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <i className={`fab ${cat.icon} w-4 text-center ${cat.id === 'youtube' ? 'text-red-400' : cat.id === 'sketchfab' ? 'text-cyan-400' : 'text-blue-400'}`} />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0e1017]">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-white/5 bg-[#141622]">
          {/* Search Input */}
          <div className="flex-1 max-w-sm flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 focus-within:border-blue-500/50 transition-colors">
            <i className="fas fa-search text-xs text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, videos & 3D models..."
              className="w-full bg-transparent outline-none text-xs text-white placeholder-white/40"
            />
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}
              title="Grid View"
            >
              <i className="fas fa-th-large" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white'}`}
              title="List View"
            >
              <i className="fas fa-list" />
            </button>
          </div>
        </div>

        {/* Media Grid / List */}
        <div className="flex-1 p-5 overflow-y-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.a
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#181a24] border border-white/10 hover:border-blue-500/50 shadow-xl transition-all"
                  >
                    {/* Thumbnail Image Container */}
                    <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />
                      
                      {/* Category Badge */}
                      <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeColor(project.category)} shadow-md`}>
                        {project.category}
                      </span>

                      {/* Video Play Button Overlay */}
                      {project.category === 'youtube' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <i className="fas fa-play text-xs ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* 3D Model Badge Overlay */}
                      {project.category === 'sketchfab' && (
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-semibold text-cyan-300 flex items-center gap-1 border border-cyan-500/30">
                          <i className="fas fa-cube text-[9px]" /> 3D View
                        </div>
                      )}

                      {/* Stats overlay */}
                      {(project.stars || project.downloads || project.views || project.likes) && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] text-white/80 font-medium flex items-center gap-1">
                          {project.stars && <span>⭐ {project.stars}</span>}
                          {project.downloads && <span>📥 {project.downloads}</span>}
                          {project.views && <span>👁️ {project.views}</span>}
                          {project.likes && <span>❤️ {project.likes}</span>}
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-3 flex flex-col flex-1 gap-1">
                      <h3 className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-auto pt-2">
                          {project.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] text-white/60">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#181a24] border border-white/5 hover:border-blue-500/40 hover:bg-[#202230] transition-all group"
                >
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-16 h-12 rounded-lg object-cover bg-black/40"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-semibold text-white group-hover:text-blue-400 truncate">
                        {project.title}
                      </h3>
                      <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold ${getBadgeColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 truncate mt-0.5">
                      {project.description}
                    </p>
                  </div>
                  <i className="fas fa-external-link-alt text-xs text-white/30 group-hover:text-blue-400 mr-2" />
                </a>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-white/30 gap-2">
              <i className="fas fa-search-minus text-2xl" />
              <span className="text-xs">No media or projects match your search</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
