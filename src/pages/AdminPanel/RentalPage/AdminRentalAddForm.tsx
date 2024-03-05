import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, addRental } from '../../../store/rental/rentalSlice';
import { Car } from '../../../models/cars/entity/car';
import { Customer } from '../../../models/customers/entity/customer';
import { Employee } from '../../../models/employees/entity/employee';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { getAll as getAllCars } from '../../../store/car/carSlice';
import { getAll as getAllCustomers } from '../../../store/customer/customerSlice';
import { getAll as getAllEmployees } from '../../../store/employee/employeeSlice';
import { Button, Alert } from 'react-bootstrap';
import { useAppSelector } from '../../../store/configStore/useAppSelector';

const AdminRentalAddForm = () => {
	const dispatch = useAppDispatch();
	const [cars, setCars] = useState<Car[]>([]);
	const [customers, setCustomer] = useState<Customer[]>([]);
	const [employees, setEmployee] = useState<Employee[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const allCars = useAppSelector((state: RootState) => state.car.allData);
	const allCustomers = useAppSelector((state: RootState) => state.customer.allData);
	const allEmployees = useAppSelector((state: RootState) => state.employee.allData);

	useEffect(() => {
		dispatch(getAllCars());
		dispatch(getAllCustomers());
		dispatch(getAllEmployees());
		dispatch(getAll());
	}, [dispatch]);

	useEffect(() => {
		if (allCars.length > 0 && allCustomers.length > 0 && allEmployees.length > 0) {
			setCars(allCars);
			setCustomer(allCustomers);
			setEmployee(allEmployees);
		}
	}, [allCars, allCustomers, allEmployees]);

	const initialValues = {
		startDate: '',
		endDate: '',
		returnDate: '',
		startKilometer: '',
		endKilometer: '',
		totalPrice: '',
		discount: '',
		carId: '',
		customerId: '',
		employeeId: '',
	};

	const validationSchema = Yup.object({
		startDate: Yup.date()
			.required('Başlangıç tarihi zorunludur.'),
		endDate: Yup.date()
			.required('Bitiş tarihi zorunludur.'),
		returnDate: Yup.date()
			.required('Dönüş tarihi zorunludur.'),
		startKilometer: Yup.number()
			.min(0, 'Kilometre negatif olamaz.')
			.required('Kilometre alanı zorunludur.'),
		endKilometer: Yup.number()
			.min(0, 'Kilometre negatif olamaz.')
			.required('Kilometre alanı zorunludur.'),
		totalPrice: Yup.number()
			.min(0, 'Toplam fiyat negatif olamaz.'),
		discount: Yup.number()
			.min(0, 'İndirim negatif olamaz.'),
		carId: Yup.string()
			.required('Araba seçmek zorunludur.'),
		customerId: Yup.string()
			.required('Müşteri seçmek zorunludur.'),
		employeeId: Yup.string()
			.required('Çalışan seçmek zorunludur.'),
	});

	const handleSubmit = async (values: any, { resetForm }: any) => {
		try {
			await dispatch(addRental(values));
			setIsSuccess(true);
			setTimeout(() => {
				setIsSuccess(false);
			}, 1000);
			resetForm();
		} catch (error: any) {
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
							<label htmlFor="startDate" className="form-title mb-2">Başlangıç Tarihi</label>
							<Field
								id="startDate"
								name="startDate"
								type="date"
								className={`form-control ${errors.startDate && touched.startDate ? 'is-invalid' : ''}`}
							/>
							<ErrorMessage name="startDate" component="div" />
						</div>
						<div>
							<label htmlFor="endDate" className="form-title mb-2">Bitiş Tarihi</label>
							<Field
								id="endDate"
								name="endDate"
								type="date"
								className={`form-control ${errors.endDate && touched.endDate ? 'is-invalid' : ''}`}
							/>
							<ErrorMessage name="endDate" component="div" />
						</div>
						<div>
							<label htmlFor="returnDate" className="form-title mb-2">Dönüş Tarihi</label>
							<Field
								id="returnDate"
								name="returnDate"
								type="date"
								className={`form-control ${errors.returnDate && touched.returnDate ? 'is-invalid' : ''}`}
							/>
							<ErrorMessage name="returnDate" component="div" />
						</div>
						<div>
							<label htmlFor="startKilometer" className="form-title mb-2">Başlangıç Kilometre</label>
							<Field
								id="startKilometer"
								name="startKilometer"
								type="text"
								className={`form-control ${errors.startKilometer && touched.startKilometer ? 'is-invalid' : ''}`}
								placeholder="Başlangıç Kilometre Giriniz"
							/>
							<ErrorMessage name="startKilometer" component="div" />
						</div>
						<div>
							<label htmlFor="endKilometer" className="form-title mb-2">Bitiş Kilometre</label>
							<Field
								id="endKilometer"
								name="endKilometer"
								type="text"
								className={`form-control ${errors.endKilometer && touched.endKilometer ? 'is-invalid' : ''}`}
								placeholder="Bitiş Kilometre Giriniz"
							/>
							<ErrorMessage name="endKilometer" component="div" />
						</div>
						<div>
							<label htmlFor="totalPrice" className="form-title mb-2">Toplam Fiyat</label>
							<Field
								id="totalPrice"
								name="totalPrice"
								type="text"
								className={`form-control ${errors.totalPrice && touched.totalPrice ? 'is-invalid' : ''}`}
								placeholder="Toplam Fiyat Giriniz"
							/>
							<ErrorMessage name="totalPrice" component="div" />
						</div>
						<div>
							<label htmlFor="discount" className="form-title mb-2">İndirim</label>
							<Field
								id="discount"
								name="discount"
								type="text"
								className={`form-control ${errors.discount && touched.discount ? 'is-invalid' : ''}`}
								placeholder="İndirim Giriniz"
							/>
							<ErrorMessage name="discount" component="div" />
						</div>
						<div>
							<label htmlFor="carId">Carler</label>
							<Field id="carId" as="select" name="carId" className="form-select mb-2">
								<option value="">Araba Seçiniz</option>
								{allCars.map(car => (
									<option key={car.id} value={car.id}>{car.plate}</option>
								))}
							</Field>
							<ErrorMessage name="carId" component="div" />
						</div>
						<div>
							<label htmlFor="customerId">Müşteriler</label>
							<Field id="customerId" as="select" name="customerId" className="form-select mb-2">
								<option value="">Müşteri Seçiniz</option>
								{allCustomers.map(customer => (
									<option key={customer.id} value={customer.id}>{customer.user.name}</option>
								))}
							</Field>
							<ErrorMessage name="customerId" component="div" />
						</div>
						<div>
							<label htmlFor="employeeId">Çalışanlar</label>
							<Field id="employeeId" as="select" name="employeeId" className="form-select mb-2">
								<option value="">Çalışan Seçiniz</option>
								{allEmployees.map(employee => (
									<option key={employee.id} value={employee.id}>{employee.user.name}</option>
								))}
							</Field>
							<ErrorMessage name="employeeId" component="div" />
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

export default AdminRentalAddForm;
