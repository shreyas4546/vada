import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Scene } from './3d/Scene';
import { Button } from './UI/Button';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Custom cubic bezier for premium feel
          className="max-w-3xl text-left flex flex-col items-start"
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-cyan-200">
             <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            Next-Gen Campus Hiring
          </div>
          
          {/* Main Headline - Matching the "Simplifying..." structure */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
            Simplifying <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400">
                Campus 
            </span> Placements
          </h1>

          {/* Subtext */}
          <p className="max-w-lg text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light">
            Powering seamless resume scoring, automated offer letters, and AI integrations to make hiring simpler and enable students to get placed faster.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <Button variant="primary" className="!px-10 !py-4 text-lg">
              Get started
            </Button>
            <Button variant="outline" className="!px-10 !py-4 text-lg">
              View Analytics
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Bottom Left */}
      <motion.div 
        className="absolute bottom-12 left-12 text-white/20 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};