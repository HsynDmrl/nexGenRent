import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid } from "react-icons/lia";
import { Employee } from '../../../../models/employees/entity/employee';
import { User } from '../../../../models/users/entity/user';

interface EmployeeTableProps {
	filteredEmployees: Employee[];
	sortBy: string;
	sortDirection: 'asc' | 'desc';
	handleSort: (key: 'id' | 'salary' | 'userName' | 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => void;
	handleEmployeeSelectAndUpdateForm: (id: number) => void;
	setSearchId: React.Dispatch<React.SetStateAction<string>>;
	setSearchSalary: React.Dispatch<React.SetStateAction<string>>;
    setSearchUserName: React.Dispatch<React.SetStateAction<string>>;
	setSearchCreatedDate: React.Dispatch<React.SetStateAction<string>>;
	setSearchUpdatedDate: React.Dispatch<React.SetStateAction<string>>;
	currentPage: number;
	itemsPerPage: number;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
	filteredEmployees,
	sortBy,
	sortDirection,
	handleSort,
	handleEmployeeSelectAndUpdateForm,
	setSearchId,
    setSearchSalary,
    setSearchUserName,
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
					<th className='text-table'>Maaş {sortBy === 'salary' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('salary', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('salary', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('salary', 'asc')} />}</th>
                    <th className='text-table'>Kullanıcı İsmi{sortBy === 'userName' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('userName', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('userName', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('userName', 'asc')} />}</th>
					<th className='text-table'>Oluşturulma Tarihi {sortBy === 'createdDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('createdDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'asc')} />}</th>
					<th className='text-table'>Yenilenme Tarihi {sortBy === 'updatedDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('updatedDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'asc')} />}</th>
				</tr>
				<tr>
						<th><Form.Control size="sm" type="text" placeholder="Id Ara" onChange={(e) => setSearchId(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Maaş Ara" onChange={(e) => setSearchSalary(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Kullanıcı Ara" onChange={(e) => setSearchUserName(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Oluşturulma Tarihi Ara" onChange={(e) => setSearchCreatedDate(e.target.value)} /></th>
						<th><Form.Control size="sm" type="text" placeholder="Yenilenme Tarihi Ara" onChange={(e) => setSearchUpdatedDate(e.target.value)} /></th>
					</tr>
				</thead>
				<tbody>
					{filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((employee, index) => (
						<tr key={employee.id} onClick={() => handleEmployeeSelectAndUpdateForm(employee.id)}>
							<td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
							<td style={{ cursor: 'pointer' }}>{employee.id}</td>
							<td style={{ cursor: 'pointer' }}>{employee.salary}</td>
							<td style={{ cursor: 'pointer' }}>{employee.user && employee.user?.name}</td>
							<td style={{ cursor: 'pointer' }}>{employee.createdDate?.toString()}</td>
							<td style={{ cursor: 'pointer' }}>{employee.updatedDate?.toString()}</td>
						</tr>
					))}
				</tbody>
		</Table>
	);
};

export default EmployeeTable;
