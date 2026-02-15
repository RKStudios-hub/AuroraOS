import { useState, useEffect } from 'react';

export default function MenuBar({ activeWindow, windowTitles }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const windowTitle = activeWindow && windowTitles[activeWindow] ? windowTitles[activeWindow] : 'RK OS – Portfolio';

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

        {/* Volume */}
        <button className="h-full px-2 flex items-center gap-1 hover:bg-white/5 transition-colors">
          <i className="fas fa-volume-up text-[#94e2d5] text-xs" />
          <span className="text-[#cdd6f4] text-xs font-semibold">14%</span>
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
