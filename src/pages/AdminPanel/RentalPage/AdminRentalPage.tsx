import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import { Badge, Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid } from "react-icons/lia";
import { FcAutomotive, FcParallelTasks, FcAssistant, FcBusinessman } from "react-icons/fc";
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/rental/rentalSlice';
import { getAll as getAllCars } from '../../../store/car/carSlice';
import { getAll as getAllCustomers } from '../../../store/customer/customerSlice';
import { getAll as getAllEmployees } from '../../../store/employee/employeeSlice';
import AdminRentalUpdateForm from './AdminRentalUpdateForm';
import AdminRentalDeleteForm from './AdminRentalDeleteForm';
import AdminRentalAddForm from './AdminRentalAddForm';
import ExportToCSVButton from './ExportToCSVButton';
import './adminRentalPage.css';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import EntityIcon from '../../../components/entityIcon/entityIcon';

const AdminRentalPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allRentals = useAppSelector((state: RootState) => state.rental.allData);
	const allCars = useAppSelector((state: RootState) => state.car.allData);
	const allCustomers = useAppSelector((state: RootState) => state.customer.allData);
	const allEmployees = useAppSelector((state: RootState) => state.employee.allData);
	const selectedRentalId = useAppSelector((state: RootState) => state.rental.selectedId);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const [filteredRentals, setFilteredRentals] = useState(allRentals);
	const [searchId, setSearchId] = useState('');
	const [searchStartDate, setSearchStartDate] = useState('');
	const [searchEndDate, setSearchEndDate] = useState('');
	const [searchReturnDate, setSearchReturnDate] = useState('');
	const [searchStartKilometer, setSearchStartKilometer] = useState('');
	const [searchEndKilometer, setSearchEndKilometer] = useState('');
	const [searchTotalPrice, setSearchTotalPrice] = useState('');
	const [searchDiscount, setSearchDiscount] = useState('');
	const [searchCar, setSearchCar] = useState('');
	const [searchCustomer, setSearchCustomer] = useState('');
	const [searchEmployee, setSearchEmployee] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');
	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleRentalSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	useEffect(() => {
		let result = allRentals.filter(rental =>
			(searchId ? rental.id.toString().includes(searchId) : true) &&
			(searchStartDate ? rental.startDate?.toString().includes(searchStartDate) : true) &&
			(searchEndDate ? rental.endDate?.toString().includes(searchEndDate) : true) &&
			(searchReturnDate ? rental.returnDate?.toString().includes(searchReturnDate) : true) &&
			(searchStartKilometer ? rental.startKilometer.toString().includes(searchStartKilometer) : true) &&
			(searchEndKilometer ? rental.endKilometer.toString().includes(searchEndKilometer) : true) &&
			(searchTotalPrice ? rental.totalPrice.toString().includes(searchTotalPrice) : true) &&
			(searchDiscount ? rental.discount.toString().includes(searchDiscount) : true) &&
			(searchCar ? rental.car.toString().includes(searchCar) : true) &&
			(searchCustomer ? rental.customer.toString().includes(searchCustomer) : true) &&
			(searchEmployee ? rental.employee.toString().includes(searchEmployee) : true) &&
			(searchCreatedDate ? rental.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? rental.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'startDate':
					return sortDirection === 'asc' ? new Date(a.startDate ?? "").getTime() - new Date(b.startDate ?? "").getTime() : new Date(b.startDate ?? "").getTime() - new Date(a.startDate ?? "").getTime();
				case 'endDate':
					return sortDirection === 'asc' ? new Date(a.endDate ?? "").getTime() - new Date(b.endDate ?? "").getTime() : new Date(b.endDate ?? "").getTime() - new Date(a.endDate ?? "").getTime();
				case 'returnDate':
					return sortDirection === 'asc' ? new Date(a.returnDate ?? "").getTime() - new Date(b.returnDate ?? "").getTime() : new Date(b.returnDate ?? "").getTime() - new Date(a.returnDate ?? "").getTime();
				case 'startKilometer':
					return sortDirection === 'asc' ? a.startKilometer - b.startKilometer : b.startKilometer - a.startKilometer;
				case 'endKilometer':
					return sortDirection === 'asc' ? a.endKilometer - b.endKilometer : b.endKilometer - a.endKilometer;
				case 'totalPrice':
					return sortDirection === 'asc' ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
				case 'discount':
					return sortDirection === 'asc' ? a.discount - b.discount : b.discount - a.discount;
				case 'car':
					return sortDirection === 'asc' ? a.car.plate.localeCompare(b.car.plate) : b.car.plate.localeCompare(a.car.plate);
				case 'customer':
					return sortDirection === 'asc' ? a.customer.user.name.localeCompare(b.customer.user.name) : b.customer.user.name.localeCompare(a.customer.user.name);

				case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate ?? "").getTime() - new Date(b.createdDate ?? "").getTime() : new Date(b.createdDate ?? "").getTime() - new Date(a.createdDate ?? "").getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate ?? "").getTime() - new Date(b.updatedDate ?? "").getTime() : new Date(b.updatedDate ?? "").getTime() - new Date(a.updatedDate ?? "").getTime();
				default:
					return 0;
			}
		});

		setFilteredRentals(sorted);
	}, [allRentals, searchId, searchStartDate, searchEndDate, searchReturnDate, searchStartKilometer, searchEndKilometer, searchTotalPrice, searchDiscount, searchCar, searchCustomer, searchEmployee, searchCreatedDate, searchUpdatedDate, sortBy, sortDirection]);
	useEffect(() => {
		dispatch(getAllCars());
		dispatch(getAllCustomers());
		dispatch(getAllEmployees());
		dispatch(getAll());
	}, [dispatch, selectedRentalId, showDeleteForm, showAddForm, showUpdateForm]);

	const sortedRentals = [...allRentals].sort((a, b) => {
		if (sortDirection === 'asc') {
			return ((a && a[sortBy as keyof typeof a]) ?? '') > ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		} else {
			return ((a && a[sortBy as keyof typeof a]) ?? '') < ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		}
	});

	const pageCount = Math.ceil(sortedRentals.length / itemsPerPage);

	const handleSort = (key: 'id' | 'startDate' | 'endDate' | 'returnDate' | 'startKilometer' | 'endKilometer' | 'totalPrice' | 'discount' | 'carPlate' | 'customerName' | 'employeeName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleRentalSelectAndUpdateForm = (id: number) => {
		handleRentalSelect(id);
		handleUpdateButtonClick();
	};

	return (
		<Container>
			<h1 className='text-black'>Siparişler Sayfası</h1>
			<Row className='mb-5 col-12'>
				<EntityBox entity="Sipariş Sayısı" count={allRentals.length} icon={<EntityIcon entity="Kiralama Sayısı" />} />
				<EntityBox entity="Toplam Araç Sayısı" count={allCars.length} icon={<EntityIcon entity="Araç Sayısı" />} />
				<EntityBox entity="Toplam Müşteri Sayısı" count={allCustomers.length} icon={<EntityIcon entity="Müşteri Sayısı" />} />
				<EntityBox entity="Toplam Çalışan Sayısı" count={allEmployees.length} icon={<EntityIcon entity="Çalışan Sayısı" />} />
			</Row>
			<Row className='g-3 justify-content-start'>
				<Col xs={12} sm={5} lg={2}>
					<ExportToCSVButton className='w-100' data={allRentals} />
				</Col>
				<Col xs={12} sm={5} lg={2}>
					<Button className='w-100 bg-success' style={{ height: 'calc(2em + 12px)' }} onClick={handleAddButtonClick}>Yeni Sipariş Ekle</Button>
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
						<th className='text-table'>
							Başlangıç Tarihi{' '}
							{sortBy === 'startDate' ? (
								sortDirection === 'asc' ? (
									<LiaSortAmountDownAltSolid onClick={() => handleSort('startDate', 'desc')} />
								) : (
									<LiaSortAmountUpSolid onClick={() => handleSort('startDate', 'asc')} />
								)
							) : (
								<LiaSortAmountDownAltSolid onClick={() => handleSort('startDate', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Bitiş Tarihi{' '}
							{sortBy === 'endDate' ? (
								sortDirection === 'asc' ? (
									<LiaSortAmountDownAltSolid onClick={() => handleSort('endDate', 'desc')} />
								) : (
									<LiaSortAmountUpSolid onClick={() => handleSort('endDate', 'asc')} />
								)
							) : (
								<LiaSortAmountDownAltSolid onClick={() => handleSort('endDate', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							İade Tarihi{' '}
							{sortBy === 'returnDate' ? (
								sortDirection === 'asc' ? (
									<LiaSortAmountDownAltSolid onClick={() => handleSort('returnDate', 'desc')} />
								) : (
									<LiaSortAmountUpSolid onClick={() => handleSort('returnDate', 'asc')} />
								)
							) : (
								<LiaSortAmountDownAltSolid onClick={() => handleSort('returnDate', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Başlangıç Kilometre{' '}
							{sortBy === 'startKilometer' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('startKilometer', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('startKilometer', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('startKilometer', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Bitiş Kilometre{' '}
							{sortBy === 'endKilometer' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('endKilometer', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('endKilometer', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('endKilometer', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Toplam Fiyat{' '}
							{sortBy === 'totalPrice' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('totalPrice', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('totalPrice', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('totalPrice', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							İndirim{' '}
							{sortBy === 'discount' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('discount', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('discount', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('discount', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Araba{' '}
							{sortBy === 'carPlate' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('carPlate', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('carPlate', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('carPlate', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Müşteri{' '}
							{sortBy === 'customerName' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('customerName', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('customerName', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('customerName', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Çalışan{' '}
							{sortBy === 'employeeName' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('employeeName', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('employeeName', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('employeeName', 'asc')} />
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
						<th><Form.Control size="sm" type="text" placeholder="Id Ara" onChange={(e) => setSearchId(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Başlangıç Tarihi Ara" onChange={(e) => setSearchStartDate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Bitiş Tarihi Ara" onChange={(e) => setSearchEndDate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="İade Tarihi Ara" onChange={(e) => setSearchReturnDate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Başlangıç Kilometre Ara" onChange={(e) => setSearchStartKilometer(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Bitiş Kilometre Ara" onChange={(e) => setSearchEndKilometer(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Toplam Fiyat Ara" onChange={(e) => setSearchTotalPrice(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="İndirim Ara" onChange={(e) => setSearchDiscount(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Car Ara" onChange={(e) => setSearchCar(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Customer Ara" onChange={(e) => setSearchCustomer(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Employee Ara" onChange={(e) => setSearchEmployee(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Oluşturulma Tarihi Ara" onChange={(e) => setSearchCreatedDate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Yenilenme Tarihi Ara" onChange={(e) => setSearchUpdatedDate(e.target.value)} /></th>
					</tr>
				</thead>
				<tbody>
					{filteredRentals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((rental, index) => (
						<tr key={rental.id} onClick={() => handleRentalSelectAndUpdateForm(rental.id)}>
							<td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
							<td style={{ cursor: 'pointer' }}>{rental.id}</td>
							<td style={{ cursor: 'pointer' }}>{rental.startDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{rental.endDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{rental.returnDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{rental.startKilometer}</td>
							<td style={{ cursor: 'pointer' }}>{rental.endKilometer}</td>
							<td style={{ cursor: 'pointer' }}>{rental.totalPrice}</td>
							<td style={{ cursor: 'pointer' }}>{rental.discount}</td>
							<td style={{ cursor: 'pointer' }}>{rental.car && rental.car.plate}</td>
							<td style={{ cursor: 'pointer' }}>{rental.customer && rental.customer.user.name}</td>
							<td style={{ cursor: 'pointer' }}>{rental.employee && rental.employee.user.name}</td>
							<td style={{ cursor: 'pointer' }}>{rental.createdDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{rental.updatedDate?.toString()}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={showAddForm} onHide={handleCloseAddForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>Sipariş Ekle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminRentalAddForm />
				</Modal.Body>
			</Modal>
			<Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>
			<h2>Sipariş Güncelle veya Sil</h2></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminRentalUpdateForm />
					<hr />
					<AdminRentalDeleteForm />
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

export default AdminRentalPage;
