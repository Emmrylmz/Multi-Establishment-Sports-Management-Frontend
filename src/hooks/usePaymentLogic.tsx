import { useState, useEffect, useCallback } from 'react';
import {
	useGetPaymentQuery,
	useCreatePaymentMutation,
	useGetPaymentByYearQueryQuery,
} from '../features/query/paymentQueryService';

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
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

	const { data, refetch } = useGetPaymentByYearQueryQuery({
		userId: player_id,
		year: selectedYear,
	});
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
						isManuallySet: isManualChange,
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

	const togglePaymentStatus = useCallback(
		(index: number) => {
			if (!isManager || isSelectionMode) return;
			toggleMonthSelection(index);
		},
		[isManager, isSelectionMode, toggleMonthSelection]
	);

	const processPayment = useCallback(async () => {
		if (!isManager) return;
		setModalVisible(false);
		setIsSelectionMode(false);

		const months_and_amounts: { [key: number]: number } = {};
		const statusUpdates: { [key: number]: 'paid' | 'pending' } = {};

		selectedMonths.forEach((monthIndex) => {
			const payment = annualPayment[monthIndex];
			months_and_amounts[payment.month] = payment.amount;
			statusUpdates[payment.month] =
				payment.status === 'paid' ? 'pending' : 'paid';
		});

		// Determine the overall status based on the updates
		const overallStatus = Object.values(statusUpdates).every(
			(status) => status === 'paid'
		)
			? 'paid'
			: 'pending';

		const newPayment: FormState = {
			user_id: player_id,
			months_and_amounts: months_and_amounts,
			status_updates: statusUpdates,
			status: overallStatus, // This will now be either 'paid' or 'pending'
			payment_with: 'credit_card',
			year: selectedYear,
			paid_date: new Date().toISOString(),
			province: 'Izmir',
			default_amount: calculateDiscountedAmount(monthlyPaymentAmount),
		};

		try {
			const response = await createPayment(newPayment).unwrap();
			if (response.status === 'success') {
				// Update local state
				setAnnualPayment((prevPayments) => {
					return prevPayments.map((payment) => {
						if (statusUpdates.hasOwnProperty(payment.month)) {
							return {
								...payment,
								status: statusUpdates[payment.month],
								paid: statusUpdates[payment.month] === 'paid',
							};
						}
						return payment;
					});
				});

				setSelectedMonths([]);
				// Refetch data to ensure consistency with backend
				await refetch();
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
			// Optionally, show an error message to the user here
		}
	}, [
		isManager,
		selectedMonths,
		annualPayment,
		player_id,
		createPayment,
		refetch,
		selectedYear,
		calculateDiscountedAmount,
		monthlyPaymentAmount,
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

	const changeYear = useCallback((year: number) => {
		setSelectedYear(year);
	}, []);

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
		selectedYear,
		changeYear,
		togglePaymentStatus,
	};
};
