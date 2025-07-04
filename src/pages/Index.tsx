
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // For now, redirect to login. In a real app, you'd check authentication status
  const isAuthenticated = false; // This would come from your auth context/state
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Navigate to="/feed" replace />;
};

export default Index;
