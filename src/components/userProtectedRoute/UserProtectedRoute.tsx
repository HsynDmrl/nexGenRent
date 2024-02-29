import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { RootState } from '../../store/configStore/configureStore';

const UserProtectedRoute: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const isUser = useAppSelector((state: RootState) => {
	const user = state.user.dataFromById;
	return user && user.role && user.role.name.toString() == 'USER';
  });

  const isAdmin = useAppSelector((state: RootState) => {
	const user = state.user.dataFromById;
	return user && user.role && user.role.name.toString() == 'ADMIN';
  });

  if (!isAuthenticated || !isUser || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;
