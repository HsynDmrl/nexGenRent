import React from 'react';
import { Modal } from 'react-bootstrap';
import ModelUpdateForm from '../updateForm/modelUpdateForm';
import ModelDeleteForm from '../deleteForm/modelDeleteForm';

interface ModelModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const ModelUpdateModal: React.FC<ModelModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Model Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModelUpdateForm />
        <hr />
        <ModelDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default ModelUpdateModal;
