import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateBrandRequest } from '../../../models/brands/requests/updateBrandRequest';
import { ObjectSchema } from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { updateBrand } from '../../../store/brand/brandSlice';
import { MdCancel } from 'react-icons/md';
import brandService from '../../../services/brandService';

const AdminBrandUpdateForm: React.FC = () => {
  const dispatch = useDispatch();
  const selectedBrandId = useSelector((state: RootState) => state.brand.selectedId);
  const allData = useSelector((state: RootState) => state.brand.allData);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const brandData = allData.find(brand => brand.id === selectedBrandId) || null;

  useEffect(() => {
    if (brandData?.logoPath) {
      setPreviewUrl(brandData.logoPath);
    }
  }, [brandData]);

  interface UpdateBrandRequestK {
    id: number;
    name: string;
    logoPath: string;
  }

  const initialValues: UpdateBrandRequestK = {
    id: selectedBrandId ?? 0,
    name: brandData?.name ?? '',
    logoPath: brandData?.logoPath ?? '', 
  };

  const validationSchema: ObjectSchema<UpdateBrandRequest> = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string()
      .required('Marka adı zorunludur.')
      .min(2, 'Marka adı en az 2 karakter olmalıdır.')
      .max(50, 'Marka adı en fazla 50 karakter olmalıdır.')
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
    if (previewUrl && !brandData?.logoPath) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const onSubmit = async (values: UpdateBrandRequest, { setStatus }: any) => {
    const formData = new FormData();
		const brandInfo = {
      id: values.id,
			name: values.name,
		};
    formData.append('updateBrandRequest', JSON.stringify(brandInfo));
		
    if (selectedFile) {
      formData.append('logoFile', selectedFile, selectedFile.name);
    } else if (!selectedFile && previewUrl === null) {
      formData.append('removeLogo', 'true');
    }

    try {
      await brandService.customUpdate(formData);
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
    }
  };

  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, status, setFieldValue }) => (
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

            <div className="mb-3">
              <label htmlFor="logoFile" className="form-label text-dark">Logo Yükle</label>
              <input
                id="logoFile"
                name="logoFile"
                type="file"
                onChange={(event) => {
                  handleFileChange(event);
                  setFieldValue("logoPath", event.currentTarget.value); // Update the path in form
                }}
                className="form-control"
              />
              <ErrorMessage name="logoPath" component="div" className="invalid-feedback" />
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
            {status && status.success && <Alert variant="success">Marka başarıyla güncellendi.</Alert>}
            {status && !status.success && <Alert variant="danger">Marka güncellenirken hata oluştu.</Alert>}
            <Button type="submit" variant="primary" className="mt-3">
              Güncelle
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AdminBrandUpdateForm;