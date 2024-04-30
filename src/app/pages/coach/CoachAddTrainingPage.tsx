import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import InputField from '../../components/ui/InputField'
import { addTrainingPageTexts } from '../../../utils/constants/texts'

const CoachAddTrainingPage = ({route}) => {
  const {team_id,attendanceList} = route.params
  console.log(team_id,attendanceList)
  
  type Deneme = {
    deneme: string,
  }
  const [deneme, setDeneme] = React.useState<Deneme>({
    deneme: '',
  })

  type TrainingForm = {
    training_type: string,
    training_date: string,
    training_time: string,
    training_location: string,
    team_id: number,
    coach: string,
  }
  const [trainingForm, setTrainingForm] = React.useState<TrainingForm>({
    training_type: '',
    training_date: '',
    training_time: '',
    training_location: '',
    team_id: team_id,
    coach: '',
  })

  const handleInputChange = (text: string, name: string) => {
    setTrainingForm((prevState) => ({
      ...prevState,
      [name]: text,
    
    }))
  }

  return (
    <AppLayout>
      <View className='justify-center flex-1 w-full h-full'>
        <InputField placeholder={addTrainingPageTexts.trainingTypePlaceholder} placeholderTextColor='light' keyboardType="default" handleInputChange={handleInputChange} name='training_type' additionalStyles='border-b border-dacka-gray my-3 text-base' />
        <InputField placeholder={addTrainingPageTexts.datePlaceholder} placeholderTextColor='light' keyboardType="default" handleInputChange={handleInputChange} name='training_date' additionalStyles='border-b border-dacka-gray my-3 text-base' />
        <InputField placeholder={addTrainingPageTexts.timePlaceholder} placeholderTextColor='light' keyboardType="default" handleInputChange={handleInputChange} name='training_time' additionalStyles='border-b border-dacka-gray my-3 text-base' />
        <InputField placeholder={addTrainingPageTexts.locationPlaceholder} placeholderTextColor='light' keyboardType="default" handleInputChange={handleInputChange} name='training_location' additionalStyles='border-b border-dacka-gray my-3 text-base' />
      </View>
      <View className='flex-row justify-end w-full'>
        <TouchableOpacity className='p-4 rounded-3xl bg-dacka-gray' onPress={() => console.log('Training form:', trainingForm)}>
          <Text className='text-white'>{addTrainingPageTexts.addTraining}</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  )
}

export default CoachAddTrainingPage