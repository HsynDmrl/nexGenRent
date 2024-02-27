import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configStore/configureStore';
import { getAll, addModel } from '../../../store/model/modelSlice';
import { Brand } from '../../../models/brands/entity/brand';
import { useAppDispatch } from '../../../store/configStore/useAppDispatch';
import { getAll as getAllBrands } from '../../../store/brand/brandSlice';
import { Button, Alert } from 'react-bootstrap';

const AdminModelAddForm = () => {
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
      .required('Name is required'),
    brandId: Yup.string()
      .required('Brand is required'),
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
      console.error('Error adding model:', error);
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
            <label htmlFor="name" className="form-title text-dark">İsim</label> 
			<Field
                    type="text"
                    name="name"
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                    placeholder="Marka İsim Giriniz"
                />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="brandId" className="form-title text-dark">Marka</label>
            <Field as="select" name="brandId">
              <option value="">Marka Seçiniz</option>
              {brands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </Field>
            <ErrorMessage name="brandId" component="div" />
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

export default AdminModelAddForm;
