import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import AppLayout from '../../components/AppLayout'
import ProfileTextFields from '../../components/ProfileTextFields'

const CoachProfilePage = () => {
  const myImage = require("../../../../assets/profile_pic.jpg")
  return (
    <AppLayout>
      <Text>CoachProfilePage</Text>
      <View className='w-[75%] h-1/4 mx-auto mb-12'>
        <Image source={myImage} style={{width: "100%",height: "100%"}} />
      </View>
      <View>
        <Text className='text-white'>Account info</Text>
        <ScrollView className='w-full h-full py-3 my-2'>
          <ProfileTextFields label='Name' value='Ahmet' />
          <ProfileTextFields label='Surname' value='Köksal' />
          <ProfileTextFields label='Email' value='ahmetkoksal@gmail.com' editable={true}  />
          <ProfileTextFields label='Phone number' value='+90 (542) 453 3135' editable={true}  />
          <ProfileTextFields label='Password' value='password' editable={true} isPassword={true}  />
        </ScrollView>
      </View>
    </AppLayout>
  )
}

export default CoachProfilePage