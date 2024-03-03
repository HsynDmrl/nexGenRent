import React from 'react';
import { Modal } from 'react-bootstrap';
import RoleAddForm from '../addForm/roleAddForm';

interface RoleAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const RoleAddModal: React.FC<RoleAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Rol Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RoleAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default RoleAddModal;
