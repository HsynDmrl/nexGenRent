import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../pages/AdminPanel/AdminSidebar/AdminSidebar';
import AdminDashboard from '../pages/AdminPanel/AdminDashboardPage/AdminDashboard';
import BrandPage from '../pages/AdminPanel/AdminBrandPage/BrandPage';
import AdminColorPage from '../pages/AdminPanel/AdminColorPage/AdminColorPage';
import AdminModelPage from '../pages/AdminPanel/AdminModelPage/AdminModelPage';
import AdminRolePage from '../pages/AdminPanel/AdminRolePage/AdminRolePage';
import AdminUserPage from '../pages/AdminPanel/AdminUserPage/AdminUserPage';
import AdminEmployeePage from '../pages/AdminPanel/AdminEmployeePage/AdminEmployeePage';
import AdminCarPage from '../pages/AdminPanel/AdminCarPage/AdminCarPage';
import AdminCustomerPage from '../pages/AdminPanel/AdminCustomerPage/AdminCustomerPage';
import AdminRentalPage from '../pages/AdminPanel/AdminRentalPage/AdminRentalPage';
import AdminInvoicePage from '../pages/AdminPanel/AdminInvoicePage/AdminInvoicePage';

const AdminRouters = () => {
  return (
    <>
      <AdminSidebar />
      <div className="MainContent">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/cars" element={<AdminCarPage />} />
          <Route path="/users" element={<AdminUserPage />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/colors" element={<AdminColorPage />} />
          <Route path="/models" element={<AdminModelPage />} />
          <Route path="/roles" element={<AdminRolePage />} />
          <Route path="/employees" element={<AdminEmployeePage />} />
          <Route path="/customers" element={<AdminCustomerPage />} />
          <Route path='/rentals' element={<AdminRentalPage />} />
          <Route path='/invoices' element={<AdminInvoicePage />} />
        </Routes>
      </div>
    </>
  );
};

export default AdminRouters;
