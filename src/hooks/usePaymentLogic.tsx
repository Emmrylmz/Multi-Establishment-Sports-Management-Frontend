import { useState, useEffect, useCallback } from 'react';
import {
	useGetPaymentQuery,
	useCreatePaymentMutation,
} from '../features/query/paymentQueryService';

type Payment = {
	_id: string;
	amount: number;
	created_at: Date;
	description: string | null;
	due_date: Date;
	month: number;
	paid_date: Date;
	payment_type: 'monthly' | 'annual';
	payment_with:
		| 'credit_card'
		| 'cash'
		| 'bank_transfer'
		| 'mobile_payment'
		| 'other';
	province: string;
	status: 'paid' | 'pending' | 'overdue';
	user_id: string;
	year: number;
};

type FormState = {
	user_id: string;
	months_and_amounts: { [key: number]: number };
	payment_with:
		| 'credit_card'
		| 'cash'
		| 'bank_transfer'
		| 'mobile_payment'
		| 'other';
	year: number;
	status: 'paid' | 'pending' | 'overdue';
	paid_date: string;
	province: string;
};

export const usePaymentLogic = (player_id: string, isManager: boolean) => {
	const [paymentType, setPaymentType] = useState('dues');
	const [modalVisible, setModalVisible] = useState(false);
	const [totalAmountToPay, setTotalAmountToPay] = useState(0);
	const [isSelectionMode, setIsSelectionMode] = useState(false);
	const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
	const [annualPayment, setAnnualPayment] = useState<Payment[]>([]);
	const [paidAmountToPay, setPaidAmountToPay] = useState(0);
	const [pendingAmountToPay, setPendingAmountToPay] = useState(0);

	const { data, refetch } = useGetPaymentQuery(player_id);
	const [createPayment] = useCreatePaymentMutation();

	useEffect(() => {
		setAnnualPayment(generateAnnualPayment(data));
	}, [data]);

	const generateAnnualPayment = (data: Payment[] | undefined) => {
		const monthsInYear = 12;
		const paymentMap = new Map(
			data?.map((payment) => [payment.month, payment]) || []
		);

		return Array.from({ length: monthsInYear }, (_, month) => {
			return (
				paymentMap.get(month) || {
					month,
					amount: 2000,
					status: 'pending',
					paid: false,
				}
			);
		});
	};

	const handleAmountChange = useCallback(
		(index: number, newAmount: number) => {
			if (!isManager) return;
			setAnnualPayment((prevPayments) => {
				const newPayments = [...prevPayments];
				if (newPayments[index]) {
					newPayments[index] = { ...newPayments[index], amount: newAmount };
				}
				return newPayments;
			});
		},
		[isManager]
	);

	const toggleSelectionMode = useCallback(() => {
		if (!isManager) return;
		setIsSelectionMode((prev) => !prev);
		setSelectedMonths([]);
	}, [isManager]);

	const toggleMonthSelection = useCallback(
		(index: number) => {
			if (!isManager || !isSelectionMode) return;

			setSelectedMonths((prev) => {
				if (prev.includes(index)) {
					return prev.filter((i) => i !== index);
				} else {
					return [...prev, index];
				}
			});
		},
		[isManager, isSelectionMode]
	);

	const processPayment = useCallback(async () => {
		if (!isManager) return;
		setModalVisible(false);
		setIsSelectionMode(false);

		const months_and_amounts: { [key: number]: number } = {};
		const paidMonths: number[] = [];
		const pendingMonths: number[] = [];

		selectedMonths.forEach((monthIndex) => {
			const payment = annualPayment[monthIndex];
			months_and_amounts[payment.month] = payment.amount;
			if (payment.status === 'paid') {
				paidMonths.push(payment.month);
			} else {
				pendingMonths.push(payment.month);
			}
		});

		const createPaymentPayload = (
			status: 'paid' | 'pending',
			months: number[]
		) => ({
			user_id: player_id,
			months_and_amounts: Object.fromEntries(
				months.map((month) => [month, months_and_amounts[month]])
			),
			payment_with: 'credit_card',
			year: new Date().getFullYear(),
			status: status,
			paid_date: status === 'paid' ? new Date().toISOString() : null,
			province: 'Izmir',
		});

		try {
			if (paidMonths.length > 0) {
				await createPayment(createPaymentPayload('pending', paidMonths)).unwrap();
			}
			if (pendingMonths.length > 0) {
				await createPayment(
					createPaymentPayload('paid', pendingMonths)
				).unwrap();
			}
			setSelectedMonths([]);
			return refetch();
		} catch (error: any) {
			console.error('Error creating payment:', error);
			let errorMessage = 'An unexpected error occurred';
			if (error.data) {
				errorMessage =
					typeof error.data === 'string'
						? error.data
						: JSON.stringify(error.data);
			}
			console.error('Error message to show user:', errorMessage);
		}
	}, [
		isManager,
		selectedMonths,
		annualPayment,
		player_id,
		createPayment,
		refetch,
	]);

	const handleModalOnClose = useCallback(() => {
		setModalVisible(false);
		setIsSelectionMode(false);
		setSelectedMonths([]);
	}, []);

	const showConfirmationModal = useCallback(() => {
		const { totalAmount, paidAmount, pendingAmount } = selectedMonths.reduce(
			(acc, monthIndex) => {
				const payment = annualPayment[monthIndex];
				const amount = payment?.amount || 0;
				acc.totalAmount += amount;
				if (payment.status === 'paid') {
					acc.paidAmount += amount;
				} else {
					acc.pendingAmount += amount;
				}
				return acc;
			},
			{ totalAmount: 0, paidAmount: 0, pendingAmount: 0 }
		);

		setTotalAmountToPay(totalAmount);
		setPaidAmountToPay(paidAmount);
		setPendingAmountToPay(pendingAmount);
		setModalVisible(true);
	}, [selectedMonths, annualPayment]);

	const markAsPaid = useCallback(() => {
		showConfirmationModal();
	}, [showConfirmationModal]);

	return {
		paymentType,
		setPaymentType,
		modalVisible,
		setModalVisible,
		annualPayment,
		isSelectionMode,
		selectedMonths,
		totalAmountToPay,
		handleAmountChange,
		toggleSelectionMode,
		toggleMonthSelection,
		processPayment,
		handleModalOnClose,
		showConfirmationModal,
		markAsPaid,
		paidAmountToPay,
		pendingAmountToPay,
	};
};
