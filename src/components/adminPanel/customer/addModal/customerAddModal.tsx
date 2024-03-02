import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomerAddForm from '../addForm/customerAddForm';

interface CustomerAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const CustomerAddModal: React.FC<CustomerAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Müşteri Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomerAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default CustomerAddModal;
