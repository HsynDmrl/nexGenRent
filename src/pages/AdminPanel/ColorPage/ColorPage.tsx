import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, setSelectedIdAction } from '../../../store/color/colorSlice';
import ExportToCSVButton from '../../../components/adminPanel/color/exportToCSVButton/exportToCSVButton';
import EntityBox from '../../../components/changePasswordModal/entityBox';
import EntityIcon from '../../../components/entityIcon/entityIcon';
import useColorFilter from '../../../components/adminPanel/color/filter/colorFilter';
import ColorTable from '../../../components/adminPanel/color/table/colorTable';
import ColorAddModal from '../../../components/adminPanel/color/addModal/colorAddModal';
import ColorUpdateModal from '../../../components/adminPanel/color/updateModal/colorUpdateModal';
import ColorPagination from '../../../components/adminPanel/color/pagination/colorPagination';
import './colorPage.css';

const ColorPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const allColors = useAppSelector((state: RootState) => state.color.allData);
	const selectedColorId = useAppSelector((state: RootState) => state.color.selectedId);
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
	const [searchCreatedDate, setSearchCreatedDate] = useState('');
	const [searchUpdatedDate, setSearchUpdatedDate] = useState('');

	const handleSortIconDirection = () => { setSortIconDirection(sortIconDirection === 'asc' ? 'desc' : 'asc'); };
	const handleAddButtonClick = () => { setShowAddForm(true); };
	const handleUpdateButtonClick = () => { setShowUpdateForm(true); };
	const handleCloseAddForm = () => { setShowAddForm(false); };
	const handleCloseUpdateForm = () => { setShowUpdateForm(false); };
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	const handleColorSelect = (id: number): void => { dispatch(setSelectedIdAction(id)); };

	const filteredColors = useColorFilter(
		allColors,
		sortBy,
		sortDirection,
		searchId,
		searchName,
		searchCreatedDate,
		searchUpdatedDate
	);

	useEffect(() => {
		dispatch(getAll());
	}, [dispatch, selectedColorId, showAddForm, showUpdateForm, showDeleteForm]);

	const handleSort = (key: 'id' | 'name' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => {
		setSortBy(key);
		setSortDirection(direction);
		handleSortIconDirection();
	};

	const handleColorSelectAndUpdateForm = (id: number) => {
		handleColorSelect(id);
		handleUpdateButtonClick();
	};

	return (
		<Container>
			<h1 className='text-black'>Renkler Sayfası</h1>
			<Row className='mb-5 col-12'>
				<EntityBox entity="Renk Sayısı" count={allColors.length} icon={<EntityIcon entity="Renk Sayısı" />} />
			</Row>
			<Row className='g-3 justify-content-start'>
				<Col xs={12} sm={5} lg={2}>
					<ExportToCSVButton className='w-100' data={allColors} />
				</Col>
				<Col xs={12} sm={5} lg={2}>
					<Button className='w-100 bg-success' style={{ height: 'calc(2em + 12px)' }} onClick={handleAddButtonClick}>Yeni Renk Ekle</Button>
				</Col>
			</Row>
			<ColorTable
				filteredColors={filteredColors}
				sortBy={sortBy}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleColorSelectAndUpdateForm={handleColorSelectAndUpdateForm}
				setSearchId={setSearchId}
				setSearchName={setSearchName}
				setSearchCreatedDate={setSearchCreatedDate}
				setSearchUpdatedDate={setSearchUpdatedDate}
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
			/>
			<ColorAddModal showAddForm={showAddForm} handleCloseAddForm={handleCloseAddForm} />
			<ColorUpdateModal showUpdateForm={showUpdateForm} handleCloseUpdateForm={handleCloseUpdateForm} />
			<ColorPagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				totalItems={filteredColors.length}
				paginate={paginate}
			/>
		</Container>
	);
}

export default ColorPage;
