import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './index';

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const PublicRoute = ({ 
  children, 
  redirectTo = '/invoices' 
}: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If user is authenticated, redirect them to the specified route
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Otherwise, render the children (public content)
  return <>{children}</>;
};