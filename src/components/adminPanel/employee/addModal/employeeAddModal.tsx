import React from 'react';
import { Modal } from 'react-bootstrap';
import EmployeeAddForm from '../addForm/employeeAddForm';

interface EmployeeAddModalProps {
  showAddForm: boolean;
  handleCloseAddForm: () => void;
}

const EmployeeAddModal: React.FC<EmployeeAddModalProps> = ({ showAddForm, handleCloseAddForm }) => {
  return (
    <Modal show={showAddForm} onHide={handleCloseAddForm}>
      <Modal.Header closeButton>
        <Modal.Title className='form-title'>Çalışan Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmployeeAddForm />
      </Modal.Body>
    </Modal>
  );
};

export default EmployeeAddModal;
