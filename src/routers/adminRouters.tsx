import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../pages/AdminPanel/AdminSidebar/AdminSidebar';
import AdminDashboard from '../pages/AdminPanel/AdminDashboardPage/AdminDashboard';
import BrandPage from '../pages/AdminPanel/BrandPage/BrandPage';
import ColorPage from '../pages/AdminPanel/ColorPage/ColorPage';
import ModelPage from '../pages/AdminPanel/ModelPage/ModelPage';
import RolePage from '../pages/AdminPanel/RolePage/rolePage';
import UserPage from '../pages/AdminPanel/UserPage/UserPage';
import EmployeePage from '../pages/AdminPanel/EmployeePage/EmployeePage';
import CarPage from '../pages/AdminPanel/CarPage/CarPage';
import CustomerPage from '../pages/AdminPanel/CustomerPage/CustomerPage';
import AdminRentalPage from '../pages/AdminPanel/RentalPage/AdminRentalPage';
import InvoicePage from '../pages/AdminPanel/InvoicePage/InvoicePage';

const AdminRouters = () => {
  return (
    <>
      <AdminSidebar />
      <div className="MainContent">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/cars" element={<CarPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/colors" element={<ColorPage />} />
          <Route path="/models" element={<ModelPage />} />
          <Route path="/roles" element={<RolePage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path='/rentals' element={<AdminRentalPage />} />
          <Route path='/invoices' element={<InvoicePage />} />
        </Routes>
      </div>
    </>
  );
};

export default AdminRouters;
