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
import RenameDialog from './components/RenameDialog';

function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [openWindows, setOpenWindows] = useState({});
  const [activeWindow, setActiveWindow] = useState(null);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, targetItem: null });
  const [notification, setNotification] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Desktop files, folders, and settings state
  const [userItems, setUserItems] = useState([
    { id: 'folder_1', name: 'My Documents', type: 'folder', createdAt: Date.now() - 10000, size: 0 },
    { id: 'file_1', name: 'Welcome.txt', type: 'file', content: 'Welcome to AuroraOS!\nMade by RK Studios.', createdAt: Date.now(), size: 42 }
  ]);
  const [desktopSettings, setDesktopSettings] = useState({
    iconSize: 'medium',
    sortBy: 'name',
    autoArrange: true,
    alignToGrid: true,
    showIcons: true,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [renameDialog, setRenameDialog] = useState({ show: false, item: null });
  const [activeFile, setActiveFile] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);

  const audioRef = useRef(new Audio('./notification.wav'));
  const musicRef = useRef(new Audio('./music.mp3'));
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
    browser: 'Browser',
    folder: activeFolder ? activeFolder.name : 'Folder',
    texteditor: activeFile ? activeFile.name : 'Text Editor',
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

  const showContextMenu = useCallback((x, y, item = null) => {
    if (item) {
      setSelectedItem(item);
    }
    setContextMenu({ show: true, x, y, targetItem: item });
  }, []);

  const hideContextMenu = useCallback(() => {
    setContextMenu({ show: false, x: 0, y: 0, targetItem: null });
  }, []);

  const showNotification = useCallback((message, type = 'someone') => {
    setNotification({ message, type });
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => setNotification(null), 12000);
  }, []);

  // Folder & File handlers
  const createFolder = (name = 'New Folder') => {
    const newFolder = {
      id: `folder_${Date.now()}`,
      name,
      type: 'folder',
      createdAt: Date.now(),
      size: 0,
    };
    setUserItems(prev => [...prev, newFolder]);
    showNotification(`Created ${name}`, 'system');
  };

  const createFile = (name = 'New Text Document.txt') => {
    const newFile = {
      id: `file_${Date.now()}`,
      name,
      type: 'file',
      content: '',
      createdAt: Date.now(),
      size: 0,
    };
    setUserItems(prev => [...prev, newFile]);
    setActiveFile(newFile);
    openWindow('texteditor');
    showNotification(`Created ${name}`, 'system');
  };

  const renameItem = (id, newName) => {
    setUserItems(prev => prev.map(item => item.id === id ? { ...item, name: newName } : item));
    showNotification(`Renamed to ${newName}`, 'system');
  };

  const deleteItem = (id) => {
    setUserItems(prev => prev.filter(item => item.id !== id));
    setSelectedItem(null);
    showNotification('Item moved to Recycle Bin', 'recycle');
  };

  const handleDesktopRefresh = () => {
    setSelectedItem(null);
    // Sort array or refresh desktop view without reloading page
    setUserItems(prev => [...prev]);
    showNotification('Desktop refreshed', 'system');
  };

  const saveFileContent = (file) => {
    setUserItems(prev => prev.map(item => item.id === file.id ? { ...item, content: file.content, name: file.name, size: file.content.length } : item));
    setActiveFile(file);
    showNotification('File saved', 'system');
  };

  useEffect(() => {
    if (!startTime) return;
    
    const timeouts = [
      setTimeout(() => showNotification("New on the OS ? I'll advice you to check out the About Me.exe", "someone"), 8000),
      setTimeout(() => showNotification("If i were you i would definitely check the Projects folder , it already looks fisshy", "someone"), 40000),
      setTimeout(() => showNotification("Liked my site and want to contact me, press on the Contact.exe Hahahaha..", "someone"), 105000),
      setTimeout(() => showNotification("Btw Thanks for visiting my site, also consider about supporting me on youtube and github.", "someone"), 285000),
    ];
    return () => timeouts.forEach(t => clearTimeout(t));
  }, [startTime, showNotification]);

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
          <MenuBar activeWindow={activeWindow} windowTitles={windowTitles} musicRef={musicRef} isMusicPlaying={isMusicPlaying} />
          <Desktop 
            openWindows={openWindows}
            openWindow={(id) => {
              if (id === 'texteditor' && !activeFile && userItems.find(i => i.type === 'file')) {
                setActiveFile(userItems.find(i => i.type === 'file'));
              }
              if (id === 'folder' && !activeFolder && userItems.find(i => i.type === 'folder')) {
                setActiveFolder(userItems.find(i => i.type === 'folder'));
              }
              openWindow(id);
            }}
            closeWindow={closeWindow}
            minimizeWindow={minimizeWindow}
            focusWindow={focusWindow}
            activeWindow={activeWindow}
            showContextMenu={showContextMenu}
            toggleMusic={toggleMusic}
            isMusicPlaying={isMusicPlaying}
            userItems={userItems}
            desktopSettings={desktopSettings}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            activeFile={activeFile}
            activeFolder={activeFolder}
            saveFileContent={saveFileContent}
          />
          <Dock onOpenApp={openWindow} showNotification={showNotification} openWindows={openWindows} restoreWindow={restoreWindow} minimizeWindow={minimizeWindow} />
          
          <AnimatePresence>
            {contextMenu.show && (
              <ContextMenu 
                x={contextMenu.x} 
                y={contextMenu.y} 
                onClose={hideContextMenu}
                openWindow={openWindow}
                desktopSettings={desktopSettings}
                setDesktopSettings={setDesktopSettings}
                showNotification={showNotification}
                createFolder={createFolder}
                createFile={createFile}
                renameItem={renameItem}
                deleteItem={deleteItem}
                selectedItem={contextMenu.targetItem || selectedItem}
                setRenameDialog={(dlg) => setRenameDialog(dlg)}
                handleDesktopRefresh={handleDesktopRefresh}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {renameDialog.show && (
              <RenameDialog 
                item={renameDialog.item}
                onClose={() => setRenameDialog({ show: false, item: null })}
                onRename={renameItem}
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
