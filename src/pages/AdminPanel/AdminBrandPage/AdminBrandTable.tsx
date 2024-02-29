import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid } from "react-icons/lia";
import { Brand } from '../../../models/brands/entity/brand';

interface AdminBrandTableProps {
	filteredBrands: Brand[];
	sortBy: string;
	sortDirection: 'asc' | 'desc';
	handleSort: (key: 'id' | 'name' | 'logoPath' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => void;
	handleBrandSelectAndUpdateForm: (id: number) => void;
	setSearchId: React.Dispatch<React.SetStateAction<string>>;
	setSearchName: React.Dispatch<React.SetStateAction<string>>;
	setSearchLogoPath: React.Dispatch<React.SetStateAction<string>>;
	setSearchCreatedDate: React.Dispatch<React.SetStateAction<string>>;
	setSearchUpdatedDate: React.Dispatch<React.SetStateAction<string>>;
	currentPage: number;
	itemsPerPage: number;
}

const AdminBrandTable: React.FC<AdminBrandTableProps> = ({
	filteredBrands,
	sortBy,
	sortDirection,
	handleSort,
	handleBrandSelectAndUpdateForm,
	setSearchId,
	setSearchName,
	setSearchLogoPath,
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
					<th className='text-table'>İsim {sortBy === 'name' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('name', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('name', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('name', 'asc')} />}</th>
					<th className='text-table'>Logo Path</th>
					<th className='text-table'>Oluşturulma Tarihi {sortBy === 'createdDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('createdDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'asc')} />}</th>
					<th className='text-table'>Yenilenme Tarihi {sortBy === 'updatedDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('updatedDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'asc')} />}</th>
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
				{filteredBrands.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((brand, index) => (
					<tr key={brand.id} onClick={() => handleBrandSelectAndUpdateForm(brand.id)}>
						<td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
						<td style={{ cursor: 'pointer' }}>{brand.id}</td>
						<td style={{ cursor: 'pointer' }}>{brand.name}</td>
						<td style={{ cursor: 'pointer' }}>
							{brand.logoPath && <img src={brand.logoPath} alt="Logo" style={{ width: '100px', height: '100px' }} />}
						</td>
						<td style={{ cursor: 'pointer' }}>{brand.createdDate?.toString()}</td>
						<td style={{ cursor: 'pointer' }}>{brand.updatedDate?.toString()}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default AdminBrandTable;
