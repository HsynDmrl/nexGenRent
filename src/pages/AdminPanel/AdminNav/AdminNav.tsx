import { useState } from 'react';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { FaToggleOn, FaToggleOff, FaHome, FaUserCircle } from 'react-icons/fa';
import { RootState } from '../../../store/configStore/configureStore';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { toggleAdminSidebar } from '../../../store/adminToggle/adminToggleSlice';
import { getByEmail } from '../../../store/user/userSlice';
import UserProfileModal from '../../../components/userProfileModal/userProfileModal';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../store/auth/authSlice';
import { FaSignOutAlt } from 'react-icons/fa';
import './adminNav.css';

function AdminNav() {
	const dispatch = useAppDispatch();
	const isSidebarOpen = useAppSelector((state: RootState) => state.toggleAdminSidebar.isOpen);
	const userId = useAppSelector((state: RootState) => state.user.dataFromById);
	const [modalShow, setModalShow] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getByEmail());
	}, [dispatch]);

	const handleToggleSidebar = () => {
		dispatch(toggleAdminSidebar());
	};

	const handleLogout = () => {
		dispatch(logOut());
		navigate("/");
	};
	const homepage = () => {navigate("/")};
	const homepageAdmin = () => {navigate("/admin/")};
	const homeDashboard = () => {navigate("/admin/dashboard")};
	
	return (
		<Navbar expand="lg" className="admin-nav-bar fixed-top">
			<Container fluid>
				{isSidebarOpen ? (
				<FaToggleOff style={{ cursor: 'pointer' }}  className="mx-2 text-light" size={'2em'} onClick={handleToggleSidebar} />
				) : (
				<FaToggleOn  style={{ cursor: 'pointer' }} className="mx-2 text-primary" size={'2em'} onClick={handleToggleSidebar} />
				)}
				<Navbar.Brand className="navbar-brand text-light" style={{ cursor: 'pointer' }}  onClick={homepageAdmin}>NexGenRent</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"className="justify-content-end">
					<Nav className="align-items-center">
						<Nav.Link onClick={homeDashboard} className="text-light">
							<FaHome className="mb-1 text-light" /> Kontrol Paneli
						</Nav.Link>
						<Button variant="outline-primary" onClick={homepage} className="ms-2">Siteye Git</Button>
						<Dropdown>
							<Dropdown.Toggle variant="success" id="dropdown-basic" className="ms-2">
								<FaUserCircle /> Hoşgeldiniz, {userId?.name}
							</Dropdown.Toggle>
							<Dropdown.Menu>
                			<Dropdown.Item onClick={() => setModalShow(true)}>Profili Düzenle</Dropdown.Item>
							<Dropdown.Item onClick={handleLogout}><FaSignOutAlt /> Çıkış Yap</Dropdown.Item>
              			</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
			<UserProfileModal show={modalShow} handleClose={() => setModalShow(false)} />
		</Navbar>
	);
}

export default AdminNav;