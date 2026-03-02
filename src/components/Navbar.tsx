import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Menu, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { theme, isAuthenticated } = useAppContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {theme.logoUrl ? (
            <img src={theme.logoUrl} alt={theme.siteTitle} className="h-8 w-auto" />
          ) : (
            <span className="text-xl font-serif font-bold tracking-tighter uppercase">
              {theme.siteTitle}
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:opacity-100 ${
                location.pathname === link.path ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated && (
            <Link to="/admin" className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors">
              <Settings size={18} />
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-black/5 p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="text-lg font-medium flex items-center gap-2">
                <Settings size={18} /> Admin
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
