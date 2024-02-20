import { Routes, Route } from 'react-router-dom';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import AdminSidebar from '../pages/AdminPanel/AdminSidebar/AdminSidebar';
import AdminDashboard from '../pages/AdminPanel/AdminDashboard/AdminDashboard';
import AdminBrandPage from '../pages/AdminPanel/AdminBrandPage/AdminBrandPage';
import AdminColorPage from '../pages/AdminPanel/AdminColorPage/AdminColorPage';
import AdminModelPage from '../pages/AdminPanel/AdminModelPage/AdminModelPage';

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
		  <Route path="/colors" element={<AdminColorPage />} />
		  <Route path="/models" element={<AdminModelPage />} />
        </Routes>
      </div>
      </>
  );
};

export default AdminRouters;
