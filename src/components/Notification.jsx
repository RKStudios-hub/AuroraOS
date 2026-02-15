import { motion } from 'framer-motion';

export default function Notification({ message, type, onClose }) {
  const isRecycleBin = type === 'recycle';

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-[100] max-w-sm rounded-lg overflow-hidden"
      style={{
        bottom: '90px',
        right: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="p-4 flex items-start gap-3">
        {isRecycleBin ? (
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #666, #444)' }}
          >
            <i className="fas fa-trash text-white text-sm" />
          </div>
        ) : (
            <img 
              src="./profile.jpg"
            alt="Someone" 
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>
            {isRecycleBin ? 'Recycle Bin' : 'Someone'}
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#666' }}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className="transition-colors"
          style={{ color: '#999' }}
        >
          <i className="fas fa-times text-xs" />
        </button>
      </div>
    </motion.div>
  );
}
