import React from 'react';
import { Modal } from 'react-bootstrap';
import AdminBrandUpdateForm from './AdminBrandUpdateForm';
import AdminBrandDeleteForm from './AdminBrandDeleteForm';

interface AdminBrandModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const AdminBrandUpdateModal: React.FC<AdminBrandModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Marka Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminBrandUpdateForm />
        <hr />
        <AdminBrandDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default AdminBrandUpdateModal;
