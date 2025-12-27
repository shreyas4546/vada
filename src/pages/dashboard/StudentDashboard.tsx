import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, CheckCircle, Sparkles, Loader2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ResumeAnalyzer } from '../../components/dashboard/ResumeAnalyzer';
import { AIChatbot } from '../../components/dashboard/AIChatbot';

const StatCard = ({ title, value, sub, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
  >
    <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
    <div className="text-3xl font-display font-bold text-white mb-1">{value}</div>
    <div className="text-emerald-400 text-xs">{sub}</div>
  </motion.div>
);

const DriveCard = ({ company, role, ctc, match, onApply }: any) => (
  <div onClick={onApply} className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between group cursor-pointer">
    <div>
      <h4 className="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">{company}</h4>
      <p className="text-slate-400 text-sm mt-1">{role} • {ctc}</p>
    </div>
    <div className="text-right">
      <div className={`text-lg font-bold ${match > 80 ? 'text-emerald-400' : 'text-yellow-400'}`}>
        {match}% Match
      </div>
      <button className="text-xs text-white bg-slate-800 px-3 py-1 rounded-full mt-2 hover:bg-slate-700 transition-colors">Apply with AI</button>
    </div>
  </div>
);

export const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [applyingTo, setApplyingTo] = useState<string | null>(null);
  const [applyStep, setApplyStep] = useState<'idle' | 'analyzing' | 'done'>('idle');

  const handleApplyClick = (company: string) => {
    setApplyingTo(company);
    setApplyStep('idle');
  };

  const confirmApply = () => {
    setApplyStep('analyzing');
    // Mock AI delay for interaction
    setTimeout(() => {
        setApplyStep('done');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8 pt-24 relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">{user?.displayName?.split(' ')[0]}</span>.
            </h1>
            <p className="text-slate-400">Department: {user?.department} • Status: Active</p>
          </div>
          <div className="flex gap-4 items-center">
             <Link to="/resume-builder" className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors border border-slate-700 group">
                <FileText size={16} className="text-slate-400 group-hover:text-white transition-colors" /> 
                <span>Resume Builder</span>
             </Link>
             <button onClick={logout} className="text-sm text-slate-500 hover:text-red-400 transition-colors">Sign Out</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Active Applications" value="4" sub="2 In Review" delay={0.1} />
          <StatCard title="Profile Score" value="88%" sub="Top 10% of batch" delay={0.2} />
          <StatCard title="Upcoming Interviews" value="1" sub="Tomorrow, 10:00 AM" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold font-display flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-cyan-400" /> Recommended Drives
            </h2>
            <DriveCard company="Google" role="Frontend Engineer" ctc="₹24 LPA" match={92} onApply={() => handleApplyClick('Google')} />
            <DriveCard company="Microsoft" role="SDE I" ctc="₹45 LPA" match={85} onApply={() => handleApplyClick('Microsoft')} />
            <DriveCard company="Accenture" role="System Analyst" ctc="₹12 LPA" match={64} onApply={() => handleApplyClick('Accenture')} />
            <DriveCard company="TCS" role="Digital Innovator" ctc="₹9 LPA" match={55} onApply={() => handleApplyClick('TCS')} />
          </div>

          <div className="h-full">
            <ResumeAnalyzer />
          </div>
        </div>
      </div>

      {/* AI Chatbot Widget */}
      <AIChatbot />

      {/* AI Application Modal */}
      <AnimatePresence>
        {applyingTo && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            >
                <motion.div 
                    initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
                >
                    {applyStep === 'idle' && (
                        <>
                            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-400">
                                <Sparkles size={32} />
                            </div>
                            <h3 className="text-2xl font-bold font-display mb-2">Apply to {applyingTo}?</h3>
                            <p className="text-slate-400 mb-8">Our AI will optimize your resume highlights for this specific role before sending.</p>
                            <div className="flex gap-4">
                                <button onClick={() => setApplyingTo(null)} className="flex-1 py-3 text-slate-400 hover:text-white">Cancel</button>
                                <button onClick={confirmApply} className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-colors">
                                    Optimize & Send
                                </button>
                            </div>
                        </>
                    )}
                    {applyStep === 'analyzing' && (
                        <div className="py-8">
                            <Loader2 className="animate-spin w-12 h-12 text-cyan-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Tailoring Resume...</h3>
                            <p className="text-slate-400 text-sm">Aligning skills with Job Description...</p>
                        </div>
                    )}
                    {applyStep === 'done' && (
                        <>
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-bold font-display mb-2">Application Sent!</h3>
                            <p className="text-slate-400 mb-8">Your optimized profile has been shared with the recruiter.</p>
                            <button onClick={() => setApplyingTo(null)} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
                                Close
                            </button>
                        </>
                    )}
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};