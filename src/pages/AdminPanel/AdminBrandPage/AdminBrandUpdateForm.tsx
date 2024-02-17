import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button, Container } from 'react-bootstrap';
import { UpdateBrandRequest } from '../../../models/brands/requests/updateBrandRequest';
import { ObjectSchema } from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { getById, updateBrand } from '../../../store/brand/brandSlice';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';

interface Props {
  id: number | undefined;
}

const AdminBrandUpdateForm: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const brandData = useSelector((state: RootState) => state.brand.dataFromById);

  useEffect(() => {
    if (id) {
      dispatch(getById(id));
    }
  }, [dispatch, id]);

  const initialValues: UpdateBrandRequest = {
    id: id ?? 0,
    name: brandData?.name ?? '',
    logoPath: brandData?.logoPath ?? '',
  };

  const validationSchema: ObjectSchema<UpdateBrandRequest> = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string()
      .required('Marka adı zorunludur.')
      .min(2, 'Marka adı en az 2 karakter olmalıdır.')
      .max(50, 'Marka adı en fazla 50 karakter olmalıdır.'),
    logoPath: Yup.string().required('Logo path zorunludur.'),
  });

  const onSubmit = (values: UpdateBrandRequest, { resetForm }: FormikHelpers<UpdateBrandRequest>) => {
    dispatch(updateBrand(values));
    resetForm();
  };

  const handleClose = () => {
    console.log('Form kapatıldı.');
  };

  if (!id) {
    return <div>Marka seçiniz!</div>;
  }

  return (
    <Container>
      <div className='position-absolute top-0 end-0 mx-2' onClick={handleClose}></div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                İsim
              </label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Marka İsim Giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <div className="mb-3">
              <label htmlFor="logoPath" className="form-label">
                Logo Path
              </label>
              <Field
                type="text"
                name="logoPath"
                className={`form-control ${errors.logoPath && touched.logoPath ? 'is-invalid' : ''}`}
                placeholder="Logo Path Giriniz"
              />
              <ErrorMessage name="logoPath" component="div" className="invalid-feedback" />
            </div>
            <Button className='p-2 mb-2 mx-3 bg-success' variant="primary" type="submit">
              Güncelle
            </Button>
            <Button className='p-2 mb-2 mx-3 bg-warning' variant="primary" type="reset">
              Temizle
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminBrandUpdateForm;