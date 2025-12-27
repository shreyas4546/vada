import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Users, FileText, TrendingUp, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HODDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const pendingStudents = [
    { id: 1, name: "Rohit Sharma", gpa: "8.9", skills: "React, Node", status: "Pending" },
    { id: 2, name: "Priya Patel", gpa: "9.2", skills: "Python, AI/ML", status: "Pending" },
    { id: 3, name: "Amit Kumar", gpa: "7.5", skills: "Java, Spring", status: "Pending" },
  ];

  const [students, setStudents] = useState(pendingStudents);

  const handleAction = (id: number, action: 'approve' | 'reject') => {
    setStudents(prev => prev.filter(s => s.id !== id));
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">Department Portal</h1>
            <p className="text-slate-400">Computer Science • {user?.displayName}</p>
          </div>
          <button onClick={logout} className="text-sm text-slate-500 hover:text-red-400 transition-colors">Sign Out</button>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Users size={20} /></div>
              <span className="text-slate-400 text-sm">Total Students</span>
            </div>
            <div className="text-3xl font-bold font-display">142</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
             <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><TrendingUp size={20} /></div>
              <span className="text-slate-400 text-sm">Placement Rate</span>
            </div>
            <div className="text-3xl font-bold font-display">78%</div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
             <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><FileText size={20} /></div>
              <span className="text-slate-400 text-sm">Pending Approvals</span>
            </div>
            <div className="text-3xl font-bold font-display">{students.length}</div>
          </div>
        </div>

        {/* Approvals Table */}
        <div className="bg-slate-900/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-display text-lg font-bold">Student Verification Queue</h3>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search ID..." 
                    className="bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-6">Name</th>
                <th className="p-6">GPA</th>
                <th className="p-6">Key Skills</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {students.map((student) => (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-6 font-medium text-white">{student.name}</td>
                    <td className="p-6 text-slate-300">{student.gpa}</td>
                    <td className="p-6 text-slate-400 text-sm">{student.skills}</td>
                    <td className="p-6 flex justify-end gap-3">
                      <button 
                        onClick={() => handleAction(student.id, 'reject')}
                        className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <XCircle size={20} />
                      </button>
                      <button 
                        onClick={() => handleAction(student.id, 'approve')}
                        className="p-2 hover:bg-emerald-500/10 text-emerald-500 hover:text-emerald-400 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <CheckCircle size={20} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {students.length === 0 && (
                <tr>
                    <td colSpan={4} className="p-12 text-center text-slate-500">
                        No pending approvals. All caught up!
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};