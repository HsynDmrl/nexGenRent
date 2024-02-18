import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import './adminSidebar.css';
import Sidebar from 'react-bootstrap-sidebar-menu';
import { Link } from 'react-router-dom';
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
				<Sidebar.Nav.Item as={Link} to="/admin/dashboard">
					<Sidebar.Nav.Title><FcAreaChart /> Dashboard</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Sub>
					<Sidebar.Sub.Toggle className='border-0'>
						<Sidebar.Nav.Title><FcMenu />  Products</Sidebar.Nav.Title>
					</Sidebar.Sub.Toggle>
					<Sidebar.Sub.Collapse>
						<Sidebar.Nav.Item as={Link} to="/admin/cars">
							<Sidebar.Nav.Title><FcAutomotive /> Cars</Sidebar.Nav.Title>
						</Sidebar.Nav.Item>
						<Sidebar.Nav.Item as={Link} to="/admin/models">
							<Sidebar.Nav.Title><FcWorkflow />  Models</Sidebar.Nav.Title>
						</Sidebar.Nav.Item>
						<Sidebar.Nav.Item as={Link} to="/admin/brands">
							<Sidebar.Nav.Title><FcNews />  Brands</Sidebar.Nav.Title>
						</Sidebar.Nav.Item>
						<Sidebar.Nav.Item as={Link} to="/admin/colors">
							<Sidebar.Nav.Title><FcMultipleSmartphones />  Colors</Sidebar.Nav.Title>
						</Sidebar.Nav.Item>
					</Sidebar.Sub.Collapse>
				</Sidebar.Sub>
				<Sidebar.Nav.Item as={Link} to="/admin/invoices">
					<Sidebar.Nav.Title><FcRules />  Sigorta</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item as={Link} to="/admin/rentals">
					<Sidebar.Nav.Title><FcParallelTasks />  Siparişler</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item as={Link} to="/admin/employees">
					<Sidebar.Nav.Title><FcAssistant />  Çalışanlar</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item as={Link} to="/admin/users">
					<Sidebar.Nav.Title><FcConferenceCall />  Kullanıcılar</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item as={Link} to="/admin/reports">
					<Sidebar.Nav.Title><FcPositiveDynamic />  Raporlar</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
				<Sidebar.Nav.Item as={Link} to="/admin/settings">
					<Sidebar.Nav.Title><FcSupport /> Ayarlar</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
			</Sidebar.Nav>
			<SidebarMenuFooter>
				<Sidebar.Nav.Item as={Link} to="/admin/logout">
					<Sidebar.Nav.Title><FcImport /> Çıkış</Sidebar.Nav.Title>
				</Sidebar.Nav.Item>
			</SidebarMenuFooter>
		</Sidebar>
	);
};

export default AdminSidebar;
