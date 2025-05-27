import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
  allowAuthenticated: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, allowAuthenticated }) => {

  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const to = location.state?.from?.pathname || '/admin/products';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard 
  if (!allowAuthenticated && isAuthenticated) {
    return <Navigate to={to} state={{ from: location }} replace />;
  }

  // If not authenticated, render the public component
  return <>{children}</>;
};

export default PublicRoute;
