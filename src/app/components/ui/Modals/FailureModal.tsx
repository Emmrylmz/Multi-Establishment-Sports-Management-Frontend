// components/ui/Modals/FailureModal.tsx
import React from 'react';
import BaseModal from './BaseModal';

interface FailureModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const FailureModal: React.FC<FailureModalProps> = ({ visible, onClose, message }) => {
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="Error"
      message={message}
      iconName="alert-circle"
      iconColor="#D32F2F"
      buttonText="Close"
      buttonColor="#D32F2F"
    />
  );
};

export default FailureModal;