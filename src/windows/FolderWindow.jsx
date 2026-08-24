import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Content SVG Vector Icons
const FolderSVG = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md">
    <path fill="#FFC107" d="M56 16H28l-4-6H8c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h48c2.2 0 4-1.8 4-4V20c0-2.2-1.8-4-4-4z" />
    <path fill="#FFD54F" d="M56 20H8c-2.2 0-4 1.8-4 4v32c0 2.2 1.8 4 4 4h48c2.2 0 4-1.8 4-4V24c0-2.2-1.8-4-4-4z" />
  </svg>
);

const FileTextSVG = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md">
    <path fill="#90CAF9" d="M48 64H16c-2.2 0-4-1.8-4-4V4c0-2.2 1.8-4 4-4h20l16 16v44c0 2.2-1.8 4-4 4z" />
    <path fill="#E3F2FD" d="M44 60H20c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h14l12 12v42c0 1.1-.9 2-2 2z" />
    <path fill="#42A5F5" d="M36 0v16h16z" />
    <path fill="#1E88E5" d="M24 24h16v4H24zm0 8h16v4H24zm0 8h12v4H24z" />
  </svg>
);

const ImageSVG = () => (
  <svg viewBox="0 0 64 64" className="w-10 h-10 drop-shadow-md">
    <rect width="56" height="48" x="4" y="8" fill="#81C784" rx="4" />
    <circle cx="20" cy="24" r="6" fill="#FFF59D" />
    <path fill="#388E3C" d="M12 48l12-16 8 10 12-14 8 20z" />
  </svg>
);

export default function FolderWindow({ 
  folder = { id: 'root', name: 'Desktop Folder' }, 
  items: initialItems = [], 
  onDropItem, 
  onOpenItem,
  onCreateFolder,
  onCreateFile,
  onDeleteItem,
}) {
  const [items, setItems] = useState(initialItems.length > 0 ? initialItems : [
    { id: 'f_sub1', name: 'Projects & Docs', type: 'folder', createdAt: Date.now() - 5000 },
    { id: 'f_doc1', name: 'Readme.txt', type: 'file', content: 'Welcome to your File Explorer folder!\nDrag and drop files here or right click to create new files.', createdAt: Date.now(), size: 85 },
    { id: 'f_img1', name: 'Wallpaper_Preview.png', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', createdAt: Date.now() - 2000, size: 240 },
  ]);
  const [activeNav, setActiveNav] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, targetItem: null });

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const itemData = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('itemId');
    if (itemData) {
      try {
        let parsed = JSON.parse(itemData);
        if (parsed && !items.find(i => i.id === parsed.id)) {
          setItems(prev => [...prev, parsed]);
          onDropItem?.(parsed.id, folder.id);
        }
      } catch (err) {
        const newFile = { id: `dragged_${Date.now()}`, name: itemData, type: 'file', createdAt: Date.now() };
        setItems(prev => [...prev, newFile]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleCreateNewFolder = () => {
    const name = `New Folder ${items.filter(i => i.type === 'folder').length + 1}`;
    const newFld = { id: `folder_${Date.now()}`, name, type: 'folder', createdAt: Date.now() };
    setItems(prev => [...prev, newFld]);
    onCreateFolder?.(name);
    setContextMenu({ show: false, x: 0, y: 0, targetItem: null });
  };

  const handleCreateNewFile = () => {
    const name = `New Document ${items.filter(i => i.type === 'file').length + 1}.txt`;
    const newFl = { id: `file_${Date.now()}`, name, type: 'file', content: 'New text document content.', createdAt: Date.now(), size: 24 };
    setItems(prev => [...prev, newFl]);
    onCreateFile?.(name);
    setContextMenu({ show: false, x: 0, y: 0, targetItem: null });
  };

  const handleDeleteSelectedItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
    onDeleteItem?.(id);
    setContextMenu({ show: false, x: 0, y: 0, targetItem: null });
  };

  const handleRightClick = (e, item = null) => {
    e.preventDefault();
    e.stopPropagation();
    if (item) setSelectedItem(item);
    setContextMenu({ show: true, x: e.clientX, y: e.clientY, targetItem: item });
  };

  return (
    <div 
      className="flex h-full select-none relative overflow-hidden text-slate-800"
      style={{ background: '#ffffff' }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onContextMenu={(e) => handleRightClick(e, null)}
      onClick={() => setContextMenu({ show: false, x: 0, y: 0, targetItem: null })}
    >
      {/* Left Sidebar - Exact Projects Window Style */}
      <div 
        className="w-40 p-2 flex flex-col gap-0.5"
        style={{ background: 'rgba(0,0,0,0.03)' }}
      >
        <button
          onClick={() => setActiveNav('home')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
            activeNav === 'home' ? 'bg-blue-100 text-blue-600' : 'text-black/50 hover:bg-black/5 hover:text-black'
          }`}
        >
          <i className="fas fa-home text-xs w-4 text-blue-500" />
          <span>Home Explorer</span>
        </button>
        <button
          onClick={() => setActiveNav('desktop')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
            activeNav === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-black/50 hover:bg-black/5 hover:text-black'
          }`}
        >
          <i className="fas fa-desktop text-xs w-4 text-slate-500" />
          <span>Desktop</span>
        </button>
        <button
          onClick={() => setActiveNav('documents')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left ${
            activeNav === 'documents' ? 'bg-blue-100 text-blue-600' : 'text-black/50 hover:bg-black/5 hover:text-black'
          }`}
        >
          <i className="fas fa-folder text-xs w-4 text-amber-500" />
          <span>Documents</span>
        </button>
      </div>

      {/* Main Content Area - Balanced Padding */}
      <div className="flex-1 p-3.5 h-full overflow-y-auto flex flex-col">
        {/* Path bar & Action Controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-xs text-black/40">
            <i className="fas fa-folder text-yellow-500" />
            <span>Home</span>
            <i className="fas fa-chevron-right" />
            <span className="text-black/60 font-medium">{folder.name}</span>
          </div>

          {/* Quick Creation Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCreateNewFolder}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-semibold text-slate-700 flex items-center gap-1 transition-colors"
            >
              <i className="fas fa-folder-plus text-amber-500 text-[10px]" /> + Folder
            </button>
            <button
              onClick={handleCreateNewFile}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-semibold text-slate-700 flex items-center gap-1 transition-colors"
            >
              <i className="fas fa-file-circle-plus text-blue-500 text-[10px]" /> + File
            </button>
          </div>
        </div>

        {/* Content SVG Grid */}
        <div 
          className={`grid gap-3 p-1 flex-1 transition-colors ${isDragOver ? 'bg-blue-50/50 rounded-xl border-2 border-dashed border-blue-400' : ''}`}
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))' }}
          onClick={() => setSelectedItem(null)}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-400 gap-1.5 col-span-full">
              <FolderSVG />
              <span className="text-xs text-black/40 mt-1">This folder is empty. Drop files here or right-click to create one.</span>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(item))}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
                onDoubleClick={() => onOpenItem?.(item)}
                onContextMenu={(e) => handleRightClick(e, item)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl cursor-pointer group transition-all ${
                  selectedItem?.id === item.id 
                    ? 'bg-blue-50 border border-blue-300 shadow-sm ring-2 ring-blue-500/20' 
                    : 'hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.name} className="w-11 h-11 rounded-lg object-cover shadow-sm" />
                  ) : item.type === 'folder' ? (
                    <FolderSVG />
                  ) : item.type === 'image' ? (
                    <ImageSVG />
                  ) : (
                    <FileTextSVG />
                  )}
                </div>
                <span className="text-xs text-black/80 font-medium text-center truncate w-full group-hover:text-blue-600">
                  {item.name}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Slim 6:16 Ratio PowerToys Peek Preview Sidebar Pane */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ x: 220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 220, opacity: 0 }}
            className="w-52 bg-slate-50 border-l border-slate-200 p-3 flex flex-col gap-2.5 shadow-xl z-20 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                <i className="fas fa-eye text-blue-500" /> PowerToys Peek
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-5 h-5 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <i className="fas fa-times text-[10px]" />
              </button>
            </div>

            {/* Slim 6:16 Aspect Thumbnail Preview Card */}
            <div className="w-full aspect-[6/16] max-h-44 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden shadow-inner relative">
              {selectedItem.thumbnail ? (
                <img src={selectedItem.thumbnail} alt={selectedItem.name} className="w-full h-full object-cover" />
              ) : selectedItem.type === 'folder' ? (
                <div className="scale-125"><FolderSVG /></div>
              ) : (
                <div className="scale-125"><FileTextSVG /></div>
              )}
              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-semibold text-white uppercase">
                {selectedItem.type || 'Item'}
              </span>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1 text-[11px]">
              <h3 className="font-bold text-slate-800 break-words leading-tight">{selectedItem.name}</h3>
              {selectedItem.content && (
                <div className="mt-1 p-2 rounded bg-white border border-slate-200 text-[10px] text-slate-600 font-mono whitespace-pre-wrap max-h-24 overflow-y-auto">
                  {selectedItem.content}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-1.5 pt-2 border-t border-slate-200">
              <button
                onClick={() => onOpenItem?.(selectedItem)}
                className="w-full py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-sm"
              >
                Open Item
              </button>
              <button
                onClick={() => handleDeleteSelectedItem(selectedItem.id)}
                className="w-full py-1 rounded-lg bg-red-50 text-red-600 font-semibold text-[11px] border border-red-200 hover:bg-red-100 transition-colors"
              >
                Delete Item
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right-Click Context Menu */}
      <AnimatePresence>
        {contextMenu.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-50 bg-white rounded-xl shadow-2xl border border-slate-200 py-1 min-w-[160px] text-xs font-medium text-slate-700"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            <button
              onClick={handleCreateNewFolder}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 text-left"
            >
              <i className="fas fa-folder-plus text-amber-500" /> New Folder
            </button>
            <button
              onClick={handleCreateNewFile}
              className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 text-left"
            >
              <i className="fas fa-file-circle-plus text-blue-500" /> New Text Document
            </button>
            {contextMenu.targetItem && (
              <>
                <div className="h-px bg-slate-100 my-1" />
                <button
                  onClick={() => {
                    onOpenItem?.(contextMenu.targetItem);
                    setContextMenu({ show: false, x: 0, y: 0, targetItem: null });
                  }}
                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 text-left"
                >
                  <i className="fas fa-folder-open text-slate-400" /> Open
                </button>
                <button
                  onClick={() => handleDeleteSelectedItem(contextMenu.targetItem.id)}
                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-red-50 text-red-600 text-left"
                >
                  <i className="fas fa-trash" /> Delete
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
