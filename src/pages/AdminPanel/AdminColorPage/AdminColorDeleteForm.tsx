import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { RootState } from '../../../store/configStore/configureStore';
import { deleteColor, setSelectedId } from '../../../store/color/colorSlice';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { useAppSelector } from '../../../store/configStore/useAppSelector';

const AdminColorDeleteForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedColorId = useAppSelector((state: RootState) => state.color.selectedId);

  return (
    <Container>
      <Formik
        initialValues={{ confirmationText: '' }}
        validationSchema={Yup.object({
          confirmationText: Yup.string()
            .required('Onaylama zorunludur')
        })}
		onSubmit={(values, { setSubmitting, setStatus }) => {
			if (values.confirmationText === 'sil') {
			  try {
				dispatch(deleteColor(selectedColorId as number));
				dispatch(setSelectedId(null));
				setStatus({ success: true });
			  } catch (error) {
				console.error('Bir hata oluştu:', error);
				setStatus({ success: false });
			  } finally {
				setSubmitting(false);
			  }
			} else {
			  setStatus({ success: false, error: 'Lütfen "sil" yazarak silme işlemini onaylayın.' });
			  setSubmitting(false);
			}
		  }}>
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
            <Button className='bg-danger mb-2' variant="primary" type="submit" disabled={isSubmitting}>Sil</Button>
            {status && status.success && <Alert className='mb-2' variant="success">Renk başarıyla silindi.</Alert>}
            {status && !status.success && <Alert className='mb-2' variant="danger">{status.error}</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminColorDeleteForm;