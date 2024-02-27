import React, { useState } from 'react';
import { AddBrandRequest } from '../../../models/brands/requests/addBrandRequest';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Button, Container, Alert } from 'react-bootstrap';
import brandService from '../../../services/brandService';
import { MdCancel } from 'react-icons/md';
import { ObjectSchema } from 'yup';
import * as Yup from 'yup';

const AdminBrandAddForm: React.FC = () => {

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const initialValues: AddBrandRequest = {
		id: 0,
		name: '',
	};

	const validationSchema: ObjectSchema<AddBrandRequest> = Yup.object().shape({
		id: Yup.number().required(),
		name: Yup.string()
			.required('Marka adı zorunludur.')
			.matches(/^[A-Z][a-zA-Z\s]*$/, 'Marka adının ilk harfi büyük olmalı ve sadece harf içermelidir.')
			.min(2, 'Marka adı en az 2 karakter olmalıdır.')
			.max(50, 'Marka adı en fazla 50 karakter olmalıdır.'),
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			setSelectedFile(file);
			const filePreviewUrl = URL.createObjectURL(file);
			setPreviewUrl(filePreviewUrl);
		}
	};
	const removeSelectedFile = () => {
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl); 
			setPreviewUrl(null);
			setSelectedFile(null);
		}
	};
	const onSubmit = async (values: AddBrandRequest) => {
		const formData = new FormData();
		const brandInfo = {
			name: values.name,
		};

		formData.append('addBrandRequest', JSON.stringify(brandInfo));
		if (selectedFile) {
			formData.append('logoFile', selectedFile, selectedFile.name);
		}

		try {
			await brandService.customAdd(formData);
			setIsSuccess(true);
		} catch (error) {
			setIsSuccess(false);
		}
	};

	return (
		<Container>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ errors, touched }) => (
					<Form>
						<div className="mb-3">
							<label htmlFor="name" className="form-label text-dark">İsim</label>
							<Field
								type="text"
								name="name"
								className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
								placeholder="Marka İsim Giriniz"
							/>
							<ErrorMessage name="name" component="div" className="invalid-feedback" />
						</div>
						<label htmlFor="image" className="form-title mb-2 text-dark">Resim Yükle</label>
						<input
							id="image"
							name="image"
							type="file"
							onChange={handleFileChange}
							className="form-control"
							multiple
						/>
						<div className="image-previews">
							{previewUrl && (
								<div style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
									<img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />
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
										onClick={removeSelectedFile}
									>
										<MdCancel style={{ color: 'red', fontSize: '24px' }} />
									</button>
								</div>
							)}
						</div>
						<Button className='p-2 mb-2 bg-success' variant="primary" type="submit">Kaydet</Button>
						<Button className='p-2 mb-2 mx-4 bg-warning' variant="primary" type="reset">Temizle</Button>
						{isSuccess && <Alert variant="success">Form başarıyla gönderildi!</Alert>}
						{!isSuccess && isSuccess !== null && <Alert variant="danger">Form gönderilirken hata oluştu!</Alert>}
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default AdminBrandAddForm;
