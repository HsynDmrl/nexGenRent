import React from 'react';
import { Modal } from 'react-bootstrap';
import InvoiceAddForm from '../addForm/invoiceAddForm';

interface InvoiceAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const InvoiceAddModal: React.FC<InvoiceAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Fatura Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InvoiceAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default InvoiceAddModal;
