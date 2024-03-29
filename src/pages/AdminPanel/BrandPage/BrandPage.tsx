import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/brand/brandSlice';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import EntityIcon from '../../../components/entityIcon/entityIcon';
import BrandUpdateModal from '../../../components/adminPanel/brand/updateModal/brandUpdateModal';
import BrandPagination from '../../../components/adminPanel/brand/pagination/brandPagination';
import BrandAddModal from '../../../components/adminPanel/brand/addModal/brandAddModal';
import ExportToCSVButton from '../../../components/adminPanel/brand/exportToCSVButton/exportToCSVButton';
import BrandTable from '../../../components/adminPanel/brand/table/brandTable';
import useBrandFilter from '../../../components/adminPanel/brand/filter/brandFilter';
import './brandPage.css';

const BrandPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allBrands = useAppSelector((state: RootState) => state.brand.allData);
	const selectedBrandId = useAppSelector((state: RootState) => state.brand.selectedId);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(15);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);
	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [sortIconDirection, setSortIconDirection] = useState<'asc' | 'desc'>('asc');
	const [showDeleteForm, setShowDeleteForm] = useState(false);
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
	const handleBrandSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };
	
	const filteredBrands = useBrandFilter(
		allBrands,
		sortBy,
		sortDirection,
		searchId,
		searchName,
		searchLogoPath,
		searchCreatedDate,
		searchUpdatedDate
	);

	useEffect(() => {
		dispatch(getAll());
	}, [dispatch, selectedBrandId, sortBy, sortDirection, searchId, searchName, searchLogoPath,
		searchCreatedDate, searchUpdatedDate, showAddForm, showUpdateForm, showDeleteForm]);

	const handleSort = (key: 'id' | 'name' | 'logoPath' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
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
			<h1 className='text-dark'>Markalar Sayfası</h1>
			<Row className='mb-5 col-12'>
				<EntityBox entity="Marka Sayısı" count={allBrands.length} icon={<EntityIcon entity="Marka Sayısı" />} />
				<EntityBox entity="Model Sayısı" count={allBrands.reduce((totalLogos, brand) => totalLogos + (brand.logoPath ? 1 : 0), 0)} icon={<EntityIcon entity="Logo Sayısı" />} />
			</Row>
			<Row className='g-3 justify-content-start'>
				<Col xs={12} sm={5} lg={2}>
					<ExportToCSVButton className='w-100' data={allBrands} />
				</Col>
				<Col xs={12} sm={5} lg={2}>
					<Button className='w-100 bg-success' style={{ height: 'calc(2em + 12px)' }} onClick={handleAddButtonClick}>Yeni Marka Ekle</Button>
				</Col>
			</Row>
			<BrandTable
				filteredBrands={filteredBrands}
				sortBy={sortBy}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleBrandSelectAndUpdateForm={handleBrandSelectAndUpdateForm}
				setSearchId={setSearchId}
				setSearchName={setSearchName}
				setSearchLogoPath={setSearchLogoPath}
				setSearchCreatedDate={setSearchCreatedDate}
				setSearchUpdatedDate={setSearchUpdatedDate}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
			/>
			<BrandAddModal showAddForm={showAddForm} handleCloseAddForm={handleCloseAddForm} />
			<BrandUpdateModal showUpdateForm={showUpdateForm} handleCloseUpdateForm={handleCloseUpdateForm} />
			<BrandPagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={filteredBrands.length}
				paginate={paginate}
			/>
		</Container>
	);
}

export default BrandPage;
