import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/dashboard/StudentDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';

// Mock Login page for visual demo
const Login: React.FC = () => {
    return (
        <div className="h-screen w-full bg-slate-950 flex items-center justify-center">
             <div className="w-full max-w-md p-8 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-xl">
                <h2 className="text-3xl font-display font-bold text-white mb-6 text-center">Sign In</h2>
                <div className="space-y-4">
                    <button onClick={() => window.location.href = '/student'} className="w-full py-4 bg-white hover:bg-slate-200 text-slate-950 font-bold rounded-xl transition-colors">
                        Login as Student (Demo)
                    </button>
                    <button onClick={() => window.location.href = '/admin'} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors">
                        Login as TPO (Demo)
                    </button>
                </div>
                <p className="text-center text-slate-500 text-sm mt-6">Secure Enterprise Access</p>
             </div>
        </div>
    )
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        {/* In real app, wrap these in ProtectedRoute components */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;