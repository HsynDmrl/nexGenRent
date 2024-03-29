import React from 'react';
import { Modal } from 'react-bootstrap';
import ColorUpdateForm from '../updateForm/colorUpdateForm';
import ColorDeleteForm from '../deleteForm/colorDeleteForm';

interface ColorModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const ColorUpdateModal: React.FC<ColorModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Renk Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ColorUpdateForm />
        <hr />
        <ColorDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default ColorUpdateModal;
