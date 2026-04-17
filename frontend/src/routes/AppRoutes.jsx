import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';
import MainDashboard from '../App'; // We will rename App.jsx content later or use it as the dashboard

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null; // Or a loading spinner
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MainDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Redirects */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
