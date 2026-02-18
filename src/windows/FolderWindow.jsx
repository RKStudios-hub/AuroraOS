import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FolderWindow({ folder, items, onDropItem, onDeleteItem, onRenameItem, onOpenItem, onClose }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    if (itemId) {
      onDropItem(itemId, folder.id);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleItemClick = (item) => {
    setSelectedItem(item.id === selectedItem ? null : item.id);
  };

  const handleItemDoubleClick = (item) => {
    onOpenItem(item);
  };

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setSelectedItem(item.id);
  };

  return (
    <div 
      className="flex h-full" 
      style={{ background: '#ffffff' }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Sidebar */}
      <div 
        className="w-40 p-2 flex flex-col gap-0.5"
        style={{ background: 'rgba(0,0,0,0.03)' }}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-black/60">
          <i className="fas fa-folder text-yellow-500" />
          <span className="text-xs">{folder.name}</span>
        </div>
        <div className="h-px bg-black/10 my-1" />
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-black/50 hover:bg-black/5 hover:text-black text-left">
          <i className="fas fa-home text-xs w-4" />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-black/50 hover:bg-black/5 hover:text-black text-left">
          <i className="fas fa-folder text-xs w-4" />
          <span className="text-xs">Desktop</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 h-full overflow-auto">
        {/* Path bar */}
        <div className="flex items-center gap-1 text-xs text-black/40 mb-4">
          <i className="fas fa-folder" />
          <span>Home</span>
          <i className="fas fa-chevron-right" />
          <span className="text-black/60">{folder.name}</span>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-black/30">
            <i className="fas fa-folder-open text-4xl mb-2" />
            <span className="text-sm">Drop files here</span>
          </div>
        )}

        {/* Grid */}
        <div className="grid gap-2 p-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => handleItemClick(item)}
              onDoubleClick={() => handleItemDoubleClick(item)}
              onContextMenu={(e) => handleContextMenu(e, item)}
              className={`flex flex-col items-center gap-1 p-1 rounded-xl cursor-pointer group ${
                selectedItem === item.id ? 'bg-blue-100' : ''
              }`}
            >
              <div 
                className="rounded-lg flex items-center justify-center"
                style={{ 
                  width: 'min(6vw, 70px)',
                  aspectRatio: '1',
                  background: item.type === 'folder' 
                    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                    : 'linear-gradient(135deg, #6b7280, #4b5563)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              >
                <i className={`fas ${item.type === 'folder' ? 'fa-folder' : 'fa-file-alt'} text-white text-xl`} />
              </div>
              <span className="text-xs text-black/70 text-center group-hover:text-black truncate w-full">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
