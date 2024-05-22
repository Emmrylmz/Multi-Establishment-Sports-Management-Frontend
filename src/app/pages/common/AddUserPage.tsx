import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import AppLayout from '../../components/layout/AppLayout'
import InputField from '../../components/ui/InputField'
import { addUserPageTexts } from '../../../utils/constants/texts'


const AddUserPage = () => {
  type AddUserForm = {
    name: string,
    email: string,
    password: string,
    phone: string,
    address: string,
    city: string,
    birthDate: string,
    school: string,
  }
  const [form, setForm] = React.useState<AddUserForm>({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    birthDate: '',
    school: '',
  })
  
  function handleInputChange(key: string, value: string) {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }
  return (
    <AppLayout>
      <View className='justify-center flex-1'>
        <Text className='mb-4 text-3xl text-left text-white'>{addUserPageTexts.addUser}</Text>
        <InputField placeholder={addUserPageTexts.namePlaceholder} placeholderTextColor='light' additionalStyles='border-b my-2 border-dacka-gray p-1' keyboardType='default' handleInputChange={handleInputChange} name='name'  />
        <InputField placeholder={addUserPageTexts.emailPlaceholder} placeholderTextColor='light' additionalStyles='border-b my-2 border-dacka-gray p-1' keyboardType='email-address' handleInputChange={handleInputChange} name='email'  />
        <InputField placeholder={addUserPageTexts.passwordPlaceholder} placeholderTextColor='light' additionalStyles='border-b my-2 border-dacka-gray p-1' keyboardType='default' secureTextEntry={true} handleInputChange={handleInputChange} name='password'  />
        <InputField placeholder={addUserPageTexts.phonePlaceholder} placeholderTextColor='light' additionalStyles='border-b my-2 border-dacka-gray p-1' keyboardType='phone-pad' handleInputChange={handleInputChange} name='phone'  />
        <InputField placeholder={addUserPageTexts.addressPlaceholder} placeholderTextColor='light' additionalStyles='border-b my-2 border-dacka-gray p-1' keyboardType='default' handleInputChange={handleInputChange} name='address'  />
        <InputField placeholder={addUserPageTexts.cityPlaceholder} placeholderTextColor='light' additionalStyles='border-b my-2 border-dacka-gray p-1' keyboardType='default' handleInputChange={handleInputChange} name='city'  />
        <InputField placeholder={addUserPageTexts.birthDatePlaceholder} placeholderTextColor='light' additionalStyles='border-b my-2 border-dacka-gray p-1' keyboardType='default' handleInputChange={handleInputChange} name='birthDate'  />
        <InputField placeholder={addUserPageTexts.schoolPlaceholder} placeholderTextColor='light' additionalStyles='border-b my-2 border-dacka-gray p-1' keyboardType='default' handleInputChange={handleInputChange} name='school'  />
        

      </View>
      <View className='flex-row justify-end w-full'>
        <TouchableOpacity className='px-4 py-2 rounded-xl bg-dacka-gray'>
          <Text className='text-base text-white'>{addUserPageTexts.submitButton}</Text>
        </TouchableOpacity>
        </View>
    </AppLayout>
  )
}

export default AddUserPage