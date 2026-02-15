import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Window from './Window';
import DesktopWidget from './DesktopWidget';
import AboutWindow from '../windows/AboutWindow';
import ProjectsWindow from '../windows/ProjectsWindow';
import DesignWindow from '../windows/DesignWindow';
import ContactWindow from '../windows/ContactWindow';
import GameWindow from '../windows/GameWindow';
import TerminalWindow from '../windows/TerminalWindow';
import PaintWindow from '../windows/PaintWindow';
import BrowserWindow from '../windows/BrowserWindow';

const windowComponents = {
  about: AboutWindow,
  projects: ProjectsWindow,
  design: DesignWindow,
  contact: ContactWindow,
  game: GameWindow,
  terminal: TerminalWindow,
  paint: PaintWindow,
  browser: BrowserWindow,
};

const desktopApps = [
  { id: 'about', icon: 'fa-user', label: 'About Me', color: 'from-purple-400 to-purple-600' },
  { id: 'projects', icon: 'fa-folder', label: 'Projects', color: 'from-blue-400 to-blue-600' },
  { id: 'browser', icon: 'fa-globe', label: 'Browser', color: 'from-blue-400 to-cyan-400' },
  { id: 'design', icon: 'fa-palette', label: 'Design', color: 'from-pink-400 to-pink-600' },
  { id: 'paint', icon: 'fa-paintbrush', label: 'Paint', color: 'from-cyan-400 to-cyan-600' },
  { id: 'contact', icon: 'fa-envelope', label: 'Contact', color: 'from-green-400 to-green-600' },
  { id: 'game', icon: 'fa-gamepad', label: 'Games', color: 'from-orange-400 to-orange-600' },
];

const GRID_SIZE = 90;

function DraggableIcon({ app, onOpen, index }) {
  const [position, setPosition] = useState({ x: 0, y: index * GRID_SIZE });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const iconStart = useRef({ x: 0, y: 0 });

  const snapToGrid = (value) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    iconStart.current = { ...position };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition({
        x: Math.max(0, iconStart.current.x + dx),
        y: Math.max(0, iconStart.current.y + dy),
      });
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      const snapped = {
        x: snapToGrid(position.x),
        y: snapToGrid(position.y),
      };
      setPosition(snapped);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1 p-2 rounded-lg cursor-grab z-10"
      style={{ 
        left: 16 + position.x, 
        top: 56 + position.y,
        width: 80,
        transition: isDragging ? 'none' : 'all 0.15s ease-out',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => onOpen(app.id)}
    >
      <div 
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${app.color} shadow-lg`}
      >
        <i className={`fas ${app.icon} text-white`} />
      </div>
      <span className="text-white text-xs text-center drop-shadow-md">{app.label}</span>
    </motion.div>
  );
}

export default function Desktop({ 
  openWindows, 
  openWindow, 
  closeWindow, 
  minimizeWindow,
  focusWindow,
  activeWindow,
  showContextMenu,
  toggleMusic,
  isMusicPlaying
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
      {desktopApps.map((app, index) => (
        <DraggableIcon 
          key={app.id} 
          app={app} 
          index={index}
          onOpen={openWindow}
        />
      ))}

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
      <DesktopWidget toggleMusic={toggleMusic} isMusicPlaying={isMusicPlaying} />
    </div>
  );
}
