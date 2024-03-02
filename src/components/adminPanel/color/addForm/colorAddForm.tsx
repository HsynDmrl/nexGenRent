import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { addColor } from '../../../../store/color/colorSlice';
import { AddColorRequest } from '../../../../models/colors/requests/addColorRequest';
import { ObjectSchema } from 'yup';

const ColorAddForm: React.FC = () => {
  const initialValues: AddColorRequest = {
    id: 0,
    name: ''
  };

  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const validationSchema: ObjectSchema<AddColorRequest> = Yup.object().shape({
	id: Yup.number().required(),
	name: Yup.string()
	  .required('Renk adı zorunludur.')
	  .matches(/^[A-Za-zÇçĞğİıÖöŞşÜü][a-zA-ZÇçĞğİıÖöŞşÜü\s]*$/, 'Renk adının ilk harfi büyük olmalı ve sadece harf içermelidir.')
	  .min(2, 'Renk adı en az 2 karakter olmalıdır.')
	  .max(50, 'Renk adı en fazla 50 karakter olmalıdır.'),
  });

  const onSubmit = async (values: AddColorRequest, { resetForm }: FormikHelpers<AddColorRequest>) => {
    try {
      await dispatch(addColor(values));
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
              <label htmlFor="name" className="form-label text-dark">İsim</label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Renk İsim Giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <Button className='p-2 mb-2 bg-success' variant="primary" type="submit">Kaydet</Button>
            <Button className='p-2 mb-2 mx-4 bg-warning' variant="primary" type="reset">Temizle</Button>
            {isSuccess && <Alert variant="success">Form başarıyla gönderildi!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ColorAddForm;
