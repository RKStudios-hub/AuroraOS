import { motion } from 'framer-motion';

const beliefs = [
  { icon: 'fa-code', text: 'Strong fundamentals' },
  { icon: 'fa-film', text: 'Smooth animations' },
  { icon: 'fa-paint-brush', text: 'Clean UI' },
  { icon: 'fa-bug', text: 'Bug fixing specialist' },
];

const skills = [
  { icon: 'fa-html5', name: 'HTML', color: '#e34f26', prefix: 'fab' },
  { icon: 'fa-css3-alt', name: 'CSS', color: '#1572b6', prefix: 'fab' },
  { icon: 'fa-js', name: 'JavaScript', color: '#f7df1e', prefix: 'fab' },
  { icon: 'fa-box-open', name: '3D Design', color: '#ff6b6b', prefix: 'fas' },
  { icon: 'fa-palette', name: 'Graphics', color: '#9b59b6', prefix: 'fas' },
];

export default function AboutWindow() {
  return (
    <div className="p-6 h-full overflow-y-auto" style={{ background: '#ffffff' }}>
      {/* Header */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring' }}
        className="w-24 h-24 rounded-full mb-4 mx-auto overflow-hidden"
        style={{
          boxShadow: '0 10px 40px rgba(88, 166, 255, 0.3)',
        }}
      >
        <img src="./profile.jpg" alt="RK Studios" className="w-full h-full object-cover" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold text-center"
        style={{ color: '#1a1a2e' }}
      >
        RK Studios
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-sm text-center mt-1"
        style={{ color: '#666' }}
      >
        Graphics Designer • Lowpoly 3D Wizard • Keyboard Destroyer
      </motion.p>

      {/* Main Bio */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-5 p-5 rounded-xl text-center"
        style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}
      >
        <p className="text-sm leading-relaxed" style={{ color: '#333' }}>
          I am <span style={{ color: '#58a6ff', fontWeight: 600 }}>RK Studios</span> — self-proclaimed graphics designer, lowpoly 3D wizard, and full-time keyboard destroyer.
        </p>
        <p className="text-sm leading-relaxed mt-3" style={{ color: '#555' }}>
          Yes, self-proclaimed. Because if you don't promote yourself, who will? The printer? Exactly.
        </p>
        <p className="text-sm leading-relaxed mt-3" style={{ color: '#444' }}>
          Currently operating from high school (stealth mode enabled), I build websites, design visuals, and create lowpoly worlds that may or may not contain unnecessary details I'm extremely proud of. Did that rock need 47 extra faces? Absolutely not. Did I add them anyway? Absolutely yes.
        </p>
      </motion.div>

      {/* By Day / By Night */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-4 p-4 rounded-xl text-center"
        style={{ background: '#f0f7ff', border: '1px solid #d0e8ff' }}
      >
        <p className="text-sm" style={{ color: '#333' }}>
          <span style={{ color: '#58a6ff', fontWeight: 600 }}>By day:</span> student.<br/>
          <span style={{ color: '#58a6ff', fontWeight: 600 }}>By night:</span> bug hunter, pixel perfectionist, and professional "why is this not working?" investigator.
        </p>
      </motion.div>

      {/* What I Write */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 p-4 rounded-xl text-center"
        style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}
      >
        <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
          I write clean HTML, stylish CSS, and JavaScript that behaves… most of the time.<br/>
          If something breaks, I confidently blame:
        </p>
        <ul className="mt-2 space-y-1 inline-block text-left">
          {['Cache', 'The browser', 'The universe', '"It was working yesterday"'].map((item, i) => (
            <li key={i} className="text-sm flex items-center gap-2" style={{ color: '#666' }}>
              <span style={{ color: '#f85149' }}>→</span> {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Beliefs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-4"
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: '#888' }}>
          I believe in
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {beliefs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center justify-center gap-2 p-3 rounded-lg"
              style={{ background: '#f8f9fa' }}
            >
              <i className={`fas ${item.icon} text-sm`} style={{ color: '#3fb950' }} />
              <span className="text-sm" style={{ color: '#444' }}>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4"
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-center" style={{ color: '#888' }}>
          Skills
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.05 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: `${skill.color}15`, color: skill.color }}
            >
              <i className={`${skill.prefix} ${skill.icon}`} />
              {skill.name}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Hobbies */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 p-4 rounded-xl text-center"
        style={{ background: '#faf5ff', border: '1px solid #f0e0ff' }}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#888' }}>My hobbies include</h3>
        <ul className="space-y-1 inline-block text-left">
          {[
            'Adding smooth animations nobody asked for',
            'Spending 40 minutes adjusting padding by 2px',
            'Renaming files to final_v2_last_real_final_THIS_ONE.html'
          ].map((item, i) => (
            <li key={i} className="text-sm flex items-center gap-2" style={{ color: '#555' }}>
              <span style={{ color: '#bc8cff' }}>★</span> {item}
            </li>
          ))}
        </ul>
        <p className="text-sm mt-3 italic" style={{ color: '#888' }}>
          My lowpoly models are optimized… Emotionally optimized. Not always polygon optimized.
        </p>
      </motion.div>

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 p-4 rounded-xl text-center"
        style={{ background: 'linear-gradient(135deg, #f0f7ff, #faf5ff)' }}
      >
        <p className="text-sm" style={{ color: '#444' }}>
          Every project I build is one step forward.<br/>
          Every bug I fix makes me stronger.<br/>
          And every "small idea" somehow turns into a 4-hour experiment.
        </p>
        <p className="text-sm mt-3 font-semibold" style={{ color: '#f85149' }}>
          ⚠️ Proceed carefully. You are now inside RK territory.
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-3 mt-5"
      >
        {[
          { icon: 'fa-github', url: 'https://github.com/RKStudios-hub', color: '#333' },
          { icon: 'fa-youtube', url: 'https://youtube.com', color: '#ff0000' },
          { icon: 'fa-instagram', url: 'https://instagram.com', color: '#e1306c' },
          { icon: 'fa-discord', url: 'https://discord.gg/xwH3u8EGh3', color: '#5865f2' },
        ].map((social, i) => (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors"
            style={{ background: '#f8f9fa', color: social.color }}
          >
            <i className={`fab ${social.icon}`} />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
