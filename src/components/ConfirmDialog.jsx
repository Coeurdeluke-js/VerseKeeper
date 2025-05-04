import React from 'react';
import styled from 'styled-components';

const DialogOverlay = styled.div`
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
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const DialogContainer = styled.div`
  background-color: var(--background-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  text-align: center;
  animation: slideUp 0.3s ease;
  
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(50px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 480px) {
    width: 85%;
    padding: 1.2rem;
  }
`;

const DialogTitle = styled.h3`
  color: var(--text-primary);
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const DialogMessage = styled.p`
  color: var(--text-primary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const Button = styled.button`
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    width: 100%;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: var(--golden);
  color: var(--deep-navy);
  border: none;
  
  &:hover {
    background-color: #c09c30;
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--text-secondary);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  
  return (
    <DialogOverlay onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <DialogContainer>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogMessage>{message}</DialogMessage>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>Aceptar</ConfirmButton>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
        </ButtonContainer>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default ConfirmDialog;