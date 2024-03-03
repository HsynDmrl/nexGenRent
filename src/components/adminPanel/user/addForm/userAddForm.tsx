import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/configStore/configureStore';
import { getAll, addUser } from '../../../../store/user/userSlice';
import { Role } from '../../../../models/roles/entity/role';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { getAll as getAllRoles } from '../../../../store/role/roleSlice';
import { Button, Alert } from 'react-bootstrap';

const UserAddForm = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const dispatch = useAppDispatch();
  const allRoles = useSelector((state: RootState) => state.role.allData);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllRoles());
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (allRoles.length > 0) {
      setRoles(allRoles);
    }
  }, [allRoles]);

  const initialValues = {
    name: '',
    roleId: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('İsim alanı zorunludur'),
    roleId: Yup.string()
      .required('Rol alanı zorunludur'),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      await dispatch(addUser(values));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
      resetForm();
    } catch (error: any) {
      console.error('Kullanıcı eklenirken hata oluştu:', error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="name" className="form-title text-dark">İsim</label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Kullanıcı İsmi Giriniz"
              />
              <ErrorMessage name="name" component="div" className="mb-1 text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="roleId" className="form-label text-dark">Rol</label>
              <Field as="select" id="roleId" name="roleId" className={`form-select ${errors.roleId && touched.roleId ? 'is-invalid' : ''}`}>
                <option value="">Rol Seçiniz</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </Field>
              <ErrorMessage name="roleId" component="div"  className="mb-1 text-danger" />
            </div>
            <Button className='p-2 mb-2 bg-success' variant="primary" type="submit">Kaydet</Button>
            <Button className='p-2 mb-2 mx-4 bg-warning' variant="primary" type="reset">Temizle</Button>
            {isSuccess && <Alert variant="success">Form başarıyla gönderildi!</Alert>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserAddForm;
