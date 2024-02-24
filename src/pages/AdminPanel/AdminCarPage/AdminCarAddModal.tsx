import React from 'react';
import { Modal } from 'react-bootstrap';
import AdminCarAddForm from './AdminCarAddForm';

interface AdminCarAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const AdminCarAddModal: React.FC<AdminCarAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Araba Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminCarAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default AdminCarAddModal;
