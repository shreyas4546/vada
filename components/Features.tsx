import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Shield, FileCheck } from 'lucide-react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} // 24px (multiple of 8)
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      // Rule 1: 8-Point Grid -> p-8 (32px) padding
      className="group relative h-full p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:bg-slate-900/60 transition-colors duration-300"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon box 48px (12 * 4) */}
        <div className="w-14 h-14 mb-8 rounded-xl bg-gradient-to-br from-cyan-500/10 to-violet-600/10 border border-white/5 flex items-center justify-center text-cyan-200 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-display text-2xl font-bold mb-4 text-white leading-tight">{title}</h3>
        {/* Rule 3: 1.6 Line height for body */}
        <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors duration-300 flex-grow">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      title: "AI Resume Scoring",
      description: "Get a 0-100 job-fit score instantly. Our AI parses skills, education, and experience to match you with the right roles.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Central Command",
      description: "A unified dashboard for TPOs to manage companies, drives, and student approvals in real-time.",
      icon: <Layers className="w-6 h-6" />
    },
    {
      title: "Automated Offers",
      description: "Streamline the hiring process. Generate, sign, and distribute offer letters automatically upon selection.",
      icon: <FileCheck className="w-6 h-6" />
    },
    {
      title: "Role-Based Security",
      description: "Dedicated, secure environments for Students, HODs, and Placement Officers ensuring data privacy.",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    // Rule 1: 8-Point Grid - py-32 (128px) for large section spacing
    <section className="py-24 md:py-32 relative bg-slate-950 overflow-hidden">
      {/* Decorative gradients - Muted */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-violet-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-900/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        {/* Rule 5: Big Display Fonts as Visual Elements */}
        {/* mb-24 (96px) spacing between head and grid */}
        <div className="mb-24 max-w-5xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // Massive display font size for visual impact
            className="font-display text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-[0.95]"
          >
            Intelligent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400/90 to-violet-500/90">
              Campus Hiring.
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-8 items-start md:items-center"
          >
             <div className="h-px w-24 bg-slate-800 hidden md:block" />
             <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
              Revolutionizing the placement process with automation and AI-driven insights for better career outcomes.
            </p>
          </motion.div>
        </div>

        {/* Grid - gap-8 (32px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};