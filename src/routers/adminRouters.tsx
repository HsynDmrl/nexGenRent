import { Routes, Route } from 'react-router-dom';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import AdminSidebar from '../pages/AdminPanel/AdminSidebar/AdminSidebar';
import AdminDashboard from '../pages/AdminPanel/AdminDashboard/AdminDashboard';
import AdminBrandPage from '../pages/AdminPanel/AdminBrandPage/AdminBrandPage';
import AdminColorPage from '../pages/AdminPanel/AdminColorPage/AdminColorPage';
import AdminModelPage from '../pages/AdminPanel/AdminModelPage/AdminModelPage';
import AdminRolePage from '../pages/AdminPanel/AdminRolePage/AdminRolePage';
import AdminUserPage from '../pages/AdminPanel/AdminUserPage/AdminUserPage';
import AdminEmployeePage from '../pages/AdminPanel/AdminEmployeePage/AdminEmployeePage';
import AdminCarPage from '../pages/AdminPanel/AdminCarPage/AdminCarPage';

const AdminRouters = () => {
  return (
    <>
      <AdminSidebar/>
      <div className="MainContent">
        <Routes>
		  <Route path="/" element={<AdminDashboard/>} />
		  <Route path="/dashboard" element={<AdminDashboard/>} />
          <Route path="/cars" element={<AdminCarPage />} />
          <Route path="/users" element={<AdminUserPage />} />
		  <Route path="/brands" element={<AdminBrandPage />} />
		  <Route path="/colors" element={<AdminColorPage />} />
		  <Route path="/models" element={<AdminModelPage />} />
		  <Route path="/roles" element={<AdminRolePage />} />
		  <Route path="/employees" element={<AdminEmployeePage />} />
        </Routes>
      </div>
      </>
  );
};

export default AdminRouters;
