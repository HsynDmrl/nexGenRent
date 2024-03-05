import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../store/configStore/useAppDispatch';
import { Form, Alert } from 'react-bootstrap';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Geçerli bir email giriniz").required("Email alanı boş bırakılamaz"),
      password: Yup.string().required("Şifre alanı boş bırakılamaz")
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(loginUser(values));

        if (loginUser.fulfilled.match(resultAction)) {
          window.location.reload();
        } else if (loginUser.rejected.match(resultAction)) {
          setLoginError("Giriş yapılamadı. Kullanıcı adı veya şifre hatalı.");
        }
      } catch (error) {
        setLoginError("Giriş yapılamadı. Bir hata oluştu.");
      }
    }
  });

  const handleGoRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: "230px" }}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.email && formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Şifre:</Form.Label>
              <Form.Control
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: "230px" }}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.password && formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="rememberMe">
              <Form.Check
                type="checkbox"
                label="Beni Hatırla"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
            </Form.Group>

            {loginError && (
              <Alert variant="danger" onClose={() => setLoginError(null)} dismissible>
                {loginError}
              </Alert>
            )}

            <Form.Group className="d-grid">
              <button className="btn btn-primary" type="submit">Giriş Yap</button>
              <button className="btn btn-secondary mt-2" type="button" onClick={handleGoRegister}>Kayıt Ol</button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
