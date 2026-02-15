import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const paletteColors = [
  '#000000', '#7F7F7F', '#880015', '#ED1C24',
  '#FF7F27', '#FFF200', '#22B14C', '#00A2E8',
  '#3F48CC', '#A349A4', '#FFFFFF', '#C3C3C3',
  '#B97A57', '#FFAEC9', '#FFC90E', '#EFE4B0'
];

const tools = [
  { id: 'brush', icon: 'fa-pencil', name: 'Brush' },
  { id: 'eraser', icon: 'fa-eraser', name: 'Eraser' },
  { id: 'fill', icon: 'fa-fill-drip', name: 'Fill' },
];

export default function PaintWindow() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('brush');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(8);
  const [showPalette, setShowPalette] = useState(true);
  const [zoom, setZoom] = useState(100);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const startDrawing = (e) => {
    const pos = getPos(e);
    lastPos.current = pos;
    setDrawing(true);
    
    if (currentTool === 'fill') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setDrawing(false);
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  };

  const draw = (e) => {
    if (!drawing || currentTool === 'fill') return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);

    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : color;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    
    lastPos.current = pos;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'paint-rk-studio.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center gap-3 pr-4 border-r border-gray-300">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <i className="fa-solid fa-paintbrush text-white text-sm"></i>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Paint</h3>
            <p className="text-xs text-gray-500">RK Studio</p>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 bg-gray-200/50 rounded-xl">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setCurrentTool(tool.id)}
              className={`w-9 h-9 rounded-lg border-none cursor-pointer flex items-center justify-center transition-all relative ${
                currentTool === tool.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-300'
              }`}
              title={tool.name}
            >
              <i className={`fa-solid ${tool.icon} text-sm`}></i>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-200/50 rounded-xl">
          <div className="relative">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer border-2 border-gray-300 overflow-hidden"
            />
            <div 
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ background: color }}
            />
          </div>
          <button
            onClick={() => setShowPalette(!showPalette)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              showPalette ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
            }`}
          >
            <i className="fa-solid fa-palette text-sm"></i>
          </button>
        </div>

        {showPalette && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-2 bg-gray-200/50 rounded-xl"
          >
            <div className="grid grid-cols-8 gap-1">
              {paletteColors.map((col) => (
                <button
                  key={col}
                  onClick={() => setColor(col)}
                  className={`w-6 h-6 rounded-md transition-all ${
                    color === col 
                      ? 'ring-2 ring-blue-600 ring-offset-1' 
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-200/50 rounded-xl">
          <span className="text-xs text-gray-600 font-medium w-8">{size}px</span>
          <input
            type="range"
            min="1"
            max="50"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-20 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={clearCanvas}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all"
            title="Clear"
          >
            <i className="fa-solid fa-trash-can text-sm"></i>
          </button>
          <button
            onClick={downloadCanvas}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-green-100 hover:text-green-600 transition-all"
            title="Save"
          >
            <i className="fa-solid fa-download text-sm"></i>
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 overflow-auto">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width="920"
            height="520"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onMouseMove={draw}
            className="rounded-xl shadow-2xl cursor-crosshair bg-white"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
            <button
              onClick={() => setZoom(Math.max(25, zoom - 25))}
              className="w-6 h-6 rounded flex items-center justify-center text-white hover:bg-white/20 transition-all"
              title="Zoom Out"
            >
              <i className="fa-solid fa-minus text-xs"></i>
            </button>
            <span className="text-white text-xs font-medium min-w-[40px] text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              className="w-6 h-6 rounded flex items-center justify-center text-white hover:bg-white/20 transition-all"
              title="Zoom In"
            >
              <i className="fa-solid fa-plus text-xs"></i>
            </button>
          </div>
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 text-white text-xs rounded">
            {currentTool === 'brush' ? 'Brush' : currentTool === 'eraser' ? 'Eraser' : 'Fill'} • {size}px
          </div>
        </div>
      </div>
    </div>
  );
}
