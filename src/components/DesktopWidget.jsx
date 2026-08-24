import { useState, useEffect } from 'react';

export default function DesktopWidget({ toggleMusic, isMusicPlaying }) {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          setWeatherLoading(false);
        }
      );
    } else {
      setWeatherLoading(false);
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const data = await response.json();
      if (data.current_weather) {
        setWeather(Math.round(data.current_weather.temperature));
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
    setWeatherLoading(false);
  };

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  
  const formattedHours = hours.toString().padStart(2, '0');
  
  const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' };
  const dateStr = time.toLocaleDateString(undefined, dateOptions);

  return (
    <>
      {/* Music Widget */}
      <div className="fixed bottom-16 sm:bottom-4 left-4 z-20">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-xl px-3 py-2 sm:px-4 sm:py-3 border border-white/10 shadow-xl">
          <img 
            src="./music.png" 
            alt="Album" 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shadow-lg"
          />
          <div className="text-white">
            <div className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-[140px]">Sea of feelings</div>
            <div className="text-[10px] sm:text-xs text-white/60">Lowx - On repeat</div>
          </div>
          <div className="flex gap-2 ml-1 items-center">
            <i 
              className={`fa-solid ${isMusicPlaying ? 'fa-pause' : 'fa-play'} text-white/80 hover:text-white cursor-pointer transition text-xs sm:text-sm`}
              onClick={toggleMusic}
            ></i>
          </div>
        </div>
      </div>

      {/* Clock Widget - Fixed height & stable layout */}
      <div className="fixed right-4 sm:right-12 top-1/2 -translate-y-1/2 z-0 text-white pointer-events-none select-none">
        <div className="max-w-[90vw] md:w-[420px] p-6 sm:p-10 scale-90 sm:scale-100 flex flex-col items-center">
          <div className="flex items-center gap-6 sm:gap-8 h-40">
            {/* Time */}
            <div className="flex flex-col justify-center font-mono tabular-nums leading-none">
              <div className="text-6xl sm:text-7xl font-light text-lime-300 drop-shadow-lg tracking-wider">{formattedHours}</div>
              <div className="text-6xl sm:text-7xl font-light text-pink-400 mt-1 drop-shadow-lg tracking-wider">{minutes}</div>
            </div>

            {/* Divider */}
            <div className="flex gap-1 h-28">
              <div className="w-[2px] h-full bg-white/20"></div>
              <div className="w-[2px] h-full bg-white/20"></div>
            </div>

            {/* Side Info */}
            <div className="text-xs sm:text-sm text-white/80 space-y-2 flex flex-col justify-center">
              <div className="text-base font-semibold">{ampm}</div>
              <div>
                <i className="fa-solid fa-cloud-sun mr-1 text-yellow-300"></i>
                {weatherLoading ? '...' : weather !== null ? `${weather}°C` : 'N/A'}
              </div>
              <div className="whitespace-nowrap">{dateStr}</div>
            </div>
          </div>

          {/* Visualizer with fixed height wrapper to prevent vertical shifts */}
          <div className="h-10 flex items-center justify-center gap-1.5 mt-6">
            <div className="w-[3px] bg-white/40 wave"></div>
            <div className="w-[3px] bg-white/40 wave" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-[3px] bg-white/40 wave" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-[3px] bg-white/40 wave" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-[3px] bg-white/40 wave" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-[3px] bg-white/40 wave" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { height: 8px; opacity: 0.3; }
          50% { height: 28px; opacity: 1; }
        }
        .wave {
          animation: wave 1.2s infinite ease-in-out;
        }
      `}</style>
    </>
  );
}
