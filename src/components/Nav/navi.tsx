import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from '../../pages/Loginpage/Login';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { logOut } from '../../store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/configStore/configureStore';
import { getByEmail } from '../../store/user/userSlice';
import { useState } from 'react';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import './navi.css'

function Navi() {
	const [scroll, setScroll] = useState(false);

	const handleScroll = () => {
		const offset = window.scrollY;
		if (offset > 50) {
			setScroll(true);
		} else {
			setScroll(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, []);

	const isUserLoggedIn = useAppSelector((state: RootState) => state.auth.isAuthenticated);
	const user = useAppSelector((state: RootState) => state.user.dataFromById);

	const dispatch = useAppDispatch();


	useEffect(() => {
		if (isUserLoggedIn){
			dispatch(getByEmail());
		}
	}, [dispatch, isUserLoggedIn]);

	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logOut());
		navigate("/");
		//window.location.reload();
	};

	const homepage = () => { navigate("/") };

	return (
		<Navbar expand="lg" className={`custom-navi ${scroll ? 'scroll-active' : ''}`}>
			<Container fluid className='col-8' style={{ maxWidth: "1100px" }}>
				<Navbar.Brand onClick={handleLogout} className='text-light' style={{ cursor: 'pointer' }}>Nex Gen Rental</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: '100px' }}
						navbarScroll
					>
						<Nav.Link onClick={homepage} className='text-light'>Anasayfa</Nav.Link>
					</Nav><Form className="d-flex me-5 my-2 my-lg-0">
						<Form.Control
							type="search"
							placeholder="Ara"
							className="me-2"
							aria-label="Ara"
						/>
						<Button variant="outline-success">Ara</Button>
					</Form>
					<NavDropdown
						title={isUserLoggedIn ? (user && user.name) : 'Giriş Yap'}
						className="w-auto"
					>
						{isUserLoggedIn ? (
							<ProfileDropdown onLogout={handleLogout} />
						) : (
							<>
								<Login />
							</>
						)}
					</NavDropdown>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navi;
