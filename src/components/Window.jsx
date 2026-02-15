import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';

const windowConfigs = {
  about: { title: 'About', iconClass: 'fa-user', defaultWidth: 400, defaultHeight: 450 },
  projects: { title: 'Projects', iconClass: 'fa-folder', defaultWidth: 600, defaultHeight: 450 },
  design: { title: 'Design Studio', iconClass: 'fa-palette', defaultWidth: 450, defaultHeight: 450 },
  contact: { title: 'Contact', iconClass: 'fa-envelope', defaultWidth: 400, defaultHeight: 450 },
  game: { title: 'Games', iconClass: 'fa-gamepad', defaultWidth: 450, defaultHeight: 400 },
  terminal: { title: 'Terminal', iconClass: 'fa-terminal', defaultWidth: 600, defaultHeight: 400 },
};

export default function Window({ 
  id, 
  isActive, 
  isMinimized, 
  onClose, 
  onMinimize, 
  onFocus, 
  children 
}) {
  const [isMaximized, setIsMaximized] = useState(false);
  const config = windowConfigs[id] || windowConfigs.about;
  const containerRef = useRef(null);

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    onMinimize();
  };

  const handleMaximize = (e) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
  };

  if (isMinimized) return null;

  const getWindowSize = () => {
    if (isMaximized) {
      return { width: window.innerWidth - 16, height: window.innerHeight - 136 };
    }
    return undefined;
  };

  const getWindowPosition = () => {
    if (isMaximized) {
      return { x: 8, y: 48 };
    }
    return undefined;
  };

  return (
    <AnimatePresence>
      <Rnd
        default={{
          x: 150 + Math.random() * 100,
          y: 80 + Math.random() * 60,
          width: config.defaultWidth,
          height: config.defaultHeight,
        }}
        minWidth={350}
        minHeight={300}
        dragHandleClassName="window-drag-handle"
        enableResizing={!isMaximized}
        disableDragging={isMaximized}
        size={getWindowSize()}
        position={getWindowPosition()}
        dragBoundFunc={(pos) => {
          if (isMaximized) return pos;
          const maxY = window.innerHeight - 100;
          return {
            left: pos.x,
            top: Math.max(40, Math.min(pos.y, maxY)),
          };
        }}
        className={`fixed z-30 overflow-hidden ${isMaximized ? 'rounded-none' : 'rounded-xl'}`}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(30px)',
          boxShadow: isActive 
            ? '0 20px 60px rgba(0, 0, 0, 0.3)' 
            : '0 10px 30px rgba(0, 0, 0, 0.2)',
        }}
        onMouseDown={onFocus}
      >
        {/* Title bar - macOS style */}
        <div 
          className="window-drag-handle h-8 flex items-center justify-between px-3"
          style={{
            background: isActive ? 'rgba(245, 245, 245, 0.95)' : 'rgba(235, 235, 235, 0.95)',
          }}
          onDoubleClick={handleMaximize}
        >
          {/* Spacer */}
          <div className="flex-1" />

          {/* Traffic lights - right aligned */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full flex items-center justify-center"
              style={{ background: '#ffbd2e' }}
            >
              <i className="fas fa-minus text-[8px] text-yellow-900 opacity-0 hover:opacity-100" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full flex items-center justify-center"
              style={{ background: '#27ca40' }}
            >
              <i className="fas fa-plus text-[8px] text-green-900 opacity-0 hover:opacity-100" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="w-3 h-3 rounded-full flex items-center justify-center"
              style={{ background: '#ff5f56' }}
            >
              <i className="fas fa-times text-[8px] text-red-900 opacity-0 hover:opacity-100" />
            </motion.button>
          </div>

          {/* Title */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <i className={`fas ${config.iconClass} text-black/60 text-xs`} />
            <span className="text-black/80 text-xs font-medium">{config.title}</span>
          </div>
        </div>

        {/* Content */}
        <div 
          className="h-[calc(100%-32px)] overflow-y-auto"
          style={{ background: 'rgba(250, 250, 250, 0.8)' }}
        >
          {children}
        </div>
      </Rnd>
    </AnimatePresence>
  );
}
