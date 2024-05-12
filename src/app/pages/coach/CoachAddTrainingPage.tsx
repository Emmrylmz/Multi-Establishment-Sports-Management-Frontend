import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import InputField from '../../components/ui/InputField'
import { addTrainingPageTexts } from '../../../utils/constants/texts'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

import { useCreateEventMutation } from '../../../features/query/eventCreateService'

const CoachAddTrainingPage = ({ route }) => {
  const date = new Date(1714844392303);

  const { team_id, attendanceList } = route.params;

  const [trainingForm, setTrainingForm] = React.useState({
    "event_type": "Game",
    "creator_id": "string",
    "place": "string",
    "event_date": "2024-05-04T17:36:31.336Z",
    "team_id": "string",
    "description": "string"
  })

  const [createEventMutation] = useCreateEventMutation(); // Destructure the createEvent mutation from the API service

  const handleInputChange = (text:string, name:string) => {
    setTrainingForm((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  }

  const postForm = async () => {
    try {
      const response = await createEventMutation(trainingForm); // Call the createEvent mutation with the trainingForm data
      if ('data' in response) {
        console.log('Event created:', response.data); // Log the response data if successful
      } else if ('error' in response) {
        console.error('Error creating event:', response.error); // Log the error if there's an error
      }
    } catch (error) {
      console.error('Error creating event:', error); // Log any unexpected errors
    }
    // console.log(trainingForm)
    // AsyncStorage.setItem('access_token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI2NjFiMDBiOWMzNzllZjUxOWRlYWFkMzkiLCJpYXQiOjE3MTQ4NDQ1OTEsIm5iZiI6MTcxNDg0NDU5MSwianRpIjoiZjUzZjg4NWItYmExZi00NzI2LWEwOTMtMGUxNzJhNjRmYzM3IiwiZXhwIjoxNzE0ODQ2MzkxLCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.KXIXMU15nehfwCiRE0Ju_NMyxgyjAdmNT-sMAwmZeAxy1GO01glA56ilFKIt7uYFZGvM_xWSje26kz30gkXKeFs6JZIymTyO_Qz5v3vMOBozG99sFE0OY3nyz3KKD3HXawDOWOLEBKRRfY-gJ06ompyf_wWigYbNrOJm-ghlaio")
  
  }
  const eventTypes = [
    {label: 'Team Training', value: '1'},
    {label: 'Meeting', value: '2'},
    {label: 'Weight Lifting', value: '3'},
  ]

  const trainingLocations = [
    {label: 'Ege Üni. Büyük S.S.', value: '1'},
    {label: 'Ege Üni. Büyük S.S. üst kat', value: '2'},
    {label: 'Ege Üni. 50. Yıl S.S.', value: '3'},
    {label: 'Ege Üni. Spor Bil. Fak. Top. Sal.', value: '4'},
    {label: 'Ege Üni. Spor Bil. Fak. Fit. Sal.', value: '5'},
    {label: 'Bornova Anadolu Lisesi', value: '6'},
    {label: 'Ege Üni. Atletizm Pisti', value: '7'},
  ]

  return (
    <AppLayout>
      <View className='justify-center flex-1 w-full h-full'>

        <View className='w-full my-3 border-b border-dacka-gray'>
          <RNPickerSelect
            darkTheme={true}
            onValueChange={(value) => console.log(value)}
            placeholder={{label: 'Select an event type', value: null}}
            textInputProps={{color:'#919191'}}
            items={eventTypes}
          />
        </View>

        {/* <InputField placeholder={addTrainingPageTexts.trainingTypePlaceholder} placeholderTextColor='light' keyboardType="default" handleInputChange={handleInputChange} name='event_type' additionalStyles='border-b border-dacka-gray my-3 text-base' /> */}
        <InputField placeholder={addTrainingPageTexts.datePlaceholder} placeholderTextColor='light' keyboardType="default" handleInputChange={handleInputChange} name='event_date' additionalStyles='border-b border-dacka-gray my-3 text-base' />
        <InputField placeholder={addTrainingPageTexts.timePlaceholder} placeholderTextColor='light' keyboardType="default" handleInputChange={handleInputChange} name='training_time' additionalStyles='border-b border-dacka-gray my-3 text-base' />
        {/* <InputField placeholder={addTrainingPageTexts.locationPlaceholder} placeholderTextColor='light' keyboardType="default" handleInputChange={handleInputChange} name='place' additionalStyles='border-b border-dacka-gray my-3 text-base' /> */}
        <View className='w-full my-3 border-b border-dacka-gray'>
          <RNPickerSelect
            darkTheme={true}
            onValueChange={(value) => console.log(value)}
            placeholder={{label: 'Select a location', value: null}}
            textInputProps={{color:'#919191'}}
            items={trainingLocations}
          />
        </View>
      </View>
      <View className='flex-row justify-end w-full'>
        <TouchableOpacity className='p-4 rounded-3xl bg-dacka-gray' onPress={postForm}>
          <Text className='text-white'>{addTrainingPageTexts.addTraining}</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  )
}

export default CoachAddTrainingPage;
