import { motion } from 'framer-motion';

export default function StartScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #0a0a15 100%)' }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="mb-4"
      >
        <img src="/Logo.png" alt="AuroraOS" className="w-64 h-64 object-contain" />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onStart}
        className="font-medium text-lg cursor-pointer"
        style={{ 
          background: 'transparent',
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white',
          padding: '8px 48px',
          marginTop: '-20px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'white';
          e.target.style.color = '#1a1a2e';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = 'white';
        }}
      >
        Login
      </motion.button>
    </motion.div>
  );
}
