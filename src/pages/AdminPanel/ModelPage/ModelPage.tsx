import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { getAll as getAllBrands } from '../../../store/brand/brandSlice';
import { getAll, setSelectedIdAction } from '../../../store/model/modelSlice';
import { RootState } from '../../../store/configStore/configureStore';
import ExportToCSVButton from '../../../components/adminPanel/model/exportToCSVButton/exportToCSVButton';
import EntityIcon from '../../../components/entityIcon/entityIcon';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import useModelFilter from '../../../components/adminPanel/model/filter/modelFilter';
import ModelTable from '../../../components/adminPanel/model/table/modelTable';
import ModelAddModal from '../../../components/adminPanel/model/addModal/modelAddModal';
import ModelUpdateModal from '../../../components/adminPanel/model/updateModal/modelUpdateModal';
import ModelPagination from '../../../components/adminPanel/model/pagination/modelPagination';
import './modelPage.css';

const ModelPage: React.FC = () => {
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
	const [searchId, setSearchId] = useState('');
	const [searchName, setSearchName] = useState('');
	const [searchBrand, setSearchBrand] = useState('');
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');
	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleModelSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };
	
	const filteredModels = useModelFilter(
		allModels,
		sortBy,
		sortDirection,
		searchId,
		searchName,
		searchBrand,
		searchCreatedDate,
		searchUpdatedDate
	);

	useEffect(() => {
		dispatch(getAllBrands());
		dispatch(getAll());
	}, [dispatch, selectedModelId, sortBy, sortDirection, searchId, searchName, searchBrand, searchCreatedDate, searchUpdatedDate,
		 showAddForm, showUpdateForm]);

	
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
			<ModelTable
				filteredModels={filteredModels}
				allBrands={allBrands}
				sortBy={sortBy}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleModelSelectAndUpdateForm={handleModelSelectAndUpdateForm}
				setSearchId={setSearchId}
				setSearchName={setSearchName}
				setSearchBrand={setSearchBrand}
				setSearchCreatedDate={setSearchCreatedDate}
				setSearchUpdatedDate={setSearchUpdatedDate}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
			/>
			<ModelAddModal showAddForm={showAddForm} handleCloseAddForm={handleCloseAddForm} />
			<ModelUpdateModal showUpdateForm={showUpdateForm} handleCloseUpdateForm={handleCloseUpdateForm} />
			<ModelPagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={filteredModels.length}
				paginate={paginate}
			/>
		</Container>
	);
}

export default ModelPage;
