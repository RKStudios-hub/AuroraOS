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
        className="mb-12"
      >
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
          <path d="M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 72c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" fill="#fff"/>
          <path d="M55 55c-2 5-6 9-11 11 5 2 9 5 12 9 3-6 7-11 12-17-4-2-8-2-13-3z" fill="#fff"/>
          <path d="M28 60c-5-4-10-8-14-14-5-7-8-14-6-22 5 0 10 2 14 5 4 4 7 9 9 14 2 6 1 12-3 17z" fill="#fff"/>
        </svg>
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
