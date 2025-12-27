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
    // Primary: White button -> Text turns white, background covered by gradient
    primary: "bg-white text-slate-950 hover:text-white hover:shadow-[0_0_40px_rgba(34,211,238,0.7)] border border-transparent",
    
    // Secondary: Indigo button -> Enhanced glow
    secondary: "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] border border-transparent",
    
    // Outline: Transparent -> Filled with neon gradient
    outline: "bg-transparent border border-white/20 text-white hover:border-white/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] backdrop-blur-sm"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Internal Expanding Glow Layer 
          - z-index removed (defaults to auto/0) to ensure it renders ABOVE the parent background color
          - Text is z-10 so it stays visible
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-violet-600 to-cyan-500 blur-lg opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-150 transition-all duration-500 ease-out origin-center rounded-full" />
      </div>
    </motion.button>
  );
};