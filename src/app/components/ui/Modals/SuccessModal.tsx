// components/ui/Modals/SuccessModal.tsx
import React from 'react';
import BaseModal from './BaseModal';

interface SuccessModalProps {
	visible: boolean;
	onClose: () => void;
	message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
	visible,
	onClose,
	message,
}) => {
	return (
		<BaseModal
			visible={visible}
			onClose={onClose}
			title="Success"
			message={message}
			iconName="check-circle"
			iconColor="#00897B"
			buttonText="OK"
			buttonColor="#00897B"
		/>
	);
};

export default SuccessModal;
