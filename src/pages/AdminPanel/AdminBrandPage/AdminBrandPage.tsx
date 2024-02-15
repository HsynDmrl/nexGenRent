import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Button, Container, Modal } from 'react-bootstrap';
import AdminBrandAddForm from './AdminBrandAddForm';
import AdminBrandUpdateForm from './AdminBrandUpdateForm';

function AdminBrandPage() {
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);

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

	return (
		<Container>
			<h1>Admin Brand Page</h1>
			<Table striped bordered hover>
				<thead className='border-white'>
					<tr >
						<th>
							<Button className='p-2 mb-2 mx-3 bg-secondary'>Dışa Aktar</Button>
							<Button className='p-2 mb-2 mx-2 bg-success' onClick={handleAddButtonClick}>Add</Button>
							<Button className='p-2 mb-2 mx-2 bg-warning' onClick={handleUpdateButtonClick}>Update</Button>
							<Button className='p-2 mb-2 mx-2 bg-danger'>Delete</Button>
						</th>
					</tr>
				</thead>
			</Table>
			<Table striped bordered hover>
				<thead>
					<tr className='align-items-center'>
						<th rowSpan={2}><Form.Check aria-label="option 1" /></th>
						<th className='align-items-center'>Sıra No</th>
						<th className='align-items-center'>Id</th>
						<th className='align-items-center'>İsim</th>
					</tr>
					<tr>
						<th className='justify-content-end'><Form.Control size="sm" type="text" placeholder="Sıra No Ara" /></th>
						<th className='justify-content-end'><Form.Control size="sm" type="text" placeholder="Id Ara" /></th>
						<th><Form.Control size="sm" type="text" placeholder="İsim Ara" /></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><Form.Check aria-label="option 2" /></td>
						<td>1</td>
						<td>3</td>
						<td>Mercedes</td>
					</tr>
					<tr>
						<td><Form.Check aria-label="option 2" /></td>
						<td>2</td>
						<td>6</td>
						<td>Nissan</td>
					</tr>
					<tr>
						<td><Form.Check aria-label="option 2" /></td>
						<td>3</td>
						{/* <td colSpan="2">Larry the Bird</td> */}
						<td>3</td>
						<td>Tofaş</td>
					</tr>
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
					<AdminBrandUpdateForm />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseUpdateForm}>
						Kapat
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default AdminBrandPage;
