import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
 * - Future: Wrap this in React Router to add /dashboard routes for TPO/Student.
 */
const App: React.FC = () => {
  // Motion values for high-performance mouse tracking (avoids re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  return (
    <main className="bg-slate-950 min-h-screen text-white selection:bg-cyan-500/30">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
        <motion.div 
          style={{ x: logoX, y: logoY }}
          className="font-bold text-2xl tracking-tighter pointer-events-auto cursor-pointer"
        >
          PLACEMENT AI
        </motion.div>
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
      </nav>

      <Hero />
      <Features />
      <Footer />
    </main>
  );
};

export default App;