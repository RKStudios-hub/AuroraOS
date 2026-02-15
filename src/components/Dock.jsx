import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const dockApps = [
  { id: 'facebook', icon: 'fa-facebook-f', name: 'Facebook', gradient: 'linear-gradient(135deg, #1877f2, #405de6)', url: 'https://www.facebook.com' },
  { id: 'design', icon: 'fa-palette', name: 'Design', color: '#ff6b6b' },
  { id: 'instagram', icon: 'fa-instagram', name: 'Instagram', gradient: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', url: 'https://instagram.com' },
  { id: 'whatsapp', icon: 'fa-whatsapp', name: 'WhatsApp', gradient: 'linear-gradient(135deg, #25d366, #128c7e)', url: 'https://whatsapp.com' },
  { id: 'discord', icon: 'fa-discord', name: 'Discord', gradient: 'linear-gradient(135deg, #5865f2, #7289da)', url: 'https://discord.gg/xwH3u8EGh3' },
  { id: 'linkedin', icon: 'fa-linkedin-in', name: 'LinkedIn', gradient: 'linear-gradient(135deg, #0077b5, #0a66c2)', url: 'https://linkedin.com' },
  { id: 'terminal', name: 'Terminal', gradient: 'linear-gradient(135deg, #2d2d2d, #1a1a1a)', icon: null },
];

export default function Dock({ onOpenApp, showNotification }) {
  const [trashClickCount, setTrashClickCount] = useState(0);

  const handleClick = (app) => {
    if (app.url) {
      window.open(app.url, '_blank');
    } else {
      onOpenApp(app.id);
    }
  };

  const handleTrashClick = () => {
    setTrashClickCount(prev => prev + 1);
    let message;
    if (trashClickCount === 0) {
      message = "trying to delete something ?";
    } else if (trashClickCount === 1) {
      message = "still trying to delete something ?";
    } else {
      message = "again ?";
    }
    showNotification(message, 'recycle');
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
      {/* Dock container */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="flex items-end gap-1 px-3 py-2 rounded-2xl"
        style={{ 
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        }}
      >
        {dockApps.map((app, index) => (
          <motion.div
            key={app.id}
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + index * 0.05 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.3, 
                y: -15,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleClick(app)}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all relative group"
              style={{ 
                background: app.gradient || (app.color === '#00a8ff' 
                  ? 'linear-gradient(135deg, #00a8ff, #0099ff)' 
                  : app.color === '#ff6b6b'
                  ? 'linear-gradient(135deg, #ff6b6b, #ee5a5a)'
                  : app.color === '#333'
                  ? 'linear-gradient(135deg, #444, #333)'
                  : 'linear-gradient(135deg, #777, #555)'),
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              }}
            >
              {app.id === 'terminal' ? (
                <svg viewBox="0 0 640 640" className="w-6 h-6 text-white">
                  <path fill="currentColor" d="M73.4 182.6C60.9 170.1 60.9 149.8 73.4 137.3C85.9 124.8 106.2 124.8 118.7 137.3L278.7 297.3C291.2 309.8 291.2 330.1 278.7 342.6L118.7 502.6C106.2 515.1 85.9 515.1 73.4 502.6C60.9 490.1 60.9 469.8 73.4 457.3L210.7 320L73.4 182.6zM288 448L544 448C561.7 448 576 462.3 576 480C576 497.7 561.7 512 544 512L288 512C270.3 512 256 497.7 256 480C256 462.3 270.3 448 288 448z"/>
                </svg>
              ) : (
                <i className={`${app.gradient ? 'fab' : 'fas'} ${app.icon} text-white`} />
              )}
              
              {/* Tooltip */}
              <div 
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {app.name}
              </div>
            </motion.button>
          </motion.div>
        ))}

        {/* Separator */}
        <div className="w-px h-10 mx-1 bg-white/20" />

        {/* Trash */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.3, y: -15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleTrashClick}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
            style={{ 
              background: 'linear-gradient(135deg, #666, #444)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}
          >
            <i className="fas fa-trash text-white/60" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Dock reflection/shine */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-3 rounded-b-2xl opacity-20"
        style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.1), transparent)' }}
      />
    </div>
  );
}
