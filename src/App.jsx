import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Desktop from './components/Desktop';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import BootScreen from './components/BootScreen';
import CustomCursor from './components/CustomCursor';
import ContextMenu from './components/ContextMenu';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [openWindows, setOpenWindows] = useState({});
  const [activeWindow, setActiveWindow] = useState(null);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  const windowTitles = {
    about: 'About',
    projects: 'Projects',
    design: 'Design Studio',
    contact: 'Contact',
    game: 'Games',
  };

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 4000);
    return () => clearTimeout(bootTimer);
  }, []);

  const openWindow = useCallback((windowId) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: true,
        isMinimized: false
      }
    }));
    setActiveWindow(windowId);
  }, []);

  const closeWindow = useCallback((windowId) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: false,
        isMinimized: false
      }
    }));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const minimizeWindow = useCallback((windowId) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMinimized: true
      }
    }));
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const focusWindow = useCallback((windowId) => {
    setActiveWindow(windowId);
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMinimized: false
      }
    }));
  }, []);

  const showContextMenu = useCallback((x, y) => {
    setContextMenu({ show: true, x, y });
  }, []);

  const hideContextMenu = useCallback(() => {
    setContextMenu({ show: false, x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (contextMenu.show) {
      const handleClick = () => hideContextMenu();
      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, [contextMenu.show, hideContextMenu]);

  return (
    <div className="w-full h-full overflow-hidden select-none">
      <CustomCursor />
      
      <AnimatePresence>
        {isBooting && <BootScreen key="boot" />}
      </AnimatePresence>

      {!isBooting && (
        <>
          <MenuBar activeWindow={activeWindow} windowTitles={windowTitles} />
          <Desktop 
            openWindows={openWindows}
            openWindow={openWindow}
            closeWindow={closeWindow}
            minimizeWindow={minimizeWindow}
            focusWindow={focusWindow}
            activeWindow={activeWindow}
            showContextMenu={showContextMenu}
          />
          <Dock onOpenApp={openWindow} />
          
          <AnimatePresence>
            {contextMenu.show && (
              <ContextMenu 
                x={contextMenu.x} 
                y={contextMenu.y} 
                onClose={hideContextMenu}
                openWindow={openWindow}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
