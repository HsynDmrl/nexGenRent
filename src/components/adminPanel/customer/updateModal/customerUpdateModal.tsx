import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomerUpdateForm from '../updateForm/customerUpdateForm';
import CustomerDeleteForm from '../deleteForm/customerDeleteForm';

interface CustomerModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const CustomerUpdateModal: React.FC<CustomerModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Müşteri Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomerUpdateForm />
        <hr />
        <CustomerDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default CustomerUpdateModal;
