import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, addCar } from '../../../store/car/carSlice';
import { Model } from '../../../models/models/entity/model';
import { Color } from '../../../models/colors/entity/color';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { getAll as getAllModels } from '../../../store/model/modelSlice';
import { getAll as getAllColors } from '../../../store/color/colorSlice';
import { Button, Alert } from 'react-bootstrap';
import { GearType } from '../../../models/cars/entity/gearType';
import { FuelType } from '../../../models/cars/entity/fuelType';
import { useAppSelector } from '../../../store/configStore/useAppSelector';
import { CustomInputComponent } from '../../../core/formatPlate/CustomInputComponent';
import { MdCancel } from "react-icons/md";
import carService from '../../../services/carService';
import BooleanSelect from './BooleanSelect';

const AdminCarAddForm = () => {
	const dispatch = useAppDispatch();
	const [models, setModels] = useState<Model[]>([]);
	const [colors, setColor] = useState<Color[]>([]);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const allModels = useAppSelector((state: RootState) => state.model.allData);
	const allColors = useAppSelector((state: RootState) => state.color.allData);
	const currentYear = new Date().getFullYear();
	const years = Array.from(new Array(20), (val, index) => currentYear - index);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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

	useEffect(() => {
		const newFileUrls = selectedFiles.map(file => URL.createObjectURL(file));
		setPreviewUrls(newFileUrls);
		return () => newFileUrls.forEach(url => URL.revokeObjectURL(url));
	}, [selectedFiles]);

	interface MyFormValues {
		kilometer: number;
		year: number;
		dailyPrice: number;
		plate: string;
		imagePath: string;
		gearType: string;
		fuelType: string;
		modelId: number;
		colorId: number;
		isStatus: boolean;
	}

	const initialValues: MyFormValues = {
		kilometer: 0,
		year: 0,
		dailyPrice: 0,
		plate: '',
		imagePath: '',
		gearType: '',
		fuelType: '',
		modelId: 0,
		colorId: 0,
		isStatus: false,
	};

	const validationSchema = Yup.object({
		kilometer: Yup.number().min(0, 'Kilometre negatif olamaz.').required('Kilometre alanı zorunludur.'),
		year: Yup.number().min(2005, 'Yıl 2005\'den büyük olmalıdır.').max(new Date().getFullYear(), `Yıl ${new Date().getFullYear()} veya daha küçük olmalıdır.`).required('Yıl alanı zorunludur.'),
		dailyPrice: Yup.number().min(0, 'Günlük fiyat negatif olamaz.').required('Günlük Fiyat alanı zorunludur.'),
		plate: Yup.string().matches(/^[0-9]{2} [A-Z]{1,3} [0-9]{2,4}$/, 'Plaka formatı geçersiz. Örn: 34 ABC 123').required('Plaka alanı zorunludur.'),
		status: Yup.boolean().required('Durum alanı zorunludur.'),
		gearType: Yup.string().required('Vites türü alanı zorunludur.'),
		fuelType: Yup.string().required('Yakıt türü alanı zorunludur.'),
		modelId: Yup.string().required('Model seçmek zorunludur.'),
		colorId: Yup.string().required('Renk seçmek zorunludur.'),
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files);
			setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
		}
	};
	const removeSelectedFile = (index: number) => {
		const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
		const newPreviewUrls = previewUrls.filter((_, i) => i !== index);

		setSelectedFiles(newSelectedFiles);
		setPreviewUrls(newPreviewUrls);
		URL.revokeObjectURL(previewUrls[index]);
	};

	const handleSubmit = async (values: MyFormValues) => {
		const formData = new FormData();
		const carInfo = {
			kilometer: values.kilometer,
			year: values.year,
			dailyPrice: values.dailyPrice,
			plate: values.plate,
			imagePath: values.imagePath,
			gearType: values.gearType,
			fuelType: values.fuelType,
			modelId: values.modelId,
			colorId: values.colorId,
			isStatus: values.isStatus,
		};

		formData.append('car', JSON.stringify(carInfo));
		selectedFiles.forEach((file, index) => {
			formData.append(`images[${index}]`, file, file.name);
		});

		try {
			const response = await carService.customAdd(formData);
			console.log(response.data);
			setIsSuccess(true); 
		} catch (error) {
			console.error("Form gönderilirken hata oluştu:", error);
			setIsSuccess(false);
		}
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form>
					<label htmlFor="kilometer" className="form-title mb-2">Kilometre</label>
					<Field
						id="kilometer"
						name="kilometer"
						type="text"
						className="form-control"
						placeholder="Kilometre Giriniz"
					/>
					<ErrorMessage name="kilometer" component="div" />

					<label htmlFor="year" className="form-title mb-2">Yıl</label>
					<Field as="select" id="year" name="year" className="form-control">
						<option value="">Yıl Seçiniz</option>
						{years.map(year => (
							<option key={year} value={year}>{year}</option>
						))}
					</Field>
					<ErrorMessage name="year" component="div" className="invalid-feedback" />

					<label htmlFor="dailyPrice" className="form-title mb-2">Günlük Fiyat</label>
					<Field
						id="dailyPrice"
						type="text"
						name="dailyPrice"
						className="form-control"
						placeholder="Günlük Fiyat Giriniz"
					/>
					<ErrorMessage name="dailyPrice" component="div" />

					<label htmlFor="plate" className="form-title mb-2">Plaka</label>
					<Field id="plate" name="plate" component={CustomInputComponent} className="form-control" placeholder="Plaka Giriniz" />
					<ErrorMessage name="plate" component="div" className="invalid-feedback" />

					<label htmlFor="image" className="form-title mb-2">Resim Yükle</label>
					<input
						id="image"
						name="image"
						type="file"
						onChange={handleFileChange}
						className="form-control"
						multiple
					/>
					<div className="image-previews">
						{previewUrls.map((url, index) => (
							<div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
								<img src={url} alt="Preview" style={{ width: '100px', height: '100px' }} />
								<button
									type="button"
									style={{
										position: 'absolute',
										top: '0',
										right: '0',
										cursor: 'pointer',
										backgroundColor: 'transparent',
										border: 'none',
										padding: '0',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
									onClick={() => removeSelectedFile(index)}
								>
									<MdCancel style={{ color: 'red', fontSize: '24px' }} />
								</button>
							</div>
						))}
					</div>
					<label htmlFor="status" className="form-title mb-2">Durum</label>
					<BooleanSelect
						id="status"
						name="status"
						className="form-select"
					/>
					<ErrorMessage name="status" component="div" />

					<label htmlFor="imagePath" className="form-title mb-2">Resim Yolu</label>
					<Field
						id="imagePath"
						name="imagePath"
						type="text"
						className="form-control"
						placeholder="Resim Yolu Giriniz"
					/>
					<ErrorMessage name="imagePath" component="div" />

					<label htmlFor="gearType" className="form-title mb-2">Vites Tipi</label>
					<Field as="select" id="gearType" name="gearType" className="form-select">
						<option value="">Vites tipi seçiniz</option>
						<option value={GearType.MANUEL}>Manuel</option>
						<option value={GearType.AUTO}>Otomatik</option>
					</Field>
					<ErrorMessage name="gearType" component="div" />

					<label htmlFor="fuelType" className="form-title mb-2">Yakıt Tipi</label>
					<Field as="select" id="fuelType" name="fuelType" className="form-select">
						<option value="">Yakıt tipi seçiniz</option>
						<option value={FuelType.DIESEL}>Dizel</option>
						<option value={FuelType.ELECTRIC}>Elektrikli</option>
						<option value={FuelType.HYBRID}>Hibrit</option>
						<option value={FuelType.GASOLINE}>Benzinli</option>
					</Field>
					<ErrorMessage name="fuelType" component="div" />

					<label htmlFor="modelId">Modeller</label>
					<Field as="select" id="modelId" name="modelId" className="form-select">
						<option value="">Model Seçiniz</option>
						{models.map(model => (
							<option key={model.id} value={model.id}>{model.name}</option>
						))}
					</Field>
					<ErrorMessage name="modelId" component="div" />

					<label htmlFor="colorId">Renkler</label>
					<Field as="select" id="colorId" name="colorId" className="form-select">
						<option value="">Renk Seçiniz</option>
						{colors.map(color => (
							<option key={color.id} value={color.id}>{color.name}</option>
						))}
					</Field>
					<ErrorMessage name="colorId" component="div" />

					<Button className='p-2 mb-2 bg-success' variant="primary" type="submit">Kaydet</Button>
					<Button className='p-2 mb-2 mx-4 bg-warning' variant="primary" type="reset">Temizle</Button>
					{isSuccess && <Alert variant="success">Form başarıyla gönderildi!</Alert>}
				</Form>
			</Formik>
		</div>
	);
};

export default AdminCarAddForm;