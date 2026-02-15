import { motion } from 'framer-motion';
import Window from './Window';
import DesktopWidget from './DesktopWidget';
import AboutWindow from '../windows/AboutWindow';
import ProjectsWindow from '../windows/ProjectsWindow';
import DesignWindow from '../windows/DesignWindow';
import ContactWindow from '../windows/ContactWindow';
import GameWindow from '../windows/GameWindow';

const windowComponents = {
  about: AboutWindow,
  projects: ProjectsWindow,
  design: DesignWindow,
  contact: ContactWindow,
  game: GameWindow,
};

const desktopApps = [
  { id: 'about', icon: 'fa-user', label: 'About Me', color: 'from-purple-400 to-purple-600' },
  { id: 'projects', icon: 'fa-folder', label: 'Projects', color: 'from-blue-400 to-blue-600' },
  { id: 'design', icon: 'fa-palette', label: 'Design', color: 'from-pink-400 to-pink-600' },
  { id: 'contact', icon: 'fa-envelope', label: 'Contact', color: 'from-green-400 to-green-600' },
  { id: 'game', icon: 'fa-gamepad', label: 'Games', color: 'from-orange-400 to-orange-600' },
];

export default function Desktop({ 
  openWindows, 
  openWindow, 
  closeWindow, 
  minimizeWindow,
  focusWindow,
  activeWindow,
  showContextMenu
}) {
  const windowList = Object.entries(openWindows).filter(([_, w]) => w.isOpen);

  const sortedWindows = [...windowList].sort(([idA], [idB]) => {
    if (idA === activeWindow) return 1;
    if (idB === activeWindow) return -1;
    return 0;
  });

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onContextMenu={(e) => {
        e.preventDefault();
        showContextMenu(e.clientX, e.clientY);
      }}
    >
      {/* Wallpaper - Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/wallpaper.mp4" type="video/mp4" />
      </video>

      {/* Desktop Icons */}
      <div className="absolute top-14 left-4 flex flex-col gap-1 z-10">
        {desktopApps.map((app, index) => (
          <motion.button
            key={app.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onDoubleClick={() => openWindow(app.id)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-black/10 transition-colors w-20"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${app.color} shadow-lg`}>
              <i className={`fas ${app.icon} text-white`} />
            </div>
            <span className="text-white text-xs text-center drop-shadow-md">{app.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Windows */}
      {sortedWindows.map(([id, window]) => {
        const WindowComponent = windowComponents[id];
        return (
          <Window
            key={id}
            id={id}
            isActive={activeWindow === id}
            isMinimized={window.isMinimized}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onFocus={() => focusWindow(id)}
          >
            <WindowComponent />
          </Window>
        );
      })}

      {/* Desktop Widget */}
      <DesktopWidget />
    </div>
  );
}
