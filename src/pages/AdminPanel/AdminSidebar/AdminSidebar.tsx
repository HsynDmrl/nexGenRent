import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { toggleAdminSidebar } from '../../../store/adminToggle/adminToggleSlice';
import { Link } from 'react-router-dom';
import './adminSidebar.css';

const AdminSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.toggleAdminSidebar.isOpen);

  const handleToggle = () => {
    dispatch(toggleAdminSidebar());
  };

  return (
    <aside className={`adminSideBar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
