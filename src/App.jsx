import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import GameDetails from './pages/GameDetails';
import ParticleBackground from './components/ParticleBackground';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-primary/95 relative">
        <ParticleBackground />
        <div className="relative z-10 flex flex-col min-h-screen backdrop-blur-sm">
          <Navbar />
          <main className="flex-grow container py-8">
            <AnimatedRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
