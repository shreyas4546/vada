import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, sub, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800"
  >
    <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
    <div className="text-3xl font-display font-bold text-white mb-1">{value}</div>
    <div className="text-emerald-400 text-xs">{sub}</div>
  </motion.div>
);

const DriveCard = ({ company, role, ctc, score }: any) => (
  <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between group">
    <div>
      <h4 className="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">{company}</h4>
      <p className="text-slate-400 text-sm mt-1">{role} • {ctc}</p>
    </div>
    <div className="text-right">
      <div className={`text-lg font-bold ${score > 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>
        {score}% Match
      </div>
      <button className="text-xs text-white bg-slate-800 px-3 py-1 rounded-full mt-2 hover:bg-slate-700">Apply Now</button>
    </div>
  </div>
);

export const StudentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="font-display text-4xl font-bold mb-2">Welcome back, Alex.</h1>
          <p className="text-slate-400">Your profile match score has increased by 12% this week.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Active Applications" value="4" sub="2 In Review" delay={0.1} />
          <StatCard title="Profile Score" value="88%" sub="Top 10% of batch" delay={0.2} />
          <StatCard title="Upcoming Interviews" value="1" sub="Tomorrow, 10:00 AM" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" /> Recommended Drives
            </h2>
            <DriveCard company="Google" role="Frontend Engineer" ctc="₹24 LPA" score={92} />
            <DriveCard company="Microsoft" role="SDE I" ctc="₹45 LPA" score={85} />
            <DriveCard company="Accenture" role="System Analyst" ctc="₹12 LPA" score={64} />
          </div>

          <div className="bg-slate-900/20 border border-slate-800 rounded-3xl p-6 h-fit">
            <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
               <FileText className="w-5 h-5 text-violet-400" /> Resume Analysis
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-sm text-emerald-200">
                ✅ Strong TypeScript experience detected.
              </div>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-sm text-yellow-200">
                ⚠️ Consider adding more backend projects (Node.js).
              </div>
              <button className="w-full py-3 bg-white text-slate-950 font-bold rounded-xl mt-4 hover:bg-cyan-50 transition-colors">
                Update Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};