import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { scoreApplication } from '../../lib/ai';

export const ResumeAnalyzer: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number; analysis: string } | null>(null);

  // Hardcoded Job Description for Demo purposes
  const DEMO_JOB_DESC = `
    Role: Frontend Engineer at Google
    Requirements: 
    - Expert in React.js and TypeScript.
    - Experience with modern CSS frameworks (Tailwind).
    - Understanding of web performance and accessibility.
    - 3+ years of experience.
  `;

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Call the AI Service
    const aiResult = await scoreApplication(resumeText, DEMO_JOB_DESC);
    
    setResult(aiResult);
    setIsAnalyzing(false);
  };

  const loadSampleResume = () => {
    setResumeText(`Alex Chen - Frontend Developer
    Summary: Passionate developer with 4 years of experience building scalable web apps.
    Skills: React, TypeScript, TailwindCSS, Node.js, Firebase.
    Experience: 
    - Senior Dev at TechStart: Improved load times by 40%.
    - Freelance: Built 10+ e-commerce sites.
    Education: BS Computer Science.`);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
          <Sparkles size={20} />
        </div>
        <h2 className="text-xl font-display font-bold text-white">AI Resume Scorer</h2>
      </div>

      {!result ? (
        <div className="flex-1 flex flex-col">
          <label className="text-slate-400 text-sm mb-2">Paste Resume Text (or <button onClick={loadSampleResume} className="text-cyan-400 hover:underline">use sample</button>)</label>
          <textarea
            className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 resize-none mb-4"
            placeholder="Paste your resume content here to test against the Frontend Engineer role..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !resumeText}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {isAnalyzing ? 'Analyzing with Gemini...' : 'Analyze Match'}
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center"
        >
          <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
              <circle 
                cx="64" cy="64" r="56" 
                stroke="currentColor" 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray={351.86} 
                strokeDashoffset={351.86 - (351.86 * result.score) / 100}
                className={result.score > 75 ? "text-emerald-500" : result.score > 50 ? "text-yellow-500" : "text-red-500"}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-display">{result.score}%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Match</span>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-2">
            {result.score > 75 ? 'Excellent Match' : 'Potential Match'}
          </h3>
          <p className="text-sm text-slate-400 mb-6 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
            "{result.analysis}"
          </p>

          <button 
            onClick={() => setResult(null)} 
            className="text-sm text-slate-500 hover:text-white transition-colors"
          >
            Analyze Another
          </button>
        </motion.div>
      )}
    </div>
  );
};