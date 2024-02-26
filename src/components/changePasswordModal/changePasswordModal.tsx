import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ChangePasswordModalProps {
  show: boolean;
  handleClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ show, handleClose }) => {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('Eski şifre zorunludur.')
      .min(6, 'Şifre en az 6 karakter olmalıdır.'),
    newPassword: Yup.string()
      .required('Yeni şifre zorunludur.')
      .min(6, 'Şifre en az 6 karakter olmalıdır.')
      .notOneOf([Yup.ref('oldPassword')], 'Yeni şifre eski şifre ile aynı olamaz.'),
    confirmNewPassword: Yup.string()
      .required('Yeni şifre tekrarı zorunludur.')
      .oneOf([Yup.ref('newPassword')], 'Yeni şifreler eşleşmiyor.')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle password change submission here
      console.log('Password change form submitted with values:', values);
    },
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className='text-dark'>Şifre Değiştirme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3 text-dark" controlId="oldPassword">
            <Form.Label>Eski Şifre</Form.Label>
            <Form.Control
              type="password"
              placeholder="Eski şifrenizi giriniz"
              {...formik.getFieldProps('oldPassword')}
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && <div className="text-danger">{formik.errors.oldPassword}</div>}
          </Form.Group>

          <Form.Group className="mb-3 text-dark" controlId="newPassword">
            <Form.Label>Yeni Şifre</Form.Label>
            <Form.Control
              type="password"
              placeholder="Yeni şifrenizi giriniz"
              {...formik.getFieldProps('newPassword')}
            />
            {formik.touched.newPassword && formik.errors.newPassword && <div className="text-danger">{formik.errors.newPassword}</div>}
          </Form.Group>

          <Form.Group className="mb-3 text-dark" controlId="confirmNewPassword">
            <Form.Label>Yeni Şifre Tekrar</Form.Label>
            <Form.Control
              type="password"
              placeholder="Yeni şifrenizi tekrar giriniz"
              {...formik.getFieldProps('confirmNewPassword')}
            />
            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && <div className="text-danger">{formik.errors.confirmNewPassword}</div>}
          </Form.Group>

          <Button variant="danger" type="submit">
            Şifre Değiştir
          </Button>
          <Button variant="secondary" onClick={handleClose} className="ms-2">
            İptal
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
