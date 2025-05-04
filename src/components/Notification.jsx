import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import Modal from './Modal';

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: ${props => {
    switch (props.$type) {
      case 'success': return 'rgba(46, 204, 113, 0.1)';
      case 'error': return 'rgba(231, 76, 60, 0.1)';
      default: return 'rgba(52, 152, 219, 0.1)';
    }
  }};
`;

const IconContainer = styled.div`
  margin-right: 1rem;
  font-size: 1.5rem;
  color: ${props => {
    switch (props.$type) {
      case 'success': return '#2ecc71';
      case 'error': return '#e74c3c';
      default: return '#3498db';
    }
  }};
`;

const Message = styled.p`
  margin: 0;
  color: var(--text-primary);
  flex: 1;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--golden);
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Notification = ({ message, type = 'info', onClose, action, actionText }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return <FaCheckCircle />;
      case 'error': return <FaExclamationCircle />;
      default: return <FaInfoCircle />;
    }
  };
  
  return (
    <Modal isOpen={!!message} onClose={onClose} title="Notificación">
      <NotificationContainer $type={type}>
        <IconContainer $type={type}>
          {getIcon()}
        </IconContainer>
        <Message>{message}</Message>
        {action && (
          <ActionButton onClick={action}>
            {actionText || 'Acción'}
          </ActionButton>
        )}
      </NotificationContainer>
    </Modal>
  );
};

export default Notification;