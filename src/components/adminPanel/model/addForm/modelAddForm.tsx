import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/configStore/configureStore';
import { getAll, addModel } from '../../../../store/model/modelSlice';
import { Brand } from '../../../../models/brands/entity/brand';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { getAll as getAllBrands } from '../../../../store/brand/brandSlice';
import { Button, Alert } from 'react-bootstrap';

const ModelAddForm = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const dispatch = useAppDispatch();
  const allBrands = useSelector((state: RootState) => state.brand.allData);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (allBrands.length > 0) {
      setBrands(allBrands);
    }
  }, [allBrands]);

  const initialValues = {
    name: '',
    brandId: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
    .required('İsim alanı zorunludur')
    .matches(/^[A-ZÇĞİÖŞÜ][a-zçğıöşü0-9]{1,13}$/, 'İsim formatı geçersiz. Baş harf büyük olmalı, 1-13 karakter arası küçük harf, rakam veya Türkçe karakter içerebilir')
    .max(50, 'Model adı en fazla 50 karakter olmalıdır.'),
    brandId: Yup.string()
      .required('Marka alanı zorunludur'),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      await dispatch(addModel(values));
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
      resetForm();
    } catch (error: any) {
      console.error('Model eklenirken hata oluştu:', error);
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
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-black">İsim</label>
              <Field
                type="text"
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Model ismi giriniz"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="brandId" className="form-label text-black">Marka</label>
              <Field as="select" id="brandId" name="brandId" className={`form-select ${errors.brandId && touched.brandId ? 'is-invalid' : ''}`}>
                <option value="">Marka Seçiniz</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </Field>
              <ErrorMessage name="brandId" component="div" className="invalid-feedback" />
            </div>

            <Button className='mb-2' variant="success" type="submit">Kaydet</Button>
            <Button className='mb-2 mx-4' variant="warning" type="reset">Temizle</Button>
            {isSuccess && <Alert variant="success">Form başarıyla gönderildi!</Alert>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModelAddForm;
