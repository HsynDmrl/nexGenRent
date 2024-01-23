import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/api/auth/";
var isMNG;


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

const parseJwt = (token) => {
  if (!token) {
    console.error("Token is undefined.");
    return null;
  }

  const [header, payload, signature] = token.split('.');
  const decodedPayload = JSON.parse(atob(payload));

  return decodedPayload;
};

const login2 = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => { 
        const token = response.data;  // Token'ı buradan alın
        const decodedToken = parseJwt(token);  // Token'ı parse et
        isMNG=decodedToken;
        console.log("Token Payload: ", decodedToken);  // Payload'ı consola yazdır
        localStorage.setItem("email", JSON.stringify(response.data));

        // 1 saniye bekleyip sonra resolve ile devam et
        setTimeout(() => {
          resolve(response.data);
        }, 1000);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


const Login = ({onChange}) => {
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
            console.log(isMNG.roles,"data burası")
            if(isMNG.roles[0]=="ADMIN" || isMNG.roles[0]=="MANAGER"){
              navigate("/adminhome");
              window.location.reload();}
            // navigate("/adminhome");
            // window.location.reload();
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
