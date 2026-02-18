import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RenameDialog({ item, onClose, onRename }) {
  const [name, setName] = useState(item?.name || '');

  useEffect(() => {
    if (item) {
      const ext = item.name.includes('.') ? item.name.substring(item.name.lastIndexOf('.')) : '';
      const baseName = ext ? item.name.substring(0, item.name.lastIndexOf('.')) : item.name;
      setName(baseName);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const ext = item.name.includes('.') ? item.name.substring(item.name.lastIndexOf('.')) : '';
    const newName = ext ? `${name.trim()}${ext}` : name.trim();
    onRename(item.id, newName);
    onClose();
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-[#1e1e1e] rounded-xl shadow-2xl border border-white/10 p-6 w-80"
      >
        <h3 className="text-white text-lg font-medium mb-4">Rename</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-white/10 focus:border-blue-500 focus:outline-none"
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Rename
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
