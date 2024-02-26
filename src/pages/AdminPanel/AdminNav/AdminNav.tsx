import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { toggleAdminSidebar } from '../../../store/adminToggle/adminToggleSlice';
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { RootState } from '../../../store/configStore/configureStore';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import './adminNav.css';
import { useEffect } from 'react';
import { getByEmail } from '../../../store/user/userSlice';

function AdminNav() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state: RootState) => state.toggleAdminSidebar.isOpen);
  const userId = useAppSelector((state: RootState) => state.user.dataFromById);

  useEffect(() => {
	dispatch(getByEmail());
  }
  , [dispatch]);

  const handleToggleSidebar = () => {
    dispatch(toggleAdminSidebar());
  };

  return (
    <Navbar className="admin-nav-bar fixed-top">
        {isSidebarOpen ? <FaToggleOff className='mx-2 text-white' size={'2em'} onClick={handleToggleSidebar}/> : <FaToggleOn className='mx-2 text-black' size={'2em'} onClick={handleToggleSidebar}/>}
        <Navbar.Brand className="navbar-brand text-black" href="/admin/">NexGenRent</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="navbar-menu text-black">
		  	Hoşgeldiniz, <a className="text-black">{userId?.name}</a>
          </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminNav;
