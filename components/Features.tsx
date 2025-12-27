import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Shield, FileCheck } from 'lucide-react';
import { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-600/20 flex items-center justify-center text-cyan-300 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
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
    <section className="py-24 md:py-32 relative bg-slate-950">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-violet-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-600/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="mb-20 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Intelligent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              Campus Hiring
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Revolutionizing the placement process with automation and AI-driven insights for better career outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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