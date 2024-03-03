import React from 'react';
import { Modal } from 'react-bootstrap';
import UserUpdateForm from '../updateForm/userUpdateForm';
import UserDeleteForm from '../deleteForm/userDeleteForm';

interface UserModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const UserUpdateModal: React.FC<UserModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Kullanıcı Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserUpdateForm />
        <hr />
        <UserDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default UserUpdateModal;
