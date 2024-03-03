import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateEmployeeRequest } from '../../../../models/employees/requests/updateEmployeeRequest';
import { ObjectSchema } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/configStore/configureStore';
import { updateEmployee } from '../../../../store/employee/employeeSlice';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { User } from '../../../../models/users/entity/user';
import { getAll as getAllUsers } from '../../../../store/user/userSlice';

const AdminEmployeeUpdateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedEmployeeId = useSelector((state: RootState) => state.employee.selectedId);
  const allData = useSelector((state: RootState) => state.employee.allData);
  const [users, setUsers] = useState<User[]>([]);
  const allUsers = useSelector((state: RootState) => state.user.allData);
  const employeeData = allData.find(employee => employee.id === selectedEmployeeId) || null;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (allUsers.length > 0) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  const initialValues: UpdateEmployeeRequest = {
    id: selectedEmployeeId ?? 0,
    salary: employeeData?.salary ?? 0,
    userId: employeeData?.user.id ?? 0,
  };

  const validationSchema: ObjectSchema<UpdateEmployeeRequest> = Yup.object().shape({
    id: Yup.number().required(),
    salary: Yup.number()
      .typeError('Maaş alanı sayı olmalıdır')
      .positive('Maaş alanı pozitif olmalıdır')
      .required('Maaş alanı zorunludur'),
    userId: Yup.number().required('Kullanıcı alanı zorunludur'),
  });

  const onSubmit = (values: UpdateEmployeeRequest, { setStatus }: any) => {
    dispatch(updateEmployee(values))
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
              <label htmlFor="salary" className="form-title">
                Maaş
              </label>
              <Field
                type="text"
                name="salary"
                className={`form-control ${errors.salary && touched.salary ? 'is-invalid' : ''}`}
                placeholder="Maaş Giriniz"
              />
              <ErrorMessage name="salary" component="div" className="mb-1 text-danger" />
            </div>
            <div>
              <label htmlFor="userId" className="form-title mb-1">Kullanıcı İsmi</label>
              <Field as="select" name="userId" className={`form-control ${errors.userId && touched.userId ? 'is-invalid' : ''}`}>
                <option value="">Kullanıcı Seçiniz</option>
                {allUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </Field>
              <ErrorMessage name="userId" component="div" className="mb-1 text-danger" />
            </div>
            <Button className='p-2 mt-3 mb-2 mx-3 bg-success' variant="primary" type="submit">
              Güncelle
            </Button>
            <Button className='p-2 mt-3 mb-2 mx-3 bg-warning' variant="primary" type="reset">
              Temizle
            </Button>
            {status && status.success && <Alert variant="success">Çalışan başarıyla güncellendi.</Alert>}
            {status && !status.success && <Alert variant="danger">Çalışan güncellenirken bir hata oluştu.</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminEmployeeUpdateForm;
