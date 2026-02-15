import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const skills = {
  frontend: {
    title: '🌐 Frontend Development',
    color: 'from-blue-500 to-cyan-400',
    items: [
      { name: 'HTML / CSS / JavaScript', level: 90 },
      { name: 'Tailwind CSS', level: 40 },
      { name: 'React', level: 50 },
      { name: 'Vite', level: 60 },
      { name: 'TypeScript', level: 65 },
    ],
  },
  languages: {
    title: '🐍 Programming Languages',
    color: 'from-green-500 to-emerald-400',
    items: [
      { name: 'Python', level: 90 },
      { name: 'C++', level: 70 },
      { name: 'Java', level: 70 },
    ],
  },
  gamedev: {
    title: '🎮 Game Development',
    color: 'from-purple-500 to-pink-400',
    items: [
      { name: 'Unity', level: 90 },
      { name: 'Unreal Engine', level: 80 },
      { name: 'Godot', level: 25 },
    ],
  },
  focus: {
    title: '🧠 Current Focus',
    color: 'from-orange-500 to-red-400',
    items: [
      { name: 'Bash / Linux scripting', level: 35 },
      { name: 'Cybersecurity', level: 30 },
      { name: 'Networking', level: 25 },
      { name: 'Rust', level: 15 },
    ],
  },
};

const StatusCard = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 }}
    className="mt-6 p-4 rounded-2xl"
    style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}
  >
    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
      <span className="text-lg">🔥</span> Developer Status
    </h3>
    <div className="space-y-2 text-sm text-white/70">
      <p>• Strong in fundamentals</p>
      <p>• Comfortable across multiple stacks</p>
      <p>• Still learning. Always improving.</p>
      <p>• No "tutorial-only" knowledge — real project experience</p>
    </div>
  </motion.div>
);

function SkillBar({ name, level, color, delay, animate }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-700 font-medium">{name}</span>
        <span className="text-xs font-semibold text-gray-500">{level}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 0.8, delay }}
        />
      </div>
    </div>
  );
}

function SkillTile({ category, delay, animate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-5 rounded-2xl"
      style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
    >
      <h3 className="text-base font-bold text-gray-800 mb-4">{category.title}</h3>
      <div className="space-y-1">
        {category.items.map((skill, index) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.color}
            delay={delay + index * 0.1}
            animate={animate}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function DesignWindow() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-5 h-full overflow-y-auto" style={{ background: '#f5f5f7' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
          <i className="fas fa-palette text-white text-lg"></i>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Design Studio</h2>
          <p className="text-xs text-gray-500">Skills & Expertise</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SkillTile category={skills.frontend} delay={0.1} animate={animate} />
        <SkillTile category={skills.languages} delay={0.2} animate={animate} />
        <SkillTile category={skills.gamedev} delay={0.3} animate={animate} />
        <SkillTile category={skills.focus} delay={0.4} animate={animate} />
      </div>

      <StatusCard />
    </div>
  );
}
