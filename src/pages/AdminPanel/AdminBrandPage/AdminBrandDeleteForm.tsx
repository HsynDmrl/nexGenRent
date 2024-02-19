import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { deleteBrand, setSelectedId } from '../../../store/brand/brandSlice';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';

const AdminBrandDeleteForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedBrandId = useSelector((state: RootState) => state.brand.selectedId);

  useEffect(() => {
    if (selectedBrandId) {
      console.log('Selected ID:', selectedBrandId);
    }
  }, [selectedBrandId]);

  const handleSubmit = (values: { confirmationText: string }, { setSubmitting }: FormikHelpers<{ confirmationText: string }>) => {
    if (values.confirmationText === 'sil') {
      dispatch(deleteBrand(selectedBrandId as number));
      dispatch(setSelectedId(null));
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{ confirmationText: '' }}
        validationSchema={Yup.object({
          confirmationText: Yup.string()
            .required('Onaylama zorunludur')
            .matches(/sil/, '"sil" yazarak silme işlemini onaylamanız gerekmektedir'),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="confirmationText" className="form-label">
                Silme işlemini onaylamak için "sil" yazın:
              </label>
              <Field
                type="text"
                name="confirmationText"
                className={`form-control`}
              />
              <ErrorMessage name="confirmationText" component="div" className="invalid-feedback" />
            </div>
            <Button className='bg-danger' variant="primary" type="submit" disabled={isSubmitting}>
              Sil
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminBrandDeleteForm;
