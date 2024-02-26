import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid } from "react-icons/lia";
import { Car } from '../../../models/cars/entity/car';
import { Model } from '../../../models/models/entity/model';
import { Color } from '../../../models/colors/entity/color';

interface AdminCarTableProps {
	filteredCars: Car[];
	allModels: Model[];
	allColors: Color[];
	sortBy: string;
	sortDirection: 'asc' | 'desc';
	handleSort: (key: 'id' | 'kilometer' | 'year' | 'dailyPrice' | 'plate' | 'imagePath' | 'isStatus' | 'gearType' | 'fuelType' | 'modelName' | 'colorName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => void;
	handleCarSelectAndUpdateForm: (id: number) => void;
	setSearchId: React.Dispatch<React.SetStateAction<string>>;
	setSearchKilometer: React.Dispatch<React.SetStateAction<string>>;
	setSearchYear: React.Dispatch<React.SetStateAction<string>>;
	setSearchDailyPrice: React.Dispatch<React.SetStateAction<string>>;
	setSearchPlate: React.Dispatch<React.SetStateAction<string>>;
	setSearchImagePath: React.Dispatch<React.SetStateAction<string>>;
	setSearchStatus: React.Dispatch<React.SetStateAction<string>>;
	setSearchGearType: React.Dispatch<React.SetStateAction<string>>;
	setSearchFuelType: React.Dispatch<React.SetStateAction<string>>;
	setSearchModel: React.Dispatch<React.SetStateAction<string>>;
	setSearchColor: React.Dispatch<React.SetStateAction<string>>;
	setSearchCreatedDate: React.Dispatch<React.SetStateAction<string>>;
	setSearchUpdatedDate: React.Dispatch<React.SetStateAction<string>>;
	currentPage: number;
	itemsPerPage: number;
}

const AdminCarTable: React.FC<AdminCarTableProps> = ({
	filteredCars,
	allModels,
	allColors,
	sortBy,
	sortDirection,
	handleSort,
	handleCarSelectAndUpdateForm,
	setSearchId,
	setSearchKilometer,
	setSearchYear,
	setSearchDailyPrice,
	setSearchPlate,
	setSearchImagePath,
	setSearchStatus,
	setSearchGearType,
	setSearchFuelType,
	setSearchModel,
	setSearchColor,
	setSearchCreatedDate,
	setSearchUpdatedDate,
	currentPage,
	itemsPerPage,
}) => {
	return (
		<Table>
			<thead>
				<tr className='align-items-center'>
					<th rowSpan={2} className='text-table'>Sıra No</th>
					<th className='text-table'>Id {sortBy === 'id' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('id', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('id', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('id', 'asc')} />}</th>
					<th className='text-table'>Kilometre {sortBy === 'kilometer' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('kilometer', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('kilometer', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('kilometer', 'asc')} />}</th>
					<th className='text-table'>Yıl {sortBy === 'year' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('year', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('year', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('year', 'asc')} />}</th>
					<th className='text-table'>Günlük Fiyat {sortBy === 'dailyPrice' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('dailyPrice', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('dailyPrice', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('dailyPrice', 'asc')} />}</th>
					<th className='text-table'>Plaka {sortBy === 'plate' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('plate', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('plate', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('plate', 'asc')} />}</th>
					<th className='text-table'>Image Path {sortBy === 'imagePath' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('imagePath', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('imagePath', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('imagePath', 'asc')} />}</th>
					<th className='text-table'>Status {sortBy === 'isStatus' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('isStatus', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('isStatus', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('isStatus', 'asc')} />}</th>
					<th className='text-table'>Vites Türü {sortBy === 'gearType' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('gearType', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('gearType', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('gearType', 'asc')} />}</th>
					<th className='text-table'>Yakıt Türü {sortBy === 'fuelType' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('fuelType', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('fuelType', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('fuelType', 'asc')} />}</th>
					<th className='text-table'>Model {sortBy === 'modelName' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('modelName', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('modelName', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('modelName', 'asc')} />}</th>
					<th className='text-table'>Renk {sortBy === 'colorName' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('colorName', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('colorName', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('colorName', 'asc')} />}</th>
					<th className='text-table'>Oluşturulma Tarihi {sortBy === 'createdDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('createdDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'asc')} />}</th>
					<th className='text-table'>Yenilenme Tarihi {sortBy === 'updatedDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('updatedDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'asc')} />}</th>
				</tr>
				<tr>
					<th><Form.Control size="sm" type="text" placeholder="Id Ara" onChange={(e) => setSearchId(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="Kilometre Ara" onChange={(e) => setSearchKilometer(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="Yıl Ara" onChange={(e) => setSearchYear(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="Günlük Fiyat Ara" onChange={(e) => setSearchDailyPrice(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="Plaka Ara" onChange={(e) => setSearchPlate(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="ImagePath Ara" onChange={(e) => setSearchImagePath(e.target.value)} /></th>
					<th>
						<Form.Control size="sm" as="select" onChange={(e) => setSearchStatus(e.target.value)}>
							<option value="">Tümü</option>
							<option value="true">Aktif</option>
							<option value="false">Pasif</option>
						</Form.Control>
					</th>
					<th>
						<Form.Control size="sm" as="select" onChange={(e) => setSearchGearType(e.target.value)}>
							<option value="">Tümü</option>
							<option value="MANUEL">Manuel</option>
							<option value="AUTO">Otomatik</option>
						</Form.Control>
					</th>
					<th>
						<Form.Control size="sm" as="select" onChange={(e) => setSearchFuelType(e.target.value)}>
							<option value="">Tümü</option>
							<option value="DIESEL">Dizel</option>
							<option value="ELECTRIC">Elektrikli</option>
							<option value="HYBRID">Hibrit</option>
							<option value="GASOLINE">Benzinli</option>
						</Form.Control>
					</th>
					<th>
						<Form.Control size="sm" as="select" onChange={(e) => setSearchModel(e.target.value)}>
							<option value="">Tümü</option>
							{allModels.map((model: Model) => (
								<option key={model.id} value={model.name}>{model.name}</option>
							))}
						</Form.Control>
					</th>
					<th>
						<Form.Control size="sm" as="select" onChange={(e) => setSearchColor(e.target.value)}>
							<option value="">Tümü</option>
							{allColors.map((color: Color) => (
								<option key={color.id} value={color.name}>{color.name}</option>
							))}
						</Form.Control>
					</th>
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
						<td style={{ cursor: 'pointer' }}>
							{car.imagePath && <img src={car.imagePath} alt="Logo" style={{ width: '100px', height: '100px' }} />}
						</td>
						<td style={{ cursor: 'pointer' }}>{car.status ? 'Aktif' : 'Pasif'}</td>
						<td style={{ cursor: 'pointer' }}>{car.gearType}</td>
						<td style={{ cursor: 'pointer' }}>{car.fuelType}</td>
						<td style={{ cursor: 'pointer' }}>{car.model ? car.model.name : 'Marka Yok' }</td>
						<td style={{ cursor: 'pointer' }}>{car.color ? car.color.name : 'Renk Yok' }</td>
						<td style={{ cursor: 'pointer' }}>{car.createdDate?.toString()}</td>
						<td style={{ cursor: 'pointer' }}>{car.updatedDate?.toString()}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default AdminCarTable;
