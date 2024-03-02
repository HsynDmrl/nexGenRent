import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateColorRequest } from '../../../../models/colors/requests/updateColorRequest';
import { ObjectSchema } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/configStore/configureStore';
import { updateColor } from '../../../../store/color/colorSlice';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';

const ColorUpdateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedColorId = useSelector((state: RootState) => state.color.selectedId);
  const allData = useSelector((state: RootState) => state.color.allData);

  const colorData = allData.find(color => color.id === selectedColorId) || null;

  const initialValues: UpdateColorRequest = {
    id: selectedColorId ?? 0,
    name: colorData?.name ?? '',
  };

  const validationSchema: ObjectSchema<UpdateColorRequest> = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string()
      .required('Renk adı zorunludur.')
      .min(2, 'Renk adı en az 2 karakter olmalıdır.')
      .max(50, 'Renk adı en fazla 50 karakter olmalıdır.'),
  });

  const onSubmit = (values: UpdateColorRequest, { setStatus }: any) => {
    dispatch(updateColor(values))
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
              <label htmlFor="name" className="form-label text-dark">
                İsim
              </label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Renk İsim Giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <Button className='p-2 mb-2 mx-3 bg-success' variant="primary" type="submit">
              Güncelle
            </Button>
            <Button className='p-2 mb-2 mx-3 bg-warning' variant="primary" type="reset">
              Temizle
            </Button>
            {status && status.success && <Alert variant="success">Renk başarıyla güncellendi.</Alert>}
            {status && !status.success && <Alert variant="danger">Renk güncellenirken bir hata oluştu.</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ColorUpdateForm;
