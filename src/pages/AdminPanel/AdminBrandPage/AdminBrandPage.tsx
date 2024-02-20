import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Badge, Button, Container, Modal } from 'react-bootstrap';
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
import { setSelectedIdAction } from '../../../store/brand/brandSlice';
import AdminBrandDeleteForm from './AdminBrandDeleteForm';
import './adminBrandPage.css';
import ExportToCSVButton from './ExportToCSVButton';
import { LiaSortAmountDownAltSolid } from "react-icons/lia";
import { LiaSortAmountUpSolid } from "react-icons/lia";
import { FcNews } from "react-icons/fc";
import { IoMdImages } from "react-icons/io";
import { LiaImages } from "react-icons/lia";

const AdminBrandPage: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
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

	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };

	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');


	useEffect(() => {
		let result = allBrands.filter(brand =>
			(searchId ? brand.id.toString().includes(searchId) : true) &&
			(searchName ? brand.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchLogoPath ? brand.logoPath.toLowerCase().includes(searchLogoPath.toLowerCase()) : true) &&
			(searchCreatedDate ? brand.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? brand.updatedDate?.toString().includes(searchUpdatedDate) : true)
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
		setFilteredBrands(sorted);
	}, [searchId, searchName, searchLogoPath, searchCreatedDate, searchUpdatedDate, allBrands, sortBy, sortDirection]);
	useEffect(() => {
		dispatch(getAll());
	}, [dispatch, selectedBrandId, showAddForm, showUpdateForm, showDeleteForm]);

	const sortedBrands = [...allBrands].sort((a, b) => {
		if (sortDirection === 'asc') {
			return ((a && a[sortBy as keyof typeof a]) ?? '') > ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		} else {
			return ((a && a[sortBy as keyof typeof a]) ?? '') < ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		}
	});

	const pageCount = Math.ceil(sortedBrands.length / itemsPerPage);
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleBrandSelect = (id: number): void => {dispatch(setSelectedIdAction(id));};

	const handleSort = (key: 'id' | 'name' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
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
			<div className="container mb-5">
					<Badge className='custom-badge mb-2 mt-5 mx-5' bg="danger">{allBrands.length}<LiaImages size={'2em'}/>
					<div>Toplam Marka</div>
					</Badge>

					<Badge className='custom-badge' bg="warning">
					{allBrands.reduce((totalLogos, brand) => totalLogos + (brand.logoPath ? 1 : 0), 0)}
					<IoMdImages size={'2em'}/>
					<div>Toplam Logo</div>
					</Badge>
					</div>

					<div className="container">
				<ExportToCSVButton className='button-admin-brand ms-4' data={allBrands} />
				<Button className='button-admin-brand mb-2 ms-1 bg-success' onClick={handleAddButtonClick}>Yeni Marka Ekle</Button>
			</div>
			<Table striped bordered hover>
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
						<th className='text-table'>Logo Path</th>
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
						<th>
							<Form.Control
								size="sm"
								type="text"
								placeholder="Oluşturulma Tarihi Ara"
								onChange={(e) => setSearchCreatedDate(e.target.value)}
							/>
						</th>
						<th>
							<Form.Control
								size="sm"
								type="text"
								placeholder="Yenilenme Tarihi Ara"
								onChange={(e) => setSearchUpdatedDate(e.target.value)}
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
							<td style={{ cursor: 'pointer' }}>{brand.createdDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{brand.updatedDate?.toString()}</td>
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
					<Modal.Title className='color-dark'>Marka Güncelle veya Sil</Modal.Title>
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

export default AdminBrandPage;
