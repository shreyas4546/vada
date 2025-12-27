import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Sparkles, User, Briefcase, GraduationCap, Loader2, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { improveDescription } from '../../lib/ai';

export const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education'>('personal');
  const [improvingField, setImprovingField] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: 'Alex Chen',
    email: 'alex.dev@college.edu',
    phone: '+91 98765 43210',
    summary: 'Computer Science student passionate about web development.',
    experience: 'Built a React app for a hackathon. Used Firebase and Tailwind. It was a good project.',
    education: 'B.Tech in Computer Science, 2024. GPA 8.9.'
  });

  const handleImprove = async (field: 'summary' | 'experience') => {
    setImprovingField(field);
    const improved = await improveDescription(formData[field], field);
    setFormData(prev => ({ ...prev, [field]: improved }));
    setImprovingField(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
      {/* Left Panel: Editor */}
      <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto border-r border-slate-800 h-screen">
        <div className="max-w-xl mx-auto">
          <Link to="/student" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-display font-bold">Resume Builder</h1>
            <div className="px-3 py-1 bg-violet-500/10 rounded-full border border-violet-500/20 text-xs text-violet-300 flex items-center gap-1">
                <Sparkles size={12} /> AI Enabled
            </div>
          </div>
          <p className="text-slate-400 mb-8">Create an ATS-friendly resume with AI assistance.</p>

          <div className="flex gap-4 mb-8 border-b border-slate-800 pb-1">
            {['personal', 'experience', 'education'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-sm font-medium capitalize transition-colors relative ${
                  activeTab === tab ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {activeTab === 'personal' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Email</label>
                    <input 
                      type="text" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Phone</label>
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm text-slate-400">Professional Summary</label>
                    <button 
                        onClick={() => handleImprove('summary')}
                        disabled={!!improvingField}
                        className="text-xs px-3 py-1.5 bg-violet-600 hover:bg-violet-500 rounded-lg text-white disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-lg shadow-violet-500/20"
                    >
                        {improvingField === 'summary' ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                        Magic Improve
                    </button>
                  </div>
                  <textarea 
                    value={formData.summary}
                    onChange={e => setFormData({...formData, summary: e.target.value})}
                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 outline-none resize-none leading-relaxed transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                 <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm text-slate-400">Work Experience / Projects</label>
                    <button 
                        onClick={() => handleImprove('experience')}
                        disabled={!!improvingField}
                        className="text-xs px-3 py-1.5 bg-violet-600 hover:bg-violet-500 rounded-lg text-white disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-lg shadow-violet-500/20"
                    >
                         {improvingField === 'experience' ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                        Magic Improve
                    </button>
                  </div>
                  <textarea 
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                    className="w-full h-64 bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 outline-none resize-none leading-relaxed transition-colors"
                    placeholder="List your roles and responsibilities..."
                  />
                </div>
              </motion.div>
            )}
            
            {activeTab === 'education' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                 <div>
                   <label className="block text-sm text-slate-400 mb-1">Education Details</label>
                   <textarea 
                     value={formData.education}
                     onChange={e => setFormData({...formData, education: e.target.value})}
                     className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-cyan-500 outline-none resize-none leading-relaxed transition-colors"
                   />
                 </div>
               </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="hidden md:block w-1/2 bg-slate-900 p-8 h-screen overflow-hidden flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-900 to-slate-900 pointer-events-none" />
        
        <div className="max-w-[21cm] w-full bg-white text-slate-900 p-12 shadow-2xl rounded-sm transform scale-90 origin-center transition-transform duration-500 hover:scale-[0.92]">
            {/* Resume Content */}
            <div className="border-b-2 border-slate-800 pb-6 mb-6">
                <h2 className="text-4xl font-bold uppercase tracking-tight mb-2">{formData.fullName}</h2>
                <p className="text-slate-600 flex gap-4 text-sm font-medium">
                    <span>{formData.email}</span> • <span>{formData.phone}</span>
                </p>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-200 pb-1">Summary</h3>
                <p className="text-sm leading-relaxed text-slate-700">{formData.summary}</p>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-200 pb-1">Experience</h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">{formData.experience}</p>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 border-b border-slate-200 pb-1">Education</h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-slate-700">{formData.education}</p>
            </div>
        </div>
        
        <div className="absolute bottom-8 right-8">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-3 rounded-full shadow-lg shadow-cyan-500/20 font-bold flex items-center gap-2 transition-all hover:scale-105">
                <Download size={20} /> Download PDF
            </button>
        </div>
      </div>
    </div>
  );
};