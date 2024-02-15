import { Routes, Route } from 'react-router-dom';
import './adminRouters.css';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import AdminSidebar from '../pages/AdminPanel/AdminSidebar/AdminSidebar';
import AdminDashboard from '../pages/AdminPanel/AdminDashboard/AdminDashboard';

const AdminRouters = () => {
  return (
    <>
      <AdminSidebar />
      <div className="MainContent col-10">
        <Routes>
		  <Route path="/" element={<AdminDashboard/>} />
		  <Route path="/dashboard" element={<AdminDashboard/>} />
          <Route path="/users" element={<UserDashboard />} />
        </Routes>
      </div>
      </>
  );
};

export default AdminRouters;
