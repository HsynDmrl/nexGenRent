import React, { useState, ChangeEvent } from "react";
import authService from '../../services/authService';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    roleId: "",
    name: "",
    surname: "",
    nationalityId: "",
    gsm: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegister = async () => {
    try {
      const { email, password, roleId, name, surname, nationalityId, gsm } = formData;
      await authService.register(name, surname, nationalityId, gsm, email, password, Number(roleId));
      // window.location.reload();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Kayıt Ol</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted">
              Lütfen e postanızı giriniz.
            </Form.Text>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email adresinizi girin"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Text>Şifre:</Form.Text>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Şifrenizi girin"
              />
            </Form.Group>


            <Form.Group controlId="formBasicName">
              <Form.Text>Ad:</Form.Text>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicSurname">
              <Form.Text>Soyad:</Form.Text>
              <Form.Control
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicNationalityId">
              <Form.Text>TC Kimlik Numarası:</Form.Text>
              <Form.Control
                type="text"
                name="nationalityId"
                value={formData.nationalityId}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicGsm">
              <Form.Text>GSM Numarası:</Form.Text>
              <Form.Control
                type="tel"
                name="gsm"
                value={formData.gsm}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleRegister}>
              Kayıt Ol
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
