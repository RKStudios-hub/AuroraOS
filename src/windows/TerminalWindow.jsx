import { useState, useEffect, useRef } from 'react';

const commands = {
  help: 'Show all available commands',
  about: 'Who is RK?',
  skills: 'Tech stack',
  projects: 'View my work',
  art: 'See my artworks',
  '3d': 'Lowpoly models',
  contact: 'How to reach me',
  resume: 'Download resume',
  'sudo hire-me': '???',
  whoami: 'Who are you?',
  coffee: 'Brew some creativity',
  motivation: 'Daily inspiration',
  matrix: 'Enter the matrix',
  experience: 'Work experience',
  timeline: 'My journey',
  secret: 'Easter egg',
  clear: 'Clear terminal',
  ls: 'List directory contents',
  cd: 'Change directory',
  pwd: 'Print working directory',
  cat: 'Print file contents',
  echo: 'Print text',
  date: 'Current date',
  neofetch: 'System info',
  exit: 'Close terminal',
};

const fileSystem = {
  'about.txt': { type: 'file', content: 'Name: Rupesh Kumar\nAlias: RK Studios\nRole: Developer | Graphics Designer | Lowpoly 3D Artist\nStatus: High School Student\nMission: Building real-world projects using core web fundamentals.' },
  'skills.json': { type: 'file', content: 'Frontend: HTML, CSS, JavaScript\nDesign: Graphic Design, Logo Design, UI Mockups\n3D: Lowpoly Modeling, Stylized Assets\nLearning: React, Advanced Animations, Creative Coding' },
  'contact.sh': { type: 'file', content: 'Email: rkstudios@example.com\nGitHub: github.com/RKStudios\nYouTube: RK Studios' },
  'resume.pdf': { type: 'file', content: '[Resume file - contact me to get a copy]' },
  'projects': { type: 'dir', children: ['apex.html', 'web-os/', 'intro/', 'fps-game/'] },
  'art': { type: 'dir', children: ['sketches/', 'portraits/', 'videos/'] },
  '3d': { type: 'dir', children: ['medieval/', 'rk-bot/', 'chandrayaan/', 'gaming-room/'] },
  'apex.html': { type: 'file', content: 'APEX Securities - Security Landing Page' },
  'web-os': { type: 'dir', children: ['index.html', 'style.css', 'script.js'] },
  'intro': { type: 'dir', children: ['index.html', 'style.css'] },
  'fps-game': { type: 'dir', children: ['main.js', 'game.html'] },
  'sketches': { type: 'file', content: 'Pencil Sketches - Stylized Portraits - YouTube Sketch Videos' },
  'portraits': { type: 'file', content: 'Character Art - Stylized Portraits' },
  'videos': { type: 'file', content: 'YouTube Sketch Videos Collection' },
  'medieval': { type: 'file', content: 'Lowpoly Medieval Assets' },
  'rk-bot': { type: 'file', content: 'RK Bot Action Figure' },
  'chandrayaan': { type: 'file', content: 'Chandrayaan-2 Model' },
  'gaming-room': { type: 'file', content: 'Mini Gaming Room Setup' },
};

const neofetchText = `                    rk@rkstudios
                   -----------
                  OS: RK-OS 1.0 (Custom)
                  Host: Browser PC
                  Kernel: JavaScript ES6
                  Shell: bash 5.0
                  Terminal: WebTerminal
                  CPU: Virtual
                  Memory: Unlimited
                  Disk: Infinite
                  Uptime: Always
                  DE: RK Desktop
                  Theme: Dark
                  CPU Temp: 69°C (gaming)
`;

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

export default function TerminalWindow() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to RK Studios Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands.' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getDirContents = () => {
    if (currentPath === '~') {
      return Object.keys(fileSystem).filter(k => fileSystem[k].type === 'dir' || k.includes('.')).join('  ');
    }
    const parts = currentPath.split('/').filter(Boolean);
    return '';
  };

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(/\s+/);
    const command = args[0].toLowerCase();
    const arg = args.slice(1).join(' ');

    const newHistory = [...history, { type: 'command', text: `user@rk-studios:${currentPath}$ ${cmd}` }];

    switch (command) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands:' });
        Object.entries(commands).forEach(([k, v]) => {
          newHistory.push({ type: 'output', text: `  ${k.padEnd(15)} - ${v}` });
        });
        break;

      case 'about':
        newHistory.push({ type: 'output', text: `Name: Rupesh Kumar
Alias: RK Studios
Role: Developer | Graphics Designer | Lowpoly 3D Artist
Status: High School Student
Mission: Building real-world projects using core web fundamentals.` });
        break;

      case 'skills':
        newHistory.push({ type: 'output', text: `Frontend:
- HTML
- CSS
- JavaScript

Design:
- Graphic Design
- Logo Design
- UI Mockups

3D:
- Lowpoly Modeling
- Stylized Assets

Learning:
- React
- Advanced Animations
- Creative Coding` });
        break;

      case 'projects':
        newHistory.push({ type: 'output', text: `1. APEX Securities - Security Landing Page
2. Custom Web OS UI
3. Animated Intro Website
4. FPS Web Game
5. Fantasy Minecraft Series` });
        break;

      case 'art':
        newHistory.push({ type: 'output', text: `- Pencil Sketches
- Stylized Portraits
- YouTube Sketch Videos
- Character Art` });
        break;

      case '3d':
        newHistory.push({ type: 'output', text: `- Lowpoly Medieval Assets
- RK Bot Action Figure
- Chandrayaan-2 Model
- Mini Gaming Room Setup` });
        break;

      case 'contact':
        newHistory.push({ type: 'output', text: `Email: rkstudios@example.com
GitHub: github.com/RKStudios
YouTube: RK Studios` });
        break;

      case 'resume':
        newHistory.push({ type: 'output', text: 'Resume not available. Contact me to get a copy!' });
        break;

      case 'whoami':
        newHistory.push({ type: 'output', text: 'You are currently exploring RK Studios.\nCuriosity level: 100%' });
        break;

      case 'coffee':
        newHistory.push({ type: 'output', text: 'Brewing creativity...\n☕ + 💻 = 🚀' });
        break;

      case 'motivation':
        newHistory.push({ type: 'output', text: '"Learning fast. Creating daily. Improving constantly."' });
        break;

      case 'matrix':
        newHistory.push({ type: 'output', text: 'Entering the Matrix...' });
        setIsMatrixMode(true);
        let matrixInterval = 0;
        let count = 0;
        const interval = setInterval(() => {
          if (count >= 20) {
            clearInterval(interval);
            setIsMatrixMode(false);
            newHistory.push({ type: 'output', text: 'Exited Matrix.' });
            setHistory([...newHistory]);
            return;
          }
          const matrixLine = Array(60).fill(0).map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)]).join('');
          setHistory(prev => [...prev, { type: 'matrix', text: matrixLine }]);
          count++;
        }, 50);
        setHistory(newHistory);
        return;

      case 'experience':
        newHistory.push({ type: 'output', text: `Freelance Projects
Personal Portfolio Builds
UI/UX Experiments
Game UI Concepts` });
        break;

      case 'timeline':
        newHistory.push({ type: 'output', text: `2023 - Started Web Development
2024 - Built Multiple Real Projects
2025 - Exploring Advanced UI + 3D` });
        break;

      case 'secret':
        newHistory.push({ type: 'output', text: 'You found an easter egg 👀\nFuture CEO loading...' });
        break;

      case 'sudo':
        if (arg === 'hire-me') {
          newHistory.push({ type: 'output', text: 'Permission granted.\nOpening future collaboration.exe...' });
        } else {
          newHistory.push({ type: 'error', text: 'sudo: permission denied: you are not the admin' });
        }
        break;

      case 'ls':
        newHistory.push({ type: 'output', text: getDirContents() || 'about.txt  skills.json  contact.sh  resume.pdf  projects/  art/  3d/' });
        break;

      case 'cd':
        if (!arg || arg === '~') {
          setCurrentPath('~');
        } else if (arg === '..') {
          if (currentPath !== '~') {
            const parts = currentPath.split('/');
            parts.pop();
            setCurrentPath(parts.length ? parts.join('/') : '~');
          }
        } else {
          setCurrentPath(currentPath === '~' ? arg : currentPath + '/' + arg);
        }
        break;

      case 'pwd':
        newHistory.push({ type: 'output', text: '/home/user/' + (currentPath === '~' ? '' : currentPath) });
        break;

      case 'cat':
        if (!arg) {
          newHistory.push({ type: 'error', text: 'cat: missing file operand' });
        } else if (fileSystem[arg]) {
          if (fileSystem[arg].type === 'dir') {
            newHistory.push({ type: 'error', text: `cat: ${arg}: Is a directory` });
          } else {
            newHistory.push({ type: 'output', text: fileSystem[arg].content });
          }
        } else {
          newHistory.push({ type: 'error', text: `cat: ${arg}: No such file` });
        }
        break;

      case 'echo':
        newHistory.push({ type: 'output', text: args.slice(1).join(' ') });
        break;

      case 'date':
        newHistory.push({ type: 'output', text: new Date().toString() });
        break;

      case 'neofetch':
        newHistory.push({ type: 'output', text: neofetchText });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        newHistory.push({ type: 'output', text: 'Use the window close button to exit.' });
        break;

      case '':
        break;

      default:
        newHistory.push({ type: 'error', text: `command not found: ${command}` });
    }

    newHistory.push({ type: 'output', text: '' });
    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="h-full w-full font-mono text-sm overflow-hidden"
      style={{ background: '#0d1117', color: '#58a6ff' }}
      onClick={handleClick}
    >
      <div 
        className="h-full overflow-y-auto p-3"
        ref={outputRef}
      >
        {history.map((line, i) => (
          <div 
            key={i} 
            className={line.type === 'error' ? 'text-red-400' : line.type === 'command' ? 'text-white' : line.type === 'matrix' ? 'text-green-400' : 'whitespace-pre-wrap'}
            style={line.type === 'matrix' ? { fontFamily: 'monospace', fontSize: '10px' } : {}}
          >
            {line.text}
          </div>
        ))}
        <div className="flex items-center mt-1">
          <span className="text-green-400 mr-2">user@rk-studios:{currentPath}$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white"
            autoFocus
            disabled={isMatrixMode}
          />
        </div>
      </div>
    </div>
  );
}
