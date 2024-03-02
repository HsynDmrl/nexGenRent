import React from 'react';
import { Modal } from 'react-bootstrap';
import BrandAddForm from '../addForm/brandAddForm';

interface BrandAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const BrandAddModal: React.FC<BrandAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Marka Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BrandAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default BrandAddModal;
