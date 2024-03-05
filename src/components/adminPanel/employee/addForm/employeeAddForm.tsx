import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/configStore/configureStore';
import { getAll, addEmployee } from '../../../../store/employee/employeeSlice';
import { User } from '../../../../models/users/entity/user';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { getAll as getAllUsers } from '../../../../store/user/userSlice';
import { Button, Alert } from 'react-bootstrap';

const EmployeeAddForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const allUsers = useSelector((state: RootState) => state.user.allData);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (allUsers.length > 0) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  const initialValues = {
    salary: '',
    userId: '',
  };

  const validationSchema = Yup.object({
    salary: Yup.number()
      .typeError('Maaş alanı sayı olmalıdır')
      .positive('Maaş alanı pozitif olmalıdır')
      .required('Maaş alanı zorunludur'),
    userId: Yup.string()
      .required('Kullanıcı alanı zorunludur'),
  });
  

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      await dispatch(addEmployee(values));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
      resetForm();
    } catch (error: any) {
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
              <label htmlFor="salary" className="form-title text-dark">Maaş</label>
              <Field
                type="text"
                name="salary"
                className={`form-control ${errors.salary && touched.salary ? 'is-invalid' : ''}`}
                placeholder="Maaş Giriniz"
              />
              <ErrorMessage name="salary" component="div"  className="mb-1 text-danger" />
            </div>
            <div>
              <label htmlFor="userId" className="text-dark">Kullanıcı</label>
              <Field as="select" name="userId" className="form-control mb-1 text-dark">
                <option value="">Kullanıcı Seçiniz</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </Field>
              <ErrorMessage name="userId" component="div" className="mb-1 text-danger" />
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

export default EmployeeAddForm;
