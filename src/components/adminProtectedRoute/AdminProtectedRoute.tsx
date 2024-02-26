import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { RootState } from '../../store/configStore/configureStore';
import { getByEmail } from '../../store/user/userSlice';

const AdminProtectedRoute: React.FC = () => {
  
	const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state:RootState) => state.auth.isAuthenticated);
  const isAdmin = useAppSelector((state:RootState) => state.user.dataFromById?.role.toString() === 'ADMIN');

  useEffect(() => {
    dispatch(getByEmail());
  }, [dispatch]);

  if (!isAuthenticated || isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
