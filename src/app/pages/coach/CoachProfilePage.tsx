import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import AppLayout from '../../components/AppLayout'
import ProfileTextFields from '../../components/ProfileTextFields'


const CoachProfilePage = () => {
  const myImage = require("../../../../assets/profile_pic.jpg")
  type User = {
    name: string,
    surname: string,
    email: string,
    password: string,
    phone_number: string
  }

  // patlamamak için reduxtan değil demo user ile yaptım amaç sadece tasarımı ve fonksiyonelliği göstermek 
  const [user, setUser] = React.useState<User>({
    name: 'Ahmet',
    surname: 'Köksal',
    email: 'ahmetkoksal@gmail.com',
    password: 'ahmetkoksal123',
    phone_number: '+90 (532) 123 45 67'
  })

  function handleChangeText(text: string, field: string) {
    setUser((prevState) => ({
      ...prevState,
      [field]: text
    }))
  }

  return (
    <AppLayout>
      <Text>CoachProfilePage</Text>
      <View className='w-[75%] h-1/4 mx-auto mb-12'>
        <Image source={myImage} style={{width: "100%",height: "100%"}} />
      </View>
      <View>
        <Text className='text-white'>Account info</Text>
        <ScrollView className='w-full h-full py-3 my-2'>
          <ProfileTextFields label='Name' value={user?.name} />
          <ProfileTextFields label='Surname' value={user.surname} />
          <ProfileTextFields label='email' value={user?.email} editable={true} handleChangeText={handleChangeText}  />
          <ProfileTextFields label='phone_number' value={user?.phone_number} editable={true}  handleChangeText={handleChangeText} />
          <ProfileTextFields label='password' value={user.password} editable={true} isPassword={true} handleChangeText={handleChangeText} />
        </ScrollView>
      </View>
    </AppLayout>
  )
}

export default CoachProfilePage