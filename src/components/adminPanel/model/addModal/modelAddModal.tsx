import React from 'react';
import { Modal } from 'react-bootstrap';
import ModelAddForm from '../addForm/modelAddForm';

interface ModelAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const ModelAddModal: React.FC<ModelAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Model Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModelAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default ModelAddModal;
