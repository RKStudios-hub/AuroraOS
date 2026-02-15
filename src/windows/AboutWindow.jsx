import { motion } from 'framer-motion';

export default function AboutWindow() {
  return (
    <div className="p-6 flex flex-col items-center text-center h-full" style={{ background: '#ffffff' }}>
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring' }}
        className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-4"
        style={{
          background: 'linear-gradient(135deg, #00a8ff, #0099ff)',
          boxShadow: '0 10px 40px rgba(0, 168, 255, 0.3)',
        }}
      >
        👨‍💻
      </motion.div>

      {/* Name */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-semibold text-black"
      >
        RK Studios
      </motion.h2>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-black/50 mt-1"
      >
        Game Developer
      </motion.p>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-black/60 mt-4 max-w-xs"
      >
        Creating games and interactive experiences with passion and code 🎮
      </motion.p>

      {/* Social */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-2 mt-6"
      >
        {[
          { icon: 'fa-github', label: 'GitHub' },
          { icon: 'fa-youtube', label: 'YouTube' },
          { icon: 'fa-twitter', label: 'Twitter' },
          { icon: 'fa-discord', label: 'Discord' },
        ].map((social, i) => (
          <motion.a
            key={social.label}
            href="#"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ background: 'rgba(0,0,0,0.05)' }}
          >
            <i className={`fab ${social.icon} text-black/70`} />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
