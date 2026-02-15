import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const skills = {
  languages: {
    title: 'Languages',
    items: [
      { name: 'C#', level: 95 },
      { name: 'C++', level: 75 },
      { name: 'Python', level: 80 },
    ],
  },
  engines: {
    title: 'Engines',
    items: [
      { name: 'Unity', level: 95 },
      { name: 'Godot', level: 80 },
      { name: 'Unreal', level: 70 },
    ],
  },
};

export default function DesignWindow() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 h-full overflow-y-auto" style={{ background: '#ffffff' }}>
      <h2 className="text-lg font-semibold text-black mb-4">Skills</h2>

      {Object.entries(skills).map(([key, category], catIndex) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.1 }}
          className="mb-4"
        >
          <h3 className="text-sm font-medium text-black/60 mb-2">{category.title}</h3>
          
          <div className="space-y-2">
            {category.items.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="w-16 text-sm text-black/50">{skill.name}</span>
                <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: animate ? `${skill.level}%` : 0 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <span className="w-8 text-xs text-blue-600 text-right">{skill.level}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
