import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import OverlayLoader from "../components/OverlayLoader/OverlayLoader";
import NavScrollExample from "../components/Nav/NavScrollExample";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Car from "../pages/CarPage/Car";
import Brand from "../pages/BrandPage/Brand";
import Model from "../pages/ModelPage/Model";

const AppRouters = () => {
	return (
	  <>
		<OverlayLoader />
		<NavScrollExample />
		<Routes>
		  <Route path="/" element={<Homepage />} />
		  <Route path="/admin" element={<AdminPanel />} />
		  <Route path="/dashboard" element={<UserDashboard />} />
		  <Route path="/register" element={<Register />} />
		  <Route path="/profile" element={<Profile />} />
		  <Route path="*" element={<h1>Not Found</h1>} />
		  <Route path="/admin/*" element={<h1>Admin Not Found</h1>} />
		  <Route path="/cars" element={<Car/>} />
		  <Route path="/brands" element={<Brand/>} />
		  <Route path="/models" element={<Model/>} />
		</Routes>
	  </>
	);
  };

export default AppRouters;
