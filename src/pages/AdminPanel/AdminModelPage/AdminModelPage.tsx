import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Badge, Button, Col, Container, Modal, Row } from 'react-bootstrap';
import AdminModelAddForm from './AdminModelAddForm';
import AdminModelUpdateForm from './AdminModelUpdateForm';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { getAll as getAllBrands } from '../../../store/brand/brandSlice';
import { getAll, setSelectedIdAction } from '../../../store/model/modelSlice';
import { RootState } from '../../../store/configStore/configureStore';
import Pagination from 'react-bootstrap/Pagination';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import AdminModelDeleteForm from './AdminModelDeleteForm';
import './adminModelPage.css';
import ExportToCSVButton from './ExportToCSVButton';
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid, LiaImages } from "react-icons/lia";
import { FcWorkflow } from "react-icons/fc";
import EntityIcon from '../../../components/entityIcon/entityIcon';
import EntityBox from '../../../components/changePasswordModal/entityBox';

const AdminModelPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allModels = useAppSelector((state: RootState) => state.model.allData);
	const allBrands = useAppSelector((state: RootState) => state.brand.allData);
	const selectedModelId = useAppSelector((state: RootState) => state.model.selectedId);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const [filteredModels, setFilteredModels] = useState(allModels);
	const [searchId, setSearchId] = useState('');
	const [searchName, setSearchName] = useState('');
	const [searchLogoPath, setSearchLogoPath] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');
	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleModelSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	useEffect(() => {
		let result = allModels.filter(model =>
			(searchId ? model.id.toString().includes(searchId) : true) &&
			(searchName ? model.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchLogoPath ? model.brand.toString().includes(searchId) : true) &&
			(searchCreatedDate ? model.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? model.updatedDate?.toString().includes(searchUpdatedDate) : true)
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
		setFilteredModels(sorted);
	}, [searchId, searchName, searchLogoPath, searchCreatedDate, searchUpdatedDate, allModels, sortBy, sortDirection]);

	useEffect(() => {
		dispatch(getAllBrands());
		dispatch(getAll());
	}, [dispatch, selectedModelId, showAddForm, showUpdateForm, showDeleteForm]);

	const sortedModels = [...allModels].sort((a, b) => {
		if (sortDirection === 'asc') {
			return ((a && a[sortBy as keyof typeof a]) ?? '') > ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		} else {
			return ((a && a[sortBy as keyof typeof a]) ?? '') < ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		}
	});

	const pageCount = Math.ceil(sortedModels.length / itemsPerPage);

	const handleSort = (key: 'id' | 'name' | 'brandName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleModelSelectAndUpdateForm = (id: number) => {
		handleModelSelect(id);
		handleUpdateButtonClick();
	};

	return (
		<Container>
			<h1>Modeller Sayfası</h1>
			<Row className='mb-5 col-12'>
				<EntityBox entity="Toplam Marka Sayısı" count={allBrands.length} icon={<EntityIcon entity="Model Sayısı" />} />
				<EntityBox entity="Toplam Model Sayısı" count={allModels.length} icon={<EntityIcon entity="Marka Sayısı" />} />
			</Row>
			<Row className='g-3 justify-content-start'>
				<Col xs={12} sm={5} lg={2}>
					<ExportToCSVButton className='w-100' data={allModels} />
				</Col>
				<Col xs={12} sm={5} lg={2}>
					<Button className='w-100 bg-success' style={{ height: 'calc(2em + 12px)' }} onClick={handleAddButtonClick}>Yeni Marka Ekle</Button>
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
						<th><Form.Control size="sm" type="text" placeholder="Id Ara" onChange={(e) => setSearchId(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="İsim Ara" onChange={(e) => setSearchName(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Logo Path Ara" onChange={(e) => setSearchLogoPath(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Oluşturulma Tarihi Ara" onChange={(e) => setSearchCreatedDate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Yenilenme Tarihi Ara" onChange={(e) => setSearchUpdatedDate(e.target.value)} /></th>
					</tr>
				</thead>
				<tbody>
					{filteredModels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((model, index) => (
						<tr key={model.id} onClick={() => handleModelSelectAndUpdateForm(model.id)}>
							<td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
							<td style={{ cursor: 'pointer' }}>{model.id}</td>
							<td style={{ cursor: 'pointer' }}>{model.name}</td>
							<td style={{ cursor: 'pointer' }}>{model.brand ? model.brand.name : 'Marka Yok'}</td>
							<td style={{ cursor: 'pointer' }}>{model.createdDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{model.updatedDate?.toString()}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={showAddForm} onHide={handleCloseAddForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>Model Ekle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminModelAddForm />
				</Modal.Body>
			</Modal>
			<Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>Model Güncelle veya Sil</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminModelUpdateForm />
					<hr />
					<AdminModelDeleteForm />
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

export default AdminModelPage;
