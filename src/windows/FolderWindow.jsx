import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Vector Icons for File Explorer Content
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
  onRenameItem
}) {
  const [items, setItems] = useState(initialItems.length > 0 ? initialItems : [
    { id: 'f_sub1', name: 'Projects & Docs', type: 'folder', createdAt: Date.now() - 5000 },
    { id: 'f_doc1', name: 'Readme.txt', type: 'file', content: 'Welcome to your File Explorer folder!\nDrag and drop files here or right click to create new files.', createdAt: Date.now(), size: 85 },
    { id: 'f_img1', name: 'Wallpaper_Preview.png', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', createdAt: Date.now() - 2000, size: 240 },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, targetItem: null });

  // Handle Drag & Drop into folder
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    // Try dataTransfer text or item id
    const itemData = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('itemId');
    if (itemData) {
      try {
        let parsed = JSON.parse(itemData);
        if (parsed && !items.find(i => i.id === parsed.id)) {
          setItems(prev => [...prev, parsed]);
          onDropItem?.(parsed.id, folder.id);
        }
      } catch (err) {
        // Fallback for simple ID string
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
      className="flex flex-col h-full bg-white text-slate-800 select-none relative overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onContextMenu={(e) => handleRightClick(e, null)}
      onClick={() => setContextMenu({ show: false, x: 0, y: 0, targetItem: null })}
    >
      {/* Action Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleCreateNewFolder}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 shadow-sm transition-all"
          >
            <i className="fas fa-folder-plus text-amber-500" />
            <span>New Folder</span>
          </button>
          <button 
            onClick={handleCreateNewFile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 shadow-sm transition-all"
          >
            <i className="fas fa-file-circle-plus text-blue-500" />
            <span>New File</span>
          </button>
        </div>

        {/* Path bar */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-md border border-slate-200 text-xs text-slate-500">
          <i className="fas fa-desktop text-slate-400" />
          <span>Home</span>
          <i className="fas fa-chevron-right text-[9px] text-slate-300" />
          <span className="font-semibold text-slate-700">{folder.name}</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        <div className="w-44 p-3 bg-slate-50 border-r border-slate-200 flex flex-col gap-1 text-xs">
          <div className="px-2 py-1 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
            Navigation
          </div>
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium text-left">
            <i className="fas fa-home text-blue-500" />
            <span>Home Explorer</span>
          </button>
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-200/60 font-medium text-left">
            <i className="fas fa-desktop text-slate-500" />
            <span>Desktop</span>
          </button>
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-200/60 font-medium text-left">
            <i className="fas fa-folder text-amber-500" />
            <span>Documents</span>
          </button>
        </div>

        {/* File Content Grid */}
        <div 
          className={`flex-1 p-4 overflow-y-auto transition-colors ${isDragOver ? 'bg-blue-50/50 border-2 border-dashed border-blue-400' : 'bg-white'}`}
          onClick={() => setSelectedItem(null)}
        >
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-2">
              <FolderSVG />
              <span className="text-xs font-medium mt-2">Folder is empty. Right-click or drag files here to add items.</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {items.map((item) => (
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
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-pointer group transition-all ${
                    selectedItem?.id === item.id 
                      ? 'bg-blue-50 border border-blue-300 shadow-sm ring-2 ring-blue-500/20' 
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
                  ) : item.type === 'folder' ? (
                    <FolderSVG />
                  ) : item.type === 'image' ? (
                    <ImageSVG />
                  ) : (
                    <FileTextSVG />
                  )}
                  <span className="text-xs font-medium text-slate-700 text-center truncate w-full group-hover:text-blue-600">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Windows PowerToys Style Preview Sidebar Pane */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ x: 240, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 240, opacity: 0 }}
              className="w-64 bg-slate-50 border-l border-slate-200 p-4 flex flex-col gap-4 shadow-xl z-20"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <i className="fas fa-eye text-blue-500" /> PowerToys Peek
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-6 h-6 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center"
                >
                  <i className="fas fa-times text-xs" />
                </button>
              </div>

              {/* Large Thumbnail Preview */}
              <div className="w-full aspect-video rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden shadow-inner">
                {selectedItem.thumbnail ? (
                  <img src={selectedItem.thumbnail} alt={selectedItem.name} className="w-full h-full object-cover" />
                ) : selectedItem.type === 'folder' ? (
                  <div className="scale-125"><FolderSVG /></div>
                ) : (
                  <div className="scale-125"><FileTextSVG /></div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1 text-xs">
                <h3 className="font-bold text-slate-800 break-words">{selectedItem.name}</h3>
                <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                  {selectedItem.type || 'File'}
                </span>
                {selectedItem.content && (
                  <div className="mt-2 p-2 rounded bg-white border border-slate-200 text-[11px] text-slate-600 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                    {selectedItem.content}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => onOpenItem?.(selectedItem)}
                  className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Open Item
                </button>
                <button
                  onClick={() => handleDeleteSelectedItem(selectedItem.id)}
                  className="w-full py-1.5 rounded-lg bg-red-50 text-red-600 font-semibold text-xs border border-red-200 hover:bg-red-100 transition-colors"
                >
                  Delete Item
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Internal Right-Click Context Menu */}
      <AnimatePresence>
        {contextMenu.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-50 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 min-w-[170px] text-xs font-medium text-slate-700"
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
