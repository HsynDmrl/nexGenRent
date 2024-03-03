import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateInvoiceRequest } from '../../../../models/invoices/requests/updateInvoiceRequest';
import { ObjectSchema } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/configStore/configureStore';
import { updateInvoice } from '../../../../store/invoice/invoiceSlice';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { Rental } from '../../../../models/rentals/entity/rental';
import { getAll as getAllRentals } from '../../../../store/rental/rentalSlice';

const InvoiceUpdateForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const selectedInvoiceId = useSelector((state: RootState) => state.invoice.selectedId);
	const allData = useSelector((state: RootState) => state.invoice.allData);
	const [rentals, setRentals] = useState<Rental[]>([]);
	const allRentals = useSelector((state: RootState) => state.rental.allData);
	const invoiceData = allData.find(invoice => invoice.id === selectedInvoiceId) || null;

	useEffect(() => {
		dispatch(getAllRentals());
	}, [dispatch]);

	useEffect(() => {
		if (allRentals.length > 0) {
			setRentals(allRentals);
		}
	}, [allRentals]);

	const initialValues: UpdateInvoiceRequest = {
		id: selectedInvoiceId ?? 0,
		invoiceNo: invoiceData?.invoiceNo ?? '',
		totalPrice: invoiceData?.totalPrice ?? 0,
		discountRate: invoiceData?.discountRate ?? 0,
		taxRate: invoiceData?.taxRate ?? 0,
		rentalId: invoiceData?.rental?.id ?? 0,
	};

	const validationSchema: ObjectSchema<UpdateInvoiceRequest> = Yup.object().shape({
		id: Yup.number().required(),
		invoiceNo: Yup.string()
			.required('Fatura No zorunludur.')
			.min(2, 'Fatura No en az 2 karakter olmalıdır.')
			.max(50, 'Fatura No en fazla 50 karakter olmalıdır.'),
		totalPrice: Yup.number()
			.required('Toplam Fiyat zorunludur.'),
		discountRate: Yup.number()
			.required('İndirim Oranı zorunludur.'),
		taxRate: Yup.number()
			.required('Vergi Oranı zorunludur.'),
		rentalId: Yup.number().required('Rental seçmeniz gerekiyor.'),
	});

	const onSubmit = (values: UpdateInvoiceRequest, { setStatus }: any) => {
		dispatch(updateInvoice(values))
			.then(() => {
				setStatus({ success: true });
			})
			.catch(error => {
				setStatus({ success: false });
			});
	};

	return (
		<Container>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{({ errors, touched, status }) => (
					<Form>
						<div className="mb-3">
							<label htmlFor="invoiceNo" className="form-title">
								Fatura No
							</label>
							<Field
								type="text"
								name="invoiceNo"
								id="invoiceNo"
								className={`form-control ${errors.invoiceNo && touched.invoiceNo ? 'is-invalid' : ''}`}
								placeholder="Invoice No Giriniz"
							/>
							<ErrorMessage name="invoiceNo" component="div" className="text-danger" />
						</div>
						<div className="mb-3">
							<label htmlFor="totalPrice" className="form-title">
								Toplam Fiyat
							</label>
							<Field
								type="number"
								name="totalPrice"
								id="totalPrice"
								className={`form-control ${errors.totalPrice && touched.totalPrice ? 'is-invalid' : ''}`}
								placeholder="Toplam Fiyat Giriniz"
							/>
							<ErrorMessage name="totalPrice" component="div" className="text-danger" />
						</div>
						<div className="mb-3">
							<label htmlFor="discountRate" className="form-title">
								İndirim Oranı
							</label>
							<Field
								type="number"
								name="discountRate"
								id="discountRate"
								className={`form-control ${errors.discountRate && touched.discountRate ? 'is-invalid' : ''}`}
								placeholder="İndirim Oranı Giriniz"
							/>
							<ErrorMessage name="discountRate" component="div" className="text-danger" />
						</div>
						<div className="mb-3">
							<label htmlFor="taxRate" className="form-title">
								Vergi Oranı
							</label>
							<Field
								type="number"
								name="taxRate"
								id="taxRate"
								className={`form-control ${errors.taxRate && touched.taxRate ? 'is-invalid' : ''}`}
								placeholder="Vergi Oranı Giriniz"
							/>
							<ErrorMessage name="taxRate" component="div" className="text-danger" />
						</div>
						<div className="mb-3">
							<label htmlFor="rentalId" className="form-title mb-1">Sipariş No {' '}</label>
							<Field as="select" name="rentalId" className={`form-control ${errors.rentalId && touched.rentalId ? 'is-invalid' : ''}`}>
								<option value="">{' '} Sipariş No Seçiniz</option>
								{rentals.map(rental => (
									<option key={rental.id} value={rental.id}>{rental.id}</option>
								))}
							</Field>
							<ErrorMessage name="rentalId" component="div" className="text-danger" />
						</div>
						<Button className='p-2 mb-2 mx-3 bg-success' variant="primary" type="submit">
							Güncelle
						</Button>
						<Button className='p-2 mb-2 mx-3 bg-warning' variant="primary" type="reset">
							Temizle
						</Button>
						{status && status.success && <Alert variant="success">Fatura başarıyla güncellendi.</Alert>}
						{status && !status.success && <Alert variant="danger">Fatura güncellenirken bir hata oluştu.</Alert>}
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default InvoiceUpdateForm;
