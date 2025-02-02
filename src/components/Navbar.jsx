import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { navbarVariants, glowingText } from '../config/animations';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/search', icon: MagnifyingGlassIcon, label: 'Search' },
  ];

  return (
    <motion.nav
      variants={navbarVariants}
      initial="initial"
      animate="animate"
      className="bg-secondary/80 backdrop-blur-md shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto"> {/* meh could have been better, but idc */}
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="text-2xl font-bold text-accent"
              variants={glowingText}
              animate="animate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GameUrge 
            </motion.div>
          </Link>

          <div className="flex space-x-4">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
              >
                <motion.div
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium
                    ${location.pathname === path
                      ? 'text-accent bg-primary/20'
                      : 'text-gray-300 hover:text-accent hover:bg-primary/10'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 15 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <span>{label}</span>
                  {location.pathname === path && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-accent w-full"
                      layoutId="navbar-underline"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 