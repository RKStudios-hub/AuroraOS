import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Desktop from './components/Desktop';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import BootScreen from './components/BootScreen';
import CustomCursor from './components/CustomCursor';
import ContextMenu from './components/ContextMenu';
import Notification from './components/Notification';
import StartScreen from './components/StartScreen';

function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [openWindows, setOpenWindows] = useState({});
  const [activeWindow, setActiveWindow] = useState(null);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [notification, setNotification] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(new Audio('/notification.wav'));
  const musicRef = useRef(new Audio('/music.mp3'));
  audioRef.current.volume = 0.5;
  musicRef.current.volume = 0.15;
  musicRef.current.loop = true;
  
  const handleStart = () => {
    setShowStartScreen(false);
    setIsBooting(true);
    setStartTime(Date.now());
    setTimeout(() => {
      musicRef.current.play().catch(() => {});
      setIsMusicPlaying(true);
    }, 2000);
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      musicRef.current.pause();
    } else {
      musicRef.current.play().catch(() => {});
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const windowTitles = {
    about: 'About',
    projects: 'Projects',
    design: 'Design Studio',
    contact: 'Contact',
    game: 'Games',
    terminal: 'Terminal',
    paint: 'Paint - RK Studio',
  };

  useEffect(() => {
    if (!showStartScreen && isBooting) {
      const bootTimer = setTimeout(() => {
        setIsBooting(false);
      }, 4000);
      return () => clearTimeout(bootTimer);
    }
  }, [showStartScreen, isBooting]);

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

  const restoreWindow = useCallback((windowId) => {
    setOpenWindows(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMinimized: false
      }
    }));
    setActiveWindow(windowId);
  }, []);

  const showContextMenu = useCallback((x, y) => {
    setContextMenu({ show: true, x, y });
  }, []);

  const hideContextMenu = useCallback(() => {
    setContextMenu({ show: false, x: 0, y: 0 });
  }, []);

  const showNotification = useCallback((message, type = 'someone') => {
    setNotification({ message, type });
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => setNotification(null), 12000);
  }, []);

  useEffect(() => {
    if (!startTime) return;
    
    const timeouts = [
      setTimeout(() => showNotification("New on the OS ? I'll advice you to check out the About Me.exe", "someone"), 8000),
      setTimeout(() => showNotification("If i were you i would definitely check the Projects folder , it already looks fisshy", "someone"), 40000),
      setTimeout(() => showNotification("Liked my site and want to contact me, press on the Contact.exe Hahahaha..", "someone"), 105000),
      setTimeout(() => showNotification("Btw Thanks for visiting my site, also consider about supporting me on youtube and github.", "someone"), 285000),
    ];
    return () => timeouts.forEach(t => clearTimeout(t));
  }, [startTime]);

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
        {showStartScreen && <StartScreen key="start" onStart={handleStart} />}
        {isBooting && !showStartScreen && <BootScreen key="boot" />}
      </AnimatePresence>

      {!isBooting && !showStartScreen && (
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
            toggleMusic={toggleMusic}
            isMusicPlaying={isMusicPlaying}
          />
          <Dock onOpenApp={openWindow} showNotification={showNotification} openWindows={openWindows} restoreWindow={restoreWindow} minimizeWindow={minimizeWindow} />
          
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

          <AnimatePresence>
            {notification && (
              <Notification 
                message={notification.message} 
                type={notification.type}
                onClose={() => setNotification(null)} 
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
