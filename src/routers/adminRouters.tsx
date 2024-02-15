import { Routes, Route } from 'react-router-dom';
import './adminRouters.css';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import AdminSidebar from '../pages/AdminPanel/AdminSidebar/AdminSidebar';
import AdminDashboard from '../pages/AdminPanel/AdminDashboard/AdminDashboard';
import AdminBrandPage from '../pages/AdminPanel/AdminBrandPage/AdminBrandPage';
import AdminBrandAddForm from '../pages/AdminPanel/AdminBrandPage/AdminBrandAddForm';
import AdminBrandUpdateForm from '../pages/AdminPanel/AdminBrandPage/AdminBrandUpdateForm';

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
		  <Route path="/brands/add" element={<AdminBrandAddForm />} />
		  <Route path="/brands/update" element={<AdminBrandUpdateForm />} />
        </Routes>
      </div>
      </>
  );
};

export default AdminRouters;
