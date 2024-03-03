import React from 'react';
import { Modal } from 'react-bootstrap';
import InvoiceUpdateForm from '../updateForm/invoiceUpdateForm';
import InvoiceDeleteForm from '../deleteForm/invoiceDeleteForm';

interface InvoiceModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const InvoiceUpdateModal: React.FC<InvoiceModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Fatura Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InvoiceUpdateForm />
        <hr />
        <InvoiceDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default InvoiceUpdateModal;
