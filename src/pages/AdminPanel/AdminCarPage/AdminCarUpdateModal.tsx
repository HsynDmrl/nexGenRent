import React from 'react';
import { Modal } from 'react-bootstrap';
import AdminCarUpdateForm from './AdminCarUpdateForm';
import AdminCarDeleteForm from './AdminCarDeleteForm';

interface AdminCarModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const AdminCarUpdateModal: React.FC<AdminCarModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Araba Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminCarUpdateForm />
        <hr />
        <AdminCarDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default AdminCarUpdateModal;
