import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { LiaSortAmountDownAltSolid, LiaSortAmountUpSolid } from "react-icons/lia";
import { Invoice } from '../../../../models/invoices/entity/invoice';
import { Rental } from '../../../../models/rentals/entity/rental';

interface InvoiceTableProps {
	filteredInvoices: Invoice[];
	allRentals: Rental[];
	sortBy: string;
	sortDirection: 'asc' | 'desc';
	handleSort: (key: 'id' | 'invoiceNo' | 'totalPrice' | 'discountRate' | 'taxRate' | 'rentalId'| 'createdDate' | 'updatedDate', direction: 'asc' | 'desc') => void;
	handleInvoiceSelectAndUpdateForm: (id: number) => void;
	setSearchId: React.Dispatch<React.SetStateAction<string>>;
    setSearchInvoiceNo: React.Dispatch<React.SetStateAction<string>>;
	setSearchTotalPrice: React.Dispatch<React.SetStateAction<string>>;
	setSearchDiscountRate: React.Dispatch<React.SetStateAction<string>>;
	setSearchTaxRate: React.Dispatch<React.SetStateAction<string>>;
	setSearchRental: React.Dispatch<React.SetStateAction<string>>;
	setSearchCreatedDate: React.Dispatch<React.SetStateAction<string>>;
	setSearchUpdatedDate: React.Dispatch<React.SetStateAction<string>>;
	currentPage: number;
	itemsPerPage: number;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
	filteredInvoices,
	allRentals,
	sortBy,
	sortDirection,
	handleSort,
	handleInvoiceSelectAndUpdateForm,
	setSearchId,
    setSearchInvoiceNo,
	setSearchTotalPrice,
	setSearchDiscountRate,
	setSearchTaxRate,
	setSearchRental,
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
                    <th className='text-table'>Invoice No {sortBy === 'invoiceNo' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('invoiceNo', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('invoiceNo', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('invoiceNo', 'asc')} />}</th>
					<th className='text-table'>Toplam Fiyat {sortBy === 'totalPrice' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('totalPrice', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('totalPrice', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('totalPrice', 'asc')} />}</th>
                    <th className='text-table'>İndirim Oranı {sortBy === 'discountRate' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('discountRate', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('discountRate', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('discountRate', 'asc')} />}</th>
                    <th className='text-table'>Vergi Oranı {sortBy === 'taxRate' ? (sortDirection === 'asc' ? <FaSortNumericDown onClick={() => handleSort('taxRate', 'desc')} /> : <FaSortNumericUp onClick={() => handleSort('taxRate', 'asc')} />) : <FaSortNumericDown onClick={() => handleSort('taxRate', 'asc')} />}</th>
                    <th className='text-table'>Sipariş Id {sortBy === 'rentalId' ? (sortDirection === 'asc' ? <FaSortAlphaDown onClick={() => handleSort('rentalId', 'desc')} /> : <FaSortAlphaUp onClick={() => handleSort('rentalId', 'asc')} />) : <FaSortAlphaDown onClick={() => handleSort('rentalId', 'asc')} />}</th>
					<th className='text-table'>Oluşturulma Tarihi {sortBy === 'createdDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('createdDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('createdDate', 'asc')} />}</th>
					<th className='text-table'>Yenilenme Tarihi {sortBy === 'updatedDate' ? (sortDirection === 'asc' ? <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'desc')} /> : <LiaSortAmountUpSolid onClick={() => handleSort('updatedDate', 'asc')} />) : <LiaSortAmountDownAltSolid onClick={() => handleSort('updatedDate', 'asc')} />}</th>
				</tr>
				<tr>
					<th><Form.Control size="sm" type="text" placeholder="Id Ara" onChange={(e) => setSearchId(e.target.value)} /></th>
                    <th><Form.Control size="sm" type="text" placeholder="Invoice No Ara" onChange={(e) => setSearchInvoiceNo(e.target.value)} /></th>
                    <th><Form.Control size="sm" type="text" placeholder="Toplam Fiyat Ara" onChange={(e) => setSearchTotalPrice(e.target.value)} /></th>
                    <th><Form.Control size="sm" type="text" placeholder="İndirim Oranı Ara" onChange={(e) => setSearchDiscountRate(e.target.value)} /></th>
                    <th><Form.Control size="sm" type="text" placeholder="Vergi Oranı Ara" onChange={(e) => setSearchTaxRate(e.target.value)} /></th>
					<th>
						<Form.Control size="sm" as="select" onChange={(e) => setSearchRental(e.target.value)}>
							<option value="">Tümü</option>
							{allRentals.map((rental: Rental) => (
								<option key={rental.id} value={rental.id}>{rental.id}</option>
							))}
						</Form.Control>
					</th>
					<th><Form.Control size="sm" type="text" placeholder="Oluşturulma Tarihi Ara" onChange={(e) => setSearchCreatedDate(e.target.value)} /></th>
					<th><Form.Control size="sm" type="text" placeholder="Yenilenme Tarihi Ara" onChange={(e) => setSearchUpdatedDate(e.target.value)} /></th>
				</tr>
			</thead>
			<tbody>
				{filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((invoice, index) => (
					<tr key={invoice.id} onClick={() => handleInvoiceSelectAndUpdateForm(invoice.id)}>
						<td style={{ cursor: 'pointer' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
						<td style={{ cursor: 'pointer' }}>{invoice.id}</td>
                        <td style={{ cursor: 'pointer' }}>{invoice.invoiceNo}</td>
                        <td style={{ cursor: 'pointer' }}>{invoice.totalPrice}</td>
                        <td style={{ cursor: 'pointer' }}>{invoice.discountRate}</td>
                        <td style={{ cursor: 'pointer' }}>{invoice.taxRate}</td>
                        <td style={{ cursor: 'pointer' }}>{invoice.rental?.id?.toString()}</td>
                        <td style={{ cursor: 'pointer' }}>{invoice.createdDate?.toString()}</td>
						<td style={{ cursor: 'pointer' }}>{invoice.updatedDate?.toString()}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default InvoiceTable;
