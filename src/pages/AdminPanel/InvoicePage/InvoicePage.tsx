import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/invoice/invoiceSlice';
import { getAll as getAllRentals } from '../../../store/rental/rentalSlice';
import ExportToCSVButton from '../../../components/adminPanel/invoice/exportToCSVButton/exportToCSVButton';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import EntityIcon from '../../../components/entityIcon/entityIcon';
import InvoiceTable from '../../../components/adminPanel/invoice/table/invoiceTable';
import InvoiceAddModal from '../../../components/adminPanel/invoice/addModal/invoiceAddModal';
import InvoiceUpdateModal from '../../../components/adminPanel/invoice/updateModal/invoiceUpdateModal';
import InvoicePagination from '../../../components/adminPanel/invoice/pagination/invoicePagination';
import useInvoiceFilter from '../../../components/adminPanel/invoice/filter/invoiceFilter';
import './invoicePage.css';

const AdminInvoicePage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allInvoices = useAppSelector((state: RootState) => state.invoice.allData);
	const allRentals = useAppSelector((state: RootState) => state.rental.allData);
	const selectedInvoiceId = useAppSelector((state: RootState) => state.invoice.selectedId);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const [searchId, setSearchId] = useState('');
	const [searchInvoiceNo, setSearchInvoiceNo] = useState('');
	const [searchTotalPrice, setSearchTotalPrice] = useState('');
	const [searchDiscountRate, setSearchDiscountRate] = useState('');
	const [searchTaxRate, setSearchTaxRate] = useState('');
	const [searchRental, setSearchRental] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');

	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleInvoiceSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	const filteredInvoices = useInvoiceFilter(
		allInvoices,
		sortBy,
		sortDirection,
		searchId,
		searchInvoiceNo,
		searchTotalPrice,
		searchDiscountRate,
		searchTaxRate,
		searchRental,
		searchCreatedDate,
		searchUpdatedDate
	);

	useEffect(() => {
		dispatch(getAllRentals());
		dispatch(getAll());
	}, [dispatch, showDeleteForm, showAddForm, showUpdateForm]);

	const handleSort = (key: 'id' | 'invoiceNo' | 'totalPrice' | 'discountRate' | 'taxRate' | 'rentalId' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleInvoiceSelectAndUpdateForm = (id: number) => {
		handleInvoiceSelect(id);
		handleUpdateButtonClick();
	};
	return (
		<Container>
			<h1 className='text-black'>Faturalar Sayfası</h1>
			<Row className='mb-5 col-12'>
				<EntityBox entity="Fatura Sayısı" count={allInvoices.length} icon={<EntityIcon entity="Fatura Sayısı" />} />
				<EntityBox entity="Sipariş Sayısı" count={allRentals.length} icon={<EntityIcon entity="Kiralama Sayısı" />} />
			</Row>
			<Row className='g-3 justify-content-start'>
				<Col xs={12} sm={5} lg={2}>
					<ExportToCSVButton className='w-100' data={allInvoices} />
				</Col>
				<Col xs={12} sm={5} lg={2}>
					<Button className='w-100 bg-success' style={{ height: 'calc(2em + 12px)' }} onClick={handleAddButtonClick}>Yeni Fatura Ekle</Button>
				</Col>
			</Row>
			<InvoiceTable
				filteredInvoices={filteredInvoices}
				allRentals={allRentals}
				sortBy={sortBy}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleInvoiceSelectAndUpdateForm={handleInvoiceSelectAndUpdateForm}
				setSearchId={setSearchId}
				setSearchInvoiceNo={setSearchInvoiceNo}
				setSearchTotalPrice={setSearchTotalPrice}
				setSearchDiscountRate={setSearchDiscountRate}
				setSearchTaxRate={setSearchTaxRate}
				setSearchRental={setSearchRental}
				setSearchCreatedDate={setSearchCreatedDate}
				setSearchUpdatedDate={setSearchUpdatedDate}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
			/>
			<InvoiceAddModal showAddForm={showAddForm} handleCloseAddForm={handleCloseAddForm} />
			<InvoiceUpdateModal showUpdateForm={showUpdateForm} handleCloseUpdateForm={handleCloseUpdateForm} />
			<InvoicePagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={filteredInvoices.length}
				paginate={paginate}
			/>
		</Container>
	);
}

export default AdminInvoicePage;
