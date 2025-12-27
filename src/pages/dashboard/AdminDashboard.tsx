import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Search } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">Placement Command</h1>
            <p className="text-slate-400">Manage drives, students, and analytics.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-full font-medium transition-all">
            <Plus size={18} /> New Drive
          </button>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {['Total Students', 'Placed', 'Avg Package', 'Active Drives'].map((label, i) => (
             <div key={i} className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">{label}</p>
                <p className="text-2xl font-display font-bold">
                    {['1,240', '84%', '₹14.5 LPA', '12'][i]}
                </p>
             </div>
          ))}
        </div>

        {/* AI Filtered Table */}
        <div className="bg-slate-900/30 border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-display text-lg font-bold">Recent Applications</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" placeholder="AI Search (e.g. 'Java Experts')" className="bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 w-64" />
                </div>
            </div>
            <table className="w-full text-left">
                <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                        <th className="p-6">Student</th>
                        <th className="p-6">Drive</th>
                        <th className="p-6">AI Score</th>
                        <th className="p-6">Status</th>
                        <th className="p-6">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {[1,2,3,4].map((_, i) => (
                        <tr key={i} className="hover:bg-white/[0.02]">
                            <td className="p-6 font-medium">Student Name {i}</td>
                            <td className="p-6 text-slate-400">Google - SDE</td>
                            <td className="p-6">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-400/10 text-emerald-400">
                                    {90 - i * 5}% Match
                                </span>
                            </td>
                            <td className="p-6 text-slate-400">Interview Round</td>
                            <td className="p-6">
                                <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">View Report</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};