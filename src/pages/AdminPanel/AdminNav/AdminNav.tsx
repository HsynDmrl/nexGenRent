import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { toggleAdminSidebar } from '../../../store/adminToggle/adminToggleSlice';

function AdminNav() {
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleAdminSidebar());
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <button onClick={handleToggleSidebar}>Toggle</button>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Hüseyin</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNav;
