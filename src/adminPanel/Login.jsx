import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const API_URL = "http://localhost:8080/api/auth/";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const login2 = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => { 
        console.log(response)
        localStorage.setItem("email", JSON.stringify(response.data));

      return response.data;
    });
};

const Login = () => {
  const navigate = useNavigate(); 
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          acceptedTerms: false
        }}
        validationSchema={Yup.object({
          // ... (yukarıdaki kısım değişmemiş)
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await login2(values.email, values.password);
            console.log(response);
            navigate("/adminhome");
            window.location.reload();
          } catch (error) {
            console.error("Login failed", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form>
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MyTextInput
            label="Password"
            name="password"  // Değiştirildi: email'den password'e
            type="password"
            placeholder="Your password"
          />

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Giriş yap</button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;