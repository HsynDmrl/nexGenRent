import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateRoleRequest } from '../../../../models/roles/requests/updateRoleRequest';
import { ObjectSchema } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/configStore/configureStore';
import { updateRole } from '../../../../store/role/roleSlice';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';

const RoleUpdateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedRoleId = useSelector((state: RootState) => state.role.selectedId);
  const allData = useSelector((state: RootState) => state.role.allData);

  const roleData = allData.find(role => role.id === selectedRoleId) || null;

  const initialValues: UpdateRoleRequest = {
    id: selectedRoleId ?? 0,
    name: roleData?.name ?? '',
  };

  const validationSchema: ObjectSchema<UpdateRoleRequest> = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string()
      .required('Rol adı zorunludur.')
      .min(2, 'Rol adı en az 2 karakter olmalıdır.')
      .max(50, 'Rol adı en fazla 50 karakter olmalıdır.'),
  });

  const onSubmit = (values: UpdateRoleRequest, { setStatus }: any) => {
    dispatch(updateRole(values))
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
        {({ errors, touched, status }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-title">
                İsim
              </label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Rol İsim Giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <Button className='p-2 mb-2 mx-3 bg-success' variant="primary" type="submit">
              Güncelle
            </Button>
            <Button className='p-2 mb-2 mx-3 bg-warning' variant="primary" type="reset">
              Temizle
            </Button>
            {status && status.success && <Alert variant="success">Rol başarıyla güncellendi.</Alert>}
            {status && !status.success && <Alert variant="danger">Rol güncellenirken bir hata oluştu.</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RoleUpdateForm;
