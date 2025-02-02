import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, PlayIcon } from '@heroicons/react/24/outline';
import { getGameDetails } from '../config/igdb';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await getGameDetails(id);
        setGame(data);
        // video data dikha do, pehli video dikha do
        if (data.videos && data.videos.length > 0) {
          setSelectedVideo(data.videos[0]);
        }
      } catch (err) {
        setError('Failed to fetch game details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const renderVideoSection = () => {
    if (!game.videos || game.videos.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Game Trailers</h2>
        <div className="space-y-4">
          {/* yaha hogi video chalu */}
          {selectedVideo && (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-secondary">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.video_id}`}
                title={`${game.name} Trailer`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          )}

          {/*Videos ke Thumbnails */}
          {game.videos.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {game.videos.map((video) => (
                <motion.button
                  key={video.video_id}
                  onClick={() => setSelectedVideo(video)}
                  className={`relative aspect-video rounded-lg overflow-hidden group ${
                    selectedVideo?.video_id === video.video_id
                      ? 'ring-2 ring-accent'
                      : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`}
                    alt={`${game.name} video thumbnail`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <PlayIcon className="w-10 h-10 text-white opacity-80 group-hover:opacity-100" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="text-center text-red-500 mt-8">
        <p>{error || 'Game not found'}</p>
        <Link to="/" className="text-accent hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  const coverUrl = game.cover?.url
    ? game.cover.url.replace('t_thumb', 't_cover_big')
    : 'https://via.placeholder.com/264x352';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-accent hover:underline"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Home</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <img
            src={coverUrl}
            alt={game.name}
            className="w-full rounded-lg shadow-lg"
          />
          {game.rating && (
            <div className="bg-accent text-white p-4 rounded-lg text-center">
              <span className="text-2xl font-bold">{Math.round(game.rating)}%</span>
              <p className="text-sm mt-1">User Rating</p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
            {game.genres && (
              <div className="flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <span
                    key={genre.name}
                    className="bg-secondary px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {game.summary && (
            <div>
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-300 leading-relaxed">{game.summary}</p>
            </div>
          )}

          {renderVideoSection()}

          {game.platforms && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Platforms</h2>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform) => (
                  <span
                    key={platform.name}
                    className="bg-primary px-3 py-1 rounded-full text-sm"
                  >
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {game.similar_games && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Similar Games</h2>
              <div className="flex flex-wrap gap-2">
                {game.similar_games.slice(0, 5).map((similar) => (
                  <Link
                    key={similar.id}
                    to={`/game/${similar.id}`}
                    className="bg-secondary hover:bg-accent transition-colors px-3 py-1 rounded-full text-sm"
                  >
                    {similar.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameDetails; 