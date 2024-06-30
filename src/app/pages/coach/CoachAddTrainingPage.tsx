import { View, Text, TouchableOpacity,ScrollView, Button } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { addTrainingPageTexts } from '../../../utils/constants/texts'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCreateEventMutation, useListEventsQuery } from '../../../features/query/eventQueryService'
import { RootState } from '../../../../store';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { useSelector } from 'react-redux';

const CoachAddTrainingPage = ({ route }) => {
  
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { team_id, attendanceList } = route.params;
  const dateNow = new Date();
  const [createEvent] = useCreateEventMutation(); 
  const { refetch } = useListEventsQuery([team_id])


  const [trainingForm, setTrainingForm] = React.useState({
    "event_type": "Game",
    "creator_id": "661b00b9c379ef519deaad39",
    "place": "Stadium XYZ",
    "event_date": '',
    "created_at": "2024-05-11T13:34:45.149000",
    "team_id": team_id,
    "description": "Annual cahampionship game"
})


  const handleDateChange = (date:Date | undefined, name:string) => {
    setTrainingForm((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  }

  const postForm = async () => {
    try {
      const response = await createEvent(trainingForm); // Call the createEvent mutation with the trainingForm data
      if ('data' in response) {
        console.log('Event created:', response.data); // Log the response data if successful
      } else if ('error' in response) {
        console.error('Error creating event:', response.error); // Log the error if there's an error
      }
    } catch (error) {
      console.error('Error creating event:', error); // Log any unexpected errors
    }
    console.log(trainingForm) 
    refetch()
  }
  const eventTypes = [
    {label: 'Team Training', value: 1},
    {label: 'Meeting', value: 2},
    {label: 'Weight Lifting', value: 3},
  ]

  const trainingLocations = [
    {label: 'Ege Üni. Büyük S.S.', value: 1},
    {label: 'Ege Üni. Büyük S.S. üst kat', value: 2},
    {label: 'Ege Üni. 50. Yıl S.S.', value: 3},
    {label: 'Ege Üni. Spor Bil. Fak. Top. Sal.', value: 4},
    {label: 'Ege Üni. Spor Bil. Fak. Fit. Sal.', value: 5},
    {label: 'Bornova Anadolu Lisesi', value: 6},
    {label: 'Ege Üni. Atletizm Pisti', value: 7},
  ]

  const [showDate, setShowDate] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);

  return (
    <AppLayout>
      <View className='justify-center flex-1 w-full h-full'>

        <View className='w-full my-3 border-b border-dacka-gray'>
          <RNPickerSelect
            darkTheme={true}
            onValueChange={(value) => setTrainingForm((prevState) => ({...prevState, event_type: value}))}
            placeholder={{label: 'Select an event type', value: null}}
            textInputProps={{color:'#919191'}}
            items={eventTypes}
          />
        </View>



        <TouchableOpacity className='my-3 border-b border-dacka-gray' onPress={() => setShowDate((prevState) => !prevState)}>
          <Text className='text-dacka-gray'>{trainingForm.event_date instanceof Date ? trainingForm.event_date.toString() : 'add date'}</Text> 
        </TouchableOpacity>
        {showDate && (
          <View className='w-full my-3 border-b border-dacka-gray' >
            <TouchableOpacity onPress={() => setShowDate(false)}>
              <Text className='text-xl text-right text-dacka-gray'>Close</Text>
            </TouchableOpacity>
            <DateTimePicker value={dateNow} textColor='#fff' display='spinner' mode='datetime' onChange={(event,date) => handleDateChange(date,'event_date')} />
          </View>
        )}

        <View className='w-full my-3 border-b border-dacka-gray'>
          <RNPickerSelect
            darkTheme={true}
            onValueChange={(value) => setTrainingForm((prevState) => ({...prevState, event_location: value}))}
            placeholder={{label: 'Select a location', value: null}}
            textInputProps={{color:'#919191'}}
            items={trainingLocations}
          />
        </View>
      </View>
      <View className='flex-row justify-end w-full'>
        <TouchableOpacity className='p-4 rounded-3xl bg-dacka-dark-gray' onPress={postForm}>
          <Text className='text-white'>{addTrainingPageTexts.addTraining}</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  )
}

export default CoachAddTrainingPage;
