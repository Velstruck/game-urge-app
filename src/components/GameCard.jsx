import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gameCardVariants, glowingText } from '../config/animations';

const GameCard = ({ game }) => {
  const imageUrl = game.cover?.url
    ? game.cover.url.replace('t_thumb', 't_cover_big')
    : 'https://via.placeholder.com/264x352';

  return (
    <motion.div
      variants={gameCardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className="card group relative overflow-hidden"
    >
      <Link to={`/game/${game.id}`}>
        <div className="relative aspect-[3/4]">
          <motion.div
            className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
          <motion.img
            src={imageUrl}
            alt={game.name}
            className="w-full h-full object-cover rounded-t-lg"
            layoutId={`game-image-${game.id}`}
          />
          {game.rating && (
            <motion.div
              className="absolute top-2 right-2 bg-accent/90 text-white px-3 py-1 rounded-full text-sm font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            >
              {Math.round(game.rating)}%
            </motion.div>
          )}
        </div>
        <motion.div 
          className="p-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h3 
            className="font-bold text-lg mb-2 text-white group-hover:text-accent transition-colors"
            variants={glowingText}
            animate="animate"
          >
            {game.name}
          </motion.h3>
          <div className="flex flex-wrap gap-2">
            {game.genres?.slice(0, 2).map((genre) => (
              <motion.span
                key={genre.name}
                className="text-xs bg-primary px-2 py-1 rounded-full text-gray-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {genre.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default GameCard; 