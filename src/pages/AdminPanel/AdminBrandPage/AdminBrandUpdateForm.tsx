import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Container } from 'react-bootstrap';
import { UpdateBrandRequest } from '../../../models/brands/requests/updateBrandRequest';
import { ObjectSchema } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { updateBrand } from '../../../store/brand/brandSlice';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';

const AdminBrandUpdateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedBrandId = useSelector((state: RootState) => state.brand.selectedId);
  const allData = useSelector((state: RootState) => state.brand.allData);

  const brandData = allData.find(brand => brand.id === selectedBrandId) || null;

  useEffect(() => {
    if (selectedBrandId) {
      console.log('Selected ID:', selectedBrandId);
    }
  }, [selectedBrandId]);

  const initialValues: UpdateBrandRequest = {
    id: selectedBrandId ?? 0,
    name: brandData?.name ?? '',
    logoPath: brandData?.logoPath ?? '',
  };

  const validationSchema: ObjectSchema<UpdateBrandRequest> = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string()
      .required('Marka adı zorunludur.')
      .min(2, 'Marka adı en az 2 karakter olmalıdır.')
      .max(50, 'Marka adı en fazla 50 karakter olmalıdır.'),
    logoPath: Yup.string().required('Logo path zorunludur.'),
  });

  const onSubmit = (values: UpdateBrandRequest, { resetForm }: FormikHelpers<UpdateBrandRequest>) => {
    dispatch(updateBrand(values));
    resetForm();
  };
  
  return (
    <Container>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                İsim
              </label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Marka İsim Giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="logoPath" className="form-label">
                Logo Path
              </label>
              <Field
                type="text"
                name="logoPath"
                className={`form-control ${errors.logoPath && touched.logoPath ? 'is-invalid' : ''}`}
                placeholder="Logo Path Giriniz"
              />
              <ErrorMessage name="logoPath" component="div" className="invalid-feedback" />
            </div>
            <Button className='p-2 mb-2 mx-3 bg-success' variant="primary" type="submit">
              Güncelle
            </Button>
            <Button className='p-2 mb-2 mx-3 bg-warning' variant="primary" type="reset">
              Temizle
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminBrandUpdateForm;
