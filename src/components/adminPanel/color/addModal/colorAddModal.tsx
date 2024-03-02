import React from 'react';
import { Modal } from 'react-bootstrap';
import AdminColorAddForm from '../addForm/colorAddForm';

interface AdminColorAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const AdminColorAddModal: React.FC<AdminColorAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Renk Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminColorAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default AdminColorAddModal;
