import { motion } from 'framer-motion';

const games = [
  {
    title: 'Star Forge',
    description: 'Space exploration RPG',
    icon: '🌌',
    downloads: '2.4K',
    rating: '4.8',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Dungeon Core',
    description: 'Roguelike adventure',
    icon: '🏰',
    downloads: '1.2K',
    rating: '4.6',
    color: 'from-purple-500 to-pink-400',
  },
];

export default function GameWindow() {
  return (
    <div className="p-4 h-full overflow-y-auto" style={{ background: '#ffffff' }}>
      <h2 className="text-lg font-semibold text-black mb-4">My Games</h2>

      <div className="space-y-3">
        {games.map((game, index) => (
          <motion.div
            key={game.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            className="group rounded-xl overflow-hidden cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.03)' }}
          >
            {/* Banner */}
            <div className={`h-20 bg-gradient-to-br ${game.color} flex items-center justify-center relative`}>
              <span className="text-4xl">{game.icon}</span>
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="font-medium text-black group-hover:text-blue-600 transition-colors">
                {game.title}
              </h3>
              <p className="text-xs text-black/50 mt-1">{game.description}</p>
              
              <div className="flex items-center gap-4 mt-2 text-xs text-black/40">
                <span>⬇ {game.downloads}</span>
                <span>⭐ {game.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* More games */}
      <div className="mt-4 p-4 rounded-xl text-center" style={{ background: 'rgba(0,0,0,0.03)' }}>
        <p className="text-sm text-black/40">More games coming soon!</p>
      </div>
    </div>
  );
}
