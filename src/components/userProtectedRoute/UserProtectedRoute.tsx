import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/configStore/useAppSelector';

const UserProtectedRoute: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isUser = useAppSelector((state) => state.user.dataFromById?.role.toString() === 'USER');

  if (!isAuthenticated || !isUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
