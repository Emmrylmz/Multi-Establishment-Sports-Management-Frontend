import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import AppLayout from '../../components/AppLayout'
import InputField from '../../components/InputField'
import { useState } from 'react'



const CoachSchedulePage = ({navigation}) => {
  type FormData = {
    deneme: string
  }
  
  
  
  function handleInputChange(text: string, name: string) {
    console.log(text, name)
  }
  const [formData, setFormData] = useState<FormData>({
    deneme: ''
  })

  type Team = {
    id: number,
    name: string,
  }
  type TeamsList = Team[]
  const teams: TeamsList = [
    { id: 1, name: 'Team 1' },
    { id: 2, name: 'Team 2' },
    { id: 3, name: 'Team 3' },
    { id: 4, name: 'Team 4' },
    { id: 5, name: 'Team 5' },
    { id: 6, name: 'Team 6' },
    { id: 7, name: 'Team 7' },
  ]

  return (
    <AppLayout>
      <View className='w-full h-full'>
        <ScrollView className='w-full p-3'>
          {teams.map((team,index) => (
            <TouchableOpacity key={index} className='py-5 my-3 rounded-lg bg-dacka-gray'onPress={() => navigation.push('CoachTeamDetail', { teamId: team.id })} >
              <Text className='text-center text-white'>{team.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <InputField placeholder='Deneme' placeholderTextColor="light" name='test' handleInputChange={handleInputChange} secureTextEntry={true} />
      </View>
    </AppLayout>
  )
}

export default CoachSchedulePage