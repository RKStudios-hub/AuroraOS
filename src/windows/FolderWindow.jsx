import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FolderWindow({ 
  folder = { id: 'root', name: 'Desktop Folder' }, 
  items: initialItems = [], 
  onDropItem, 
  onOpenItem,
  onCreateFolder,
  onCreateFile
}) {
  const [items, setItems] = useState(initialItems.length > 0 ? initialItems : [
    { id: 'f_sub1', name: 'Projects & Docs', type: 'folder', createdAt: Date.now() - 5000 },
    { id: 'f_doc1', name: 'Readme.txt', type: 'file', content: 'Welcome to your File Explorer folder!\nDrag and drop files here.', createdAt: Date.now() },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const itemData = e.dataTransfer.getData('text/plain');
    if (itemData) {
      try {
        const parsed = JSON.parse(itemData);
        if (parsed && !items.find(i => i.id === parsed.id)) {
          setItems(prev => [...prev, parsed]);
        }
      } catch (err) {}
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleItemDragStart = (e, item) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleCreateNewFolder = () => {
    const name = `Folder ${items.filter(i => i.type === 'folder').length + 1}`;
    const newFld = { id: `folder_${Date.now()}`, name, type: 'folder', createdAt: Date.now() };
    setItems(prev => [...prev, newFld]);
    onCreateFolder?.(name);
  };

  const handleCreateNewFile = () => {
    const name = `Document ${items.filter(i => i.type === 'file').length + 1}.txt`;
    const newFl = { id: `file_${Date.now()}`, name, type: 'file', content: 'New text document', createdAt: Date.now() };
    setItems(prev => [...prev, newFl]);
    onCreateFile?.(name);
  };

  return (
    <div 
      className="flex flex-col h-full bg-white text-slate-800 select-none"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* Explorer Action Toolbar (Light Theme) */}
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
            <span>New Text File</span>
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

      {/* Main Body with Sidebar & Grid */}
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

        {/* File Grid */}
        <div className={`flex-1 p-4 overflow-y-auto transition-colors ${isDragOver ? 'bg-blue-50/50 border-2 border-dashed border-blue-400' : 'bg-white'}`}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 gap-2">
              <i className="fas fa-folder-open text-4xl text-slate-300" />
              <span className="text-xs font-medium">This folder is empty. Drag and drop files here or click "New Folder"</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  draggable
                  onDragStart={(e) => handleItemDragStart(e, item)}
                  onClick={() => setSelectedItem(item.id)}
                  onDoubleClick={() => onOpenItem?.(item)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-pointer group transition-all ${
                    selectedItem === item.id 
                      ? 'bg-blue-50 border border-blue-300 shadow-sm' 
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md ${
                    item.type === 'folder' 
                      ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white' 
                      : 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white'
                  }`}>
                    <i className={`fas ${item.type === 'folder' ? 'fa-folder' : 'fa-file-alt'}`} />
                  </div>
                  <span className="text-xs font-medium text-slate-700 text-center truncate w-full group-hover:text-blue-600">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
