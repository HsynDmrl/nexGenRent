import { Button, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { getAll, setSelectedIdAction } from '../../../store/car/carSlice';
import { getAll as getAllModels } from '../../../store/model/modelSlice';
import { getAll as getAllColors } from '../../../store/color/colorSlice';
import { RootState } from '../../../store/configStore/configureStore';
import AdminCarUpdateModal from './AdminCarUpdateModal';
import ExportToCSVButton from './ExportToCSVButton';
import AdminCarAddModal from './AdminCarAddModal';
import AdminCarTable from './AdminCarTable';
import useCarFilter from './UseCarFilter';
import './adminCarPage.css';
import AdminCarPagination from "./AdminCarPagination";
import AdminCarInfoBadges from './AdminCarInfoBadges';

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
	const [searchId, setSearchId] = useState('');
	const [searchKilometer, setSearchKilometer] = useState('');
	const [searchYear, setSearchYear] = useState('');
	const [searchDailyPrice, setSearchDailyPrice] = useState('');
	const [searchPlate, setSearchPlate] = useState('');
	const [searchImagePath, setSearchImagePath] = useState('');
	const [searchStatus, setSearchStatus] = useState('');
	const [searchGearType, setSearchGearType] = useState('');
	const [searchFuelType, setSearchFuelType] = useState('');
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


	const filteredCars = useCarFilter(
		allCars,
		sortBy,
		sortDirection,
		searchId,
		searchKilometer,
		searchYear,
		searchDailyPrice,
		searchPlate,
		searchImagePath,
		searchStatus,
		searchGearType,
		searchFuelType,
		searchModel,
		searchColor,
		searchCreatedDate,
		searchUpdatedDate
	);

	useEffect(() => {
		dispatch(getAll());
		dispatch(getAllModels());
		dispatch(getAllColors());
	}, [dispatch, selectedCarId, sortBy, sortDirection, searchId, searchKilometer, searchYear,
		searchDailyPrice, searchPlate, searchImagePath, searchStatus, searchGearType, searchFuelType,
		searchModel, searchColor, searchCreatedDate, searchUpdatedDate, showAddForm, showUpdateForm]);

	const handleSort = (key: 'id' | 'kilometer' | 'year' | 'dailyPrice' | 'plate' | 'imagePath' |
	 'isStatus' | 'gearType' | 'fuelType' | 'modelName' | 'colorName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
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
			<h1>Admin Araba Sayfası</h1>
			<AdminCarInfoBadges allCars={allCars.length} allModels={allModels.length} allColors={allColors.length} />
			<div className="container">
				<ExportToCSVButton className='button-admin-car ms-4' data={allCars} />
				<Button className='button-admin-car mb-2 ms-1 bg-success' onClick={handleAddButtonClick}>Yeni Car Ekle</Button>
			</div>
			<AdminCarTable
				filteredCars={filteredCars}
				sortBy={sortBy}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleCarSelectAndUpdateForm={handleCarSelectAndUpdateForm}
				setSearchId={setSearchId}
				setSearchKilometer={setSearchKilometer}
				setSearchYear={setSearchYear}
				setSearchDailyPrice={setSearchDailyPrice}
				setSearchPlate={setSearchPlate}
				setSearchImagePath={setSearchImagePath}
				setSearchStatus={setSearchStatus}
				setSearchGearType={setSearchGearType}
				setSearchFuelType={setSearchFuelType}
				setSearchModel={setSearchModel}
				setSearchColor={setSearchColor}
				setSearchCreatedDate={setSearchCreatedDate}
				setSearchUpdatedDate={setSearchUpdatedDate}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				allModels={allModels}
				allColors={allColors}
			/>
			<AdminCarUpdateModal showUpdateForm={showUpdateForm} handleCloseUpdateForm={handleCloseUpdateForm} />
			<AdminCarAddModal showAddForm={showAddForm} handleCloseAddForm={handleCloseAddForm} />
			<AdminCarPagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={filteredCars.length}
				paginate={paginate}
			/>
		</Container>
	);
}

export default AdminCarPage;
