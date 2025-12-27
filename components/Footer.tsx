import React from 'react';
import { Button } from './UI/Button';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    // Rule 1: 8-Point Grid - pt-32 (128px), pb-16 (64px)
    <footer className="bg-slate-950 pt-32 pb-16 border-t border-white/[0.02] relative overflow-hidden">
        {/* Glow behind CTA - Extremely muted */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-t from-transparent via-indigo-950/20 to-transparent blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-24" // mb-24 (96px)
        >
          {/* Rule 5: Big Display Font */}
          <h2 className="font-display text-4xl md:text-7xl font-bold mb-8 tracking-tight text-white leading-none">
            Ready to Get Hired?
          </h2>
          {/* Rule 2 & 3: Muted Colors & 1.6 Line Height */}
          <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
            Join the platform that powers your future. <br className="hidden md:block" />
            Simple registration, instant matching, and dream offers.
          </p>
          <Button variant="primary" className="mx-auto !px-10 !py-4 text-lg">
            Register for Drive
          </Button>
        </motion.div>

        {/* Footer Links - gap-8 (32px) */}
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm border-t border-white/[0.05] pt-12 mt-12">
          <p>© 2024 Campus Placement Cell.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">TPO Contact</a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Support</a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
};