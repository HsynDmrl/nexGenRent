import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ChangePasswordModal from '../changePasswordModal/changePasswordModal';
import { RootState } from '../../store/configStore/configureStore';
import { useAppSelector } from '../../store/configStore/useAppSelector';
import { UpdateUserRequest } from '../../models/users/requests/updateUserRequest';

interface UserProfileModalProps {
  show: boolean;
  handleClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ show, handleClose }) => {
  const user = useAppSelector((state: RootState) => state.user.dataFromById);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const initialValues: UpdateUserRequest = {
    id: 0,
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

    },
  });

  const handlePasswordModalOpen = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-dark'>Kullanıcı Profili</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3 text-dark" controlId="name">
              <Form.Label>Ad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adınızı giriniz"
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
            </Form.Group>

            <Form.Group className="mb-3 text-dark" controlId="surname">
              <Form.Label>Soyad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Soyadınızı giriniz"
                {...formik.getFieldProps('surname')}
              />
              {formik.touched.surname && formik.errors.surname && <div className="text-danger">{formik.errors.surname}</div>}
            </Form.Group>
			
            <Form.Group className="mb-3 text-dark" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email adresinizi giriniz"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
            </Form.Group>

            <Form.Group className="mb-3 text-dark" controlId="gsm">
              <Form.Label>Telefon Numarası</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefon numaranızı giriniz"
                {...formik.getFieldProps('gsm')}
              />
              {formik.touched.gsm && formik.errors.gsm && <div className="text-danger">{formik.errors.gsm}</div>}
            </Form.Group>


            <Form.Group className="mb-3 text-dark" controlId="nationalityId">
              <Form.Label>TC Kimlik Numarası</Form.Label>
              <Form.Control
                type="text"
                placeholder="TC Kimlik numaranızı giriniz"
                {...formik.getFieldProps('nationalityId')}
              />
              {formik.touched.nationalityId && formik.errors.nationalityId && <div className="text-danger">{formik.errors.nationalityId}</div>}
            </Form.Group>

            <Button variant="primary" type="submit" className="me-2">
              Kaydet
            </Button>
            <Button variant="danger" onClick={handlePasswordModalOpen}>
              Şifre Değiştir
            </Button>
            <Button variant="secondary" onClick={handleClose} className="ms-2">
              İptal
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ChangePasswordModal show={showPasswordModal} handleClose={handlePasswordModalClose} />
    </>
  );
};

export default UserProfileModal;
