import React from 'react'
import { Field, Form, Formik, FormikProps } from 'formik';
import { Container } from 'react-bootstrap';

export default function Login() {
  return (
    <div>
        <Container>
        <h1>Login</h1>
    {/* Formik kullanarak form yönetimini başlatma */}
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      // Form submit olduğunda çalışacak fonksiyon
      onSubmit={async (values) => {
        // Formu gönderdikten sonra bir süre bekleyip, form değerlerini alert ile gösterme
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {/* Formun içeriği */}
      <Form>
        {/* E-posta girişi için alan */}
        <label htmlFor="email">Email</label>
        <Field
          type="email"
          id="email"
          name="email"
          placeholder="jane@acme.com"
        />

        {/* Şifre girişi için alan */}
        <label htmlFor="password">Password</label>
        <Field
          type="password"
          id="password"
          name="password"
          placeholder="Your Password"
        />

        {/* Formu göndermek için buton */}
        <button type="submit">Login</button>
      </Form>
    </Formik>
        </Container>
    </div>
  )
}
