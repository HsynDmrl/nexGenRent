import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { deleteBrand, setSelectedId } from '../../../store/brand/brandSlice';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';

const AdminBrandDeleteForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedBrandId = useSelector((state: RootState) => state.brand.selectedId);

  const handleSubmit = async (values: { confirmationText: string }, { setSubmitting, setStatus }: FormikHelpers<{ confirmationText: string }>) => {
    if (values.confirmationText === 'sil') {
      try {
        await dispatch(deleteBrand(selectedBrandId as number));
        dispatch(setSelectedId(null));
        setStatus({ success: true });
      } catch (error) {
        console.error('Bir hata oluştu:', error);
        setStatus({ success: false });
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{ confirmationText: '' }}
        validationSchema={Yup.object({
          confirmationText: Yup.string()
            .required('Onaylama zorunludur')
        })}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          if (values.confirmationText !== 'sil') {
            setStatus({ success: false, error: 'Lütfen "sil" yazarak silme işlemini onaylayın.' });
            setSubmitting(false);
            return;
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="confirmationText" className="form-label">
                Silme işlemini onaylamak için "sil" yazın:
              </label>
              <Field
                type="text"
                name="confirmationText"
                className={`form-control ${status && !status.success ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="confirmationText" component="div" className="invalid-feedback" />
            </div>
            <Button className='bg-danger' variant="primary" type="submit" disabled={isSubmitting}>
              Sil
            </Button>
            {status && status.success && <Alert variant="success">Marka başarıyla silindi.</Alert>}
            {status && !status.success && <Alert variant="danger">{status.error}</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminBrandDeleteForm;
