import React from 'react';
import { Modal } from 'react-bootstrap';
import RoleUpdateForm from '../updateForm/roleUpdateForm';
import RoleDeleteForm from '../deleteForm/roleDeleteForm';

interface RoleModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const RoleUpdateModal: React.FC<RoleModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Rol Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RoleUpdateForm />
        <hr />
        <RoleDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default RoleUpdateModal;
