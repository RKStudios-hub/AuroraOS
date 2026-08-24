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
import FolderWindow from '../windows/FolderWindow';
import TextEditorWindow from '../windows/TextEditorWindow';

const windowComponents = {
  about: AboutWindow,
  projects: ProjectsWindow,
  design: DesignWindow,
  contact: ContactWindow,
  game: GameWindow,
  terminal: TerminalWindow,
  paint: PaintWindow,
  browser: BrowserWindow,
  folder: FolderWindow,
  texteditor: TextEditorWindow,
};

const defaultApps = [
  { id: 'about', icon: 'fa-user', label: 'About Me', color: 'from-purple-400 to-purple-600', isApp: true, createdAt: 1, type: 'app', size: 100 },
  { id: 'projects', icon: 'fa-folder-open', label: 'Projects', color: 'from-blue-400 to-blue-600', isApp: true, createdAt: 2, type: 'app', size: 100 },
  { id: 'browser', icon: 'fa-globe', label: 'Browser', color: 'from-blue-400 to-cyan-400', isApp: true, createdAt: 3, type: 'app', size: 100 },
  { id: 'design', icon: 'fa-palette', label: 'Design', color: 'from-pink-400 to-pink-600', isApp: true, createdAt: 4, type: 'app', size: 100 },
  { id: 'paint', icon: 'fa-paintbrush', label: 'Paint', color: 'from-cyan-400 to-cyan-600', isApp: true, createdAt: 5, type: 'app', size: 100 },
  { id: 'contact', icon: 'fa-envelope', label: 'Contact', color: 'from-green-400 to-green-600', isApp: true, createdAt: 6, type: 'app', size: 100 },
  { id: 'game', icon: 'fa-gamepad', label: 'Games', color: 'from-orange-400 to-orange-600', isApp: true, createdAt: 7, type: 'app', size: 100 },
];

function DraggableIcon({ item, onOpen, index, iconSize = 'medium', onSelect, isSelected, onContextMenu }) {
  const getGridConfig = () => {
    switch (iconSize) {
      case 'small': return { size: 70, iconBox: 'w-10 h-10', textSize: 'text-[10px]', width: 64 };
      case 'large': return { size: 110, iconBox: 'w-14 h-14', textSize: 'text-xs', width: 96 };
      default: return { size: 90, iconBox: 'w-12 h-12', textSize: 'text-xs', width: 80 };
    }
  };

  const grid = getGridConfig();
  const [position, setPosition] = useState({ x: 0, y: index * grid.size });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const iconStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ x: 0, y: index * grid.size });
  }, [index, grid.size]);

  const snapToGrid = (val) => Math.round(val / grid.size) * grid.size;

  const handleMouseDown = (e) => {
    e.stopPropagation();
    onSelect?.(item);
    if (e.button !== 0) return; // Only drag on left click
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
      setPosition({
        x: snapToGrid(position.x),
        y: snapToGrid(position.y),
      });
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position, grid.size]);

  return (
    <motion.div
      className={`absolute flex flex-col items-center gap-1 p-2 rounded-xl cursor-pointer select-none z-10 transition-all ${
        isSelected ? 'bg-white/20 border border-white/30 backdrop-blur-md' : 'hover:bg-white/10'
      }`}
      style={{ 
        left: 16 + position.x, 
        top: 56 + position.y,
        width: grid.width,
        transition: isDragging ? 'none' : 'all 0.15s ease-out',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => onOpen(item)}
      onContextMenu={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onSelect?.(item);
        onContextMenu?.(e.clientX, e.clientY, item);
      }}
    >
      <div 
        className={`${grid.iconBox} rounded-xl flex items-center justify-center text-xl shadow-lg ${
          item.isApp 
            ? `bg-gradient-to-br ${item.color}` 
            : item.type === 'folder' 
            ? 'bg-gradient-to-br from-amber-400 to-amber-600' 
            : 'bg-gradient-to-br from-slate-600 to-slate-800'
        }`}
      >
        {item.isApp ? (
          <i className={`fas ${item.icon} text-white`} />
        ) : item.type === 'folder' ? (
          <i className="fas fa-folder text-white" />
        ) : (
          <i className="fas fa-file-alt text-white" />
        )}
      </div>
      <span className={`${grid.textSize} text-white font-medium text-center drop-shadow-md truncate w-full px-0.5`}>
        {item.label || item.name}
      </span>
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
  isMusicPlaying,
  userItems = [],
  desktopSettings = { iconSize: 'medium', sortBy: 'name', showIcons: true },
  selectedItem,
  setSelectedItem,
  activeFile,
  activeFolder,
  saveFileContent
}) {
  const windowList = Object.entries(openWindows).filter(([_, w]) => w.isOpen);

  const sortedWindows = [...windowList].sort(([idA], [idB]) => {
    if (idA === activeWindow) return 1;
    if (idB === activeWindow) return -1;
    return 0;
  });

  // Combine default apps with user items
  const allItems = [...defaultApps, ...userItems];

  // Sorting logic
  const sortedItems = [...allItems].sort((a, b) => {
    const nameA = (a.label || a.name || '').toLowerCase();
    const nameB = (b.label || b.name || '').toLowerCase();

    switch (desktopSettings.sortBy) {
      case 'name':
        return nameA.localeCompare(nameB);
      case 'date':
        return (b.createdAt || 0) - (a.createdAt || 0);
      case 'type':
        return (a.type || 'app').localeCompare(b.type || 'app');
      case 'size':
        return (b.size || 0) - (a.size || 0);
      default:
        return 0;
    }
  });

  const handleOpenItem = (item) => {
    if (item.isApp) {
      openWindow(item.id);
    } else if (item.type === 'folder') {
      openWindow('folder');
    } else if (item.type === 'file') {
      openWindow('texteditor');
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onClick={() => setSelectedItem?.(null)}
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedItem?.(null);
        showContextMenu(e.clientX, e.clientY);
      }}
    >
      {/* Wallpaper Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        ref={(el) => el && el.play().catch(() => {})}
      >
        <source src="./wallpaper.mp4" type="video/mp4" />
      </video>

      {/* Desktop Icons */}
      {desktopSettings.showIcons && sortedItems.map((item, index) => (
        <DraggableIcon 
          key={item.id} 
          item={item} 
          index={index}
          iconSize={desktopSettings.iconSize}
          onOpen={handleOpenItem}
          onSelect={(itm) => setSelectedItem?.(itm)}
          isSelected={selectedItem?.id === item.id}
          onContextMenu={(x, y, itm) => showContextMenu(x, y, itm)}
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
            {id === 'texteditor' ? (
              <WindowComponent file={activeFile} onSave={saveFileContent} onClose={() => closeWindow('texteditor')} />
            ) : id === 'folder' ? (
              <WindowComponent folder={activeFolder || { id: 'root', name: 'Desktop Folder' }} items={[]} onOpenItem={handleOpenItem} />
            ) : (
              <WindowComponent />
            )}
          </Window>
        );
      })}

      {/* Desktop Widget */}
      <DesktopWidget toggleMusic={toggleMusic} isMusicPlaying={isMusicPlaying} />
    </div>
  );
}
