export const UserRole = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const;

export type UserRole = keyof typeof UserRole;


export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface StudentProfile {
  matricule: string;
  promotion: string;
}

export interface TeacherProfile {
  specialite: string;
}

export interface AuthResponse {
  key: string; // Token
  user: User;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  matricule?: string; // For students
  promotion?: string; // For students
  specialite?: string; // For teachers
}