import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserRole } from './types/auth';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import HomePage from './pages/HomePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      
      <Route element={<ProtectedRoute allowedRoles={[UserRole.TEACHER]} />}>
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Route>
      
      <Route element={<ProtectedRoute allowedRoles={[UserRole.STUDENT]} />}>
        <Route path="/student" element={<StudentDashboard />} />
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardRedirector />} />
      </Route>
    </Routes>
  );
};

const DashboardRedirector: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  switch (user.role) {
    case UserRole.ADMIN:
      return <Navigate to="/admin" replace />;
    case UserRole.TEACHER:
      return <Navigate to="/teacher" replace />;
    case UserRole.STUDENT:
      return <Navigate to="/student" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default AppRoutes;