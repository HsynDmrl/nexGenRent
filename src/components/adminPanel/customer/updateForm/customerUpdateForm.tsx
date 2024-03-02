import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateCustomerRequest } from '../../../../models/customers/requests/updateCustomerRequest';
import { ObjectSchema } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/configStore/configureStore';
import { updateCustomer } from '../../../../store/customer/customerSlice';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { User } from '../../../../models/users/entity/user';
import { getAll as getAllUsers } from '../../../../store/user/userSlice';

const CustomerUpdateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCustomerId = useSelector((state: RootState) => state.customer.selectedId);
  const allData = useSelector((state: RootState) => state.customer.allData);
  const [users, setUsers] = useState<User[]>([]);
  const allUsers = useSelector((state: RootState) => state.user.allData);
  const customerData = allData.find(customer => customer.id === selectedCustomerId) || null;

  useEffect(() => {
	dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (allUsers.length > 0) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  const initialValues: UpdateCustomerRequest = {
	  id: selectedCustomerId ?? 0,
	  userId: customerData?.user.id ?? 0,
  };

  const validationSchema: ObjectSchema<UpdateCustomerRequest> = Yup.object().shape({
	id: Yup.number().required(),
	userId: Yup.number().required(),
  });
  
  const onSubmit = (values: UpdateCustomerRequest, { setStatus }: any) => {
    dispatch(updateCustomer(values))
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
            <div>
              <label htmlFor="userId" className="form-title mb-1">Kullanıcı Seçiniz{' '}</label>
              <Field as="select" name="userId" className={`form-control mb-4 ${errors.userId && touched.userId ? 'is-invalid' : ''}`}>
                <option value="">Kullanıcı Seçiniz </option>
                {allUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </Field>
              <ErrorMessage name="userId" component="div" className="invalid-feedback" />
            </div>
            <Button className='p-2 mb-2 mx-3 bg-success' variant="primary" type="submit">
              Güncelle
            </Button>
            {status && status.success && <Alert variant="success">Müşteri başarıyla güncellendi.</Alert>}
            {status && !status.success && <Alert variant="danger">Müşteri güncellenirken bir hata oluştu.</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CustomerUpdateForm;
