import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--background-secondary);
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  color: var(--text-primary);
`;

const ModalMessage = styled.p`
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CancelButton = styled(Button)`
  background-color: var(--background-primary);
  color: var(--text-primary);
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalTitle>{title || '¿Estás seguro?'}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ButtonGroup>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmDialog;