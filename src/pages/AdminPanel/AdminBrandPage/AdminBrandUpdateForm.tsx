import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Container } from 'react-bootstrap';
import { IoCloseSharp } from 'react-icons/io5';

interface FormValues {
  brandName: string;
}

const AdminBrandUpdateForm: React.FC = () => {
  const initialValues: FormValues = {
    brandName: '',
  };

  const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
    brandName: Yup.string()
      .required('Marka adı zorunludur.')
      .min(2, 'Marka adı en az 2 karakter olmalıdır.')
      .max(50, 'Marka adı en fazla 50 karakter olmalıdır.'),
  });

  const onSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    console.log('Form gönderildi!', values);
    resetForm();
  };

  const handleClose = () => {
    console.log('Form kapatıldı.');
  };

  return (
    <Container>
      <div className='position-absolute top-0 end-0 mx-2' onClick={handleClose}>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">İsim</label>
              <Field
                type="text"
                name="brandName"
                className={`form-control ${errors.brandName && touched.brandName ? 'is-invalid' : ''}`}
                placeholder="Marka İsim Giriniz"
              />
              <ErrorMessage name="brandName" component="div" className="invalid-feedback" />
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
