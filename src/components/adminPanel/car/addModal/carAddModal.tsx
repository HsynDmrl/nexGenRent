import React from 'react';
import { Modal } from 'react-bootstrap';
import CarAddForm from '../addForm/carAddForm';

interface CarAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const CarAddModal: React.FC<CarAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Araba Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CarAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default CarAddModal;
