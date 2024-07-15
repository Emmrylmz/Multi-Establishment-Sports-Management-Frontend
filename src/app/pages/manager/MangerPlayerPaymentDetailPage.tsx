import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { AppLayout } from '../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PaymentOverview from '../../components/ui/payments/PaymentOverview';
import PaymentAnimation from '../../components/ui/payments/PaymentAnimation';
import PaymentTypeSelector from '../../components/ui/payments/PaymentTypeSelector';
import DuesPaymentView from '../../components/ui/payments/DuesPaymentView';
import PersonalTrainingView from '../../components/ui/payments/PersonalTrainingView';
import StorePaymentView from '../../components/ui/payments/StorePaymentView';
import SelectionModeFooter from '../../components/ui/payments/DiscountReasonMode';
import usePaymentLogic from '../../../hooks/usePaymentLogic';

const ManagerPlayerPaymentDetailPage = ({ route }) => {
  const { player_id, team_id } = route.params;
  const insets = useSafeAreaInsets();
  const [paymentType, setPaymentType] = useState('dues');

  const {
    isSelectionMode,
    toggleSelectionMode,
    markAsPaid,
    isCreatingPayment,
    isCreatePaymentError,
    scaleAnim,
    fadeAnim,
    paymentData,
  } = usePaymentLogic(player_id, team_id, paymentType);

  return (
    <AppLayout>
      <View className={`flex-1 bg-white dark:bg-dacka-black pt-${insets.top}`}>
        <PaymentTypeSelector paymentType={paymentType} setPaymentType={setPaymentType} />
        <PaymentOverview
          title={paymentType === 'pt' ? 'PT Payment Overview' : 'Payment Overview'}
          leftSubtitle='Total Paid'
          rightSubtitle='Remaining'
          totalPayment={paymentData.totalPayment}
          totalPaid={paymentData.totalPaid}
        />
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          className="flex-1 px-4 pt-6 bg-white dark:bg-dacka-black rounded-t-3xl"
        >
          {paymentType === 'dues' && (
            <DuesPaymentView
              annualPayment={paymentData.annualPayment}
              isSelectionMode={isSelectionMode}
              selectedMonths={paymentData.selectedMonths}
              toggleMonthSelection={paymentData.toggleMonthSelection}
            />
          )}
         {paymentType === 'pt' && (
          <>
            {console.log('Rendering PT View', paymentData.ptSessions)}
            <PersonalTrainingView
              ptSessions={paymentData.ptSessions}
              isSelectionMode={isSelectionMode}
              selectedSessions={paymentData.selectedSessions}
              toggleSessionSelection={paymentData.toggleSessionSelection}
            />
          </>
)}
          {paymentType === 'store' && (
          <StorePaymentView
            storeItems={paymentData.storeItems}
            selectedStoreItems={paymentData.selectedStoreItems}
            toggleStoreItemSelection={paymentData.toggleStoreItemSelection}
            isSelectionMode={isSelectionMode}
          />
        )}
        </ScrollView>
        <SelectionModeFooter
          isSelectionMode={isSelectionMode}
          toggleSelectionMode={toggleSelectionMode}
          markAsPaid={markAsPaid}
          paymentType={paymentType}
          setDiscountReason={paymentData.setDiscountReason}
        />
        {(isCreatingPayment || isCreatePaymentError) && (
          <PaymentAnimation
            truthyState={isCreatingPayment}
            falsyState={isCreatePaymentError}
            scaleAnim={scaleAnim}
            fadeAnim={fadeAnim}
            onRetry={() => {/* Add retry logic here */}}
          />
        )}
      </View>
    </AppLayout>
  );
};

export default ManagerPlayerPaymentDetailPage;