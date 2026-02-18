import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContextMenu({ x, y, onClose, openWindow, desktopSettings, setDesktopSettings, showNotification, createFolder, createFile, renameItem, deleteItem, selectedItem, setRenameDialog }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleSetIconSize = (size) => {
    setDesktopSettings(prev => ({ ...prev, iconSize: size }));
    showNotification(`Icon size set to ${size}`, 'system');
    onClose();
  };

  const handleSortBy = (sortBy) => {
    setDesktopSettings(prev => ({ ...prev, sortBy, autoArrange: true }));
    showNotification(`Sorted by ${sortBy}`, 'system');
    onClose();
  };

  const handleToggleAutoArrange = () => {
    setDesktopSettings(prev => ({ ...prev, autoArrange: !prev.autoArrange }));
    showNotification(desktopSettings.autoArrange ? 'Auto arrange off' : 'Auto arrange on', 'system');
    onClose();
  };

  const handleToggleAlignGrid = () => {
    setDesktopSettings(prev => ({ ...prev, alignToGrid: !prev.alignToGrid }));
    onClose();
  };

  const handleToggleShowIcons = () => {
    setDesktopSettings(prev => ({ ...prev, showIcons: !prev.showIcons }));
    showNotification(desktopSettings.showIcons ? 'Desktop icons hidden' : 'Desktop icons shown', 'system');
    onClose();
  };

  const handleNewFolder = () => {
    createFolder?.('New Folder');
    onClose();
  };

  const handleNewFile = () => {
    createFile?.('New Text Document.txt');
    onClose();
  };

  const handleRename = () => {
    if (selectedItem) {
      setRenameDialog?.({ show: true, item: selectedItem, newName: '' });
    }
    onClose();
  };

  const handleDelete = () => {
    if (selectedItem) {
      deleteItem?.(selectedItem.id);
    }
    onClose();
  };

  const handleOpenItem = () => {
    if (!selectedItem) return;
    
    if (selectedItem.isDesktopApp) {
      const appId = selectedItem.id.replace('desktop_', '');
      openWindow(appId);
    } else if (selectedItem.type === 'folder') {
      openWindow(`folder_${selectedItem.id}`);
    } else if (selectedItem.name?.endsWith('.txt')) {
      openWindow('texteditor');
    }
    onClose();
  };

  const desktopMenuItems = [
    { 
      label: 'View', 
      icon: 'fa-eye',
      submenu: [
        { label: 'Large icons', onClick: () => handleSetIconSize('large'), checked: desktopSettings?.iconSize === 'large' },
        { label: 'Medium icons', onClick: () => handleSetIconSize('medium'), checked: desktopSettings?.iconSize === 'medium' },
        { label: 'Small icons', onClick: () => handleSetIconSize('small'), checked: desktopSettings?.iconSize === 'small' },
        { type: 'divider' },
        { label: 'Auto arrange icons', onClick: handleToggleAutoArrange, checked: desktopSettings?.autoArrange },
        { label: 'Align icons to grid', onClick: handleToggleAlignGrid, checked: desktopSettings?.alignToGrid },
        { label: 'Show desktop icons', onClick: handleToggleShowIcons, checked: desktopSettings?.showIcons },
      ]
    },
    { 
      label: 'Sort by', 
      icon: 'fa-sort',
      submenu: [
        { label: 'Name', onClick: () => handleSortBy('name') },
        { label: 'Size', onClick: () => handleSortBy('size') },
        { label: 'Item type', onClick: () => handleSortBy('type') },
        { label: 'Date modified', onClick: () => handleSortBy('date') },
      ]
    },
    { 
      label: 'Refresh', 
      icon: 'fa-sync-alt',
      onClick: () => { window.location.reload(); onClose(); }
    },
    { type: 'divider' },
    { 
      label: 'New', 
      icon: 'fa-plus',
      submenu: [
        { label: 'Folder', onClick: handleNewFolder },
        { label: 'Text Document', onClick: handleNewFile },
      ]
    },
    { type: 'divider' },
    { 
      label: 'Display settings', 
      icon: 'fa-desktop',
      onClick: () => { openWindow('browser'); onClose(); }
    },
    { 
      label: 'Personalize', 
      icon: 'fa-palette',
      onClick: () => { openWindow('design'); onClose(); }
    },
    { 
      label: 'Open in Terminal', 
      icon: 'fa-terminal',
      onClick: () => { openWindow('terminal'); onClose(); }
    },
    { type: 'divider' },
    { 
      label: 'Show more options', 
      icon: 'fa-ellipsis-h',
      submenu: [
        { label: 'Undo', onClick: () => { showNotification('Nothing to undo', 'system'); onClose(); } },
        { label: 'Cut', onClick: () => { showNotification('Cut to clipboard', 'system'); onClose(); } },
        { label: 'Copy', onClick: () => { showNotification('Copied to clipboard', 'system'); onClose(); } },
        { label: 'Paste', onClick: () => { showNotification('Nothing to paste', 'system'); onClose(); } },
        { type: 'divider' },
        { label: 'Properties', onClick: () => { showNotification('AuroraOS v1.0', 'system'); onClose(); } },
      ]
    },
  ];

  const itemMenuItems = selectedItem ? [
    { label: 'Open', icon: 'fa-folder-open', onClick: handleOpenItem },
    { label: 'Rename', icon: 'fa-edit', onClick: handleRename },
    ...(!selectedItem.isDesktopApp ? [{ label: 'Delete', icon: 'fa-trash', onClick: handleDelete }] : []),
  ] : [];

  const menuItems = selectedItem ? itemMenuItems : desktopMenuItems;

  const adjustedX = Math.min(x, window.innerWidth - 220);
  const adjustedY = Math.min(y, window.innerHeight - 400);

  const renderMenuItem = (item, index) => {
    if (item.type === 'divider') {
      return <div key={index} className="h-[1px] bg-white/10 my-1" />;
    }

    const hasSubmenu = !!item.submenu;
    const isSubmenuOpen = openSubmenu === index;

    return (
      <div key={index} className="relative">
        <button
          className="w-full px-3 py-1.5 flex items-center gap-3 text-white/90 hover:bg-white/10 text-sm text-left"
          onMouseEnter={() => hasSubmenu && setOpenSubmenu(index)}
          onClick={() => {
            if (item.onClick) {
              item.onClick();
            } else if (hasSubmenu) {
              setOpenSubmenu(isSubmenuOpen ? null : index);
            }
          }}
        >
          <i className={`fas ${item.icon || 'fa-circle'} w-4 text-center text-white/70`} />
          <span className="flex-1">{item.label}</span>
          {hasSubmenu && <i className="fas fa-chevron-right text-[10px] text-white/50" />}
        </button>

        <AnimatePresence>
          {hasSubmenu && isSubmenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-full top-0 ml-1 bg-[#202020]/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 py-1 min-w-[180px]"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              {item.submenu.map((subItem, subIndex) => (
                subItem.type === 'divider' ? (
                  <div key={subIndex} className="h-[1px] bg-white/10 my-1" />
                ) : (
                  <button
                    key={subIndex}
                    className="w-full px-3 py-1.5 flex items-center gap-3 text-white/90 hover:bg-white/10 text-sm text-left"
                    onClick={() => subItem.onClick?.()}
                  >
                    {subItem.checked !== undefined && (
                      <i className={`fas ${subItem.checked ? 'fa-check-square' : 'fa-square'} w-4 text-center text-white/70`} />
                    )}
                    <span className="flex-1">{subItem.label}</span>
                  </button>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed z-50"
        style={{ left: adjustedX, top: adjustedY }}
      >
        <div className="bg-[#202020]/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 py-1 min-w-[200px]" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </div>
      </motion.div>
    </>
  );
}
