import React from 'react';
import { motion } from 'framer-motion';
import { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '' 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300 relative overflow-hidden group";
  
  const variants = {
    // Primary: White button with heavy Cyan neon shadow
    primary: "bg-white text-slate-950 hover:bg-cyan-50 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]",
    
    // Secondary: Indigo button with Indigo neon shadow
    secondary: "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]",
    
    // Outline: Transparent with subtle Cyan/Blue glow
    outline: "bg-transparent border border-white/20 text-white hover:border-cyan-400/50 hover:bg-cyan-950/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] backdrop-blur-sm"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Internal Expanding Glow Layer */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-cyan-400/30 via-violet-500/30 to-cyan-400/30 blur-2xl opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-150 transition-all duration-500 ease-out origin-center rounded-full" />
      </div>
    </motion.button>
  );
};