import React from 'react';
import { Modal } from 'react-bootstrap';
import AdminBrandAddForm from './AdminBrandAddForm';

interface AdminBrandAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const AdminBrandAddModal: React.FC<AdminBrandAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Marka Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminBrandAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default AdminBrandAddModal;
