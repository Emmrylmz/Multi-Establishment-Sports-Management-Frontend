import { View, Text, useColorScheme, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native'
import React, { useState } from 'react'
import { AppLayout } from '../../components'
import { Ionicons } from '@expo/vector-icons'
import { useCoach_private_lessonsQuery, useApprove_private_lessonMutation } from '../../../features/query/personalTrainingService'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import { getAuthUser } from '../../../features/auth/auth.slice'
import ApproveRequestCard from '../../components/ui/personalTraining/ApproveRequestCard'
import DateTimeSelection from '../../components/ui/Form/DateTimeSelection'

const ApprovePtRequestsPage = ({navigation}) => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const {data, isLoading, isError} = useCoach_private_lessonsQuery(user?._id);
  const isDark = useColorScheme() === 'dark'
  const [approveLesson] = useApprove_private_lessonMutation();

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());


  const handleApprove = (request) => {
    setSelectedRequest(request);
    setModalVisible(true);
  }


  const confirmApprove = async () => {
    if (selectedRequest && user?._id) {
      try {
        await approveLesson({
          coach_id: user._id,
          player_id: selectedRequest.player_id,
          lesson_id: selectedRequest._id,
          approved_time: selectedTime.toISOString()
        });
        setModalVisible(false);
      } catch (error) {
        console.log('error approving lesson: ', error);
      }
    }
  }

  return (
    <AppLayout>
      <View className='flex-row items-center justify-start w-full mb-6'>
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={24} color={isDark ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text className="ml-2 text-xl font-bold text-black dark:text-white">Approve Requests</Text>
      </View>
      <ScrollView className='w-full h-full'>
        {data?.map((request) => (
          <ApproveRequestCard
            key={request._id}
            name={request.name}
            location={request.location}
            duration={request.duration}
            startTime={request.startTime}
            endTime={request.endTime}
            description={request.description}
            onApprove={() => handleApprove(request)}
          />
        ))}
      </ScrollView>



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="items-center justify-center flex-1 bg-black bg-opacity-50">
          <View className="w-11/12 p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
            <Text className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Confirm Approval</Text>
            <Text className="mb-6 text-base text-gray-600 dark:text-gray-300">Are you sure you want to approve this request?</Text>
            
            <DateTimeSelection
              label="Select Time"
              date={selectedTime}
              time={selectedTime}
              onDateChange={(newDate) => setSelectedTime(newDate)}
              onTimeChange={(newTime) => setSelectedTime(newTime)}
            />

            <View className="flex-row justify-between mt-6">
              <TouchableOpacity 
                className="flex-1 p-4 mr-2 bg-gray-200 dark:bg-gray-600 rounded-xl"
                onPress={() => setModalVisible(false)}
              >
                <Text className="font-semibold text-center text-gray-800 dark:text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 p-4 ml-2 bg-blue-500 rounded-xl"
                onPress={confirmApprove}
              >
                <Text className="font-semibold text-center text-white">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AppLayout>
  )
}

export default ApprovePtRequestsPage