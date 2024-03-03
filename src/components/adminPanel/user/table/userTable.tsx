import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid } from "react-icons/lia";
import { User } from '../../../../models/users/entity/user';
import { Role } from '../../../../models/roles/entity/role';

interface UserTableProps {
	filteredUsers: User[];
	allRoles: Role[];
	sortBy: string;
	sortDirection: 'asc' | 'desc';
	handleSort: (key: 'id' | 'email' | 'gsm' | 'name' | 'nationalityId' | 'surname' | 'roleName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => void;
	handleUserSelectAndUpdateForm: (id: number) => void;
	setSearchId: React.Dispatch<React.SetStateAction<string>>;
    setSearchEmail: React.Dispatch<React.SetStateAction<string>>;
    setSearchGsm: React.Dispatch<React.SetStateAction<string>>;
	setSearchName: React.Dispatch<React.SetStateAction<string>>;
    setSearchNationalityId: React.Dispatch<React.SetStateAction<string>>;
    setSearchSurname: React.Dispatch<React.SetStateAction<string>>;
	setSearchRole: React.Dispatch<React.SetStateAction<string>>;
	setSearchCreatedDate: React.Dispatch<React.SetStateAction<string>>;
	setSearchUpdatedDate: React.Dispatch<React.SetStateAction<string>>;
	currentPage: number;
	itemsPerPage: number;
}

const UserTable: React.FC<UserTableProps> = ({
	filteredUsers,
	allRoles,
	sortBy,
	sortDirection,
	handleSort,
	handleUserSelectAndUpdateForm,
	setSearchId,
    setSearchEmail,
    setSearchGsm,
	setSearchName,
    setSearchNationalityId,
    setSearchSurname,
	setSearchRole,
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
                    <th className='text-table'>Adı {sortBy === 'name' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('name', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('name', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('name', 'asc')} />}</th>
                    <th className='text-table'>Soyadı {sortBy === 'surname' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('surname', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('surname', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('surname', 'asc')} />}</th>
                    <th className='text-table'>GSM {sortBy === 'gsm' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('gsm', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('gsm', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('gsm', 'asc')} />}</th>
					<th className='text-table'>E-posta {sortBy === 'email' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('email', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('email', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('email', 'asc')} />}</th>
					<th className='text-table'>T.C Kimlik No {sortBy === 'nationalityId' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('nationalityId', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('nationalityId', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('nationalityId', 'asc')} />}</th>
                    <th className='text-table'>Rol İsmi{sortBy === 'roleName' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('roleName', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('roleName', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('roleName', 'asc')} />}</th>
					<th className='text-table'>Oluşturulma Tarihi {sortBy === 'createdDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('createdDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'asc')} />}</th>
					<th className='text-table'>Yenilenme Tarihi {sortBy === 'updatedDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('updatedDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'asc')} />}</th>
				</tr>
				<tr>
					<th><Form.Control size="sm" type="text" placeholder="Id Ara" onChange={(e) => setSearchId(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="Ad Ara" onChange={(e) => setSearchName(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="Soyad Ara" onChange={(e) => setSearchSurname(e.target.value)} /></th>
                    <th><Form.Control size="sm" type="text" placeholder="GSM Ara" onChange={(e) => setSearchGsm(e.target.value)} /></th>
                    <th><Form.Control size="sm" type="text" placeholder="E-posta Ara" onChange={(e) => setSearchEmail(e.target.value)} /></th>
                    <th><Form.Control size="sm" type="text" placeholder="T.C Kimlik No Ara" onChange={(e) => setSearchNationalityId(e.target.value)} /></th>
                    <th>
						<Form.Control size="sm" as="select" onChange={(e) => setSearchRole(e.target.value)}>
							<option value="">Tümü</option>
							{allRoles.map((role: Role) => (
								<option key={role.id} value={role.name}>{role.name}</option>
							))}
						</Form.Control>
					</th>
					<th><Form.Control size="sm" type="text" placeholder="Oluşturulma Tarihi Ara" onChange={(e) => setSearchCreatedDate(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="Yenilenme Tarihi Ara" onChange={(e) => setSearchUpdatedDate(e.target.value)} /></th>
				</tr>
			</thead>
			<tbody>
				{filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((user, index) => (
					<tr key={user.id} onClick={() => handleUserSelectAndUpdateForm(user.id)}>
						<td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
						<td style={{ cursor: 'pointer' }}>{user.id}</td>
						<td style={{ cursor: 'pointer' }}>{user.name}</td>
                        <td style={{ cursor: 'pointer' }}>{user.surname}</td>
                        <td style={{ cursor: 'pointer' }}>{user.gsm}</td>
                        <td style={{ cursor: 'pointer' }}>{user.email}</td>
                        <td style={{ cursor: 'pointer' }}>{user.nationalityId}</td>
						<td style={{ cursor: 'pointer' }}>{user.role ? user.role.name : 'Marka Yok'}</td>
						<td style={{ cursor: 'pointer' }}>{user.createdDate?.toString()}</td>
						<td style={{ cursor: 'pointer' }}>{user.updatedDate?.toString()}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default UserTable;
