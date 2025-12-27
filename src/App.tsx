import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/dashboard/StudentDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { HODDashboard } from './pages/dashboard/HODDashboard';
import { ResumeBuilder } from './pages/careers/ResumeBuilder';
import { AuthProvider, useAuth } from './context/AuthContext';
import { motion } from 'framer-motion';

// Login Component
const Login: React.FC = () => {
    const { login, isLoading, user } = useAuth();
    const navigate = useNavigate();

    // Effect to redirect when user state updates
    useEffect(() => {
        if (user) {
            if (user.role === 'student') navigate('/student', { replace: true });
            else if (user.role === 'tpo') navigate('/admin', { replace: true });
            else if (user.role === 'hod') navigate('/hod', { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = async (role: 'student' | 'tpo' | 'hod') => {
        await login(role);
    };

    if (isLoading) {
       return (
         <div className="h-screen w-full bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
         </div>
       )
    }

    // Don't render login form if user is already present (effect handles redirect, but return null avoids flash)
    if (user) return null;

    return (
        <div className="h-screen w-full bg-slate-950 flex items-center justify-center overflow-hidden relative">
             {/* Background Effects */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-900/20 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-900/20 blur-[120px]" />
             </div>

             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md p-8 bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl"
             >
                <h2 className="text-3xl font-display font-bold text-white mb-2 text-center">Welcome Back</h2>
                <p className="text-slate-400 text-center mb-8 text-sm">Choose your portal to continue</p>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => handleLogin('student')} 
                        className="group w-full p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/50 rounded-xl transition-all flex items-center gap-4 text-left"
                    >
                        <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                        </div>
                        <div>
                            <div className="font-bold text-white">Student Portal</div>
                            <div className="text-xs text-slate-400">View drives, status & offers</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleLogin('tpo')} 
                        className="group w-full p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 rounded-xl transition-all flex items-center gap-4 text-left"
                    >
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </div>
                        <div>
                            <div className="font-bold text-white">Admin / TPO Portal</div>
                            <div className="text-xs text-slate-400">Manage rounds & analytics</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleLogin('hod')} 
                        className="group w-full p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/50 rounded-xl transition-all flex items-center gap-4 text-left"
                    >
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <div className="font-bold text-white">Head of Department</div>
                            <div className="text-xs text-slate-400">Approve students & reports</div>
                        </div>
                    </button>
                </div>
                <p className="text-center text-slate-600 text-xs mt-8">Secure Enterprise Access • v2.5.1</p>
             </motion.div>
        </div>
    )
}

const ProtectedRoute: React.FC<{ children: React.ReactNode, role: 'student' | 'tpo' | 'hod' }> = ({ children, role }) => {
    const { user, isLoading } = useAuth();
    
    if (isLoading) {
        return <div className="h-screen w-full bg-slate-950 flex items-center justify-center"></div>;
    }
    
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== role) return <Navigate to="/" replace />;
    
    return <>{children}</>;
}

const App: React.FC = () => {
  return (
    <AuthProvider>
        <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/student" element={
                <ProtectedRoute role="student">
                    <StudentDashboard />
                </ProtectedRoute>
            } />

            <Route path="/resume-builder" element={
                <ProtectedRoute role="student">
                    <ResumeBuilder />
                </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
                <ProtectedRoute role="tpo">
                    <AdminDashboard />
                </ProtectedRoute>
            } />

            <Route path="/hod" element={
                <ProtectedRoute role="hod">
                    <HODDashboard />
                </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Router>
    </AuthProvider>
  );
};

export default App;