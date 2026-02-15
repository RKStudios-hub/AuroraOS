import { useState } from 'react';
import { motion } from 'framer-motion';

const quickLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: 'fa-github', color: '#333' },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'fa-youtube', color: '#ff0000', newTab: true },
  { name: 'Bing', url: 'https://www.bing.com', icon: 'fa-search', color: '#00809d' },
  { name: 'ChatGPT', url: 'https://chatgpt.com', icon: 'fa-robot', color: '#10a37f', newTab: true },
  { name: 'Sketchfab', url: 'https://sketchfab.com', icon: 'fa-cube', color: '#1caad9' },
  { name: 'Modrinth', url: 'https://modrinth.com', icon: 'fa-puzzle-piece', color: '#57c485' },
];

const blockedSites = ['google', 'youtube', 'facebook', 'twitter', 'instagram', 'chatgpt', 'netflix', 'amazon'];

export default function BrowserWindow() {
  const [inputUrl, setInputUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [showHome, setShowHome] = useState(true);
  const [blocked, setBlocked] = useState(false);

  const isBlocked = (url) => {
    return blockedSites.some(site => url.toLowerCase().includes(site));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    
    let searchUrl = inputUrl;
    
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      if (inputUrl.includes('.') && !inputUrl.includes(' ')) {
        searchUrl = `https://${inputUrl}`;
      } else {
        searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(inputUrl)}`;
      }
    }
    
    if (isBlocked(searchUrl)) {
      window.open(searchUrl, '_blank');
    } else {
      setCurrentUrl(searchUrl);
      setShowHome(false);
      setInputUrl(searchUrl);
      setBlocked(false);
    }
  };

  const navigateTo = (url, newTab = false) => {
    if (newTab || isBlocked(url)) {
      window.open(url, '_blank');
    } else {
      setCurrentUrl(url);
      setShowHome(false);
      setInputUrl(url);
      setBlocked(false);
    }
  };

  const goHome = () => {
    setShowHome(true);
    setCurrentUrl('');
    setInputUrl('');
    setBlocked(false);
  };

  const handleIframeError = () => {
    setBlocked(true);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <button 
            onClick={goHome}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <i className="fa-solid fa-home text-sm"></i>
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 px-3 py-2 bg-white rounded-full border border-gray-200 hover:shadow-md transition-shadow">
          <i className="fa-solid fa-search text-gray-400 text-sm"></i>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Bing or type a URL"
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
        </form>
      </div>

      {/* Blocked Message */}
      {blocked && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
          <i className="fa-solid fa-globe text-5xl text-gray-300 mb-4"></i>
          <p className="text-gray-500 text-center mb-4">This website cannot be displayed in the browser</p>
          <button 
            onClick={() => window.open(currentUrl, '_blank')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Open in New Tab
          </button>
          <button 
            onClick={goHome}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Go Home
          </button>
        </div>
      )}

      {/* Iframe */}
      {!showHome && currentUrl && !blocked && (
        <iframe
          src={currentUrl}
          className="flex-1 w-full border-none"
          onError={handleIframeError}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      )}

      {/* Home Page */}
      {showHome && (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-7xl font-bold tracking-wider">
              <span style={{ color: '#4285f4' }}>A</span>
              <span style={{ color: '#ea4335' }}>u</span>
              <span style={{ color: '#fbbc05' }}>r</span>
              <span style={{ color: '#4285f4' }}>o</span>
              <span style={{ color: '#34a853' }}>r</span>
              <span style={{ color: '#ea4335' }}>A</span>
            </h1>
          </motion.div>

          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="w-full max-w-xl flex items-center gap-2 px-4 py-3 rounded-full border border-gray-200 hover:shadow-lg transition-shadow mb-8"
          >
            <i className="fa-solid fa-search text-gray-400"></i>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Search Bing or type a URL"
              className="flex-1 bg-transparent outline-none text-gray-700"
            />
          </motion.form>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((item, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo(item.url, item.newTab)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                    style={{ backgroundColor: item.color }}
                  >
                    <i className={`fab ${item.icon}`}></i>
                  </div>
                  <span className="text-xs text-gray-600">{item.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-gray-400 mt-8"
          >
            Some sites will open in a new tab
          </motion.p>
        </div>
      )}
    </div>
  );
}
