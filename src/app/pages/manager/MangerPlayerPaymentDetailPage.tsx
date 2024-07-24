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
	useGetPaymentByYearQueryQuery,
} from '../../../features/query/paymentQueryService';
import PaymentAnimation from '../../components/ui/payments/PaymentAnimation';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from '../../components/ui/Modals/ConfirmationModal';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { usePaymentLogic } from '../../../hooks/usePaymentLogic';
import YearSelector from '../../components/ui/payments/YearSelector';

const ManagerPlayerPaymentDetailPage = ({ route, navigation }) => {
	const { t } = useTranslation();
	const insets = useSafeAreaInsets();
	const user = useSelector((state: RootState) => getAuthUser(state));
	const isManager = user?.role === 'Manager';
	const { player_id, monthlyPaymentAmount, discount } = route.params;
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
		selectedYear,
		changeYear,
		togglePaymentStatus,
	} = usePaymentLogic(player_id, isManager, monthlyPaymentAmount, discount);

	const {
		data,
		error: errorLoadingPayments,
		isLoading: isLoadingPayments,
		refetch,
	} = useGetPaymentByYearQueryQuery({ userId: player_id, year: selectedYear });

	console.log(player_id);

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

	const totalPaid = useMemo(() => {
		return annualPayment.reduce((sum, payment) => {
			if (payment && payment.status === 'paid') {
				return sum + Number(payment.amount);
			}
			return sum;
		}, 0);
	}, [annualPayment]);

	const totalPayment = useMemo(() => {
		return monthlyPaymentAmount * 12 - totalPaid;
	}, [monthlyPaymentAmount, totalPaid]);

	const renderPaymentItems = useCallback(() => {
		if (paymentType === 'dues') {
			return annualPayment.map((payment, index) => (
				<PaymentItem
					key={index}
					month={monthNames[payment?.month] || ''}
					amount={payment?.amount || 0}
					originalAmount={monthlyPaymentAmount}
					discount={discount}
					status={payment?.status || 'pending'}
					isSelected={selectedMonths.includes(index)}
					isSelectionMode={isSelectionMode && isManager}
					onPress={() => {
						if (isSelectionMode) {
							toggleMonthSelection(index);
						} else if (isManager) {
							togglePaymentStatus(index);
						}
					}}
					onAmountChange={
						isManager
							? (newAmount) => handleAmountChange(index, newAmount, true)
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
		togglePaymentStatus,
		handleAmountChange,
		monthlyPaymentAmount,
		discount,
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
				<View className="flex-row items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="p-2 bg-gray-100 rounded-full dark:bg-gray-800"
					>
						<Ionicons
							name="arrow-back-outline"
							size={24}
							color="black"
							className="dark:text-white"
						/>
					</TouchableOpacity>
				</View>
				<PaymentOverview
					title={t('paymentOverview.title')}
					leftSubtitle={t('paymentOverview.leftSubtitle')}
					rightSubtitle={t('paymentOverview.rightSubtitle')}
					totalPayment={totalPayment}
					totalPaid={totalPaid}
				/>
				<YearSelector selectedYear={selectedYear} onYearChange={changeYear} />

				<ScrollView
					showsVerticalScrollIndicator={false}
					className="flex-1 px-4 pt-6 bg-white dark:bg-dacka-black rounded-t-3xl"
				>
					{renderPaymentItems()}
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
