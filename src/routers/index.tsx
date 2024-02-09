import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import OverlayLoader from "../components/OverlayLoader/OverlayLoader";
import NavScrollExample from "../components/Nav/NavScrollExample";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";

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
		  <Route path="/profile" element={<Profile />} /> {/* Profil sayfasını burada ekleyin */}
		</Routes>
	  </>
	);
  };

export default AppRouters;
