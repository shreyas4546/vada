import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('placement_ai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo Data Creation
    let mockUser: UserProfile;

    if (role === 'student') {
      mockUser = {
        uid: 'demo-student-123',
        email: 'alex.dev@college.edu',
        displayName: 'Alex Chen',
        role: 'student',
        department: 'Computer Science',
        skills: ['React', 'TypeScript', 'Node.js', 'Python'],
        resumeUrl: 'mock_resume.pdf'
      };
    } else if (role === 'tpo') {
      mockUser = {
        uid: 'demo-tpo-admin',
        email: 'admin@college.edu',
        displayName: 'Sarah Connor (TPO)',
        role: 'tpo',
        department: 'Administration'
      };
    } else {
        // HOD fallback
        mockUser = {
            uid: 'demo-hod-cs',
            email: 'hod.cs@college.edu',
            displayName: 'Dr. Alan Turing',
            role: 'hod',
            department: 'Computer Science'
        };
    }

    setUser(mockUser);
    localStorage.setItem('placement_ai_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('placement_ai_user');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};