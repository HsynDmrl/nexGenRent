import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configStore/configureStore';
import { getByEmail } from '../../store/user/userSlice';
import './NavScrollExample.css'
import { useState } from 'react';
import { useAppSelector } from '../../store/configStore/useAppSelector';

function NavScrollExample() {

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

	const isUserLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
	const user = useAppSelector((state: RootState) => state.user.dataFromById);

	const dispatch = useAppDispatch();


	useEffect(() => {
		dispatch(getByEmail());
	}, [dispatch]);

	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logOut());
		navigate("/");
		//window.location.reload();
	};

	const cars = () => {
		navigate("/cars");
	};

	const homepage = () => {
		navigate("/");
	};
	const brands = () => {
		navigate("/brands");
	};
	const models = () => {
		navigate("/models");
	};
	return (
		<Navbar expand="lg" className={`bg-body-tertiary ${scroll ? 'scroll-active' : ''}`} data-bs-theme="dark">
		<Container fluid className='col-8'>
				<Navbar.Brand onClick={handleLogout}>Nex Gen Rental</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: '100px' }}
						navbarScroll
					>
						<Nav.Link onClick={homepage}>Anasayfa</Nav.Link>
					</Nav><Form className="d-flex me-5 my-2 my-lg-0">
						<Form.Control
							type="search"
							placeholder="Ara"
							className="me-2"
							aria-label="Ara"
						/>
						<Button variant="outline-success">Ara</Button>
					</Form>
					<NavDropdown title={isUserLoggedIn ? (user && user.name) : 'Giriş Yap'} id="navbarScrollingDropdown" className="me-auto text-light my-2 my-lg-0">
						{isUserLoggedIn ? (
							<ProfileDropdown onLogout={handleLogout} />
						) : (
							<>
								<Login />
								<NavDropdown.Divider />
							</>
						)}
					</NavDropdown>

				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavScrollExample;
