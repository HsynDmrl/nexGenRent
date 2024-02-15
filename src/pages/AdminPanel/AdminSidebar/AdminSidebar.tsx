import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { toggleAdminSidebar } from '../../../store/adminToggle/adminToggleSlice';
import { Link } from 'react-router-dom';
import './adminSidebar.css';
import Sidebar from 'react-bootstrap-sidebar-menu';
import { SidebarMenuFooter } from 'react-bootstrap-sidebar-menu';
import { FcPositiveDynamic } from "react-icons/fc";
import { FcMenu, FcSupport, FcImport, FcParallelTasks, FcAreaChart, FcAutomotive, FcConferenceCall, FcWorkflow,
	FcAssistant, FcNews, FcMultipleSmartphones, FcRules } from "react-icons/fc";

const AdminSidebar: React.FC = () => {
	const isOpen = useSelector((state: RootState) => state.toggleAdminSidebar.isOpen);


	return (
		<Sidebar className={`adminSideBar ${isOpen ? 'open' : ''}`}>
			<Sidebar.Nav>
				<Sidebar.Nav.Link>
					<Sidebar.Nav.Title><Link to="/admin/dashboard"><FcAreaChart />  Dashboard</Link></Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
			</Sidebar.Nav>
			<Sidebar.Sub>
				<Sidebar.Sub.Toggle className='border-0'>
					<Sidebar.Nav.Title ><FcMenu />  Products</Sidebar.Nav.Title>
				</Sidebar.Sub.Toggle>
				<Sidebar.Sub.Collapse>
					<Sidebar.Nav>
						<Sidebar.Nav.Link>
							<Sidebar.Nav.Title><Link to="/admin/cars"><FcAutomotive /> Cars</Link></Sidebar.Nav.Title>
						</Sidebar.Nav.Link>
					</Sidebar.Nav>
					<Sidebar.Nav>
						<Sidebar.Nav.Link>
							<Sidebar.Nav.Title><Link to="/admin/models"><FcWorkflow />  Models</Link></Sidebar.Nav.Title>
						</Sidebar.Nav.Link>
					</Sidebar.Nav>
					<Sidebar.Nav>
						<Sidebar.Nav.Link>
							<Sidebar.Nav.Title><Link to="/admin/brands"><FcNews />  Brands</Link></Sidebar.Nav.Title>
						</Sidebar.Nav.Link>
					</Sidebar.Nav>
					<Sidebar.Nav>
						<Sidebar.Nav.Link>
							<Sidebar.Nav.Title><Link to="/admin/colors"><FcMultipleSmartphones />  Colors</Link></Sidebar.Nav.Title>
						</Sidebar.Nav.Link>
					</Sidebar.Nav>
				</Sidebar.Sub.Collapse>
			</Sidebar.Sub>
			<Sidebar.Nav>
				<Sidebar.Nav.Link>
					<Sidebar.Nav.Title><Link to="/admin/invoices"><FcRules />  Sigorta</Link></Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
			</Sidebar.Nav>
			<Sidebar.Nav>
				<Sidebar.Nav.Link>
					<Sidebar.Nav.Title><Link to="/admin/rentals"><FcParallelTasks />  Siparişler</Link></Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
			</Sidebar.Nav>
			<Sidebar.Nav>
				<Sidebar.Nav.Link>
					<Sidebar.Nav.Title><Link to="/admin/employees"><FcAssistant />  Çalışanlar</Link></Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
			</Sidebar.Nav>
			<Sidebar.Nav>
				<Sidebar.Nav.Link>
					<Sidebar.Nav.Title><Link to="/admin/users"><FcConferenceCall />  Kullanıcılar</Link></Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
			</Sidebar.Nav>
			<Sidebar.Nav>
				<Sidebar.Nav.Link>
					<Sidebar.Nav.Title><Link to="/admin/reports"><FcPositiveDynamic />  Raporlar</Link></Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
			</Sidebar.Nav>
			<Sidebar.Nav>
				<Sidebar.Nav.Link><Link to="/admin/settings"><FcSupport /> Ayarlar</Link>
				</Sidebar.Nav.Link>
			</Sidebar.Nav>
			<SidebarMenuFooter>
				<Sidebar.Nav.Link>
						<Sidebar.Nav.Title><Link to="/admin/logout"><FcImport /> Çıkış</Link></Sidebar.Nav.Title>
				</Sidebar.Nav.Link>
			</SidebarMenuFooter>
		</Sidebar>
		//asdf
	);
};

export default AdminSidebar;
