import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import * as Yup from "yup";
import { useFormik } from "formik";
import authService from '../../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppSelector } from "../../store/configStore/useAppSelector";
import { RootState } from "../../store/configStore/configureStore";

const Register = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const isLogged = useAppSelector((state:RootState) => state.auth.isAuthenticated);

  if (isLogged) {
    window.location.href = "/";
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Ad en az 2 karakter olmalıdır")
      .max(30, "Ad en fazla 30 karakter olmalıdır")
      .required("Ad alanı boş bırakılamaz")
      .matches(
        /^[A-ZÇĞİÖŞÜ][a-zçğıöşü]+$/,
        "Adınızın ilk harfi büyük, diğer harfler küçük olmalıdır"
      ),
    surname: Yup.string()
      .min(2, "Soyad en az 2 karakter olmalıdır")
      .max(20, "Soyad en fazla 20 karakter olmalıdır")
      .required("Soyad alanı boş bırakılamaz")
      .matches(
        /^[A-ZÇĞİÖŞÜ][a-zçğıöşü]+$/,
        "Soyadınızın ilk harfi büyük, diğer harfler küçük olmalıdır"
      ),
    nationalityId: Yup.string()
      .matches(/^\d{11}$/, "Geçerli bir TC Kimlik Numarası giriniz")
      .required("TC Kimlik Numarası alanı boş bırakılamaz"),
    gsm: Yup.string()
      .matches(/^\d{11}$/, "Geçerli bir GSM Numarası giriniz")
      .required("GSM Numarası alanı boş bırakılamaz"),
    email: Yup.string()
      .email("Geçerli bir email adresi giriniz")
      .required("Email alanı boş bırakılamaz"),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[A-Z]).{8,16}$/,
        "Şifre en az 8 karakter, en fazla 16 karakter olmalı ve en az bir büyük harf ve bir rakam içermelidir"
      )
      .required("Şifre alanı boş bırakılamaz"),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
        .required('Şifre tekrarı alanı boş bırakılamaz')
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordRepeat: "",
      roleId: "",
      name: "",
      surname: "",
      nationalityId: "",
      gsm: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { email, password, roleId, name, surname, nationalityId, gsm } = values;
        await authService.register(name, surname, nationalityId, gsm, email, password, Number(roleId));
        setRegistrationSuccess(true);
      } catch (error: any) {
        if (error && error.response && error.response.data.status === 409) {
          setRegistrationError("Bu bilgilere ait daha önce kayıt bulunmuştur, Lütfen farklı bilgilerle tekrar deneyin.");
        }
        else {
          setRegistrationError("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      }
    }
  });

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Kayıt Ol</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Text className="text-muted">
                E-postanızı giriniz.
              </Form.Text>
              <Form.Control
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email adresinizi girin"
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.email && formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Text className="text-muted">
                Şifrenizi giriniz.
              </Form.Text>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Şifrenizi girin"
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.password && formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="passwordRepeat">
              <Form.Text className="text-muted">
                Şifrenizi tekrar giriniz.
              </Form.Text>
              <Form.Control
                type="password"
                name="passwordRepeat"
                value={formik.values.passwordRepeat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Şifrenizi tekrar girin"
                isInvalid={formik.touched.passwordRepeat && !!formik.errors.passwordRepeat}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.passwordRepeat && formik.errors.passwordRepeat}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Text className="text-muted">
                Adınızı giriniz.
              </Form.Text>
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Adınızı girin"
                isInvalid={formik.touched.name && !!formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.name && formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="surname">
              <Form.Text className="text-muted">
                Soyadınızı giriniz.
              </Form.Text>
              <Form.Control
                type="text"
                name="surname"
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Soyadınızı girin"
                isInvalid={formik.touched.surname && !!formik.errors.surname}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.surname && formik.errors.surname}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="nationalityId">
              <Form.Text className="text-muted">
                TC Kimlik Numaranızı giriniz.
              </Form.Text>
              <Form.Control
                type="text"
                name="nationalityId"
                value={formik.values.nationalityId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="TC Kimlik Numaranızı girin"
                isInvalid={formik.touched.nationalityId && !!formik.errors.nationalityId}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.nationalityId && formik.errors.nationalityId}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="gsm">
              <Form.Text className="text-muted">
                GSM Numaranızı giriniz.
              </Form.Text>
              <Form.Control
                type="text"
                name="gsm"
                value={formik.values.gsm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="GSM Numaranızı girin"
                className="mb-2"
                isInvalid={formik.touched.gsm && !!formik.errors.gsm}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.gsm && formik.errors.gsm}
              </Form.Control.Feedback>
            </Form.Group>


            {registrationSuccess && (
              <Alert variant="success" className="mt-2" onClose={() => setRegistrationSuccess(false)} dismissible>
                Kayıt işlemi başarıyla tamamlandı.
              </Alert>
            )}
            {registrationError && (
              <Alert variant="danger" className="mt-2" onClose={() => setRegistrationError("")} dismissible>
                {registrationError}
              </Alert>
            )}
            <Button variant="success" className="mt-2" type="submit">
              Kayıt Ol
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
