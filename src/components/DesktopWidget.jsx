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
  
  const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateStr = time.toLocaleDateString(undefined, dateOptions);

  return (
    <>
      {/* Music Widget */}
      <div className="fixed bottom-2 left-4 z-20">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
          <img 
            src="/music.png" 
            alt="Album" 
            className="w-12 h-12 rounded-lg object-cover shadow-lg"
          />
          <div className="text-white">
            <div className="text-sm font-medium truncate max-w-[140px]">Sea of feelings</div>
            <div className="text-xs text-white/60">Lowx - On repeat</div>
          </div>
          <div className="flex gap-2 ml-2 items-center">
            <i className="fa-solid fa-repeat text-white/70 hover:text-white cursor-pointer transition text-sm"></i>
            <i className="fa-solid fa-backward-step text-white/70 hover:text-white cursor-pointer transition text-sm"></i>
            <i 
              className={`fa-solid ${isMusicPlaying ? 'fa-pause' : 'fa-play'} text-white/70 hover:text-white cursor-pointer transition ml-1`}
              onClick={toggleMusic}
            ></i>
            <i className="fa-solid fa-forward-step text-white/70 hover:text-white cursor-pointer transition ml-1 text-sm"></i>
          </div>
        </div>
      </div>

      {/* Clock Widget */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 text-white">
        <div 
          className="w-[500px] h-[480px] px-20 py-16"
        >
          <div className="flex items-center gap-10">
            {/* Time */}
            <div className="leading-none">
              <div className="text-[120px] font-light text-lime-300">{formattedHours}</div>
              <div className="text-[120px] font-light text-pink-400 -mt-4">{minutes}</div>
            </div>

            {/* Divider */}
            <div className="flex gap-1 h-36">
              <div className="w-[3px] h-full bg-white/20"></div>
              <div className="w-[3px] h-full bg-white/20"></div>
              <div className="w-[3px] h-full bg-white/20"></div>
            </div>

            {/* Side Info */}
            <div className="text-base text-white/80 space-y-3">
              <div className="text-lg">{ampm}</div>
              <div>
                <i className="fa-solid fa-cloud-sun mr-1"></i>
                {weatherLoading ? '...' : weather !== null ? `${weather}°C` : 'N/A'}
              </div>
              <div>{dateStr}</div>
            </div>
          </div>

          {/* Icons */}
          <div className="flex justify-center gap-8 mt-8 text-lg text-white/70">
            <i className="fa-solid fa-comment hover:text-white hover:-translate-y-1 transition cursor-pointer"></i>
            <i className="fa-solid fa-camera hover:text-white hover:-translate-y-1 transition cursor-pointer"></i>
            <i className="fa-solid fa-music hover:text-white hover:-translate-y-1 transition cursor-pointer"></i>
            <i className="fa-solid fa-gamepad hover:text-white hover:-translate-y-1 transition cursor-pointer"></i>
            <i className="fab fa-facebook hover:text-white hover:-translate-y-1 transition cursor-pointer"></i>
            <i className="fab fa-twitter hover:text-white hover:-translate-y-1 transition cursor-pointer"></i>
            <i className="fab fa-youtube hover:text-white hover:-translate-y-1 transition cursor-pointer"></i>
          </div>

          {/* Visualizer */}
          <div className="flex justify-center gap-1 mt-12">
            <div className="w-[3px] bg-white/50 wave"></div>
            <div className="w-[3px] bg-white/50 wave" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-[3px] bg-white/50 wave" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-[3px] bg-white/50 wave" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-[3px] bg-white/50 wave" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-[3px] bg-white/50 wave" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-[3px] bg-white/50 wave" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { height: 8px; opacity: 0.3; }
          50% { height: 40px; opacity: 1; }
        }
        .wave {
          animation: wave 1.2s infinite ease-in-out;
        }
      `}</style>
    </>
  );
}
