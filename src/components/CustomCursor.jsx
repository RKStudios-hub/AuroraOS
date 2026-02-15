import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      lastPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Only show custom cursor on desktop
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Simple dot cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-75"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#9b7dff',
          transform: isClicking ? 'scale(0.5)' : 'scale(1)',
        }}
      />
      
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-150"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid #c4a8ff',
          opacity: 0.6,
          transform: isClicking ? 'scale(0.8)' : 'scale(1)',
        }}
      />
    </>
  );
}
