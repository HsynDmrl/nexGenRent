import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Badge, Button, Container, Modal } from 'react-bootstrap';
import AdminEmployeeAddForm from './AdminEmployeeAddForm';
import AdminEmployeeDeleteForm from './AdminEmployeeDeleteForm';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/employee/employeeSlice';
import Pagination from 'react-bootstrap/Pagination';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import './adminEmployeePage.css';
import ExportToCSVButton from './ExportToCSVButton';
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid, LiaImages } from "react-icons/lia";
import { getAll as getAllUsers }  from '../../../store/role/roleSlice';
import { FcAssistant, FcConferenceCall } from "react-icons/fc";
import AdminEmployeeUpdateForm from './AdminEmployeeUpdateForm';

const AdminEmployeePage: React.FC = () => {
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
	const [filteredEmployees, setFilteredEmployees] = useState(allEmployees);
	const [searchId, setSearchId] = useState('');
	const [searchName, setSearchName] = useState('');
	const [searchUser, setSearchUser] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');

	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleEmployeeSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	useEffect(() => {
		let result = allEmployees.filter(employee =>
			(searchId ? employee.id.toString().includes(searchId) : true) &&
			(searchName ? employee.salary.toString().includes(searchId) : true) &&
			(searchUser ? employee.user.toString().includes(searchId) : true) &&
			(searchCreatedDate ? employee.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? employee.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'salary':
					return sortDirection === 'asc' ? a.salary - b.salary : b.salary - a.salary;
       			case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime() : new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime() : new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
				default:
					return 0;
			}
		});
		setFilteredEmployees(sorted);
	}, [searchId, searchName, searchUser, searchCreatedDate, searchUpdatedDate, allEmployees, sortBy, sortDirection]);
	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getAll());
	}, [dispatch, selectedEmployeeId, showAddForm, showUpdateForm, showDeleteForm]);

	const sortedEmployees = [...allEmployees].sort((a, b) => {
		if (sortDirection === 'asc') {
			return ((a && a[sortBy as keyof typeof a]) ?? '') > ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		} else {
			return ((a && a[sortBy as keyof typeof a]) ?? '') < ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		}
	});

	const pageCount = Math.ceil(sortedEmployees.length / itemsPerPage);

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
			<h1>Admin Employee Sayfası</h1>
			<div className="container mb-5">
				<Badge className='custom-badge mb-2 mt-5 mx-5' bg="danger">{allEmployees.length}<FcAssistant size={'2em'} />
					<div>Toplam Çalışan</div>
				</Badge>
				<Badge className='custom-badge' bg="warning">{allUsers.length}<FcConferenceCall size={'2em'} />
					<div>Toplam Kullanıcı</div>
				</Badge>
			</div>
			<div className="container">
				<ExportToCSVButton className='button-admin-employee ms-4' data={allEmployees} />
				<Button className='button-admin-employee mb-2 ms-1 bg-success' onClick={handleAddButtonClick}>Yeni Employee Ekle</Button>
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
						<th className='text-table' >
							Salary{' '}
							{sortBy === 'salary' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('salary', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('salary', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('salary', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Çalışan{' '}
							{sortBy === 'userName' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('userName', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('userName', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('userName', 'asc')} />
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
                        <th><Form.Control size="sm" type="text" placeholder="Id Ara" onChange={(e) => setSearchId(e.target.value)}/></th>
						<th><Form.Control size="sm" type="text" placeholder="Salary Ara" onChange={(e) => setSearchName(e.target.value)}/></th>
                        <th><Form.Control size="sm" type="text" placeholder="Kullanıcı Ara" onChange={(e) => setSearchUser(e.target.value)}/></th>
                        <th><Form.Control size="sm" type="text" placeholder="Oluşturulma Tarihi Ara" onChange={(e) => setSearchCreatedDate(e.target.value)}/></th>
                        <th><Form.Control size="sm" type="text" placeholder="Yenilenme Tarihi Ara" onChange={(e) => setSearchUpdatedDate(e.target.value)}/></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((employee, index) => (
                        <tr key={employee.id} onClick={() => handleEmployeeSelectAndUpdateForm(employee.id)}>
                            <td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td style={{ cursor: 'pointer' }}>{employee.id}</td>
							<td style={{ cursor: 'pointer' }}>{employee.salary}</td>
							<td style={{ cursor: 'pointer' }}>{employee.user && employee.user.name}</td>
							{/* <td style={{ cursor: 'pointer' }}>{employee.role.name}</td> */}
                            <td style={{ cursor: 'pointer' }}>{employee.createdDate?.toString()}</td>
                            <td style={{ cursor: 'pointer' }}>{employee.updatedDate?.toString()}</td>
                        </tr>
                    ))}
                </tbody>
			</Table>
			<Modal show={showAddForm} onHide={handleCloseAddForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>Employee Ekle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminEmployeeAddForm />
				</Modal.Body>
			</Modal>
			<Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>Employee Güncelle veya Sil</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminEmployeeUpdateForm />
					<hr />
					<AdminEmployeeDeleteForm />
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

export default AdminEmployeePage;
