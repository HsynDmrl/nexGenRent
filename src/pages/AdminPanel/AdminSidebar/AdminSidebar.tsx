import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import './adminSidebar.css';
import Sidebar from 'react-bootstrap-sidebar-menu';
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
				<Sidebar.Nav.Link href="/admin/dashboard">
					<Sidebar.Nav.Title><FcAreaChart /> Dashboard</Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
				<Sidebar.Sub>
					<Sidebar.Sub.Toggle className='border-0'>
						<Sidebar.Nav.Title ><FcMenu />  Products</Sidebar.Nav.Title>
					</Sidebar.Sub.Toggle>
					<Sidebar.Sub.Collapse>
						<Sidebar.Nav.Link href="/admin/cars">
							<Sidebar.Nav.Title><FcAutomotive /> Cars</Sidebar.Nav.Title>
						</Sidebar.Nav.Link>
						<Sidebar.Nav.Link href="/admin/modea">
							<Sidebar.Nav.Title><FcWorkflow />  Models</Sidebar.Nav.Title>
						</Sidebar.Nav.Link>
						<Sidebar.Nav.Link href="/admin/brands">
							<Sidebar.Nav.Title><FcNews />  Brands</Sidebar.Nav.Title>
						</Sidebar.Nav.Link>
						<Sidebar.Nav.Link href="/admin/colors">
							<Sidebar.Nav.Title><FcMultipleSmartphones />  Colors</Sidebar.Nav.Title>
						</Sidebar.Nav.Link>
					</Sidebar.Sub.Collapse>
				</Sidebar.Sub>
				<Sidebar.Nav.Link href="/admin/invoices">
					<Sidebar.Nav.Title><FcRules />  Sigorta</Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
				<Sidebar.Nav.Link href="/admin/rentals">
					<Sidebar.Nav.Title><FcParallelTasks />  Siparişler</Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
				<Sidebar.Nav.Link href="/admin/employees">
					<Sidebar.Nav.Title><FcAssistant />  Çalışanlar</Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
				<Sidebar.Nav.Link href="/admin/users">
					<Sidebar.Nav.Title><FcConferenceCall />  Kullanıcılar</Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
				<Sidebar.Nav.Link href="/admin/reports">
					<Sidebar.Nav.Title><FcPositiveDynamic />  Raporlar</Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
				<Sidebar.Nav.Link href="/admin/settings">
					<Sidebar.Nav.Title><FcSupport /> Ayarlar</Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
			</Sidebar.Nav>
			<SidebarMenuFooter>
				<Sidebar.Nav.Link href="/admin/logout">
					<Sidebar.Nav.Title><FcImport /> Çıkış</Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
			</SidebarMenuFooter>
		</Sidebar>

	);
};

export default AdminSidebar;
