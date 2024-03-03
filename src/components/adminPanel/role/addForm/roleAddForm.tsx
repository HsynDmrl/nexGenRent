import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { addRole } from '../../../../store/role/roleSlice';
import { AddRoleRequest } from '../../../../models/roles/requests/addRoleRequest';
import { ObjectSchema } from 'yup';

const RoleAddForm: React.FC = () => {
  const initialValues: AddRoleRequest = {
    id: 0,
    name: '',
  };

  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const validationSchema: ObjectSchema<AddRoleRequest> = Yup.object().shape({
	id: Yup.number().required(),
	name: Yup.string()
	  .required('Rol adı zorunludur.')
    .matches(/^[A-Z\s]*$/, 'Rol adı sadece büyük harflerden oluşmalıdır.')
	  .min(2, 'Rol adı en az 2 karakter olmalıdır.')
	  .max(50, 'Rol adı en fazla 50 karakter olmalıdır.'),
  });

  const onSubmit = async (values: AddRoleRequest, { resetForm }: FormikHelpers<AddRoleRequest>) => {
    try {
      await dispatch(addRole(values));
      setIsSuccess(true);
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
              <label htmlFor="name" className="form-title">İsim</label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Rol İsim Giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
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

export default RoleAddForm;
