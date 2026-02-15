import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllProjects } from '../services/projectService';

const getFolderIconColor = (catId, activeCategory) => {
  if (activeCategory === catId) return '#2563eb';
  return 'currentColor';
};

const GitHubFolderIcon = ({ color }) => (
  <svg viewBox="0 0 432 416" style={{ width: '14px', height: '14px' }}>
    <path fill={color} d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"/>
  </svg>
);

const YouTubeFolderIcon = ({ color }) => (
  <svg viewBox="0 0 1024 768" style={{ width: '14px', height: '14px' }}>
    <path fill={color} d="M928 736q-222 32-416 32q-86 0-190-8t-165-16l-61-8q-27-5-47.5-37.5t-30-78.5t-14-86T0 461V307Q0 52 96 32Q318 0 512 0q86 0 190 8t165 16l61 8q29 4 49.5 36.5T1007 148t13 86t4 73v154q0 36-3 73t-12 85t-30 80t-51 37zM693 359L431 199q-11-10-29-5.5T384 208v352q0 11 18 15t29-6l262-160q11-10 11-25t-11-25z"/>
  </svg>
);

const SketchfabFolderIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px' }}>
    <path fill={color} d="M11.3 0A11.983 11.983 0 0 0 .037 11a13.656 13.656 0 0 0 0 2a11.983 11.983 0 0 0 11.29 11h1.346a12.045 12.045 0 0 0 11.3-11.36a13.836 13.836 0 0 0 0-1.7A12.049 12.049 0 0 0 12.674 0zM15 6.51l2.99 1.74s-6.064 3.24-6.084 3.24S5.812 8.27 5.8 8.26l2.994-1.77l2.992-1.76zm-6.476 5.126L11 13v5.92l-2.527-1.4l-2.46-1.43v-5.76zm9.461 1.572v2.924L15.5 17.574L13 19.017v-6.024l2.489-1.345l2.5-1.355z"/>
  </svg>
);

const ModrinthFolderIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px' }}>
    <path fill={color} d="M12.252.004a11.78 11.768 0 0 0-8.92 3.73a11 10.999 0 0 0-2.17 3.11a11.37 11.359 0 0 0-1.16 5.169c0 1.42.17 2.5.6 3.77c.24.759.77 1.899 1.17 2.529a12.3 12.298 0 0 0 8.85 5.639c.44.05 2.54.07 2.76.02c.2-.04.22.1-.26-1.7l-.36-1.37l-1.01-.06a8.5 8.489 0 0 1-5.18-1.8a5.34 5.34 0 0 1-1.3-1.26c0-.05.34-.28.74-.5a37.572 37.545 0 0 1 2.88-1.629c.03 0 .5.45 1.06.98l1 .97l2.07-.43l2.06-.43l1.47-1.47c.8-.8 1.48-1.5 1.48-1.52c0-.09-.42-1.63-.46-1.7c-.04-.06-.2-.03-1.02.18c-.53.13-1.2.3-1.45.4l-.48.15l-.53.53l-.53.53l-.93.1l-.93.07l-.52-.5a2.7 2.7 0 0 1-.96-1.7l-.13-.6l.43-.57c.68-.9.68-.9 1.46-1.1c.4-.1.65-.2.83-.33c.13-.099.65-.579 1.14-1.069l.9-.9l-.7-.7l-.7-.7l-1.95.54c-1.07.3-1.96.53-1.97.53c-.03 0-2.23 2.48-2.63 2.97l-.29.35l.28 1.03c.16.56.3 1.16.31 1.34l.03.3l-.34.23c-.37.23-2.22 1.3-2.84 1.63c-.36.2-.37.2-.44.1c-.08-.1-.23-.6-.32-1.03c-.18-.86-.17-2.75.02-3.73a8.84 8.839 0 0 1 7.9-6.93c.43-.03.77-.08.78-.1c.06-.17.5-2.999.47-3.039c-.01-.02-.1-.02-.2-.03Zm3.68.67c-.2 0-.3.1-.37.38c-.06.23-.46 2.42-.46 2.52c0 .04.1.11.22.16a8.51 8.499 0 0 1 2.99 2a8.38 8.379 0 0 1 2.16 3.449a6.9 6.9 0 0 1 .4 2.8c0 1.07 0 1.27-.1 1.73a9.37 9.369 0 0 1-1.76 3.769c-.32.4-.98 1.06-1.37 1.38c-.38.32-1.54 1.1-1.7 1.14c-.1.03-.1.06-.07.26c.03.18.64 2.56.7 2.78l.06.06a12.07 12.058 0 0 0 7.27-9.4c.13-.77.13-2.58 0-3.4a11.96 11.948 0 0 0-5.73-8.578c-.7-.42-2.05-1.06-2.25-1.06Z"/>
  </svg>
);

const GitHubProjectIcon = ({ color }) => (
  <svg viewBox="0 0 640 640" style={{ width: '24px', height: '24px' }}>
    <path fill={color} d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/>
  </svg>
);

const YouTubeProjectIcon = ({ color }) => (
  <svg viewBox="0 0 8 8" style={{ width: '24px', height: '24px' }}>
    <path fill={color} d="M.5 1c-.28 0-.5.23-.5.5v4c0 .28.23.5.5.5h5c.28 0 .5-.22.5-.5V4l1 1h1V2H7L6 3V1.5c0-.28-.22-.5-.5-.5h-5z"/>
  </svg>
);

const SketchfabProjectIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
    <path fill={color} fillRule="evenodd" d="m9.675 19.34l-3-2.144c-.821-.586-1.232-.88-1.453-1.31C5 15.456 5 14.95 5 13.942v-3.883c0-.322 0-.592.007-.825L11 13.514v6.717c-.357-.2-.773-.498-1.325-.892m3.325.346l3-2.143c.821-.586 1.232-.88 1.453-1.31c.222-.43.222-.935.222-1.944v-3.883c0-.322 0-.592-.007-.825L13 13.514zm5.128-12.837L12 11.771L5.872 7.394c.212-.168.475-.356.803-.59l3-2.143C10.798 3.859 11.36 3.458 12 3.458c.64 0 1.202.4 2.325 1.203l3 2.143c.329.234.591.422.803.59" clipRule="evenodd"/>
  </svg>
);

const ModrinthProjectIcon = ({ color }) => (
  <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
    <path fill={color} d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m2 4v4h4v2H8v6h2v-2h4v2h2v-6h-2v-2h4V6h-4v4h-4V6H6Z"/>
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

  const getProjectColor = (category) => {
    switch(category) {
      case 'github': return 'linear-gradient(135deg, #24292e, #333)';
      case 'modrinth': return 'linear-gradient(135deg, #57c585, #57c585)';
      case 'sketchfab': return 'linear-gradient(135deg, #1caad9, #1caad9)';
      case 'youtube': return 'linear-gradient(135deg, #ff0000, #cc0000)';
      default: return 'linear-gradient(135deg, #00a8ff, #0099ff)';
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center" style={{ background: '#ffffff' }}>
        <div className="text-black/50">Loading projects...</div>
      </div>
    );
  }

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
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all text-left ${
              activeCategory === cat.id 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-black/50 hover:bg-black/5 hover:text-black'
            }`}
          >
          {cat.id === 'github' && <GitHubFolderIcon color={getFolderIconColor(cat.id, activeCategory)} />}
            {cat.id === 'youtube' && <YouTubeFolderIcon color={getFolderIconColor(cat.id, activeCategory)} />}
            {cat.id === 'sketchfab' && <SketchfabFolderIcon color={getFolderIconColor(cat.id, activeCategory)} />}
            {cat.id === 'modrinth' && <ModrinthFolderIcon color={getFolderIconColor(cat.id, activeCategory)} />}
            {cat.id === 'all' && <i className="fas fa-folder text-xs w-4" />}
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

        {/* Grid */}
        <div className="grid gap-2 p-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.url}
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
                    background: getProjectColor(project.category),
                    boxShadow: '0 2px 10px rgba(0,168,255,0.3)',
                  }}
                >
                  {project.category === 'github' && <GitHubProjectIcon color="#fff" />}
                  {project.category === 'youtube' && <YouTubeProjectIcon color={project.category === 'youtube' ? '#fff' : '#fff'} />}
                  {project.category === 'sketchfab' && <SketchfabProjectIcon color={project.category === 'sketchfab' ? '#fff' : '#fff'} />}
                  {project.category === 'modrinth' && <ModrinthProjectIcon color={project.category === 'modrinth' ? '#fff' : '#fff'} />}
                </div>
                <span className="text-xs text-black/70 text-center group-hover:text-black truncate w-full">
                  {project.title}
                </span>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-black/40 mt-8">
            No projects found
          </div>
        )}
      </div>
    </div>
  );
}
