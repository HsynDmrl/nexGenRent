import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Badge, Button, Container, Modal } from 'react-bootstrap';
import AdminInvoiceAddForm from './AdminInvoiceAddForm';
import AdminInvoiceDeleteForm from './AdminInvoiceDeleteForm';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/invoice/invoiceSlice';
import Pagination from 'react-bootstrap/Pagination';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import './adminInvoicePage.css';
import ExportToCSVButton from './ExportToCSVButton';
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid, LiaImages } from "react-icons/lia";
import { getAll as getAllRentals } from '../../../store/rental/rentalSlice';
import { FcConferenceCall, FcBusinessman } from "react-icons/fc";
import AdminInvoiceUpdateForm from './AdminInvoiceUpdateForm';

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
	const [filteredInvoices, setFilteredInvoices] = useState(allInvoices);
	const [searchId, setSearchId] = useState('');
	const [searchInvoiceNo, setSearchInvoiceNo] = useState('');
	const [searchTotalPrice, setSearchTotalPrice] = useState('');
	const [searchDiscountRate, setSearchDiscountRate] = useState('');
	const [searchTaxRate, setSearchTaxRate] = useState('');
	const [searchRentalId, setSearchRentalId] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');

	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleInvoiceSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	useEffect(() => {
		let result = allInvoices.filter(invoice =>
			(searchId ? invoice.id.toString().includes(searchId) : true) &&
			(searchInvoiceNo ? invoice.invoiceNo?.includes(searchInvoiceNo) : true) &&
			(searchTotalPrice ? invoice.totalPrice?.toString().includes(searchTotalPrice) : true) &&
			(searchDiscountRate ? invoice.discountRate?.toString().includes(searchDiscountRate) : true) &&
			(searchTaxRate ? invoice.taxRate?.toString().includes(searchTaxRate) : true) &&
			(searchRentalId ? invoice.rental.id?.toString().includes(searchRentalId) : true) &&
			(searchCreatedDate ? invoice.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? invoice.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'invoiceNo':
					return sortDirection === 'asc' ? a.invoiceNo?.localeCompare(b.invoiceNo ?? '') : b.invoiceNo?.localeCompare(a.invoiceNo ?? '');
				case 'totalPrice':
					return sortDirection === 'asc' ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
				case 'discountRate':
					return sortDirection === 'asc' ? a.discountRate - b.discountRate : b.discountRate - a.discountRate;
				case 'taxRate':
					return sortDirection === 'asc' ? a.taxRate - b.taxRate : b.taxRate - a.taxRate;
				case 'rentalId':
					return sortDirection === 'asc' ? a.rental.id - b.rental.id : b.rental.id - a.rental.id;
				case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime() : new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
				default:
					return 0;
			}
		});
		setFilteredInvoices(sorted);
	}, [allInvoices, selectedInvoiceId, searchId, searchInvoiceNo, searchTotalPrice, searchDiscountRate, searchTaxRate, searchRentalId, searchCreatedDate, searchUpdatedDate, sortBy, sortDirection]);

	useEffect(() => {
		dispatch(getAllRentals());
		dispatch(getAll());
	}, [dispatch, showDeleteForm, showAddForm, showUpdateForm]);

	const sortedInvoices = [...allInvoices].sort((a, b) => {
		if (sortDirection === 'asc') {
			return ((a && a[sortBy as keyof typeof a]) ?? '') > ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		} else {
			return ((a && a[sortBy as keyof typeof a]) ?? '') < ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		}
	});

	const pageCount = Math.ceil(sortedInvoices.length / itemsPerPage);

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
			<h1>Admin Invoice Sayfası</h1>
			<div className="container mb-5">
				<Badge className='custom-badge mb-2 mt-5 mx-5' bg="danger">{allInvoices.length}<FcBusinessman size={'2em'} />
					<div>Toplam Faturalar</div>
				</Badge>
				<Badge className='custom-badge' bg="warning">{allRentals.length}<FcConferenceCall size={'2em'} />
					<div>Toplam Siparişler</div>
				</Badge>
			</div>
			<div className="container">
				<ExportToCSVButton className='button-admin-invoice ms-4' data={allInvoices} />
				<Button className='button-admin-invoice mb-2 ms-1 bg-success' onClick={handleAddButtonClick}>Yeni Fatura Ekle</Button>
			</div>
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
							Fatura No{' '}
							{sortBy === 'invoiceNo' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('invoiceNo', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('invoiceNo', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('invoiceNo', 'asc')} />
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
							İndirim Oranı{' '}
							{sortBy === 'discountRate' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('discountRate', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('discountRate', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('discountRate', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Vergi Oranı{' '}
							{sortBy === 'taxRate' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('taxRate', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('taxRate', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('taxRate', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Rental{' '}
							{sortBy === 'rentalId' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('rentalId', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('rentalId', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('rentalId', 'asc')} />
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
						<th><Form.Control size="sm" type="text" placeholder="Fatura No Ara" onChange={(e) => setSearchInvoiceNo(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Toplam Fiyat Ara" onChange={(e) => setSearchTotalPrice(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="İndirim Oranı Ara" onChange={(e) => setSearchDiscountRate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Vergi Oranı Ara" onChange={(e) => setSearchTaxRate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Rental Id Ara" onChange={(e) => setSearchRentalId(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Oluşturulma Tarihi Ara" onChange={(e) => setSearchCreatedDate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Yenilenme Tarihi Ara" onChange={(e) => setSearchUpdatedDate(e.target.value)} /></th>
					</tr>
				</thead>
				<tbody>
					{filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((invoice, index) => (
						<tr key={invoice.id} onClick={() => handleInvoiceSelectAndUpdateForm(invoice.id)}>
							<td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
							<td style={{ cursor: 'pointer' }}>{invoice.id}</td>
							<td style={{ cursor: 'pointer' }}>{invoice.invoiceNo}</td>
							<td style={{ cursor: 'pointer' }}>{invoice.totalPrice}</td>
							<td style={{ cursor: 'pointer' }}>{invoice.discountRate}</td>
							<td style={{ cursor: 'pointer' }}>{invoice.taxRate}</td>
        					<td style={{ cursor: 'pointer' }}>{invoice.rental && invoice.rental.id}</td>
							<td style={{ cursor: 'pointer' }}>{invoice.createdDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{invoice.updatedDate?.toString()}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={showAddForm} onHide={handleCloseAddForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>Fatura Ekle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminInvoiceAddForm />
				</Modal.Body>
			</Modal>
			<Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>Fatura Güncelle veya Sil</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminInvoiceUpdateForm />
					<hr />
					<AdminInvoiceDeleteForm />
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

export default AdminInvoicePage;
