import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, ChevronDown, ChevronUp, Sparkles, X, Briefcase, Calendar, DollarSign, Mail, Loader2, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { generateEmail } from '../../lib/ai';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Email Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailContext, setEmailContext] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState<{subject: string, body: string} | null>(null);
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);

  const handleGenerateEmail = async () => {
      if (!emailContext.trim()) return;
      setIsGeneratingEmail(true);
      const res = await generateEmail(emailContext, 'Student');
      setGeneratedEmail(res as any);
      setIsGeneratingEmail(false);
  };

  // Mock data
  const applications = [
    { id: 1, name: "Alex Chen", role: "Frontend Engineer", company: "Google", score: 92, status: "Interview", insight: "Strong React skills and relevant internship experience at TechStart." },
    { id: 2, name: "Sarah Miller", role: "SDE I", company: "Microsoft", score: 88, status: "Shortlisted", insight: "Good algorithmic problem solving skills, but lacks cloud deployment experience." },
    { id: 3, name: "Rahul Gupta", role: "Data Scientist", company: "Amazon", score: 74, status: "Applied", insight: "Strong Python background, but limited experience with AWS tools required for this role." },
    { id: 4, name: "Emily Davis", role: "UX Designer", company: "Adobe", score: 95, status: "Offered", insight: "Perfect portfolio match. award winning case study on mobile usability." },
  ];

  const filteredApps = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8 pt-24 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">Placement Command</h1>
            <p className="text-slate-400">Logged in as {user?.displayName}</p>
          </div>
          <div className="flex gap-4">
             <button onClick={logout} className="px-4 py-3 text-slate-400 hover:text-white transition-colors">Logout</button>
             <button 
                onClick={() => setIsEmailModalOpen(true)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-full font-medium transition-all"
             >
                <Mail size={18} /> Compose Email
             </button>
             <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
             >
                <Plus size={18} /> New Drive
             </button>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {['Total Students', 'Placed', 'Avg Package', 'Active Drives'].map((label, i) => (
             <div key={i} className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">{label}</p>
                <p className="text-2xl font-display font-bold text-white">
                    {['1,240', '84%', '₹14.5 LPA', '12'][i]}
                </p>
             </div>
          ))}
        </div>

        {/* AI Filtered Table */}
        <div className="bg-slate-900/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <h3 className="font-display text-lg font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" /> Intelligent ATS
                </h3>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search by name, role or skill..." 
                        className="w-full md:w-80 bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-6">Student</th>
                            <th className="p-6">Role & Company</th>
                            <th className="p-6">AI Score</th>
                            <th className="p-6">Status</th>
                            <th className="p-6">Insight</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredApps.map((app, i) => (
                            <React.Fragment key={app.id}>
                                <tr 
                                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                                    className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                                >
                                    <td className="p-6 font-medium text-white">{app.name}</td>
                                    <td className="p-6 text-slate-300">
                                        {app.role} <span className="text-slate-500">•</span> {app.company}
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            app.score > 85 ? 'bg-emerald-400/10 text-emerald-400' : 'bg-yellow-400/10 text-yellow-400'
                                        }`}>
                                            {app.score}% Match
                                        </span>
                                    </td>
                                    <td className="p-6 text-slate-400">{app.status}</td>
                                    <td className="p-6">
                                        {expandedRow === i ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                                    </td>
                                </tr>
                                <AnimatePresence>
                                    {expandedRow === i && (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="bg-slate-900/50"
                                        >
                                            <td colSpan={5} className="p-6">
                                                <div className="flex gap-4 items-start">
                                                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                                                        <Sparkles className="w-5 h-5 text-cyan-400" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-cyan-100 mb-1">AI Analysis</h4>
                                                        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                                                            {app.insight}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* New Drive Modal */}
      <AnimatePresence>
        {isModalOpen && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                    className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative"
                >
                    <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                        <X size={24} />
                    </button>
                    
                    <h2 className="text-2xl font-display font-bold mb-6">Create Placement Drive</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Company Name</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none" placeholder="e.g. Google" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Role</label>
                                <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none" placeholder="SDE I" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">CTC (LPA)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-indigo-500 outline-none" placeholder="24.0" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Eligibility Criteria (AI Parsed)</label>
                            <textarea className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none h-24 resize-none" placeholder="Paste job description here..." />
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl mt-4 transition-colors"
                        >
                            Launch Drive
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* AI Email Modal */}
      <AnimatePresence>
        {isEmailModalOpen && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                    className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative"
                >
                    <button onClick={() => setIsEmailModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                        <X size={24} />
                    </button>
                    
                    <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                        <Sparkles className="text-cyan-400" size={24} /> AI Email Drafter
                    </h2>

                    <div className="space-y-4">
                        {!generatedEmail ? (
                            <>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">What is this email about?</label>
                                    <textarea 
                                        value={emailContext}
                                        onChange={(e) => setEmailContext(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none h-32 resize-none leading-relaxed" 
                                        placeholder="e.g. Inform students that the Google interview is rescheduled to Friday at 10 AM..." 
                                    />
                                </div>
                                <button 
                                    onClick={handleGenerateEmail}
                                    disabled={isGeneratingEmail || !emailContext}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
                                >
                                    {isGeneratingEmail ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                    Generate Draft
                                </button>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Subject</label>
                                    <input type="text" defaultValue={generatedEmail.subject} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Body</label>
                                    <textarea defaultValue={generatedEmail.body} className="w-full h-48 bg-slate-950 border border-slate-700 rounded-xl p-3 text-white resize-none" />
                                </div>
                                <div className="flex gap-4">
                                     <button onClick={() => setGeneratedEmail(null)} className="flex-1 py-3 text-slate-400 hover:text-white">Back</button>
                                     <button onClick={() => setIsEmailModalOpen(false)} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                                        <Send size={16} /> Send Email
                                     </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};