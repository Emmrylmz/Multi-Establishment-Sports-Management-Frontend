import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Animated,
	SafeAreaView,
	ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PaymentOverview from '../../components/ui/payments/PaymentOverview';
import ConfirmOrCancelView from '../../components/ui/payments/ConfirmOrCancelView';
import PaymentItem from '../../components/ui/payments/PaymentItem';
import {
	useGetPaymentQuery,
	useCreatePaymentMutation,
} from '../../../features/query/paymentQueryService';
import PaymentAnimation from '../../components/ui/payments/PaymentAnimation';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../../components/ui/Modals/ConfirmationModal';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { usePaymentLogic } from '../../../hooks/usePaymentLogic';

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

type MonthsAndAmounts = {
	[key: number]: number;
};

type FormState = {
	user_id: string;
	months_and_amounts: MonthsAndAmounts;
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

const ManagerPlayerPaymentDetailPage = ({ route, navigation }) => {
	const { t } = useTranslation();
	const insets = useSafeAreaInsets();
	const user = useSelector((state: RootState) => getAuthUser(state));
	const isManager = user?.role === 'Manager';
	const { player_id, dues } = route.params;

	const {
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
	} = usePaymentLogic(player_id, isManager);

	const {
		data,
		error: errorLoadingPayments,
		isLoading: isLoadingPayments,
		refetch,
	} = useGetPaymentQuery(player_id);
	const [
		createPayment,
		{ isLoading: isCreatingPayment, isError: isCreatePaymentError },
	] = useCreatePaymentMutation();

	const [fadeAnim] = useState(new Animated.Value(0));
	const [scaleAnim] = useState(new Animated.Value(0.5));

	useEffect(() => {
		if (isCreatingPayment || isCreatePaymentError) {
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.spring(scaleAnim, {
					toValue: 1,
					friction: 4,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	}, [isCreatingPayment, isCreatePaymentError]);

	const monthNames = useMemo(
		() => [
			t('months.january'),
			t('months.february'),
			t('months.march'),
			t('months.april'),
			t('months.may'),
			t('months.june'),
			t('months.july'),
			t('months.august'),
			t('months.september'),
			t('months.october'),
			t('months.november'),
			t('months.december'),
		],
		[t]
	);

	const { totalPaid, totalPayment } = useMemo(() => {
		let paid = 0;
		let total = 0;
		annualPayment.forEach((payment) => {
			if (!payment) return;
			const amount =
				typeof payment.amount === 'object'
					? payment.amount.dues || 0
					: payment.amount || 0;
			total += Number(amount);
			if (payment.status === 'paid') paid += Number(amount);
		});
		return { totalPaid: paid, totalPayment: total };
	}, [annualPayment]);

	const renderPaymentItems = useCallback(() => {
		if (paymentType === 'dues') {
			return annualPayment.map((payment, index) => (
				<PaymentItem
					key={index}
					month={monthNames[payment?.month] || ''}
					amount={payment?.amount || 0}
					status={payment?.status || 'pending'}
					isSelected={selectedMonths.includes(index)}
					isSelectionMode={isSelectionMode && isManager}
					onPress={() => toggleMonthSelection(index)}
					onAmountChange={
						isManager
							? (newAmount) => handleAmountChange(index, newAmount)
							: undefined
					}
					editable={isManager && !isSelectionMode}
				/>
			));
		}
		return (
			<Text className="py-4 text-center">
				Personal Training Payment data will be displayed here.
			</Text>
		);
	}, [
		paymentType,
		annualPayment,
		monthNames,
		selectedMonths,
		isSelectionMode,
		isManager,
		toggleMonthSelection,
		handleAmountChange,
	]);

	if (isLoadingPayments) {
		return (
			<SafeAreaView>
				<ActivityIndicator size="large" color="#ccc" />
				<Text className="text-xl text-center">
					{t('fetchMessages.loading')}
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView>
			<View
				className={`w-full h-full bg-white dark:bg-dacka-black pt-${insets.top}`}
			>
				<View className="px-4">
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Ionicons name="arrow-back-outline" size={24} color="black" />
					</TouchableOpacity>
				</View>
				<View className="flex-row w-full px-4 py-2 bg-white dark:bg-dacka-black">
					<TouchableOpacity
						className={`flex-1 py-3 rounded-l-full ${
							paymentType === 'dues'
								? 'bg-green-500 dark:bg-green-700'
								: 'bg-gray-200 dark:bg-gray-700'
						}`}
						onPress={() => setPaymentType('dues')}
					>
						<Text
							className={`font-semibold text-center ${
								paymentType === 'dues'
									? 'text-white'
									: 'text-gray-700 dark:text-gray-300'
							}`}
						>
							{t('playerPaymentDetail.duesPayment')}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className={`flex-1 py-3 rounded-r-full ${
							paymentType === 'pt'
								? 'bg-green-500 dark:bg-green-700'
								: 'bg-gray-200 dark:bg-gray-700'
						}`}
						onPress={() => setPaymentType('pt')}
					>
						<Text
							className={`font-semibold text-center ${
								paymentType === 'pt'
									? 'text-white'
									: 'text-gray-700 dark:text-gray-300'
							}`}
						>
							{t('playerPaymentDetail.ptPayment')}
						</Text>
					</TouchableOpacity>
				</View>
				<PaymentOverview
					title={t('paymentOverview.title')}
					leftSubtitle={t('paymentOverview.leftSubtitle')}
					rightSubtitle={t('paymentOverview.rightSubtitle')}
					totalPayment={totalPayment}
					totalPaid={totalPaid}
				/>
				<Text
					className={`text-xl text-center ${dues ? 'text-red-400' : 'text-green-400'}`}
				>
					{dues
						? `You have overdue ${typeof dues === 'number' ? dues : dues.amount}₺`
						: "You don't have overdue payments"}
				</Text>
				<ScrollView
					showsVerticalScrollIndicator={false}
					className="flex-1 px-4 pt-6 bg-white dark:bg-dacka-black rounded-t-3xl"
				>
					{paymentType === 'dues' ? (
						annualPayment.map((payment, index) => (
							<PaymentItem
								key={index}
								month={monthNames[payment?.month] || ''}
								amount={payment?.amount || 0}
								status={payment?.status || 'pending'}
								isSelected={selectedMonths.includes(index)}
								isSelectionMode={isSelectionMode && isManager}
								onPress={
									isManager && isSelectionMode
										? () => toggleMonthSelection(index)
										: null
								}
								onAmountChange={
									isManager
										? (newAmount) => handleAmountChange(index, newAmount)
										: undefined
								}
								editable={isManager}
							/>
						))
					) : (
						<Text className="py-4 text-center">
							Personal Training Payment data will be displayed here.
						</Text>
					)}
				</ScrollView>
				{isManager && (
					<View className="p-4 bg-white dark:bg-dacka-black">
						{isSelectionMode ? (
							<ConfirmOrCancelView
								toggleSelectionMode={toggleSelectionMode}
								markAsPaid={markAsPaid}
							/>
						) : (
							<TouchableOpacity
								onPress={toggleSelectionMode}
								className="py-4 bg-green-200 rounded-full dark:bg-green-800"
							>
								<Text className="font-semibold text-center text-black dark:text-white">
									{t('playerPaymentDetail.markAsPaidButton')}
								</Text>
							</TouchableOpacity>
						)}
					</View>
				)}
				{(isCreatingPayment || isCreatePaymentError) && (
					<PaymentAnimation
						truthyState={isCreatingPayment}
						falsyState={isCreatePaymentError}
						scaleAnim={scaleAnim}
						fadeAnim={fadeAnim}
						onRetry={() => {
							/* Add retry logic here */
						}}
					/>
				)}
			</View>
			{isManager && (
				<ConfirmationModal
					visible={modalVisible}
					onClose={handleModalOnClose}
					selectedMonths={selectedMonths}
					totalAmount={totalAmountToPay}
					paidAmount={paidAmountToPay}
					pendingAmount={pendingAmountToPay}
					onConfirm={processPayment}
					monthNames={monthNames}
					annualPayment={annualPayment}
				/>
			)}
		</SafeAreaView>
	);
};

export default ManagerPlayerPaymentDetailPage;
