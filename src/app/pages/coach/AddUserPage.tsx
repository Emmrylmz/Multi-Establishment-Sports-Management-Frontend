import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormSection from '../../components/ui/Form/FormSection';
import { fieldIcons } from '../../components/ui/Form/FormConfig';
import SubmitButton from '../../components/ui/Form/SubmitButton';
import { useGetTeamInfoQuery, useInsertUsersToTeamsMutation } from '../../../features/query/teamQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useRegisterMutation } from '../../../features/query/authQueryService';

const AddUserPage = () => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data: teamsData } = useGetTeamInfoQuery(user?.teams);
  const [registerUser] = useRegisterMutation();
  const [insertUsersToTeams] = useInsertUsersToTeamsMutation();

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    team_ids: [],
  });

  const handleInputChange = (name: string, value: string | string[]) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(form).unwrap();
      if (response.status === 'success' && response.user._id) {
        await insertUsersToTeams({
          team_ids: form.team_ids,
          user_ids: [response.user._id]
        }).unwrap();
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dacka-white dark:bg-dacka-black">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <View className="px-6 py-12">
            <Text className="mb-10 text-3xl font-light text-dacka-black dark:text-dacka-white">
              New User
            </Text>
            
            <FormSection
              form={form}
              fieldIcons={fieldIcons}
              handleInputChange={handleInputChange}
              teamsData={teamsData || []}
            />
            
            <SubmitButton
              onPress={handleSubmit}
              title="Create"
              textClassName="text-dacka-white font-medium text-lg"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddUserPage;