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
	isManuallySet?: boolean;
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
	default_amount: number;
};

export const usePaymentLogic = (
	player_id: string,
	isManager: boolean,
	monthlyPaymentAmount: number,
	discount: number
) => {
	const [paymentType, setPaymentType] = useState('dues');
	const [modalVisible, setModalVisible] = useState(false);
	const [totalAmountToPay, setTotalAmountToPay] = useState(0);
	const [paidAmountToPay, setPaidAmountToPay] = useState(0);
	const [pendingAmountToPay, setPendingAmountToPay] = useState(0);
	const [isSelectionMode, setIsSelectionMode] = useState(false);
	const [selectedMonths, setSelectedMonths] = useState<number[]>([]);
	const [annualPayment, setAnnualPayment] = useState<Payment[]>([]);

	const { data, refetch } = useGetPaymentQuery(player_id);
	const [createPayment] = useCreatePaymentMutation();

	const calculateDiscountedAmount = useCallback(
		(amount: number) => {
			return amount - (amount * discount) / 100;
		},
		[discount]
	);

	const generateAnnualPayment = useCallback(
		(data: Payment[] | undefined) => {
			const monthsInYear = 12;
			const paymentMap = new Map(
				data?.map((payment) => [payment.month, payment]) || []
			);

			return Array.from({ length: monthsInYear }, (_, month) => {
				const existingPayment = paymentMap.get(month);
				if (existingPayment) {
					return existingPayment;
				} else {
					const discountedAmount =
						calculateDiscountedAmount(monthlyPaymentAmount);
					return {
						month,
						amount: discountedAmount,
						status: 'pending' as const,
						paid: false,
					};
				}
			});
		},
		[calculateDiscountedAmount, monthlyPaymentAmount]
	);

	useEffect(() => {
		setAnnualPayment(generateAnnualPayment(data));
	}, [data, generateAnnualPayment]);

	const handleAmountChange = useCallback(
		(index: number, newAmount: number, isManualChange: boolean = false) => {
			if (!isManager) return;
			setAnnualPayment((prevPayments) => {
				const newPayments = [...prevPayments];
				if (newPayments[index]) {
					const finalAmount = isManualChange
						? newAmount
						: calculateDiscountedAmount(newAmount);
					newPayments[index] = {
						...newPayments[index],
						amount: finalAmount,
						isManuallySet: isManualChange, // Add this flag to track manual changes
					};
				}
				return newPayments;
			});
		},
		[isManager, calculateDiscountedAmount]
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
		selectedMonths.forEach((monthIndex) => {
			const payment = annualPayment[monthIndex];
			months_and_amounts[payment.month] = payment.amount;
		});

		const newPayment: FormState = {
			user_id: player_id,
			months_and_amounts: months_and_amounts,
			payment_with: 'credit_card',
			year: new Date().getFullYear(),
			status: 'paid',
			paid_date: new Date().toISOString(),
			province: 'Izmir',
			default_amount: calculateDiscountedAmount(monthlyPaymentAmount),
		};

		try {
			const response = await createPayment(newPayment).unwrap();
			if (response.status === 'success') {
				setSelectedMonths([]);
				return refetch();
			}
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
		let totalAmount = 0;
		let paidAmount = 0;
		let pendingAmount = 0;

		selectedMonths.forEach((monthIndex) => {
			const payment = annualPayment[monthIndex];
			const amount = payment?.amount || 0;
			totalAmount += amount;
			if (payment?.status === 'paid') {
				paidAmount += amount;
			} else {
				pendingAmount += amount;
			}
		});

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
		paidAmountToPay,
		pendingAmountToPay,
		handleAmountChange,
		toggleSelectionMode,
		toggleMonthSelection,
		processPayment,
		handleModalOnClose,
		showConfirmationModal,
		markAsPaid,
	};
};
