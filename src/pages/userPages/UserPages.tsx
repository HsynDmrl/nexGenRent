import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RootState } from '../../store/configStore/configureStore';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { UpdateUserRequest } from '../../models/users/requests/updateUserRequest';

const UserProfilePage: React.FC = () => {
  const user = useAppSelector((state: RootState) => state.user.dataFromById);

  const initialValues: UpdateUserRequest = {
    id: user?.id ?? 0,
    email: user?.email ?? '',
    gsm: user?.gsm ?? '',
    name: user?.name ?? '',
    surname: user?.surname ?? '',
    nationalityId: user?.nationalityId ?? '',
  };

  const validationSchema: Yup.ObjectSchema<UpdateUserRequest> = Yup.object().shape({
    id: Yup.number().required(),
    email: Yup.string().email('Geçerli bir email adresi giriniz').required('Email adresi zorunludur.'),
    gsm: Yup.string().required('Telefon numarası zorunludur.'),
    name: Yup.string().required('Ad zorunludur.'),
    surname: Yup.string().required('Soyad zorunludur.'),
    nationalityId: Yup.string().required('TC Kimlik numarası zorunludur.'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log('Form submitted with values:', values);
    },
  });

  return (
    <Container>
    <Row className="justify-content-md-center my-5">
      <Col xs={12} md={6}>
        <h2>Kullanıcı Profili</h2>
        <Form noValidate onSubmit={formik.handleSubmit}>
          {/* Email alanı */}
          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Text className="text-muted">
              Lütfen geçerli bir email adresi giriniz.
            </Form.Text>
            <Form.Control 
              type="email" 
              placeholder="örnek@adres.com" 
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
  
          {/* Ad alanı */}
          <Form.Group className="mb-3" controlId="formGridName">
            <Form.Text className="text-muted">
              Lütfen adınızı giriniz.
            </Form.Text>
            <Form.Control 
              type="text" 
              placeholder="Adınız" 
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
  
          {/* Soyad alanı */}
          <Form.Group className="mb-3" controlId="formGridSurname">
            <Form.Text className="text-muted">
              Lütfen soyadınızı giriniz.
            </Form.Text>
            <Form.Control 
              type="text" 
              placeholder="Soyadınız" 
              name="surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.surname}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.surname}
            </Form.Control.Feedback>
          </Form.Group>
  
          {/* Telefon Numarası alanı */}
          <Form.Group className="mb-3" controlId="formGridGSM">
            <Form.Text className="text-muted">
              Lütfen telefon numaranızı giriniz.
            </Form.Text>
            <Form.Control 
              type="text" 
              placeholder="+90 5XX XXX XX XX" 
              name="gsm"
              value={formik.values.gsm}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.gsm}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.gsm}
            </Form.Control.Feedback>
          </Form.Group>
  
          {/* TC Kimlik Numarası alanı */}
          <Form.Group className="mb-3" controlId="formNationalityId">
            <Form.Text className="text-muted">
              Lütfen TC Kimlik numaranızı giriniz.
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="TC Kimlik numaranız" 
              name="nationalityId"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nationalityId}
              isInvalid={!!formik.errors.nationalityId}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nationalityId}
            </Form.Control.Feedback>
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Güncelle
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  
    
  );
};

export default UserProfilePage;
