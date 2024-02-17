import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { toggleAdminSidebar } from '../../../store/adminToggle/adminToggleSlice';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { RootState } from '../../../store/configStore/configureStore';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';

function AdminNav() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state: RootState) => state.toggleAdminSidebar.isOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleAdminSidebar());
  };

  return (
    <Navbar className="bg-body-tertiary">
        {isSidebarOpen ? <FaToggleOff className='mx-2' size={'2em'} onClick={handleToggleSidebar}/> : <FaToggleOn className='mx-2' size={'2em'} onClick={handleToggleSidebar}/>}
      <Container>
        <Navbar.Brand href="/admin/">NexGenRent</Navbar.Brand>
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
