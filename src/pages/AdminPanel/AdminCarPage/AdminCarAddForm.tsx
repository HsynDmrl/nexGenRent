import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, addCar } from '../../../store/car/carSlice';
import { Model } from '../../../models/models/entity/model';
import { Color } from '../../../models/colors/entity/color';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { getAll as getAllModels } from '../../../store/model/modelSlice';
import { getAll as getAllColors } from '../../../store/color/colorSlice';
import { Button, Alert } from 'react-bootstrap';
import BooleanSelect from './BooleanSelect';
import { GearType } from '../../../models/cars/entity/gearType';
import { FuelType } from '../../../models/cars/entity/fuelType';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { CustomInputComponent } from '../../../core/formatPlate/CustomInputComponent';

const AdminCarAddForm = () => {
	const dispatch = useAppDispatch();
	const [models, setModels] = useState<Model[]>([]);
	const [colors, setColor] = useState<Color[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const allModels = useAppSelector((state: RootState) => state.model.allData);
	const allColors = useAppSelector((state: RootState) => state.color.allData);
	const currentYear = new Date().getFullYear();
	const years = Array.from(new Array(20), (val, index) => currentYear - index);

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
		kilometer: Yup.number()
			.min(0, 'Kilometre negatif olamaz.')
			.required('Kilometre alanı zorunludur.'),
		year: Yup.number()
			.min(2005, 'Yıl 2005\'den büyük olmalıdır.')
			.max(new Date().getFullYear(), `Yıl ${new Date().getFullYear()} veya daha küçük olmalıdır.`)
			.required('Yıl alanı zorunludur.'),
		dailyPrice: Yup.number()
			.min(0, 'Günlük fiyat negatif olamaz.')
			.required('Günlük Fiyat alanı zorunludur.'),
		plate: Yup.string()
			.matches(/^[0-9]{2} [A-Z]{1,3} [0-9]{2,4}$/, 'Plaka formatı geçersiz. Örn: 34 ABC 123')
			.required('Plaka alanı zorunludur.'),
		imagePath: Yup.string()
			.required('Resim alanı zorunludur.'),
		status: Yup.boolean()
			.required('Durum alanı zorunludur.'),
		gearType: Yup.mixed<GearType>()
			.oneOf(Object.values(GearType), 'Geçersiz vites türü.')
			.required('Vites türü alanı zorunludur.'),
		fuelType: Yup.mixed<FuelType>()
			.oneOf(Object.values(FuelType), 'Geçersiz yakıt türü.')
			.required('Yakıt türü alanı zorunludur.'),
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
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ errors, touched, values, setFieldValue }) => (
					<Form>
						<div>
  <label htmlFor="kilometer" className="form-title mb-2">Kilometre</label>
  <Field
  id="kilometer"
  name="kilometer"
  type="text"
  className={`form-control ${errors.kilometer && touched.kilometer ? 'is-invalid' : ''}`}
  placeholder="Kilometre Giriniz"
/>
  <ErrorMessage name="kilometer" component="div" />
</div>
						<div>
							<label htmlFor="year" className="form-title mb-2">Yıl</label>
							<Field id="year" as="select" name="year" className={`form-control ${errors.year && touched.year ? 'is-invalid' : ''}`}>
								<option value="">Yıl Seçiniz</option>
								{years.map(year => (
									<option key={year} value={year}>{year}</option>
								))}
							</Field>
							<ErrorMessage name="year" component="div" className="invalid-feedback" />
						</div>
						<div>
							<label htmlFor="dailyPrice" className="form-title mb-2">Günlük Fiyat</label>
							<Field
								id="dailyPrice"
								type="text"
								name="dailyPrice"
								className={`form-control ${errors.dailyPrice && touched.dailyPrice ? 'is-invalid' : ''}`}
								placeholder="Günlük Fiyat Giriniz"
							/>
							<ErrorMessage name="number" component="div" />
						</div>
						<div>
							<label htmlFor="plate" className="form-title mb-2">Plaka</label>
							<Field id="plate" name="plate" component={CustomInputComponent} className={`form-control ${errors.plate && touched.plate ? 'is-invalid' : ''}`} placeholder="Plaka Giriniz" />
							<ErrorMessage name="plate" component="div" className="invalid-feedback" />
						</div>

						<div>
							<label htmlFor="imagePath" className="form-title mb-2">imagePath</label>
							<Field
								id="imagePath" 
								type="text"
								name="imagePath"
								className={`form-control ${errors.imagePath && touched.imagePath ? 'is-invalid' : ''}`}
								placeholder="imagePath Giriniz"
							/>
							<ErrorMessage name="name" component="div" />
						</div>
						<div>
							<label id="status" htmlFor="status" className="form-title mb-2">Durum</label>
							<BooleanSelect
								id="status" 
								name="status"
								className={`form-select ${errors.status && touched.status ? 'is-invalid' : ''}`}
								value={values.status.toString()}
							/>

							<ErrorMessage name="status" component="div" />
						</div>
						<div>
							<label htmlFor="gearType" className="form-title mb-2">Vites Tipi</label>
							<Field as="select" id="gearType" name="gearType" className={`form-select ${errors.gearType && touched.gearType ? 'is-invalid' : ''}`}>
								<option value="">Vites tipi seçiniz</option>
								<option value={GearType.MANUEL}>Manuel</option>
								<option value={GearType.AUTO}>Otomatik</option>
							</Field>
							<ErrorMessage name="gearType" component="div" />
						</div>
						<div>
							<label htmlFor="fuelType" className="form-title mb-2">Yakıt Tipi</label>
							<Field as="select" id="fuelType" name="fuelType" className={`form-select ${errors.fuelType && touched.fuelType ? 'is-invalid' : ''}`}>
								<option value="">Yakıt tipi seçiniz</option>
								<option value={FuelType.DIESEL}>Dizel</option>
								<option value={FuelType.ELECTRIC}>Elektrikli</option>
								<option value={FuelType.HYBRID}>Hibrit</option>	
								<option value={FuelType.GASOLINE}>Benzinli</option>
							</Field>
							<ErrorMessage name="fuelType" component="div" />
						</div>
						<div>
							<label htmlFor="modelId">Modeller</label>
							<Field id="modelId" as="select" name="modelId" className="form-select mb-2">
								<option value="">Model Seçiniz</option>
								{models.map(model => (
									<option key={model.id} value={model.id}>{model.name}</option>
								))}
							</Field>
							<ErrorMessage name="modelId" component="div" />
						</div>
						<div>
							<label htmlFor="colorId">Renkler</label>
							<Field id="colorId" as="select" name="colorId" className="form-select mb-2">
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
