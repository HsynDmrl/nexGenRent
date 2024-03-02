import React from 'react';
import { Modal } from 'react-bootstrap';
import CarUpdateForm from '../updateForm/carUpdateForm';
import CarDeleteForm from '../deleteForm/carDeleteForm';

interface CarModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const CarUpdateModal: React.FC<CarModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Araba Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CarUpdateForm />
        <hr />
        <CarDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default CarUpdateModal;
