import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Alert } from 'react-bootstrap';
import { UpdateModelRequest } from '../../../models/models/requests/updateModelRequest';
import { ObjectSchema } from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { updateModel } from '../../../store/model/modelSlice';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { Brand } from '../../../models/brands/entity/brand';
import { getAll as getAllBrands } from '../../../store/brand/brandSlice';

const AdminModelUpdateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedModelId = useSelector((state: RootState) => state.model.selectedId);
  const allData = useSelector((state: RootState) => state.model.allData);
  const [brands, setBrands] = useState<Brand[]>([]);
  const allBrands = useSelector((state: RootState) => state.brand.allData);
  const modelData = allData.find(model => model.id === selectedModelId) || null;

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    if (allBrands.length > 0) {
      setBrands(allBrands);
    }
  }, [allBrands]);

  const initialValues: UpdateModelRequest = {
    id: selectedModelId ?? 0,
    name: modelData?.name ?? '',
    brandId: modelData?.brand.id ?? 0,
  };

  const validationSchema: ObjectSchema<UpdateModelRequest> = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string()
      .required('Model adı zorunludur.')
      .min(2, 'Model adı en az 2 karakter olmalıdır.')
      .max(50, 'Model adı en fazla 50 karakter olmalıdır.'),
    brandId: Yup.number().required('Marka seçmeniz gerekiyor.'),
  });

  const onSubmit = (values: UpdateModelRequest, { setStatus }: any) => {
    dispatch(updateModel(values))
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
              <label htmlFor="name" className="form-title">
                İsim
              </label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Model İsim Giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>
            <div>
              <label htmlFor="brandId" className="form-title mb-4">Marka {' '}</label>
              <Field as="select" name="brandId">
                <option value="">Marka Seçiniz </option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </Field>
              <ErrorMessage name="brandId" component="div" />
            </div>
            <Button className='p-2 mb-2 mx-3 bg-success' variant="primary" type="submit">
              Güncelle
            </Button>
            <Button className='p-2 mb-2 mx-3 bg-warning' variant="primary" type="reset">
              Temizle
            </Button>
            {status && status.success && <Alert variant="success">Marka başarıyla güncellendi.</Alert>}
            {status && !status.success && <Alert variant="danger">Marka güncellenirken bir hata oluştu.</Alert>}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AdminModelUpdateForm;
