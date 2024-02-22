import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Badge, Button, Container, Modal } from 'react-bootstrap';
import AdminCarAddForm from './AdminCarAddForm';
import AdminCarUpdateForm from './AdminCarUpdateForm';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/car/carSlice';
import Pagination from 'react-bootstrap/Pagination';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import AdminCarDeleteForm from './AdminCarDeleteForm';
import './adminCarPage.css';
import ExportToCSVButton from './ExportToCSVButton';
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid } from "react-icons/lia";
import { getAll as getAllModels } from '../../../store/model/modelSlice';
import { getAll as getAllColors } from '../../../store/color/colorSlice';
import { FcAutomotive, FcWorkflow, FcMultipleSmartphones } from "react-icons/fc";

const AdminCarPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allCars = useAppSelector((state: RootState) => state.car.allData);
	const allModels = useAppSelector((state: RootState) => state.model.allData);
	const allColors = useAppSelector((state: RootState) => state.color.allData);
	const selectedCarId = useAppSelector((state: RootState) => state.car.selectedId);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const [showDeleteForm, setShowDeleteForm] = useState(false);
	const [filteredCars, setFilteredCars] = useState(allCars);
	const [searchId, setSearchId] = useState('');
	const [searchName, setSearchName] = useState('');
	const [searchModel, setSearchModel] = useState('');
	const [searchColor, setSearchColor] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');

	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleCarSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	useEffect(() => {
		let result = allCars.filter(car =>
			(searchId ? car.id.toString().includes(searchId) : true) &&
			(searchName ? car.kilometer.toString().includes(searchId) : true) &&
			(searchName ? car.year.toString().includes(searchId) : true) &&
			(searchName ? car.dailyPrice.toString().includes(searchId) : true) &&
			(searchName ? car.plate.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchName ? car.imagePath.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchName ? car.status.toString().includes(searchId) : true) &&
			(searchName ? car.gearType.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchName ? car.fuelType.toLowerCase().includes(searchName.toLowerCase()) : true) &&
			(searchName ? car.model.toString().includes(searchId) : true) &&
			(searchName ? car.color.toString().includes(searchId) : true) &&
			(searchCreatedDate ? car.createdDate?.toString().includes(searchCreatedDate) : true) &&
			(searchUpdatedDate ? car.updatedDate?.toString().includes(searchUpdatedDate) : true)
		);

		const sorted = result.sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
				case 'kilometer':
					return sortDirection === 'asc' ? a.kilometer - b.kilometer : b.kilometer - a.kilometer;
				case 'year':
					return sortDirection === 'asc' ? a.year - b.year : b.year - a.year;
				case 'dailyPrice':
					return sortDirection === 'asc' ? a.dailyPrice - b.dailyPrice : b.dailyPrice - a.dailyPrice;
				case 'plate':
					return sortDirection === 'asc' ? a.plate.localeCompare(b.plate) : b.plate.localeCompare(a.plate);
				case 'imagePath':
					return sortDirection === 'asc' ? a.imagePath.localeCompare(b.imagePath) : b.imagePath.localeCompare(a.imagePath);
				case 'isStatus':
					return sortDirection === 'asc' ? a.status === b.status ? 0 : a.status ? -1 : 1 : b.status === a.status ? 0 : b.status ? -1 : 1;
				case 'gearType':
					return sortDirection === 'asc' ? a.gearType.localeCompare(b.gearType) : b.gearType.localeCompare(a.gearType);
				case 'fuelType':
					return sortDirection === 'asc' ? a.fuelType.localeCompare(b.fuelType) : b.fuelType.localeCompare(a.fuelType);
				// case 'modelId':
				// 	return sortDirection === 'asc' ? a.modelId - b.modelId : b.modelId - a.modelId;
				// case 'brandId':
				// 	return sortDirection === 'asc' ? a.brandId - b.brandId : b.brandId - a.brandId;
				case 'createdDate':
					return sortDirection === 'asc' ? new Date(a.createdDate ?? "").getTime() - new Date(b.createdDate ?? "").getTime() : new Date(b.createdDate ?? "").getTime() - new Date(a.createdDate ?? "").getTime();
				case 'updatedDate':
					return sortDirection === 'asc' ? new Date(a.updatedDate ?? "").getTime() - new Date(b.updatedDate ?? "").getTime() : new Date(b.updatedDate ?? "").getTime() - new Date(a.updatedDate ?? "").getTime();
				default:
					return 0;
			}
		});

		setFilteredCars(sorted);
	}, [searchId, searchName, searchModel, searchColor, searchCreatedDate, searchUpdatedDate, allCars, sortBy, sortDirection]);
	useEffect(() => {
		dispatch(getAllColors());
		dispatch(getAllModels());
		dispatch(getAll());
	}, [dispatch, selectedCarId, showAddForm, showUpdateForm, showDeleteForm]);

	const sortedCars = [...allCars].sort((a, b) => {
		if (sortDirection === 'asc') {
			return ((a && a[sortBy as keyof typeof a]) ?? '') > ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		} else {
			return ((a && a[sortBy as keyof typeof a]) ?? '') < ((b && b[sortBy as keyof typeof b]) ?? '') ? 1 : -1;
		}
	});

	const pageCount = Math.ceil(sortedCars.length / itemsPerPage);

	const handleSort = (key: 'id' | 'kilometer' | 'year' | 'dailyPrice' | 'plate' | 'imagePath' | 'isStatus' | 'gearType' | 'fuelType' | 'modelName' | 'colorName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleCarSelectAndUpdateForm = (id: number) => {
		handleCarSelect(id);
		handleUpdateButtonClick();
	};

	return (
		<Container>
			<h1>Admin Car Sayfası</h1>
			<div className="container mb-5">
				<div>
				<Badge className='custom-badge mb-2 mt-5 mx-2' bg="danger">{allCars.length}<FcAutomotive size={'2em'} />
					<div>Toplam Araba</div>
				</Badge>
				<Badge className='custom-badge mx-2' bg="warning">{allModels.length}<FcWorkflow size={'2em'} />
					<div>Toplam Modeller</div>
				</Badge>
				<Badge className='custom-badge mx-2' bg="primary">{allColors.length}<FcMultipleSmartphones size={'2em'} />
					<div>Toplam Renkler</div>
				</Badge>
				</div>
			</div>
			<div className="container">
				<ExportToCSVButton className='button-admin-car ms-4' data={allCars} />
				<Button className='button-admin-car mb-2 ms-1 bg-success' onClick={handleAddButtonClick}>Yeni Car Ekle</Button>
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
							Kilometre{' '}
							{sortBy === 'kilometer' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('kilometer', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('kilometer', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('kilometer', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Yıl{' '}
							{sortBy === 'year' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('year', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('year', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('year', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Günlük Fiyat{' '}
							{sortBy === 'dailyPrice' ? (
								sortDirection === 'asc' ? (
									<FaSortNumericDown onClick={() => handleSort('dailyPrice', 'desc')} />
								) : (
									<FaSortNumericUp onClick={() => handleSort('dailyPrice', 'asc')} />
								)
							) : (
								<FaSortNumericDown onClick={() => handleSort('dailyPrice', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Plaka{' '}
							{sortBy === 'plate' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('plate', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('plate', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('plate', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Image Path{' '}
							{sortBy === 'imagePath' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('imagePath', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('imagePath', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('imagePath', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Status{' '}
							{sortBy === 'isStatus' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('isStatus', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('isStatus', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('isStatus', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Vites türü {' '}
							{sortBy === 'gearType' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('gearType', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('gearType', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('gearType', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Yakıt türü{' '}
							{sortBy === 'fuelType' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('fuelType', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('fuelType', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('fuelType', 'asc')} />
							)}
						</th>
						<th className='text-table'>
							Model{' '}
							{sortBy === 'modelName' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('modelName', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('modelName', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('modelName', 'asc')}
								/>
							)}
						</th>
						<th className='text-table'>
							Renk{' '}
							{sortBy === 'colorName' ? (
								sortDirection === 'asc' ? (
									<FaSortAlphaDown onClick={() => handleSort('colorName', 'desc')} />
								) : (
									<FaSortAlphaUp onClick={() => handleSort('colorName', 'asc')} />
								)
							) : (
								<FaSortAlphaDown onClick={() => handleSort('colorName', 'asc')}
								/>
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
						<th><Form.Control size="sm" type="text" placeholder="Kilometre Ara"  /></th>
						<th><Form.Control size="sm" type="text" placeholder="Yıl Ara"  /></th>
						<th><Form.Control size="sm" type="text" placeholder="Günlük Fiyat Ara"  /></th>
						<th><Form.Control size="sm" type="text" placeholder="Plaka Ara" /></th>
						<th><Form.Control size="sm" type="text" placeholder="ImagePath Ara" /></th>
						<th><Form.Control size="sm" type="text" placeholder="Status Ara" /></th>
						<th><Form.Control size="sm" type="text" placeholder="Vites Türü Ara" /></th>
						<th><Form.Control size="sm" type="text" placeholder="Yakıt Türü Ara" /></th>
						<th><Form.Control size="sm" type="text" placeholder="Model Ara" onChange={(e) => setSearchModel(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Renk Ara" onChange={(e) => setSearchColor(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Oluşturulma Tarihi Ara" onChange={(e) => setSearchCreatedDate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Yenilenme Tarihi Ara" onChange={(e) => setSearchUpdatedDate(e.target.value)} /></th>
					</tr>
				</thead>
				<tbody>
					{filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((car, index) => (
						<tr key={car.id} onClick={() => handleCarSelectAndUpdateForm(car.id)}>
							<td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
							<td style={{ cursor: 'pointer' }}>{car.id}</td>
							<td style={{ cursor: 'pointer' }}>{car.kilometer}</td>
							<td style={{ cursor: 'pointer' }}>{car.year}</td>
							<td style={{ cursor: 'pointer' }}>{car.dailyPrice}</td>
							<td style={{ cursor: 'pointer' }}>{car.plate}</td>
							<td style={{ cursor: 'pointer' }}>{car.imagePath}</td>
							<td style={{ cursor: 'pointer' }}>{car.status ? 'Aktif' : 'Pasif'}</td>
							<td style={{ cursor: 'pointer' }}>{car.gearType}</td>
							<td style={{ cursor: 'pointer' }}>{car.fuelType}</td>
							<td style={{ cursor: 'pointer' }}>{car.model.name}</td>
							<td style={{ cursor: 'pointer' }}>{car.color.name}</td>
							<td style={{ cursor: 'pointer' }}>{car.createdDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{car.updatedDate?.toString()}</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={showAddForm} onHide={handleCloseAddForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>Araba Ekle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminCarAddForm />
				</Modal.Body>
			</Modal>
			<Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
				<Modal.Header closeButton>
					<Modal.Title className='form-title'>Araba Güncelle veya Sil</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AdminCarUpdateForm />
					<hr />
					<AdminCarDeleteForm />
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

export default AdminCarPage;
