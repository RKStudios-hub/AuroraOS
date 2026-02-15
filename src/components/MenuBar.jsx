import { useState, useEffect, useRef } from 'react';

export default function MenuBar({ activeWindow, windowTitles, musicRef, isMusicPlaying }) {
  const [time, setTime] = useState(new Date());
  const [audioLevel, setAudioLevel] = useState(0);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!musicRef?.current) return;

    const setupAudio = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(musicRef.current);
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        
        analyserRef.current = analyser;
        
        const updateLevel = () => {
          if (!analyserRef.current) return;
          
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          const normalized = Math.min(100, Math.round(average * 1.5));
          
          setAudioLevel(normalized);
          animationRef.current = requestAnimationFrame(updateLevel);
        };
        
        if (isMusicPlaying) {
          updateLevel();
        }
      } catch (e) {
        console.log('Audio context not available');
      }
    };

    if (isMusicPlaying && !analyserRef.current) {
      if (musicRef.current.readyState >= 2) {
        setupAudio();
      } else {
        musicRef.current.addEventListener('canplay', setupAudio, { once: true });
      }
    }

    if (!isMusicPlaying && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      setAudioLevel(0);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMusicPlaying, musicRef]);

  const windowTitle = activeWindow && windowTitles[activeWindow] ? windowTitles[activeWindow] : 'AuroraOS — by RK';

  return (
    <div className="fixed top-1 left-2 right-2 h-[36px] p-0.5 z-50 flex items-center justify-between text-white rounded-lg" style={{ background: 'rgba(32, 32, 43, 0.9)' }}>
      {/* Left widgets */}
      <div className="flex items-center h-full">
        {/* Home */}
        <button className="h-full px-2 flex items-center gap-1 hover:bg-white/5 transition-colors">
          <i className="fas fa-circle text-[#b4befe] text-sm" />
        </button>
        
        {/* Active Window */}
        <div className="h-full px-2 flex items-center text-[#cdd6f4] text-xs font-semibold">
          <span>{windowTitle}</span>
        </div>
      </div>

      {/* Center - Clock - absolutely centered */}
      <div className="absolute left-1/2 -translate-x-1/2 text-[#94e2d5] text-xs font-semibold font-mono tracking-wide">
        {time.toLocaleTimeString('en-GB')}
      </div>

      {/* Right widgets */}
      <div className="flex items-center h-full">
        {/* Systray */}
        <button className="h-full px-2 flex items-center gap-1 hover:bg-white/5 transition-colors">
          <i className="fas fa-bars text-[#89b4fa] text-xs" />
        </button>

        {/* Grouped widgets - Memory & CPU */}
        <div className="flex items-center h-6 mx-1 px-2 rounded-lg" style={{ background: 'rgb(17, 18, 19)', border: '1px solid #45475a' }}>
          <div className="flex items-center gap-1 px-1">
            <i className="fas fa-memory text-[#fab387] text-[10px]" />
            <span className="text-[#cdd6f4] text-xs font-semibold">MEM</span>
          </div>
          <div className="flex items-center gap-1 px-1" style={{ borderLeft: '1px solid #45475a' }}>
            <i className="fas fa-microchip text-[#fab387] text-[10px]" />
            <span className="text-[#cdd6f4] text-xs font-semibold">CPU</span>
          </div>
        </div>

        {/* Language */}
        <button className="h-full px-2 flex items-center gap-1 hover:bg-white/5 transition-colors">
          <i className="fas fa-keyboard text-[#94e2d5] text-xs" />
          <span className="text-[#cdd6f4] text-xs font-semibold">ENG</span>
        </button>

        {/* Volume with audio visualizer */}
        <button className="h-full px-2 flex items-center gap-1 hover:bg-white/5 transition-colors">
          <div className="flex items-end gap-0.5 h-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full transition-all duration-75"
                style={{
                  height: isMusicPlaying ? `${Math.max(3, (audioLevel / 100) * 16 * ((i + 1) / 5))}px` : '3px',
                  backgroundColor: audioLevel > (i + 1) * 15 ? '#94e2d5' : '#45475a',
                }}
              />
            ))}
          </div>
          <span className="text-[#cdd6f4] text-xs font-semibold">{isMusicPlaying ? '♫' : '♪'}</span>
        </button>

        {/* Notifications */}
        <button className="h-full px-2 flex items-center gap-1 hover:bg-white/5 transition-colors">
          <i className="fas fa-bell text-[#89b4fa] text-xs" />
          <span className="text-[#cdd6f4] text-xs font-semibold">10</span>
        </button>

        {/* Power Menu */}
        <button className="h-full px-2 flex items-center hover:bg-white/5 transition-colors">
          <i className="fas fa-power-off text-[#f38ba8] text-sm" />
        </button>
      </div>
    </div>
  );
}
