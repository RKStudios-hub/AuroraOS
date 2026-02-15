import { motion } from 'framer-motion';

export default function DesktopIcon({ iconClass, label, color, onDoubleClick }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 p-2 rounded-xl cursor-pointer"
      style={{ width: 80 }}
      whileHover={{ 
        backgroundColor: 'rgba(255, 105, 180, 0.15)',
        scale: 1.05 
      }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={onDoubleClick}
    >
      {/* Icon container */}
      <div 
        className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color}`}
        style={{
          boxShadow: '0 4px 15px rgba(255, 105, 180, 0.3)',
        }}
      >
        <i className={`fas ${iconClass} text-xl text-white`} />
      </div>
      
      {/* Label */}
      <span className="text-xs font-medium text-white/90 text-center drop-shadow-md">
        {label}
      </span>
    </motion.div>
  );
}
