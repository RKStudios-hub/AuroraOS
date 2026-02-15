import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootMessages = [
  { text: '', delay: 0 },
  { text: 'Apple', delay: 100 },
  { text: '██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 80%', delay: 200 },
  { text: '', delay: 300 },
  { text: 'Mac OS RK', delay: 400 },
  { text: '', delay: 500 },
  { text: '© 2026 Apple Inc. All rights reserved.', delay: 600 },
  { text: '', delay: 700 },
  { text: ' EFI', delay: 800 },
  { text: '●', delay: 900 },
  { text: '', delay: 1000 },
  { text: 'Loading kernel...', delay: 1200 },
  { text: '●', delay: 1300 },
  { text: '', delay: 1400 },
  { text: ' kernel_task...', delay: 1600 },
  { text: ' launchd...', delay: 1800 },
  { text: ' windowserver...', delay: 2000 },
  { text: ' finder...', delay: 2200 },
  { text: '', delay: 2400 },
  { text: '████ 100%', delay: 2600 },
  { text: '', delay: 2800 },
  { text: '    ○', delay: 3000 },
];

export default function BootScreen() {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    
    const addLine = () => {
      if (currentIndex < bootMessages.length) {
        const msg = bootMessages[currentIndex];
        setTimeout(() => {
          setLines(prev => [...prev, msg]);
          currentIndex++;
        }, 30);
      } else {
        setTimeout(() => setIsComplete(true), 500);
      }
    };

    const interval = setInterval(addLine, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (lines.length > 2) {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 80) return prev + 4;
          if (prev < 95) return prev + 2;
          return 100;
        });
      }, 50);
      return () => clearInterval(progressInterval);
    }
  }, [lines.length]);

  useEffect(() => {
    if (isComplete) {
      const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 530);
      return () => clearInterval(cursorInterval);
    }
  }, [isComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #0a0a15 100%)' }}
    >
      {/* Apple Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="mb-8"
      >
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
          <path d="M40 0C17.9 0 0 17.9 0 40s17.9 40 40 40 40-17.9 40-40S62.1 0 40 0zm0 72c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" fill="#fff"/>
          <path d="M55 55c-2 5-6 9-11 11 5 2 9 5 12 9 3-6 7-11 12-17-4-2-8-2-13-3z" fill="#fff"/>
          <path d="M28 60c-5-4-10-8-14-14-5-7-8-14-6-22 5 0 10 2 14 5 4 4 7 9 9 14 2 6 1 12-3 17z" fill="#fff"/>
        </svg>
      </motion.div>

      {/* Loading bar */}
      <div className="w-64 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
        <motion.div 
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #666, #fff)' }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-white/60 text-sm font-light"
      >
        {isComplete ? 'Welcome' : 'Loading...'}
      </motion.p>
    </motion.div>
  );
}
