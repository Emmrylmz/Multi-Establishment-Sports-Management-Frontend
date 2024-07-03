import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import InputField from '../../components/ui/Form/InputField';
import { addUserPageTexts } from '../../../utils/constants/texts';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';

const AddUserPage = () => {
  type AddUserForm = {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    birthDate: string;
    school: string;
  };

  const [form, setForm] = useState<AddUserForm>({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    birthDate: '',
    school: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const fieldIcons = {
    name: <FontAwesome name="user" size={24} color="#919191" />,
    email: <FontAwesome name="envelope" size={24} color="#919191" />,
    password: <Feather name="lock" size={24} color="#919191" />,
    phone: <FontAwesome name="phone" size={24} color="#919191" />,
    address: <FontAwesome name="home" size={24} color="#919191" />,
    city: <MaterialIcons name="location-city" size={24} color="#919191" />,
    birthDate: <FontAwesome name="birthday-cake" size={24} color="#919191" />,
    school: <FontAwesome name="school" size={24} color="#919191" />,
  };

  return (
    <AppLayout>
      <View className="justify-center flex-1 items-center">
        <View className="w-full  rounded-xl  p-4 justify-center">
          <Text className="mb-4 text-3xl text-left text-white">
            {addUserPageTexts.addUser}
          </Text>
          {Object.keys(form).map((key) => (
            <InputField
              key={key}
              name={key}
              placeholder={addUserPageTexts[`${key}Placeholder`]}
              placeholderTextColor="light"
              additionalStyles="border-b my-2 border-dacka-gray p-1"
              keyboardType={
                key === 'email'
                  ? 'email-address'
                  : key === 'phone'
                  ? 'phone-pad'
                  : 'default'
              }
              secureTextEntry={key === 'password'}
              handleInputChange={handleInputChange}
              icon={fieldIcons[key as keyof AddUserForm]}
            />
          ))}
          <View className="flex-row justify-end w-full px-4">
            <TouchableOpacity className="px-4 py-2 rounded-xl bg-dacka-gray">
              <Text className="text-base text-white">
                {addUserPageTexts.submitButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppLayout>
  );
};

export default AddUserPage;
