import { useState, useEffect, useRef } from 'react';
import { fetchGitHubProjects } from '../services/projectService';

const GITHUB_USERNAME = 'RKStudios-hub';

const colors = {
  reset: '#58a6ff',
  green: '#3fb950',
  yellow: '#d29922',
  cyan: '#58a6ff',
  magenta: '#bc8cff',
  red: '#f85149',
  white: '#ffffff',
  gray: '#8b949e',
  orange: '#f0883e',
  blue: '#58a6ff',
  pink: '#db61a2',
};

const parseColoredText = (text) => {
  const parts = [];
  const lines = text.split('\n');
  
  lines.forEach((line, lineIndex) => {
    const coloredParts = line.match(/(\x1b\[[0-9;]*m[^\x1b]*|\x1b\[[0-9;]*m|[^\x1b]+)/g) || [line];
    
    coloredParts.forEach((part) => {
      let color = colors.reset;
      if (part.includes('\x1b[32m')) color = colors.green;
      else if (part.includes('\x1b[33m')) color = colors.yellow;
      else if (part.includes('\x1b[36m')) color = colors.cyan;
      else if (part.includes('\x1b[35m')) color = colors.magenta;
      else if (part.includes('\x1b[31m')) color = colors.red;
      else if (part.includes('\x1b[37m')) color = colors.white;
      else if (part.includes('\x1b[90m')) color = colors.gray;
      else if (part.includes('\x1b[38;5;208m')) color = colors.orange;
      else if (part.includes('\x1b[38;5;39m')) color = colors.blue;
      else if (part.includes('\x1b[38;5;200m')) color = colors.pink;
      
      const cleanPart = part.replace(/\x1b\[[0-9;]*m/g, '');
      if (cleanPart) {
        parts.push({ text: cleanPart, color });
      }
    });
    
    if (lineIndex < lines.length - 1) {
      parts.push({ text: '\n', color: colors.reset });
    }
  });
  
  return parts;
};

const formatColoredOutput = (text) => {
  let formatted = text
    .replace(/^(\d+\.)/gm, '\x1b[38;5;39m$1\x1b[0m')
    .replace(/(https?:\/\/[^\s]+)/g, '\x1b[36m$1\x1b[0m')
    .replace(/\|/g, '\x1b[90m|\x1b[0m')
    .replace(/(RK|Studio|RK Studios|Rupesh)/g, '\x1b[38;5;39m$1\x1b[0m')
    .replace(/(HTML|CSS|JavaScript|React)/g, '\x1b[32m$1\x1b[0m')
    .replace(/(High School|Developer|Designer|Artist)/g, '\x1b[33m$1\x1b[0m')
    .replace(/(Lowpoly|3D|Model)/g, '\x1b[38;5;208m$1\x1b[0m')
    .replace(/(GitHub|YouTube|Email)/g, '\x1b[35m$1\x1b[0m');
  return formatted;
};

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
    { type: 'output', text: '\x1b[38;5;39mWelcome to RK Studios Terminal v1.0\x1b[0m' },
    { type: 'output', text: 'Type \x1b[32mhelp\x1b[0m for available commands.' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [githubProjects, setGithubProjects] = useState([]);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    async function loadGithubProjects() {
      const projects = await fetchGitHubProjects(GITHUB_USERNAME);
      setGithubProjects(projects);
    }
    loadGithubProjects();
  }, []);

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
        newHistory.push({ type: 'output', text: '\x1b[32mAvailable commands:\x1b[0m' });
        Object.entries(commands).forEach(([k, v]) => {
          newHistory.push({ type: 'output', text: `  \x1b[38;5;39m${k.padEnd(15)}\x1b[0m - ${v}` });
        });
        break;

      case 'about':
        newHistory.push({ type: 'output', text: `\x1b[38;5;39mName:\x1b[0m Rupesh Kumar
\x1b[38;5;39mAlias:\x1b[0m RK Studios
\x1b[38;5;39mRole:\x1b[0m \x1b[33mDeveloper\x1b[0m | \x1b[33mGraphics Designer\x1b[0m | \x1b[38;5;208mLowpoly 3D Artist\x1b[0m
\x1b[38;5;39mStatus:\x1b[0m \x1b[33mHigh School Student\x1b[0m
\x1b[38;5;39mMission:\x1b[0m Building real-world projects using core web fundamentals.` });
        break;

      case 'skills':
        newHistory.push({ type: 'output', text: `\x1b[32mFrontend:\x1b[0m
- \x1b[32mHTML\x1b[0m
- \x1b[32mCSS\x1b[0m
- \x1b[32mJavaScript\x1b[0m

\x1b[35mDesign:\x1b[0m
- Graphic Design
- Logo Design
- UI Mockups

\x1b[38;5;208m3D:\x1b[0m
- Lowpoly Modeling
- Stylized Assets

\x1b[33mLearning:\x1b[0m
- React
- Advanced Animations
- Creative Coding` });
        break;

      case 'projects':
        if (githubProjects.length > 0) {
          const projectList = githubProjects.map((p, i) => {
            const num = `\x1b[38;5;39m${i + 1}.\x1b[0m`;
            const title = `\x1b[32m${p.title}\x1b[0m`;
            const desc = p.description ? `\x1b[90m- ${p.description}\x1b[0m` : '';
            const lang = p.tags?.[0] ? `\x1b[36m[${p.tags[0]}]\x1b[0m` : '';
            return `${num} ${title} ${lang}\n   ${desc}`;
          }).join('\n');
          newHistory.push({ type: 'output', text: projectList });
        } else {
          newHistory.push({ type: 'output', text: `\x1b[33mLoading projects from GitHub...\x1b[0m\nOr visit: \x1b[36mgithub.com/${GITHUB_USERNAME}\x1b[0m` });
        }
        break;

      case 'art':
        newHistory.push({ type: 'output', text: `\x1b[38;5;208m-\x1b[0m Pencil Sketches
\x1b[38;5;208m-\x1b[0m Stylized Portraits
\x1b[38;5;208m-\x1b[0m YouTube Sketch Videos
\x1b[38;5;208m-\x1b[0m Character Art` });
        break;

      case '3d':
        newHistory.push({ type: 'output', text: `\x1b[38;5;208m-\x1b[0m Lowpoly Medieval Assets
\x1b[38;5;208m-\x1b[0m RK Bot Action Figure
\x1b[38;5;208m-\x1b[0m Chandrayaan-2 Model
\x1b[38;5;208m-\x1b[0m Mini Gaming Room Setup` });
        break;

      case 'contact':
        newHistory.push({ type: 'output', text: `\x1b[35mEmail:\x1b[0m rkstudios@example.com
\x1b[35mGitHub:\x1b[0m \x1b[36mgithub.com/RKStudios\x1b[0m
\x1b[35mYouTube:\x1b[0m RK Studios` });
        break;

      case 'resume':
        newHistory.push({ type: 'output', text: '\x1b[33mResume not available.\x1b[0m Contact me to get a copy!' });
        break;

      case 'whoami':
        newHistory.push({ type: 'output', text: `You are currently exploring \x1b[38;5;39mRK Studios\x1b[0m.
\x1b[32mCuriosity level: 100%\x1b[0m` });
        break;

      case 'coffee':
        newHistory.push({ type: 'output', text: '\x1b[33mBrewing creativity...\x1b[0m\n☕ + 💻 = 🚀' });
        break;

      case 'motivation':
        newHistory.push({ type: 'output', text: `"\x1b[32mLearning fast. Creating daily. Improving constantly.\x1b[0m"` });
        break;

      case 'matrix':
        newHistory.push({ type: 'output', text: '\x1b[32mEntering the Matrix...\x1b[0m' });
        setIsMatrixMode(true);
        let matrixInterval = 0;
        let count = 0;
        const interval = setInterval(() => {
          if (count >= 20) {
            clearInterval(interval);
            setIsMatrixMode(false);
            newHistory.push({ type: 'output', text: '\x1b[32mExited Matrix.\x1b[0m' });
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
        newHistory.push({ type: 'output', text: `\x1b[33mFreelance Projects\x1b[0m
Personal Portfolio Builds
\x1b[35mUI/UX Experiments\x1b[0m
Game UI Concepts` });
        break;

      case 'timeline':
        newHistory.push({ type: 'output', text: `\x1b[38;5;39m2023\x1b[0m - Started Web Development
\x1b[38;5;39m2024\x1b[0m - Built Multiple Real Projects
\x1b[38;5;39m2025\x1b[0m - Exploring Advanced UI + 3D` });
        break;

      case 'secret':
        newHistory.push({ type: 'output', text: '\x1b[38;5;208mYou found an easter egg 👀\x1b[0m\n\x1b[33mFuture CEO loading...\x1b[0m' });
        break;

      case 'sudo':
        if (arg === 'hire-me') {
          newHistory.push({ type: 'output', text: '\x1b[32mPermission granted.\x1b[0m\nOpening future collaboration.exe...' });
        } else {
          newHistory.push({ type: 'error', text: 'sudo: permission denied: you are not the admin' });
        }
        break;

      case 'ls':
        newHistory.push({ type: 'output', text: '\x1b[38;5;39mabout.txt\x1b[0m  \x1b[38;5;39mskills.json\x1b[0m  \x1b[38;5;39mcontact.sh\x1b[0m  \x1b[38;5;39mresume.pdf\x1b[0m  \x1b[38;5;208mprojects/\x1b[0m  \x1b[38;5;208mart/\x1b[0m  \x1b[38;5;208m3d/\x1b[0m' });
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
        newHistory.push({ type: 'output', text: `\x1b[38;5;39m                    rk@linux
                   -----------
                  OS:\x1b[0m RK-OS 1.0 (Custom)
\x1b[38;5;39m                  Host:\x1b[0m Browser PC
\x1b[38;5;39m                  Kernel:\x1b[0m JavaScript ES6
\x1b[38;5;39m                  Shell:\x1b[0m bash 5.0
\x1b[38;5;39m                  Terminal:\x1b[0m WebTerminal
\x1b[38;5;39m                  CPU:\x1b[0m Virtual
\x1b[38;5;39m                  Memory:\x1b[0m Unlimited
\x1b[38;5;39m                  Uptime:\x1b[0m Always
\x1b[38;5;39m                  DE:\x1b[0m RK Desktop
\x1b[38;5;39m                  Theme:\x1b[0m Dark` });
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
        newHistory.push({ type: 'error', text: `\x1b[31mcommand not found: ${command}\x1b[0m` });
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

  const renderOutput = (text) => {
    const parts = parseColoredText(text);
    return parts.map((part, i) => (
      <span key={i} style={{ color: part.color }}>{part.text}</span>
    ));
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
            {line.type === 'output' ? renderOutput(line.text) : line.text}
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
