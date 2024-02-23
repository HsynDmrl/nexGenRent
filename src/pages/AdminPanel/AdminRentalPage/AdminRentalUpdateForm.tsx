import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateRentalRequest } from '../../../models/rentals/requests/updateRentalRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { updateRental } from '../../../store/rental/rentalSlice';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { Car } from '../../../models/cars/entity/car';
import { Customer } from '../../../models/customers/entity/customer';
import { Employee } from '../../../models/employees/entity/employee';
import { getAll as getAllCustomers } from '../../../store/customer/customerSlice';
import { getAll as getAllCars } from '../../../store/car/carSlice';
import { getAll as getAllEmployees } from '../../../store/employee/employeeSlice';

const AdminRentalUpdateForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const selectedRentalId = useSelector((state: RootState) => state.rental.selectedId);
	const allData = useSelector((state: RootState) => state.rental.allData);
	const rentalData = allData.find(rental => rental.id === selectedRentalId) || null;
	const [cars, setCars] = useState<Car[]>([]);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [employees, setEmployees] = useState<Employee[]>([]);
	const allCars = useSelector((state: RootState) => state.car.allData);
	const allCustomers = useSelector((state: RootState) => state.customer.allData);
	const allEmployees = useSelector((state: RootState) => state.employee.allData);
	const EMPTY_DATE = new Date(0);

	useEffect(() => {
		dispatch(getAllCars());
		dispatch(getAllCustomers());
		dispatch(getAllEmployees());
	}, [dispatch]);

	useEffect(() => {
		if (allCars.length > 0) {
			setCars(allCars);
		}
		if (allCustomers.length > 0) {
			setCustomers(allCustomers);
		}
		if (allCustomers.length > 0) {
			setEmployees(allEmployees);
		}
	}, [allCars, allCustomers, allEmployees]);

	const initialValues: UpdateRentalRequest = {
		id: selectedRentalId || 0,
		startDate: rentalData ? rentalData.startDate : EMPTY_DATE,
		endDate: rentalData ? rentalData.endDate : EMPTY_DATE,
		returnDate: rentalData ? rentalData.returnDate : EMPTY_DATE,
		startKilometer: rentalData ? rentalData.startKilometer : 0,
		endKilometer: rentalData ? rentalData.endKilometer : 0,
		totalPrice: rentalData ? rentalData.totalPrice : 0,
		discount: rentalData ? rentalData.discount : 0,
		carId: rentalData && rentalData.car ? rentalData.car.id : 0,
		customerId: rentalData && rentalData.customer ? rentalData.customer.id : 0,
		employeeId: rentalData && rentalData.employee ? rentalData.employee.id : 0
	};

	const validationSchema = Yup.object({
		startDate: Yup.date()
			.required('Başlangıç tarihi alanı zorunludur.'),
		endDate: Yup.date()
			.required('Bitiş tarihi alanı zorunludur.'),
		returnDate: Yup.date()
			.required('Dönüş tarihi alanı zorunludur.'),
		startKilometer: Yup.number()
			.min(0, 'Başlangıç kilometre negatif olamaz.')
			.required('Başlangıç kilometre alanı zorunludur.'),
		endKilometer: Yup.number()
			.min(0, 'Bitiş kilometre negatif olamaz.')
			.required('Bitiş kilometre alanı zorunludur.'),
		totalPrice: Yup.number()
			.min(0, 'Toplam fiyat negatif olamaz.')
			.required('Toplam fiyat alanı zorunludur.'),
		discount: Yup.number()
			.min(0, 'İndirim negatif olamaz.')
			.required('İndirim alanı zorunludur.'),
		carId: Yup.number()
			.required('Car seçmek zorunludur.'),
		customerId: Yup.number()
			.required('Customer seçmek zorunludur.'),
		employeeId: Yup.number()
			.required('Employee seçmek zorunludur.')
	});

	const onSubmit = (values: UpdateRentalRequest, { setStatus, setSubmitting, setFieldValue }: FormikHelpers<UpdateRentalRequest>) => {
		dispatch(updateRental(values))
			.then(() => {
				setStatus({ success: true });
				setSubmitting(false);
			})
			.catch(error => {
				setStatus({ success: false, message: error.message });
				setSubmitting(false);
			});
	};

	return (
		<Container>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{({ errors, touched, status }) => (
					<Form>
						<div className="mb-3">
							<label htmlFor="startDate" className="form-title">
								Başlangıç Tarihi
							</label>
							<Field name="startDate">
								{({ field }: FieldProps) => (
									<input
										type="date"
										{...field}
										id='startDate'
										value={field.value || ''}
										className={`form-control ${errors.startDate && touched.startDate ? 'is-invalid' : ''}`}
									/>
								)}
							</Field>
							<ErrorMessage name="startDate" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="endDate" className="form-title">
								Bitiş Tarihi
							</label>
							<Field name="endDate">
								{({ field }: FieldProps) => (
									<input
										type="date"
										{...field}
										id='endDate'
										value={field.value || ''}
										className={`form-control ${errors.endDate && touched.endDate ? 'is-invalid' : ''}`}
									/>
								)}
							</Field>
							<ErrorMessage name="endDate" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="returnDate" className="form-title">
								Dönüş Tarihi
							</label>
							<Field name="returnDate">
								{({ field }: FieldProps) => (
									<input
										type="date"
										{...field}
										id='returnDate'
										value={field.value || ''}
										className={`form-control ${errors.returnDate && touched.returnDate ? 'is-invalid' : ''}`}
									/>
								)}
							</Field>
							<ErrorMessage name="returnDate" component="div" className="invalid-feedback" />
						</div>

						<div className="mb-3">
							<label htmlFor="startKilometer" className="form-title">
								Başlangıç Kilometre
							</label>
							<Field
								type="text"
								name="startKilometer"
								id="startKilometer"
								value={initialValues.startKilometer || 0}
								className={`form-control ${errors.startKilometer && touched.startKilometer ? 'is-invalid' : ''}`}
								placeholder="Başlangıç Kilometre Giriniz"
							/>
							<ErrorMessage name="startKilometer" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="endKilometer" className="form-title">
								Bitiş Kilometre
							</label>
							<Field
								type="text"
								name="endKilometer"
								id="endKilometer"
								value={initialValues.endKilometer || 0}
								className={`form-control ${errors.endKilometer && touched.endKilometer ? 'is-invalid' : ''}`}
								placeholder="Bitiş Kilometre Giriniz"
							/>
							<ErrorMessage name="endKilometer" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="totalPrice" className="form-title">
								Toplam Fiyat
							</label>
							<Field
								type="text"
								name="totalPrice"
								id="totalPrice"
								value={initialValues.totalPrice || 0}
								className={`form-control ${errors.totalPrice && touched.totalPrice ? 'is-invalid' : ''}`}
								placeholder="Toplam Fiyat Giriniz"
							/>
							<ErrorMessage name="totalPrice" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="discount" className="form-title">
								İndirim
							</label>
							<Field
								type="text"
								name="discount"
								id="discount"
								value={initialValues.discount || 0}
								className={`form-control ${errors.discount && touched.discount ? 'is-invalid' : ''}`}
								placeholder="İndirim Giriniz"
							/>
							<ErrorMessage name="discount" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="carId" className="form-title mb-1">Araba</label>
							<Field id="carId" as="select" name="carId" className={`form-control ${errors.carId && touched.carId ? 'is-invalid' : ''}`}>
								<option value="">Araba Seçiniz</option>
								{cars.map(car => (
									<option key={car.id} value={car.id}>{car.plate}</option>
								))}
							</Field>
							<ErrorMessage name="carId" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="customerId" className="form-title mb-1">Müşteri</label>
							<Field id='customerId' as="select" name="customerId" className={`form-control ${errors.customerId && touched.customerId ? 'is-invalid' : ''}`}>
								<option value="">Müşteri Seçiniz</option>
								{customers.map(customer => (
									<option key={customer.id} value={customer.id}>{customer.user.name}</option>
								))}
							</Field>
							<ErrorMessage name="customerId" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="employeeId" className="form-title mb-1">Çalışan</label>
							<Field id='employeeId' as="select" name="employeeId" className={`form-control ${errors.employeeId && touched.employeeId ? 'is-invalid' : ''}`}>
								<option value="">Çalışan Seçiniz</option>
								{employees.map(employee => (
									<option key={employee.id} value={employee.id}>{employee.user.name}</option>
								))}
							</Field>
							<ErrorMessage name="employeeId" component="div" className="invalid-feedback" />
						</div>
						<Button className='p-2 mb-2 mx-3 bg-success' variant="primary" type="submit">
							Güncelle
						</Button>
						<Button className='p-2 mb-2 mx-3 bg-warning' variant="primary" type="reset">
							Temizle
						</Button>
						{status && status.success && <Alert variant="success">Araba başarıyla güncellendi.</Alert>}
						{status && !status.success && <Alert variant="danger">Araba güncellenirken bir hata oluştu.</Alert>}
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default AdminRentalUpdateForm;