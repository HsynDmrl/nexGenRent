import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import OverlayLoader from "../components/OverlayLoader/OverlayLoader";
import Navi from "../components/Nav/navi";
import Register from "../pages/Register/Register";
import AdminRouters from "./adminRouters";
import AdminNav from "../pages/AdminPanel/AdminNav/AdminNav";
import { useLocation } from "react-router-dom";
import AdminProtectedRoute from "../components/protectedRoutes/adminProtectedRoute/AdminProtectedRoute";
import UserProtectedRoute from "../components/protectedRoutes/userProtectedRoute/UserProtectedRoute";
import PaymentPage from "../pages/paymentPage/PaymentPage";
import Footer from "../components/footer/Footer";
import UserProfilePage from "../pages/userPages/UserPages";

const AppRouters = () => {
  const [isAdminPage, setIsAdminPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAdminPage(location.pathname.startsWith("/admin"));
  }, [location]);

  return (
    <>
      <OverlayLoader />
      {isAdminPage ? <AdminNav /> : <Navi />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/nexGenRent" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/*" element={<AdminRouters />} />
        </Route>
        <Route element={<UserProtectedRoute />}>
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>

          <Route path="/payment" element={<PaymentPage />} />

      </Routes>
      {isAdminPage?"":<Footer/>}
    </> 
  );
};

export default AppRouters;
