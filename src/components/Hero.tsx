import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Scene } from './3d/Scene';
import { Button } from './UI/Button';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1
      setMousePos({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* 3D Background - Covers full screen but camera focuses on right side */}
      <Scene mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Content Container - Left Aligned */}
      {/* 8-point grid: px-6 (24px) md:px-12 (48px) */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
          className="max-w-4xl text-left flex flex-col items-start"
        >
          {/* Badge - Muted colors with specific spacing */}
          {/* mb-8 = 32px */}
          <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-sm font-medium text-cyan-200/90 tracking-wide">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            Next-Gen Campus Hiring
          </div>
          
          {/* Main Headline - Rule #5 Big Display Font & Rule #3 Line Height 1:1 */}
          {/* text-8xl approx 96px, leading-none approx 1 */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white leading-[1.05]">
            Simplifying <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-500">
                Campus 
            </span> Placements
          </h1>

          {/* Subtext - Rule #3 Line Height 1.6 & Rule #2 Muted Colors */}
          {/* mb-12 = 48px */}
          <p className="max-w-xl text-lg md:text-xl text-slate-400 mb-12 font-light leading-relaxed">
            Powering seamless resume scoring, automated offer letters, and AI integrations to make hiring simpler and enable students to get placed faster.
          </p>

          {/* Buttons - 8-point grid gap */}
          {/* gap-6 = 24px */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              variant="primary" 
              className="!px-8 !py-4 text-lg"
              onClick={() => navigate('/login')}
            >
              Get started
            </Button>
            <Button variant="outline" className="!px-8 !py-4 text-lg">
              View Analytics
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Bottom Left */}
      <motion.div 
        className="absolute bottom-12 left-12 text-slate-500 hidden md:block"
        animate={{ y: [0, 8, 0] }} // 8px bounce
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};