import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/user/userSlice';
import ExportToCSVButton from '../../../components/adminPanel/user/exportToCSVButton/exportToCSVButton';
import { getAll as getAllRoles }  from '../../../store/role/roleSlice';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import EntityIcon from '../../../components/entityIcon/entityIcon';
import useUserFilter from '../../../components/adminPanel/user/filter/userFilter';
import UserTable from '../../../components/adminPanel/user/table/userTable';
import UserAddModal from '../../../components/adminPanel/user/addModal/userAddModal';
import UserUpdateModal from '../../../components/adminPanel/user/updateModal/userUpdateModal';
import UserPagination from '../../../components/adminPanel/user/pagination/userPagination';
import './userPage.css';

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
	const [searchId, setSearchId] = useState('');
	const [searchEmail, setSearchEmail] = useState('');
	const [searchGsm, setSearchGsm] = useState('');
	const [searchName, setSearchName] = useState('');
	const [searchNationalityId, setSearchNationalityId] = useState('');
	const [searchSurname, setSearchSurname] = useState('');
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

	const filteredUsers = useUserFilter(
		allUsers,
		sortBy,
		sortDirection,
		searchId,
		searchEmail,
		searchGsm,
		searchName,
		searchNationalityId,
		searchSurname,
		searchRole,
		searchCreatedDate,
		searchUpdatedDate
	);

	useEffect(() => {
		dispatch(getAllRoles());
		dispatch(getAll());
	}, [dispatch, selectedUserId, showAddForm, showUpdateForm, showDeleteForm]);

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
			<UserTable
				filteredUsers={filteredUsers}
				allRoles={allRoles}
				sortBy={sortBy}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleUserSelectAndUpdateForm={handleUserSelectAndUpdateForm}
				setSearchId={setSearchId}
				setSearchEmail={setSearchEmail}
				setSearchGsm={setSearchGsm}
				setSearchName={setSearchName}
				setSearchNationalityId={setSearchNationalityId}
				setSearchSurname={setSearchSurname}
				setSearchRole={setSearchRole}
				setSearchCreatedDate={setSearchCreatedDate}
				setSearchUpdatedDate={setSearchUpdatedDate}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
			/>
			<UserAddModal showAddForm={showAddForm} handleCloseAddForm={handleCloseAddForm} />
			<UserUpdateModal showUpdateForm={showUpdateForm} handleCloseUpdateForm={handleCloseUpdateForm} />
			<UserPagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={filteredUsers.length}
				paginate={paginate}
			/>
		</Container>
	);
}

export default AdminUserPage;
