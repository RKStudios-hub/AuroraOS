import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactWindow() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="p-4 h-full flex flex-col gap-4" style={{ background: '#ffffff' }}>
      <h2 className="text-lg font-semibold text-black">Get in Touch</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          className="w-full px-3 py-2 rounded-lg text-sm text-black bg-white border border-black/10 focus:outline-none focus:border-blue-500/50"
          required
        />

        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-3 py-2 rounded-lg text-sm text-black bg-white border border-black/10 focus:outline-none focus:border-blue-500/50"
          required
        />

        <textarea
          placeholder="Your message..."
          className="w-full h-28 px-3 py-2 rounded-lg text-sm text-black bg-white border border-black/10 focus:outline-none focus:border-blue-500/50 resize-none"
          required
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-lg font-medium text-sm text-white"
          style={{ background: 'linear-gradient(90deg, #00a8ff, #0099ff)' }}
        >
          {isSent ? 'Sent!' : 'Send Message'}
        </motion.button>
      </form>

      <div className="mt-auto pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
        <p className="text-xs text-black/40 mb-2">Other ways:</p>
        <div className="flex gap-2">
          {['GitHub', 'Discord', 'Email'].map(way => (
            <a
              key={way}
              href="#"
              className="px-3 py-1.5 text-xs rounded-lg bg-black/5 text-black/60 hover:bg-blue-100 hover:text-blue-600 transition-colors"
            >
              {way}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
