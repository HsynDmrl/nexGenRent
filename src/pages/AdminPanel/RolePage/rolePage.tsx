import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/role/roleSlice';
import ExportToCSVButton from '../../../components/adminPanel/role/exportToCSVButton/exportToCSVButton';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import EntityIcon from '../../../components/entityIcon/entityIcon';
import RoleTable from '../../../components/adminPanel/role/table/roleTable';
import RoleAddModal from '../../../components/adminPanel/role/addModal/roleAddModal';
import RoleUpdateModal from '../../../components/adminPanel/role/updateModal/roleUpdateModal';
import RolePagination from '../../../components/adminPanel/role/pagination/rolePagination';
import useRoleFilter from '../../../components/adminPanel/role/filter/roleFilter';
import './rolePage.css';

const AdminRolePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allRoles = useAppSelector((state: RootState) => state.role.allData);
	const selectedRoleId = useAppSelector((state: RootState) => state.role.selectedId);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const [searchId, setSearchId] = useState('');
	const [searchName, setSearchName] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');
	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleRoleSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	const filteredRoles = useRoleFilter(
		allRoles,
		sortBy,
		sortDirection,
		searchId,
		searchName,
		searchCreatedDate,
		searchUpdatedDate
	);

	useEffect(() => {
		dispatch(getAll());
	}, [dispatch, selectedRoleId, showAddForm, showUpdateForm, showDeleteForm]);

	const handleSort = (key: 'id' | 'name' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleRoleSelectAndUpdateForm = (id: number) => {
		handleRoleSelect(id);
		handleUpdateButtonClick();
	};

	return (
		<Container>
			<h1 className='text-black'>Roller Sayfası</h1>
			<Row className='mb-5 col-12'>
				<EntityBox entity="Toplam Rol Sayısı" count={allRoles.length} icon={<EntityIcon entity="Rol Sayısı" />} />
			</Row>
			<Row className='g-3 justify-content-start'>
				<Col xs={12} sm={5} lg={2}>
					<ExportToCSVButton className='w-100' data={allRoles} />
				</Col>
				<Col xs={12} sm={5} lg={2}>
					<Button className='w-100 bg-success' style={{ height: 'calc(2em + 12px)' }} onClick={handleAddButtonClick}>Yeni Rol Ekle</Button>
				</Col>
			</Row>
			<RoleTable
				filteredRoles={filteredRoles}
				sortBy={sortBy}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleRoleSelectAndUpdateForm={handleRoleSelectAndUpdateForm}
				setSearchId={setSearchId}
				setSearchName={setSearchName}
				setSearchCreatedDate={setSearchCreatedDate}
				setSearchUpdatedDate={setSearchUpdatedDate}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
			/>
			<RoleAddModal showAddForm={showAddForm} handleCloseAddForm={handleCloseAddForm} />
			<RoleUpdateModal showUpdateForm={showUpdateForm} handleCloseUpdateForm={handleCloseUpdateForm} />
			<RolePagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={filteredRoles.length}
				paginate={paginate}
			/>
		</Container>
	);
}

export default AdminRolePage;
