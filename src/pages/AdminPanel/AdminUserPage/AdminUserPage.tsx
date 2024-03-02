import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Badge, Button, Col, Container, Modal, Row } from 'react-bootstrap';
import AdminUserAddForm from './AdminUserAddForm';
import AdminUserUpdateForm from './AdminUserUpdateForm';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/user/userSlice';
import Pagination from 'react-bootstrap/Pagination';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import AdminUserDeleteForm from './AdminUserDeleteForm';
import './adminUserPage.css';
import ExportToCSVButton from './ExportToCSVButton';
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid, LiaImages } from "react-icons/lia";
import { getAll as getAllRoles }  from '../../../store/role/roleSlice';
import { FcConferenceCall, FcNeutralDecision } from "react-icons/fc";
import EntityBox from '../../../components/changePasswordModal/entityBox';
import EntityIcon from '../../../components/entityIcon/entityIcon';

const AdminUserPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allUsers = useAppSelector((state: RootState) => state.user.allData);
	const allRoles = useAppSelector((state: RootState) => state.role.allData);
	const selectedUserId = useAppSelector((state: RootState) => state.user.selectedId);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState(allUsers);
	const [searchId, setSearchId] = useState('');
	const [searchName, setSearchName] = useState('');
	const [searchRole, setSearchRole] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');

	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleUserSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	useEffect(() => {
		let result = allUsers.filter(user =>
			(searchId ? user.id.toString().includes(searchId) : true) &&
			(searchName ? user.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchRole ? user.role.toString().includes(searchId) : true) &&
			(searchCreatedDate ? user.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? user.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'name':
					return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
				case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime() : new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
				default:
					return 0;
			}
		});
		setFilteredUsers(sorted);
	}, [searchId, searchName, searchRole, searchCreatedDate, searchUpdatedDate, allUsers, sortBy, sortDirection]);
	useEffect(() => {
		dispatch(getAllRoles());
		dispatch(getAll());
	}, [dispatch, selectedUserId, showAddForm, showUpdateForm, showDeleteForm]);

	const sortedUsers = [...allUsers].sort((a, b) => {
		if (sortDirection === 'asc') {
			return ((a && a[sortBy as keyof typeof a]) ?? '') > ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		} else {
			return ((a && a[sortBy as keyof typeof a]) ?? '') < ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		}
	});

	const pageCount = Math.ceil(sortedUsers.length / itemsPerPage);

	const handleSort = (key: 'id' | 'email' | 'gsm' | 'name' | 'nationalityId' | 'surname' | 'roleName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleUserSelectAndUpdateForm = (id: number) => {
		handleUserSelect(id);
		handleUpdateButtonClick();
	};

	return (
		<Container>
			<h1 className='text-black'>Kullanıcı Sayfası</h1>
			<Row className='mb-5 col-12'>
				<EntityBox entity="Kullanıcı Sayısı" count={allUsers.length} icon={<EntityIcon entity="Kullanıcı Sayısı" />} />
				<EntityBox entity="Rol Sayısı" count={allRoles.length} icon={<EntityIcon entity="Rol Sayısı" />} />
			</Row>
			<Row className='g-3 justify-content-start'>
				<Col xs={12} sm={5} lg={2}>
					<ExportToCSVButton className='w-100' data={allUsers} />
				</Col>
				<Col xs={12} sm={5} lg={2}>
					<Button className='w-100 bg-success' style={{ height: 'calc(2em + 12px)' }} onClick={handleAddButtonClick}>Yeni Kullanıcı Ekle</Button>
				</Col>
			</Row>
			<Table>
				<thead>
					<tr className='align-items-center'>
						<th rowSpan={2} className='text-table' >Sıra No</th>
						<th className='text-table'>
							Id{' '}
							{sortBy === 'id' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('id', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('id', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('id', 'asc')} />
							)}
						</th>
						<th className='text-table' >
							Email{' '}
							{sortBy === 'email' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('email', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('email', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('email', 'asc')} />
							)}
						</th>
						<th className='text-table' >
							Gsm{' '}
							{sortBy === 'gsm' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('gsm', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('gsm', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('gsm', 'asc')} />
							)}
						</th>
						<th className='text-table' >
							İsim{' '}
							{sortBy === 'name' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('name', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('name', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('name', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							T.C No{' '}
							{sortBy === 'nationalityId' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('nationalityId', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('nationalityId', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('nationalityId', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Soyisim{' '}
							{sortBy === 'surname' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('surname', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('surname', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('surname', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Rol{' '}
							{sortBy === 'roleName' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('roleName', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('roleName', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('roleName', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Oluşturulma Tarihi{' '}
							{sortBy === 'createdDate' ? (
								sortDirection === 'asc' ? (
									<LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'desc')} />
								) : (
									<LiaSortAmountUpSolid onClick={() => handleSort('createdDate', 'asc')} />
								)
							) : (
								<LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Yenilenme Tarihi{' '}
							{sortBy === 'updatedDate' ? (
								sortDirection === 'asc' ? (
									<LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'desc')} />
								) : (
									<LiaSortAmountUpSolid onClick={() => handleSort('updatedDate', 'asc')} />
								)
							) : (
								<LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'asc')} />
							)}
						</th>
					</tr>
					<tr>
                        <th><Form.Control size="sm" type="text" placeholder="Id Ara" onChange={(e) => setSearchId(e.target.value)}/></th>
						<th><Form.Control size="sm" type="text" placeholder="Email Ara" onChange={(e) => setSearchName(e.target.value)}/></th>
                        <th><Form.Control size="sm" type="text" placeholder="Gsm Ara" onChange={(e) => setSearchName(e.target.value)}/></th>
                        <th><Form.Control size="sm" type="text" placeholder="Name Ara" onChange={(e) => setSearchRole(e.target.value)}/></th>
						<th><Form.Control size="sm" type="text" placeholder="NationalityId Ara" onChange={(e) => setSearchName(e.target.value)}/></th>
                        <th><Form.Control size="sm" type="text" placeholder="Soyisim Ara" onChange={(e) => setSearchName(e.target.value)}/></th>
                        <th><Form.Control size="sm" type="text" placeholder="Role Ara" onChange={(e) => setSearchRole(e.target.value)}/></th>
                        <th><Form.Control size="sm" type="text" placeholder="Oluşturulma Tarihi Ara" onChange={(e) => setSearchCreatedDate(e.target.value)}/></th>
                        <th><Form.Control size="sm" type="text" placeholder="Yenilenme Tarihi Ara" onChange={(e) => setSearchUpdatedDate(e.target.value)}/></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((user, index) => (
                        <tr key={user.id} onClick={() => handleUserSelectAndUpdateForm(user.id)}>
                            <td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td style={{ cursor: 'pointer' }}>{user.id}</td>
							<td style={{ cursor: 'pointer' }}>{user.email}</td>
							<td style={{ cursor: 'pointer' }}>{user.gsm}</td>
							<td style={{ cursor: 'pointer' }}>{user.name}</td>
							<td style={{ cursor: 'pointer' }}>{user.nationalityId}</td>
							<td style={{ cursor: 'pointer' }}>{user.surname}</td>
							<td style={{ cursor: 'pointer' }}>{user.role && user.role.name}</td>
							{/* <td style={{ cursor: 'pointer' }}>{user.role.name}</td> */}
                            <td style={{ cursor: 'pointer' }}>{user.createdDate?.toString()}</td>
                            <td style={{ cursor: 'pointer' }}>{user.updatedDate?.toString()}</td>
                        </tr>
                    ))}
                </tbody>
			</Table>
			<Modal show={showAddForm} onHide={handleCloseAddForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>User Ekle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminUserAddForm />
				</Modal.Body>
			</Modal>
			<Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>User Güncelle veya Sil</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminUserUpdateForm/>
					<hr />
					<AdminUserDeleteForm />
				</Modal.Body>
			</Modal>
			<Pagination className="justify-content-center mb-5">
				<Pagination.First onClick={() => paginate(1)} />
				<Pagination.Prev onClick={() => paginate(currentPage - 1 > 0 ? currentPage - 1 : 1)} />
				{Array.from({ length: pageCount }, (_, index) => (
					<Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
						{index + 1}
					</Pagination.Item>
				))}
				<Pagination.Next onClick={() => paginate(currentPage + 1 <= pageCount ? currentPage + 1 : pageCount)} />
				<Pagination.Last onClick={() => paginate(pageCount)} />
			</Pagination>
		</Container>
	);
}

export default AdminUserPage;
