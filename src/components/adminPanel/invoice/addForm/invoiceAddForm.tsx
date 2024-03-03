import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/configStore/configureStore';
import { getAll, addInvoice } from '../../../../store/invoice/invoiceSlice';
import { Rental } from '../../../../models/rentals/entity/rental';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { getAll as getAllRentals } from '../../../../store/rental/rentalSlice';
import { Button, Alert } from 'react-bootstrap';

const InvoiceAddForm = () => {
	const [rentals, setRentals] = useState<Rental[]>([]);
	const dispatch = useAppDispatch();
	const allRentals = useSelector((state: RootState) => state.rental.allData);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	useEffect(() => {
		dispatch(getAllRentals());
		dispatch(getAll());
	}, [dispatch]);

	useEffect(() => {
		if (allRentals.length > 0) {
			setRentals(allRentals);
		}
	}, [allRentals]);

	const initialValues = {
		invoiceNo: '',
		totalPrice: 0,
		discountRate: 0,
		taxRate: 0,
		rentalId: '',
	};

	const validationSchema = Yup.object({
		invoiceNo: Yup.string()
			.required('Fatura No zorunludur'),
		totalPrice: Yup.number()
			.required('Toplam Fiyat zorunludur'),
		discountRate: Yup.number()
			.required('İndirim Oranı zorunludur'),
		taxRate: Yup.number()
			.required('Vergi Oranı zorunludur'),
		rentalId: Yup.string()
			.required('Sipariş No zorunludur'),
	});

	const handleSubmit = async (values: any, { resetForm }: any) => {
		try {
			await dispatch(addInvoice(values));
			setIsSuccess(true);
			setTimeout(() => {
				setIsSuccess(false);
			}, 1000);
			resetForm();
		} catch (error: any) {
			console.error('Fatura Eklenirken hata oluştu:', error);
		}
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ errors, touched }) => (
					<Form>
						<div>
							<label htmlFor="invoiceNo" className="form-title text-dark mb-1">Fatura No</label>
							<Field
								type="text"
								name="invoiceNo"
								id="invoiceNo"
								className={`form-control ${errors.invoiceNo && touched.invoiceNo ? 'is-invalid' : ''}`}
								placeholder="Fatura No Giriniz"
							/>
							<ErrorMessage name="invoiceNo" component="div" className="text-danger  mb-1" />
						</div>
						<div>
							<label htmlFor="totalPrice" className="form-title text-dark mb-1">Toplam Fiyat</label>
							<Field
								type="number"
								name="totalPrice"
								id="totalPrice"
								className={`form-control ${errors.totalPrice && touched.totalPrice ? 'is-invalid' : ''}`}
								placeholder="Toplam Fiyat Giriniz"
							/>
							<ErrorMessage name="totalPrice" component="div" className="text-danger  mb-1" />
						</div>
						<div>
							<label htmlFor="discountRate" className="form-title text-dark mb-1">İndirim Oranı</label>
							<Field
								type="number"
								name="discountRate"
								id="discountRate"
								className={`form-control ${errors.discountRate && touched.discountRate ? 'is-invalid' : ''}`}
								placeholder="İndirim Oranı Giriniz"
							/>
							<ErrorMessage name="discountRate" component="div" className="text-danger  mb-1"  />
						</div>
						<div>
							<label htmlFor="taxRate" className="form-title text-dark">Vergi Oranı</label>
							<Field
								type="number"
								name="taxRate"
								id="taxRate"
								className={`form-control ${errors.taxRate && touched.taxRate ? 'is-invalid' : ''}`}
								placeholder="Vergi Oranı Giriniz"
							/>
							<ErrorMessage name="taxRate" component="div" className="text-danger  mb-1" />
						</div>
						<div>
							<label htmlFor="rentalId" className="text-dark mb-1">Sipariş No</label>
							<Field
								type="text"
								id="rentalId"
								name="rentalId"
								className={`form-control mb-2 ${errors.rentalId && touched.rentalId ? 'is-invalid' : ''}`}
								placeholder="Sipariş No Giriniz"
							/>
							<ErrorMessage name="rentalId" component="div" className="text-danger  mb-1" />
						</div>
						<Button className='p-2 mb-2 bg-success' variant="primary" type="submit">Kaydet</Button>
						<Button className='p-2 mb-2 mx-4 bg-warning' variant="primary" type="reset">Temizle</Button>
						{isSuccess && <Alert variant="success">Form başarıyla gönderildi!</Alert>}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default InvoiceAddForm;
