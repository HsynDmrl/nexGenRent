import React from 'react';
import { Modal } from 'react-bootstrap';
import AdminColorUpdateForm from '../updateForm/colorUpdateForm';
import AdminColorDeleteForm from '../deleteForm/colorDeleteForm';

interface AdminColorModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const AdminColorUpdateModal: React.FC<AdminColorModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Renk Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AdminColorUpdateForm />
        <hr />
        <AdminColorDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default AdminColorUpdateModal;
