import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import './adminSidebar.css';
import Sidebar from 'react-bootstrap-sidebar-menu';
import { NavLink  } from 'react-router-dom';
import { SidebarMenuFooter } from 'react-bootstrap-sidebar-menu';
import { FcPositiveDynamic } from "react-icons/fc";
import {
	FcMenu, FcSupport, FcImport, FcParallelTasks, FcAreaChart, FcAutomotive, FcConferenceCall, FcWorkflow,
	FcAssistant, FcNews, FcMultipleSmartphones, FcRules
} from "react-icons/fc";

const AdminSidebar: React.FC = () => {
	const isOpen = useSelector((state: RootState) => state.toggleAdminSidebar.isOpen);

	return (
		<Sidebar className={`adminSideBar ${isOpen ? 'open' : ''}`}>
			<Sidebar.Nav>
				<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/dashboard">
					<Sidebar.Nav.Title className='sidebarNavTitle' ><FcAreaChart size={'2em'} /> Dashboard</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Sub>
					<Sidebar.Sub.Toggle className='sidebarNavItem menu-toggle border-0'>
						<Sidebar.Nav.Title className='sidebarNavTitle' ><FcMenu size={'2em'}/>  Ürünler</Sidebar.Nav.Title>
					</Sidebar.Sub.Toggle>
					<Sidebar.Sub.Collapse>
						<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/cars">
							<Sidebar.Nav.Title className='sidebarNavTitle' ><FcAutomotive size={'2em'}/> Arabalar</Sidebar.Nav.Title>
						</Sidebar.Nav.Item>
						<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/models">
							<Sidebar.Nav.Title className='sidebarNavTitle' ><FcWorkflow size={'2em'}/>  Modeller</Sidebar.Nav.Title>
						</Sidebar.Nav.Item>
						<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/brands">
							<Sidebar.Nav.Title className='sidebarNavTitle' ><FcNews size={'2em'}/>  Markalar</Sidebar.Nav.Title>
						</Sidebar.Nav.Item>
						<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/colors">
							<Sidebar.Nav.Title className='sidebarNavTitle' ><FcMultipleSmartphones size={'2em'}/>  Renkler</Sidebar.Nav.Title>
						</Sidebar.Nav.Item>
					</Sidebar.Sub.Collapse>
				</Sidebar.Sub>
				<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/invoices">
					<Sidebar.Nav.Title className='sidebarNavTitle' ><FcRules size={'2em'}/>  Sigorta</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/rentals">
					<Sidebar.Nav.Title className='sidebarNavTitle' ><FcParallelTasks size={'2em'}/>  Siparişler</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/employees">
					<Sidebar.Nav.Title className='sidebarNavTitle' ><FcAssistant size={'2em'}/>  Çalışanlar</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/users">
					<Sidebar.Nav.Title className='sidebarNavTitle' ><FcConferenceCall size={'2em'}/>  Kullanıcılar</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/reports">
					<Sidebar.Nav.Title className='sidebarNavTitle' ><FcPositiveDynamic size={'2em'}/>  Raporlar</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item className='sidebarNavItem' as={NavLink } to="/admin/settings">
					<Sidebar.Nav.Title className='sidebarNavTitle' ><FcSupport size={'2em'}/> Ayarlar</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
			</Sidebar.Nav>
			<SidebarMenuFooter>
				<Sidebar.Nav.Item className='sidebarNavItem'  as={NavLink } to="/admin/logout">
					<Sidebar.Nav.Title className='sidebarNavTitle' ><FcImport size={'2em'}/> Çıkış</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
			</SidebarMenuFooter>
		</Sidebar>
	);
};

export default AdminSidebar;
