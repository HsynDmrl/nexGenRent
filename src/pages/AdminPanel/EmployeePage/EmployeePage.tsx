import React, { useEffect, useState } from 'react';
import {  Button, Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/employee/employeeSlice';
import './employeePage.css';
import ExportToCSVButton from '../../../components/adminPanel/employee/exportToCSVButton/exportToCSVButton';
import { getAll as getAllUsers } from '../../../store/role/roleSlice';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import EntityIcon from '../../../components/entityIcon/entityIcon';
import useEmployeeFilter from '../../../components/adminPanel/employee/filter/employeeFilter';
import EmployeeTable from '../../../components/adminPanel/employee/table/employeeTable';
import EmployeeAddModal from '../../../components/adminPanel/employee/addModal/employeeAddModal';
import EmployeeUpdateModal from '../../../components/adminPanel/employee/updateModal/employeeUpdateModal';
import EmployeePagination from '../../../components/adminPanel/employee/pagination/employeePagination';

const EmployeePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allEmployees = useAppSelector((state: RootState) => state.employee.allData);
	const allUsers = useAppSelector((state: RootState) => state.role.allData);
	const selectedEmployeeId = useAppSelector((state: RootState) => state.employee.selectedId);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const [searchId, setSearchId] = useState('');
	const [searchSalary, setSearchSalary] = useState('');
	const [searchUserName, setSearchUserName] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');

	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleEmployeeSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	const filteredEmployees = useEmployeeFilter(
		allEmployees,
		sortBy,
		sortDirection,
		(searchId),
		Number(searchSalary),
		searchUserName,
		searchCreatedDate,
		searchUpdatedDate
	);

	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getAll());
	}, [dispatch, selectedEmployeeId, showAddForm, showUpdateForm, showDeleteForm]);

	const handleSort = (key: 'id' | 'salary' | 'userName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleEmployeeSelectAndUpdateForm = (id: number) => {
		handleEmployeeSelect(id);
		handleUpdateButtonClick();
	};

	return (
		<Container>
			<h1 className='text-black'>Çalışanlar Sayfası</h1>
			<Row className='mb-5 col-12'>
				<EntityBox entity="Çalışan Sayısı" count={allEmployees.length} icon={<EntityIcon entity="Çalışan Sayısı" />} />
				<EntityBox entity="Kullanıcı Sayısı" count={allUsers.length} icon={<EntityIcon entity="Kullanıcı Sayısı" />} />
			</Row>
			<Row className='g-3 justify-content-start'>
				<Col xs={12} sm={5} lg={2}>
					<ExportToCSVButton className='w-100' data={allEmployees} />
				</Col>
				<Col xs={12} sm={5} lg={2}>
					<Button className='w-100 bg-success' style={{ height: 'calc(2em + 12px)' }} onClick={handleAddButtonClick}>Yeni Çalışan Ekle</Button>
				</Col>
			</Row>
			<EmployeeTable
				filteredEmployees={filteredEmployees}
				sortBy={sortBy}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleEmployeeSelectAndUpdateForm={handleEmployeeSelectAndUpdateForm}
				setSearchId={setSearchId}
				setSearchSalary={setSearchSalary}
				setSearchUserName={setSearchUserName}
				setSearchCreatedDate={setSearchCreatedDate}
				setSearchUpdatedDate={setSearchUpdatedDate}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
			/>
			<EmployeeAddModal showAddForm={showAddForm} handleCloseAddForm={handleCloseAddForm} />
			<EmployeeUpdateModal showUpdateForm={showUpdateForm} handleCloseUpdateForm={handleCloseUpdateForm} />
			<EmployeePagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={filteredEmployees.length}
				paginate={paginate}
			/>
		</Container>
	);
}

export default EmployeePage;
