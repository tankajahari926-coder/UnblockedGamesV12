import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, ChevronLeft } from 'lucide-react';
import gamesData from './games.json';

const CATEGORIES = ['All', 'Puzzle', 'Arcade', 'Platformer', 'Action', 'Sandbox'];

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Portal Games</span>
            </div>

            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                  Play Anywhere, <span className="text-indigo-500">Unblocked.</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  A curated collection of the best web games. No downloads, no blocks, just pure fun.
                </p>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Games Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    layoutId={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {game.title}
                        </h3>
                        <span className="text-[10px] uppercase tracking-wider bg-slate-700 px-2 py-0.5 rounded text-slate-300">
                          {game.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2">{game.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-slate-500 text-lg">No games found matching your search.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Games
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullScreen}
                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <a
                    href={selectedGame.iframeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                <iframe
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-storage-access-by-user-activation"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedGame.title}</h2>
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                      {selectedGame.category}
                    </span>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed max-w-3xl">
                  {selectedGame.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 py-12 border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-indigo-500" />
            <span className="text-lg font-bold text-white">Portal Games</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-slate-600">
            © 2026 Portal Games. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
