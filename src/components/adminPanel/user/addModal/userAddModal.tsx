import React from 'react';
import { Modal } from 'react-bootstrap';
import UserAddForm from '../addForm/userAddForm';

interface UserAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const UserAddModal: React.FC<UserAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Kullanıcı Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default UserAddModal;
