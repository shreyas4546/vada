export type UserRole = 'student' | 'tpo' | 'hod';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  department?: string;
  resumeUrl?: string;
  skills?: string[]; // Extracted by AI
  experience?: string[]; // Extracted by AI
}

export interface Drive {
  id: string;
  companyName: string;
  role: string;
  ctc: string;
  description: string;
  requirements: string; // The string AI compares against
  eligibleDepartments: string[];
  deadline: string;
  status: 'active' | 'completed';
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  driveId: string;
  status: 'applied' | 'shortlisted' | 'interview' | 'offered' | 'rejected';
  appliedAt: string;
  aiMatchScore: number; // 0-100
  aiAnalysis: string; // "Good match because..."
}