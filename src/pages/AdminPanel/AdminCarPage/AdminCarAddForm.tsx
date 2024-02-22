import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, addCar } from '../../../store/car/carSlice';
import { Model } from '../../../models/models/entity/model';
import { Color } from '../../../models/colors/entity/color';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { getAll as getAllModels } from '../../../store/model/modelSlice';
import { getAll as getAllColors } from '../../../store/color/colorSlice';
import { Button, Alert } from 'react-bootstrap';
import BooleanSelect from './BooleanSelect';

const AdminCarAddForm = () => {
	const [models, setModels] = useState<Model[]>([]);
	const [colors, setColor] = useState<Color[]>([]);

	const dispatch = useAppDispatch();

	const allModels = useSelector((state: RootState) => state.model.allData);
	const allColors = useSelector((state: RootState) => state.color.allData);

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const FuelTypeOptions = ["DIESEL", "ELECTRIC", "HYBRID", "GASOLINE"];
	const GearTypeOptions = ["MANUEL", "AUTO"];


	useEffect(() => {
		dispatch(getAllModels());
		dispatch(getAllColors());
		dispatch(getAll());
	}, [dispatch]);

	useEffect(() => {
		if (allModels.length > 0) {
			setModels(allModels);
		}
		if (allColors.length > 0) {
			setColor(allColors);
		}
	}, [allModels, allColors]);

	const initialValues = {
		kilometer: '',
		year: '',
		dailyPrice: '',
		plate: '',
		imagePath: '',
		status: false,
		gearType: '',
		fuelType: '',
		modelId: '',
		colorId: '',
	};

	const validationSchema = Yup.object({
		kilometer: Yup.string()
			.required('Kilometre alanı zorunludur.'),
		year: Yup.date()
			.required('Yıl alanı zorunludur.'),
		dailyPrice: Yup.string()
			.required('Günlük Fiyat alanı zorunludur.'),
		plate: Yup.string()
			.required('Plaka alanı zorunludur.'),
		imagePath: Yup.string()
			.required('ImagePath  alanı zorunludur.'),
		status: Yup.boolean()
			.required('Status alanı zorunludur.'),
		gearType: Yup.string()
			.required('Gear Type alanı zorunludur.'),
		fuelType: Yup.string()
			.required('Fuel Type alanı zorunludur.'),
		modelId: Yup.string()
			.required('Model seçmek zorunludur.'),
		colorId: Yup.string()
			.required('Renk seçmek zorunludur.'),
	});

	const handleSubmit = async (values: any, { resetForm }: any) => {
		try {
			await dispatch(addCar(values));
			setIsSuccess(true);
			setTimeout(() => {
				setIsSuccess(false);
			}, 1000);
			resetForm();
		} catch (error: any) {
			console.error('Araba Eklerken Sorun çıktı :', error);
		}
	};

	return (
		<div>
			<h2>Araba Ekle</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ errors, touched , values, setFieldValue }) => (
					<Form>
						<div>
							<label htmlFor="kilometer" className="form-title">Kilometre</label>
							<Field
								type="text"
								name="kilometer"
								className={`form-control ${errors.kilometer && touched.kilometer ? 'is-invalid' : ''}`}
								placeholder="Kilometre Giriniz"
							/>
							<ErrorMessage name="number" component="div" />
						</div>
						<div>
							<label htmlFor="year" className="form-title">Yıl</label>
							<Field
								type="number"
								name="year"
								className={`form-control ${errors.year && touched.year ? 'is-invalid' : ''}`}
								placeholder="Yıl Seçiniz"
							/>
							<ErrorMessage name="year" component="div" />
						</div>
						<div>
							<label htmlFor="dailyPrice" className="form-title">Günlük Fiyat</label>
							<Field
								type="text"
								name="dailyPrice"
								className={`form-control ${errors.dailyPrice && touched.dailyPrice ? 'is-invalid' : ''}`}
								placeholder="Günlük Fiyat Giriniz"
							/>
							<ErrorMessage name="number" component="div" />
						</div>
						<div>
							<label htmlFor="plate" className="form-title">Plaka</label>
							<Field
								type="text"
								name="plate"
								className={`form-control ${errors.plate && touched.plate ? 'is-invalid' : ''}`}
								placeholder="Plaka Giriniz"
							/>
							<ErrorMessage name="plate" component="div" />
						</div>
						<div>
							<label htmlFor="imagePath" className="form-title">imagePath</label>
							<Field
								type="text"
								name="imagePath"
								className={`form-control ${errors.imagePath && touched.imagePath ? 'is-invalid' : ''}`}
								placeholder="imagePath Giriniz"
							/>
							<ErrorMessage name="name" component="div" />
						</div>
						 <div>
              <label htmlFor="status" className="form-title">Status</label>
              <BooleanSelect
                value={values.status}
                onChange={(value) => setFieldValue('status', value)}
              />
              <ErrorMessage name="status" component="div" />
            </div>
						<div>
							<label htmlFor="gearType" className="form-title">Gear Type</label>
							<Field
								as="select"
								id="gearType"
								name="gearType"
								className={`form-select ${errors.gearType && touched.gearType ? 'is-invalid' : ''}`}
							>
								<option value="">Select gear type</option> // Boş bir seçenek
								{GearTypeOptions.map((option, index) => (
									<option key={index} value={option}>{option}</option>
								))}
							</Field>
							<ErrorMessage name="gearType" component="div" />
						</div>
						<div>
							<label htmlFor="fuelType" className="form-title">Fuel Type</label>
							<Field
								as="select"
								id="fuelType"
								name="fuelType"
								className={`form-select ${errors.fuelType && touched.fuelType ? 'is-invalid' : ''}`}
							>
								<option value="">Select fuel type</option> // Boş bir seçenek
								{FuelTypeOptions.map((option, index) => (
									<option key={index} value={option}>{option}</option>
								))}
							</Field>
							<ErrorMessage name="fuelType" component="div" />
						</div>
						<div>
							<label htmlFor="modelId">Modeller</label>
							<Field as="select" name="modelId">
								<option value="">Model Seçiniz</option>
								{models.map(model => (
									<option key={model.id} value={model.id}>{model.name}</option>
								))}
							</Field>
							<ErrorMessage name="modelId" component="div" />
						</div>
						<div>
							<label htmlFor="colorId">Renkler</label>
							<Field as="select" name="colorId">
								<option value="">Renk Seçiniz</option>
								{colors.map(color => (
									<option key={color.id} value={color.id}>{color.name}</option>
								))}
							</Field>
							<ErrorMessage name="colorId" component="div" />
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

export default AdminCarAddForm;
