
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // For now, redirect authenticated users to feed. In a real app, you'd check authentication status
  // Since we're simulating login success, let's redirect to feed
  const isAuthenticated = true; // This would come from your auth context/state
  
  if (isAuthenticated) {
    return <Navigate to="/feed" replace />;
  }
  
  return <Navigate to="/login" replace />;
};

export default Index;
