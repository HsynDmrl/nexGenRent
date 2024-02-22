import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateCarRequest } from '../../../models/cars/requests/updateCarRequest';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { updateCar } from '../../../store/car/carSlice';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { Model } from '../../../models/models/entity/model';
import { Color } from '../../../models/colors/entity/color';
import { getAll as getAllColors } from '../../../store/color/colorSlice';
import { getAll as getAllModels } from '../../../store/model/modelSlice';
import BooleanSelect from './BooleanSelect';

const AdminCarUpdateForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const selectedCarId = useSelector((state: RootState) => state.car.selectedId);
	const allData = useSelector((state: RootState) => state.car.allData);
	const carData = allData.find(car => car.id === selectedCarId) || null;
	const [models, setModels] = useState<Model[]>([]);
	const [colors, setColors] = useState<Color[]>([]);
	const allModels = useSelector((state: RootState) => state.model.allData);
	const allColors = useSelector((state: RootState) => state.color.allData);

	useEffect(() => {
		dispatch(getAllModels());
		dispatch(getAllColors());
	}, [dispatch]);

	useEffect(() => {
		if (allModels.length > 0) {
			setModels(allModels);
		}
		if (allColors.length > 0) {
			setColors(allColors);
		}
	}, [allModels, allColors]);

	const initialValues: UpdateCarRequest = {
		id: selectedCarId || 0,
		kilometer: carData?.kilometer || 0,
		year: carData?.year || 0,
		dailyPrice: carData?.dailyPrice || 0,
		plate: carData?.plate || '',
		imagePath: carData?.imagePath || '',
		status: carData?.status || false,
		gearType: carData?.gearType || '',
		fuelType: carData?.fuelType || '',
		modelId: carData?.model.id || 0,
		colorId: carData?.color.id || 0
	};

	const validationSchema: Yup.ObjectSchema<UpdateCarRequest> = Yup.object().shape({
		id: Yup.number().required(),
		kilometer: Yup.number().required('Kilometre alanı zorunludur.'),
		year: Yup.number().required('Yıl alanı zorunludur.'),
		dailyPrice: Yup.number().required('Günlük Fiyat alanı zorunludur.'),
		plate: Yup.string().required('Plaka alanı zorunludur'),
		imagePath: Yup.string().required('Resim alanı zorunludur'),
		status: Yup.boolean().required('Durum alanı zorunludur'),
		gearType: Yup.string().required('Vites türü alanı zorunludur'),
		fuelType: Yup.string().required('Yakıt türü alanı zorunludur'),
		modelId: Yup.number().required('Model alanı zorunludur'),
		colorId: Yup.number().required('Renk alanı zorunludur')
	});

	const onSubmit = (values: UpdateCarRequest, { setStatus }: any) => {
		dispatch(updateCar(values))
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
				{({ errors, touched, status, values, setFieldValue }) => (
					<Form>
						<div className="mb-3">
							<label htmlFor="kilometer" className="form-title">
								Kilometre
							</label>
							<Field
								type="text"
								name="kilometer"
								className={`form-control ${errors.kilometer && touched.kilometer ? 'is-invalid' : ''}`}
								placeholder="Kilometre Giriniz"
							/>
							<ErrorMessage name="kilometer" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="year" className="form-title">
								Yıl
							</label>
							<Field
								type="text"
								name="year"
								className={`form-control ${errors.year && touched.year ? 'is-invalid' : ''}`}
								placeholder="Yıl Giriniz"
							/>
							<ErrorMessage name="year" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="dailyPrice" className="form-title">
								Günlük Fiyat
							</label>
							<Field
								type="text"
								name="dailyPrice"
								className={`form-control ${errors.dailyPrice && touched.dailyPrice ? 'is-invalid' : ''}`}
								placeholder="Günlük Fiyat Giriniz"
							/>
							<ErrorMessage name="dailyPrice" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="plate" className="form-title">
								Plaka
							</label>
							<Field
								type="text"
								name="plate"
								className={`form-control ${errors.plate && touched.plate ? 'is-invalid' : ''}`}
								placeholder="Plaka Giriniz"
							/>
							<ErrorMessage name="plate" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="imagePath" className="form-title">
								imagePath
							</label>
							<Field
								type="text"
								name="imagePath"
								className={`form-control ${errors.imagePath && touched.imagePath ? 'is-invalid' : ''}`}
								placeholder="imagePath Giriniz"
							/>
							<ErrorMessage name="imagePath" component="div" className="invalid-feedback" />
						</div>
						<div>
							<label htmlFor="status" className="form-title">Status</label>
							<BooleanSelect
								value={values.status}
								onChange={(value) => setFieldValue('status', value)}
							/>
							<ErrorMessage name="status" component="div" />
						</div>
						<div className="mb-3">
							<label htmlFor="gearType" className="form-title">
								Gear Type
							</label>
							<Field
								type="text"
								name="gearType"
								className={`form-control ${errors.gearType && touched.gearType ? 'is-invalid' : ''}`}
								placeholder="Gear Type Giriniz"
							/>
							<ErrorMessage name="gearType" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="fuelType" className="form-title">
								Fuel Type
							</label>
							<Field
								type="text"
								name="fuelType"
								className={`form-control ${errors.fuelType && touched.fuelType ? 'is-invalid' : ''}`}
								placeholder="Fuel Type Giriniz"
							/>
							<ErrorMessage name="fuelType" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="modelId" className="form-title mb-4">Model</label>
							<Field as="select" name="modelId" className={`form-control ${errors.modelId && touched.modelId ? 'is-invalid' : ''}`}>
								<option value="">Model Seçiniz</option>
								{models.map(model => (
									<option key={model.id} value={model.id}>{model.name}</option>
								))}
							</Field>
							<ErrorMessage name="modelId" component="div" className="invalid-feedback" />
						</div>
						<div className="mb-3">
							<label htmlFor="colorId" className="form-title mb-4">Renk</label>
							<Field as="select" name="colorId" className={`form-control ${errors.colorId && touched.colorId ? 'is-invalid' : ''}`}>
								<option value="">Renk Seçiniz</option>
								{colors.map(color => (
									<option key={color.id} value={color.id}>{color.name}</option>
								))}
							</Field>
							<ErrorMessage name="colorId" component="div" className="invalid-feedback" />
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

export default AdminCarUpdateForm;
