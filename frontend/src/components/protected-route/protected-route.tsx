import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    authenticationPath: string;
    outlet: ReactNode;
    isLoading: boolean,
};

const ProtectedRoute = ({
  isAuthenticated,
  authenticationPath,
  outlet,
  isLoading,
}: ProtectedRouteProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    outlet
  ) : (
    <Navigate to={{ pathname: authenticationPath }} replace />
  );
};

export default ProtectedRoute;