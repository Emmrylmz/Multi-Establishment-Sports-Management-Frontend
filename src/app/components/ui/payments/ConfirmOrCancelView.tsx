import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

type ConfirmOrCancelViewProps = {
  toggleSelectionMode: () => void,
  markAsPaid: () => void,
}

const ConfirmOrCancelView = ({toggleSelectionMode, markAsPaid}: ConfirmOrCancelViewProps) => {
  const { t } = useTranslation()
  return (
    <View className="flex-row justify-between">
      <TouchableOpacity 
        onPress={toggleSelectionMode}
        className="px-6 py-3 bg-red-400 rounded-full"
      >
        <Text className="font-semibold text-white">{t("confirmOrCancelView.cancel")}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={markAsPaid}
        className="px-6 py-3 bg-green-500 rounded-full"
      >
        <Text className="font-semibold text-white">{t("confirmOrCancelView.markAsPaid")}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfirmOrCancelView