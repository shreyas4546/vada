import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Footer } from './components/Footer';

/**
 * App.tsx
 * 
 * Main layout component for the College Placement Portal.
 * 
 * Strategy:
 * - This Landing Page serves as the public face.
 * - Includes a responsive mobile navigation menu.
 */
const App: React.FC = () => {
  // Motion values for high-performance mouse tracking (avoids re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll tracking for smart navbar
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide if scrolling down AND we've scrolled past the threshold (150px)
    // AND mobile menu is NOT open (to keep the close button visible)
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth spring physics for fluid movement
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms - Elements move slightly to create depth
  const logoX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const logoY = useTransform(smoothY, [-1, 1], [-10, 10]);

  const linksX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const linksY = useTransform(smoothY, [-1, 1], [-20, 20]);

  const mobileMenuVariants: Variants = {
    closed: { opacity: 0, x: "100%" },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    exit: { 
      opacity: 0, 
      x: "100%",
      transition: { duration: 0.3 }
    }
  };

  const mobileItemVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <main className="bg-slate-950 min-h-screen text-white selection:bg-cyan-500/30">
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none"
      >
        <motion.div 
          style={{ x: logoX, y: logoY }}
          className="font-bold text-2xl tracking-tighter pointer-events-auto cursor-pointer relative z-50"
        >
          PLACEMENT AI
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          style={{ x: linksX, y: linksY }}
          className="hidden md:flex gap-8 pointer-events-auto items-center"
        >
          <a href="#" className="text-sm font-medium hover:text-cyan-400 transition-colors">Active Drives</a>
          <a href="#" className="text-sm font-medium hover:text-cyan-400 transition-colors">Statistics</a>
          <a href="#" className="text-sm font-medium hover:text-cyan-400 transition-colors">Recruiters</a>
          <button className="px-4 py-1.5 text-sm font-medium bg-white text-slate-950 rounded-full hover:bg-cyan-50 transition-colors">
            Login
          </button>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden pointer-events-auto relative z-50">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center text-2xl font-light">
              <motion.a 
                href="#" 
                variants={mobileItemVariants}
                className="hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Active Drives
              </motion.a>
              <motion.a 
                href="#" 
                variants={mobileItemVariants}
                className="hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Statistics
              </motion.a>
              <motion.a 
                href="#" 
                variants={mobileItemVariants}
                className="hover:text-cyan-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recruiters
              </motion.a>
              <motion.button 
                variants={mobileItemVariants}
                className="px-8 py-3 text-lg font-medium bg-white text-slate-950 rounded-full hover:bg-cyan-50 transition-colors mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <Features />
      <Footer />
    </main>
  );
};

export default App;