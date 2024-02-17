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

const AdminBrandPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const allBrands = useSelector((state: RootState) => state.brand.allData);
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const seledtedBrandId = useSelector((state: RootState) => state.brand.dataFromById);

	const handleSortIconDirection = () => {
		setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc');
	};

	useEffect(() => {
		dispatch(getAll());
	}, [dispatch, showAddForm, showUpdateForm]);

	const handleAddButtonClick = () => {
		setShowAddForm(true);
	};

	const handleUpdateButtonClick = () => {
		setShowUpdateForm(true);
	};

	const handleCloseAddForm = () => {
		setShowAddForm(false);
	};

	const handleCloseUpdateForm = () => {
		setShowUpdateForm(false);
	};

	const handleBrandSelect = (id: number): void => {
		dispatch(getById(id));
		console.log('Selected Brand ID:', id);
	};

	const handleSort = (key: 'id' | 'name', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};



	const sortedBrands = [...allBrands].sort((a, b) => {
		if (sortDirection === 'asc') {
			return (a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b]) ? 1 : -1;
		} else {
			return (a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b]) ? 1 : -1;
		}
	});

	return (
		<Container>
			<h1>Admin Brand Page</h1>
			<Table striped bordered hover>
				<thead className='border-white'>
					<tr>
						<th>
							<Button className='p-2 mb-2 ms-1 bg-secondary'>Dışa Aktar</Button>
							<Button className='p-2 mb-2 ms-1 bg-success' onClick={handleAddButtonClick}>Add</Button>
							<Button className='p-2 mb-2 ms-1 bg-warning' onClick={handleUpdateButtonClick}>Update</Button>
							<Button className='p-2 mb-2 ms-1 bg-danger'>Delete</Button>
						</th>
					</tr>
				</thead>
			</Table>
			<Table striped bordered hover>
				<thead>
					<tr className='align-items-center'>
						<th rowSpan={2}><Form.Check aria-label="option 1" /></th>
						<th className='align-items-center' >Sıra No</th>
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
					</tr>
					<tr>
						<th className='justify-content-end'><Form.Control size="sm" type="text" placeholder="Sıra No Ara" /></th>
						<th className='justify-content-end'><Form.Control size="sm" type="text" placeholder="Id Ara" /></th>
						<th><Form.Control size="sm" type="text" placeholder="İsim Ara" /></th>
						<th><Form.Control size="sm" type="text" placeholder="Logo Path Ara" /></th>
					</tr>
				</thead>
				<tbody>
					{sortedBrands.map((brandData) => (
						<tr key={brandData.id} onClick={() => handleBrandSelect(brandData.id)}>
							<td><Form.Check aria-label="option 2" /></td>
							<td>{allBrands.findIndex((brand) => brand.id === brandData.id) + 1}</td>
							<td>{brandData.id}</td>
							<td>{brandData.name}</td>
							<td>{brandData.logoPath}</td>
						</tr>
					))}
				</tbody>
			</Table>

			<Modal show={showAddForm} onHide={handleCloseAddForm}>
				<Modal.Header closeButton>
					<Modal.Title>Brand Ekle</Modal.Title>
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
					<Modal.Title>Brand Güncelle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminBrandUpdateForm id={seledtedBrandId?.id} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseUpdateForm}>
						Kapat
					</Button>
				</Modal.Footer>
			</Modal>
			<Pagination className="mx-5">
				<Pagination.First />
				<Pagination.Prev />
				<Pagination.Item>{1}</Pagination.Item>
				<Pagination.Ellipsis />

				<Pagination.Item>{10}</Pagination.Item>
				<Pagination.Item>{11}</Pagination.Item>
				<Pagination.Item active>{12}</Pagination.Item>
				<Pagination.Item>{13}</Pagination.Item>
				<Pagination.Item disabled>{14}</Pagination.Item>

				<Pagination.Ellipsis />
				<Pagination.Item>{20}</Pagination.Item>
				<Pagination.Next />
				<Pagination.Last />
			</Pagination>
		</Container>
	);
}

export default AdminBrandPage;
