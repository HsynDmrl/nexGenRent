import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { addBrand } from '../../../store/brand/brandSlice';
import { AddBrandRequest } from '../../../models/brands/requests/addBrandRequest';
import { ObjectSchema } from 'yup';

const AdminBrandAddForm: React.FC = () => {
  const initialValues: AddBrandRequest = {
    id: 0,
    name: '',
    logoPath: '',
  };

  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const validationSchema: ObjectSchema<AddBrandRequest> = Yup.object().shape({
	id: Yup.number().required(),
	name: Yup.string()
	  .required('Marka adı zorunludur.')
	  .matches(/^[A-Z][a-zA-Z\s]*$/, 'Marka adının ilk harfi büyük olmalı ve sadece harf içermelidir.')
	  .min(2, 'Marka adı en az 2 karakter olmalıdır.')
	  .max(50, 'Marka adı en fazla 50 karakter olmalıdır.'),
	logoPath: Yup.string()
	  .required('Logo path zorunludur.'),
  });

  const onSubmit = async (values: AddBrandRequest, { resetForm }: FormikHelpers<AddBrandRequest>) => {
    try {
      await dispatch(addBrand(values));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
      resetForm();
    } catch (error:any) {
      setError(error.message);
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
              <label htmlFor="name" className="form-label">İsim</label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Marka İsim Giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="logoPath" className="form-label">Logo Path</label>
              <Field
                type="text"
                name="logoPath"
                className={`form-control ${errors.logoPath && touched.logoPath ? 'is-invalid' : ''}`}
                placeholder="Logo Path Giriniz"
              />
              <ErrorMessage name="logoPath" component="div" className="invalid-feedback" />
            </div>
            <Button className='p-2 mb-2 bg-success' variant="primary" type="submit">Kaydet</Button>
            <Button className='p-2 mb-2 mx-4 bg-warning' variant="primary" type="reset">Temizle
</Button>
            {isSuccess && <Alert variant="success">Form başarıyla gönderildi!</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminBrandAddForm;