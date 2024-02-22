import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateUserRequest } from '../../../models/users/requests/updateUserRequest';
import { ObjectSchema } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { updateUser } from '../../../store/user/userSlice';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { Role } from '../../../models/roles/entity/role';
import { getAll as getAllRoles } from '../../../store/role/roleSlice';

const AdminUserUpdateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedUserId = useSelector((state: RootState) => state.user.selectedId);
  const allData = useSelector((state: RootState) => state.user.allData);
  const [roles, setRoles] = useState<Role[]>([]);
  const allRoles = useSelector((state: RootState) => state.role.allData);
  const userData = allData.find(user => user.id === selectedUserId) || null;

  useEffect(() => {
	dispatch(getAllRoles());
  }, [dispatch]);

  useEffect(() => {
    if (allRoles.length > 0) {
      setRoles(allRoles);
    }
  }, [allRoles]);

  const initialValues: UpdateUserRequest = {
	  id: selectedUserId ?? 0,
	  email: userData?.email ?? '',
	  gsm: userData?.gsm ?? '',
	  name: userData?.name ?? '',
	  nationalityId: userData?.nationalityId ?? '',
	  surname: userData?.surname ?? '',
	  roleId: userData?.role.id ?? 0,
  };

  const validationSchema: ObjectSchema<UpdateUserRequest> = Yup.object().shape({
	id: Yup.number().required(),
	email: Yup.string()
	  .required('E-posta zorunludur'),
	gsm: Yup.string()
	  .required('Telefon numarası zorunludur'),
	name: Yup.string()
	  .required('Ad zorunludur')
	  .min(2, 'Ad en az 2 karakter olmalıdır')
	  .max(50, 'Ad en fazla 50 karakter olmalıdır'),
	nationalityId: Yup.string()
	  .max(11, 'T.C. Kimlik Numarası 11 karakter olmalıdır')
	  .required('T.C. Kimlik Numarası zorunludur')
	  .min(11, 'T.C. Kimlik Numarası 11 karakter olmalıdır'),
	surname: Yup.string()
	  .required('Soyad zorunludur'),
	roleId: Yup.number().required('Rol zorunludur'),
  });
  
  const onSubmit = (values: UpdateUserRequest, { setStatus }: any) => {
    dispatch(updateUser(values))
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
                placeholder="User İsim Giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-title">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                placeholder="Email Giriniz"
              />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="gsm" className="form-title">
                Telefon Numarası
              </label>
              <Field
                type="text"
                name="gsm"
                className={`form-control ${errors.gsm && touched.gsm ? 'is-invalid' : ''}`}
                placeholder="Telefon Numarası Giriniz"
              />
              <ErrorMessage name="gsm" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-title">
                Soyadı
              </label>
              <Field
                type="text"
                name="surname"
                className={`form-control ${errors.surname && touched.surname ? 'is-invalid' : ''}`}
                placeholder="User Soyadı Giriniz"
              />
              <ErrorMessage name="surname" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="nationalityId" className="form-title">
                TC Kimlik Numarası
              </label>
              <Field
                type="text"
                name="nationalityId"
                className={`form-control ${errors.nationalityId && touched.nationalityId ? 'is-invalid' : ''}`}
                placeholder="TC Kimlik Numarası Giriniz"
              />
              <ErrorMessage name="nationalityId" component="div" className="invalid-feedback" />
            </div>
            <div>
              <label htmlFor="roleId" className="form-title mb-4">Rol {' '}</label>
              <Field as="select" name="roleId" className={`form-control ${errors.roleId && touched.roleId ? 'is-invalid' : ''}`}>
                <option value="">Rol Seçiniz </option>
                {allRoles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </Field>
              <ErrorMessage name="roleId" component="div" className="invalid-feedback" />
            </div>
            <Button className='p-2 mb-2 mx-3 bg-success' variant="primary" type="submit">
              Güncelle
            </Button>
            <Button className='p-2 mb-2 mx-3 bg-warning' variant="primary" type="reset">
              Temizle
            </Button>
            {status && status.success && <Alert variant="success">Kullanıcı başarıyla güncellendi.</Alert>}
            {status && !status.success && <Alert variant="danger">Kullanıcı güncellenirken bir hata oluştu.</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminUserUpdateForm;
