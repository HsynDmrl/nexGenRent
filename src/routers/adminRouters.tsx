import { Routes, Route } from 'react-router-dom';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import AdminSidebar from '../pages/AdminPanel/AdminSidebar/AdminSidebar';
import AdminDashboard from '../pages/AdminPanel/AdminDashboard/AdminDashboard';
import AdminBrandPage from '../pages/AdminPanel/AdminBrandPage/AdminBrandPage';

const AdminRouters = () => {
  return (
    <>
      <AdminSidebar/>
      <div className="MainContent">
        <Routes>
		  <Route path="/" element={<AdminDashboard/>} />
		  <Route path="/dashboard" element={<AdminDashboard/>} />
          <Route path="/users" element={<UserDashboard />} />
		  <Route path="/brands" element={<AdminBrandPage />} />
        </Routes>
      </div>
      </>
  );
};

export default AdminRouters;
