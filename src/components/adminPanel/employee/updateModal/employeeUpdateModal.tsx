import React from 'react';
import { Modal } from 'react-bootstrap';
import EmployeeUpdateForm from '../updateForm/employeeUpdateForm';
import EmployeeDeleteForm from '../deleteForm/employeeDeleteForm';

interface EmployeeModalProps {
  showUpdateForm: boolean;
  handleCloseUpdateForm: () => void;
}

const EmployeeUpdateModal: React.FC<EmployeeModalProps> = ({ showUpdateForm, handleCloseUpdateForm }) => {
  return (
    <Modal show={showUpdateForm} onHide={handleCloseUpdateForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>
          <h2>Çalışan Güncelle veya Sil</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmployeeUpdateForm />
        <hr />
        <EmployeeDeleteForm />
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeUpdateModal;
