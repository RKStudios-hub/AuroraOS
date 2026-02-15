import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const windowInfo = {
  about: { iconClass: 'fa-user', label: 'About' },
  projects: { iconClass: 'fa-folder', label: 'Projects' },
  design: { iconClass: 'fa-palette', label: 'Design' },
  contact: { iconClass: 'fa-paper-plane', label: 'Contact' },
  game: { iconClass: 'fa-gamepad', label: 'Games' },
};

export default function Taskbar({ openWindows, activeWindow, focusWindow, minimizeWindow }) {
  const [time, setTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindowList = Object.entries(openWindows).filter(([_, w]) => w.isOpen);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Taskbar */}
      <div 
        className="h-11 flex items-center justify-between px-3"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Start button */}
        <div className="flex items-center gap-2">
          <motion.button
            className="h-8 px-3 rounded-lg flex items-center justify-center text-sm text-pink-400 font-bold"
            style={{
              background: 'rgba(255, 105, 180, 0.15)',
            }}
            whileHover={{ backgroundColor: 'rgba(255, 105, 180, 0.25)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <i className="fas fa-home" />
          </motion.button>
        </div>

        {/* Window tabs */}
        <div className="flex-1 flex items-center justify-center gap-1 mx-4">
          <AnimatePresence>
            {openWindowList.map(([id, window]) => {
              const info = windowInfo[id];
              const isActive = activeWindow === id && !window.isMinimized;
              
              return (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all
                    ${isActive 
                      ? 'bg-pink-500/20 text-pink-300' 
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }
                  `}
                  onClick={() => isActive ? minimizeWindow(id) : focusWindow(id)}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`fas ${info.iconClass} text-xs`} />
                  <span className="font-medium">{info.label}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right: Clock */}
        <div className="flex items-center gap-3">
          <div 
            className="text-sm text-white/80 font-mono flex items-center gap-2"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '4px 12px',
              borderRadius: '6px',
            }}
          >
            <i className="fas fa-clock text-xs" />
            {time.toLocaleTimeString('en-US', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-12 left-3 w-64 rounded-xl p-3"
            style={{
              background: 'rgba(20, 20, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 mb-2 border-b border-white/10">
              <i className="fas fa-folder text-2xl text-pink-400" />
              <div>
                <div className="font-bold text-pink-400">RK OS</div>
                <div className="text-xs text-white/50">Pastel Edition</div>
              </div>
            </div>

            {/* Apps grid */}
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(windowInfo).map(([id, info]) => (
                <motion.button
                  key={id}
                  whileHover={{ backgroundColor: 'rgba(255, 105, 180, 0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-3 rounded-lg text-left text-white/80 hover:text-white transition-colors"
                  onClick={() => {
                    focusWindow(id);
                    setIsExpanded(false);
                  }}
                >
                  <i className={`fas ${info.iconClass} text-lg`} />
                  <span className="text-sm font-medium">{info.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-3 pt-2 border-t border-white/10 flex justify-between text-xs text-white/40">
              <span>© 2026 RK Studios</span>
              <i className="fas fa-folder text-pink-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
