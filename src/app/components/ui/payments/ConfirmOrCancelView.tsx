import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

type ConfirmOrCancelViewProps = {
  toggleSelectionMode: () => void,
  markAsPaid: () => void,
}

const ConfirmOrCancelView = ({toggleSelectionMode, markAsPaid}: ConfirmOrCancelViewProps) => {
  return (
    <View className="flex-row justify-between">
      <TouchableOpacity 
        onPress={toggleSelectionMode}
        className="px-6 py-3 bg-red-400 rounded-full"
      >
        <Text className="font-semibold text-white">Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={markAsPaid}
        className="px-6 py-3 bg-green-500 rounded-full"
      >
        <Text className="font-semibold text-white">Mark as Paid</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ConfirmOrCancelView