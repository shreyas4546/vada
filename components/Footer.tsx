import React from 'react';
import { Button } from './UI/Button';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
        {/* Glow behind CTA */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-t from-transparent via-indigo-900/20 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Get Hired?
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join the platform that powers your future. <br />
            Simple registration, instant matching, and dream offers.
          </p>
          <Button variant="primary" className="mx-auto">
            Register for Drive
          </Button>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm border-t border-white/5 pt-10">
          <p>© 2024 Campus Placement Cell. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">TPO Contact</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
};