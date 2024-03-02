import React from 'react';
import { Modal } from 'react-bootstrap';
import BrandUpdateForm from '../updateForm/brandUpdateForm';
import BrandDeleteForm from '../deleteForm/brandDeleteForm';

interface BrandModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const BrandUpdateModal: React.FC<BrandModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Marka Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BrandUpdateForm />
        <hr />
        <BrandDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default BrandUpdateModal;
