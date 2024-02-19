import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { toggleAdminSidebar } from '../../../store/adminToggle/adminToggleSlice';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { RootState } from '../../../store/configStore/configureStore';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import './adminNav.css';

function AdminNav() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state: RootState) => state.toggleAdminSidebar.isOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleAdminSidebar());
  };

  return (
    <Navbar className="admin-nav-bar fixed-top">
        {isSidebarOpen ? <FaToggleOff className='mx-2 text-white' size={'2em'} onClick={handleToggleSidebar}/> : <FaToggleOn className='mx-2 text-white' size={'2em'} onClick={handleToggleSidebar}/>}
        <Navbar.Brand className="navbar-brand text-white" href="/admin/">NexGenRent</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="navbar-menu text-white">
            Signed in as: <a className="text-white" href="#login">Hüseyin</a>
          </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminNav;
