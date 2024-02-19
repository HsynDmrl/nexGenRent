import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Button, Container, Modal } from 'react-bootstrap';
import AdminBrandAddForm from './AdminBrandAddForm';
import AdminBrandUpdateForm from './AdminBrandUpdateForm';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, getById } from '../../../store/brand/brandSlice';
import Pagination from 'react-bootstrap/Pagination';
import { FaSortNumericDown } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { setSelectedIdAction, clearSelectedIdAction } from '../../../store/brand/brandSlice';
import AdminBrandDeleteForm from './AdminBrandDeleteForm';
import './adminBrandPage.css';
import ExportToCSVButton from './ExportToCSVButton';

const AdminBrandPage: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const dispatch = useAppDispatch();
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const allBrands = useSelector((state: RootState) => state.brand.allData);
	const selectedBrandId = useSelector((state: RootState) => state.brand.selectedId);
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const [filteredBrands, setFilteredBrands] = useState(allBrands);
	const [searchId, setSearchId] = useState('');
	const [searchName, setSearchName] = useState('');
	const [searchLogoPath, setSearchLogoPath] = useState('');

	const handleSortIconDirection = () => {setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc');};
	const handleAddButtonClick = () => {setShowAddForm(true);};
	const handleUpdateButtonClick = () => {setShowUpdateForm(true);};
	const handleCloseAddForm = () => {setShowAddForm(false);};
	const handleCloseUpdateForm = () => {setShowUpdateForm(false);};

	useEffect(() => {
		let result = allBrands.filter(brand =>
			(searchId ? brand.id.toString().includes(searchId) : true) &&
			(searchName ? brand.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchLogoPath ? brand.logoPath.toLowerCase().includes(searchLogoPath.toLowerCase()) : true)
		);
	
		const sorted = result.sort((a, b) => {
			if (sortBy === 'id') {
				return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
			} else if (sortBy === 'name') {
				return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
			}
			return 0;
		});
		setFilteredBrands(sorted);
	}, [searchId, searchName, searchLogoPath, allBrands, sortBy, sortDirection]);
	
	useEffect(() => {
		dispatch(getAll());
		console.log('AdminBrandPage: getAll', allBrands);
	}, [dispatch, selectedBrandId, showAddForm, showUpdateForm, showDeleteForm]);

	const sortedBrands = [...allBrands].sort((a, b) => {
		if (sortDirection === 'asc') {
			return ((a && a[sortBy as keyof typeof a]) ?? '') > ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		} else {
			return ((a && a[sortBy as keyof typeof a]) ?? '') < ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		}
	});

	const pageCount = Math.ceil(sortedBrands.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentBrands = sortedBrands.slice(indexOfFirstItem, indexOfLastItem);
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const handleBrandSelect = (id: number): void => {
		if (selectedBrandId === id) {
			dispatch(clearSelectedIdAction());
		} else {
			dispatch(setSelectedIdAction(id));
		}
	};

	const handleSort = (key: 'id' | 'name', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleBrandSelectAndUpdateForm = (id: number) => {
		handleBrandSelect(id);
		handleUpdateButtonClick();
	};

	return (
		<Container>
			<h1>Admin Marka Sayfası</h1>
			<div>
				<ExportToCSVButton className='button-admin-brand' data={allBrands}/>
				<Button className='button-admin-brand mb-2 ms-1 bg-success' onClick={handleAddButtonClick}>Yeni Marka Ekle</Button>
			</div>
			<Table striped bordered hover>
				<thead>
					<tr className='align-items-center'>
						<th rowSpan={2} className='align-items-center mx-3' >Sıra No</th>
						<th className='align-items-center' >
							Id
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

						<th className='align-items-center' >
							İsim
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
						<th className='align-items-center'>Logo Path</th>
						{/* <th className='align-items-center' rowSpan={2}>Oluşturulma Tarihi</th>
						<th className='align-items-center' rowSpan={2}>Yenilenme Tarihi</th> */}
					</tr>
					<tr>
						<th>
							<Form.Control
								size="sm"
								type="text"
								placeholder="Id Ara"
								onChange={(e) => setSearchId(e.target.value)}
							/>
						</th>
						<th>
							<Form.Control
								size="sm"
								type="text"
								placeholder="İsim Ara"
								onChange={(e) => setSearchName(e.target.value)}
							/>
						</th>
						<th>
							<Form.Control
								size="sm"
								type="text"
								placeholder="Logo Path Ara"
								onChange={(e) => setSearchLogoPath(e.target.value)}
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredBrands.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((brand, index) => (
						<tr key={brand.id} onClick={() => handleBrandSelectAndUpdateForm(brand.id)}>
							<td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
							<td style={{ cursor: 'pointer' }}>{brand.id}</td>
							<td style={{ cursor: 'pointer' }}>{brand.name}</td>
							<td style={{ cursor: 'pointer' }}>{brand.logoPath}</td>
							{/* <td style={{ cursor: 'pointer' }}>{brand.createdDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{brand.updatedDate?.toString()}</td> */}
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={showAddForm} onHide={handleCloseAddForm}>
				<Modal.Header closeButton>
					<Modal.Title>Marka Ekle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminBrandAddForm />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseAddForm}>
						Kapat
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
				<Modal.Header closeButton>
					<Modal.Title>Marka Güncelle veya Sil</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminBrandUpdateForm />
					<hr />
					<AdminBrandDeleteForm />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseUpdateForm}>
						Kapat
					</Button>
				</Modal.Footer>
			</Modal>
			<Pagination className="justify-content-center">
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

export default AdminBrandPage;
