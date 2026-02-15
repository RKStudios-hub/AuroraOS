import { motion } from 'framer-motion';

const menuItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'design', label: 'Design' },
  { id: 'contact', label: 'Contact' },
  { id: 'game', label: 'Games' },
];

export default function ContextMenu({ x, y, onClose, openWindow }) {
  const handleItemClick = (item) => {
    if (['about', 'projects', 'design', 'contact', 'game'].includes(item.id)) {
      openWindow(item.id);
    } else if (item.id === 'refresh') {
      window.location.reload();
    }
    onClose();
  };

  const menuStyle = {
    left: Math.min(x, window.innerWidth - 180),
    top: Math.min(y, window.innerHeight - 250),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed z-[9998] bg-[#1e293b] rounded-xl shadow-xl overflow-hidden border border-[#334155]"
      style={menuStyle}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1 min-w-[160px]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="w-full px-4 py-2 text-left text-sm text-[#e2e8f0] hover:bg-[#38bdf8] hover:text-white transition-colors"
          >
            {item.label}
          </button>
        ))}
        
        <div className="h-px bg-[#334155] my-1" />
        
        <button
          onClick={() => { window.location.reload(); onClose(); }}
          className="w-full px-4 py-2 text-left text-sm text-[#94a3b8] hover:bg-[#38bdf8] hover:text-white transition-colors"
        >
          Refresh
        </button>
      </div>
    </motion.div>
  );
}
