import React from 'react';
import { Modal } from 'react-bootstrap';
import ColorAddForm from '../addForm/colorAddForm';

interface ColorAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const ColorAddModal: React.FC<ColorAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Renk Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ColorAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default ColorAddModal;
