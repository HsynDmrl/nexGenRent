import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, addCustomer } from '../../../store/customer/customerSlice';
import { User } from '../../../models/users/entity/user';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { getAll as getAllUsers } from '../../../store/user/userSlice';
import { Button, Alert } from 'react-bootstrap';

const AdminCustomerAddForm = () => {
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
    userId: '',
  };

  const validationSchema = Yup.object({
    userId: Yup.string()
      .required('User is required'),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      await dispatch(addCustomer(values));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
      resetForm();
    } catch (error: any) {
      console.error('Error adding customer:', error);
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
            <label htmlFor="userId" className="text-dark">User</label>
            <Field as="select" name="userId" className="form-control mb-4 text-dark">
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </Field>
            <ErrorMessage name="userId" component="div" />
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

export default AdminCustomerAddForm;
