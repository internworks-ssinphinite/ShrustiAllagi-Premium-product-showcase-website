import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/products' },
    { name: 'Heritage', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-luxury-noir/90 backdrop-blur-md border-b border-luxury-gold/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="group">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-serif luxury-text-gradient cursor-pointer"
            >
              Lumière
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <span
                  className={`text-sm tracking-wider uppercase transition-colors duration-300 ${
                    isActive(item.path)
                      ? 'text-luxury-gold'
                      : 'text-luxury-cream hover:text-luxury-gold'
                  }`}
                >
                  {item.name}
                </span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-luxury-gold"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-luxury-gold hover:text-luxury-gold-light transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-luxury-charcoal/95 backdrop-blur-lg border-t border-luxury-gold/20 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <motion.div
                    whileHover={{ x: 10 }}
                    className={`text-lg tracking-wider uppercase transition-colors duration-300 ${
                      isActive(item.path)
                        ? 'text-luxury-gold font-semibold'
                        : 'text-luxury-cream hover:text-luxury-gold'
                    }`}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
