import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid } from "react-icons/lia";
import { Model } from '../../../../models/models/entity/model';
import { Brand } from '../../../../models/brands/entity/brand';

interface ModelTableProps {
	filteredModels: Model[];
	allBrands: Brand[];
	sortBy: string;
	sortDirection: 'asc' | 'desc';
	handleSort: (key: 'id' | 'name' | 'brandName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => void;
	handleModelSelectAndUpdateForm: (id: number) => void;
	setSearchId: React.Dispatch<React.SetStateAction<string>>;
	setSearchName: React.Dispatch<React.SetStateAction<string>>;
	setSearchBrand: React.Dispatch<React.SetStateAction<string>>;
	setSearchCreatedDate: React.Dispatch<React.SetStateAction<string>>;
	setSearchUpdatedDate: React.Dispatch<React.SetStateAction<string>>;
	currentPage: number;
	itemsPerPage: number;
}

const ModelTable: React.FC<ModelTableProps> = ({
	filteredModels,
	allBrands,
	sortBy,
	sortDirection,
	handleSort,
	handleModelSelectAndUpdateForm,
	setSearchId,
	setSearchName,
	setSearchBrand,
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
					<th className='text-table'>Model İsmi {sortBy === 'name' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('name', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('name', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('name', 'asc')} />}</th>
					<th className='text-table'>Marka İsmi{sortBy === 'brandName' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('brandName', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('brandName', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('brandName', 'asc')} />}</th>
					<th className='text-table'>Oluşturulma Tarihi {sortBy === 'createdDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('createdDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'asc')} />}</th>
					<th className='text-table'>Yenilenme Tarihi {sortBy === 'updatedDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('updatedDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'asc')} />}</th>
				</tr>
				<tr>
					<th><Form.Control size="sm" type="text" placeholder="Id Ara" onChange={(e) => setSearchId(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="Model Ara" onChange={(e) => setSearchName(e.target.value)} /></th>
					<th>
						<Form.Control size="sm" as="select" onChange={(e) => setSearchBrand(e.target.value)}>
							<option value="">Tümü</option>
							{allBrands.map((brand: Brand) => (
								<option key={brand.id} value={brand.name}>{brand.name}</option>
							))}
						</Form.Control>
					</th>
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
	);
};

export default ModelTable;
