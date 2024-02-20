import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import OverlayLoader from "../components/OverlayLoader/OverlayLoader";
import NavScrollExample from "../components/Nav/NavScrollExample";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Car from "../pages/CarPage/Car";
import AdminRouters from "./adminRouters";
import AdminNav from "../pages/AdminPanel/AdminNav/AdminNav";
import { useLocation } from "react-router-dom";

const AppRouters = () => {
  const [isAdminPage, setIsAdminPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAdminPage(location.pathname.startsWith("/admin"));
  }, [location]);

  return (
    <>
      <OverlayLoader />
      {isAdminPage ? <AdminNav /> : <NavScrollExample />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cars" element={<Car />} />
        <Route path="/admin/*" element={<AdminRouters />} />
      </Routes>
    </>
  );
};
export default AppRouters;
