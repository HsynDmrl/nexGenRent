import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/customer/customerSlice';
import { getAll as getAllUsers } from '../../../store/user/userSlice';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import EntityIcon from '../../../components/entityIcon/entityIcon';
import useCustomerFilter from '../../../components/adminPanel/customer/filter/customerFilter';
import CustomerTable from '../../../components/adminPanel/customer/table/customerTable';
import CustomerAddModal from '../../../components/adminPanel/customer/addModal/customerAddModal';
import ExportToCSVButton from '../../../components/adminPanel/customer/exportToCSVButton/ExportToCSVButton';
import CustomerUpdateModal from '../../../components/adminPanel/customer/updateModal/customerUpdateModal';
import CustomerPagination from '../../../components/adminPanel/customer/pagination/customerPagination';
import './customerPage.css';

const CustomerPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allCustomers = useAppSelector((state: RootState) => state.customer.allData);
	const allUsers = useAppSelector((state: RootState) => state.user.allData);
	const selectedCustomerId = useAppSelector((state: RootState) => state.customer.selectedId);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const [searchId, setSearchId] = useState('');
	const [searchUserName, setSearchUserName] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');

	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleCustomerSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	const filteredCustomers = useCustomerFilter(
		allCustomers,
		sortBy,
		sortDirection,
		searchId,
		searchUserName,
		searchCreatedDate,
		searchUpdatedDate
	);

	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getAll());
	}, [dispatch, selectedCustomerId, showAddForm, showUpdateForm, showDeleteForm]);

	const handleSort = (key: 'id' | 'userName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleCustomerSelectAndUpdateForm = (id: number) => {
		handleCustomerSelect(id);
		handleUpdateButtonClick();
	};

	return (
		<Container>
			<h1 className='text-black'>Müşteriler Sayfası</h1>
			<Row className='mb-5 col-12'>
				<EntityBox entity="Müşteri Sayısı" count={allCustomers.length} icon={<EntityIcon entity="Müşteri Sayısı" />} />
				<EntityBox entity="Kullanıcı Sayısı" count={allUsers.length} icon={<EntityIcon entity="Kullanıcı Sayısı" />} />
			</Row>
			<Row className='g-3 justify-content-start'>
				<Col xs={12} sm={5} lg={2}>
					<ExportToCSVButton className='w-100' data={allCustomers} />
				</Col>
				<Col xs={12} sm={5} lg={2}>
					<Button className='w-100 bg-success' style={{ height: 'calc(2em + 12px)' }} onClick={handleAddButtonClick}>Yeni Müşteri Ekle</Button>
				</Col>
			</Row>
			<CustomerTable
				filteredCustomers={filteredCustomers}
				sortBy={sortBy}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleCustomerSelectAndUpdateForm={handleCustomerSelectAndUpdateForm}
				setSearchId={setSearchId}
				setSearchUserName={setSearchUserName}
				setSearchCreatedDate={setSearchCreatedDate}
				setSearchUpdatedDate={setSearchUpdatedDate}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
			/>
			<CustomerAddModal showAddForm={showAddForm} handleCloseAddForm={handleCloseAddForm} />
			<CustomerUpdateModal showUpdateForm={showUpdateForm} handleCloseUpdateForm={handleCloseUpdateForm} />
			<CustomerPagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={filteredCustomers.length}
				paginate={paginate}
			/>
		</Container>
	);
}

export default CustomerPage;
