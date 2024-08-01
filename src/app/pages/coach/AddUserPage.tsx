import React, { useState, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import FormSection from '../../components/ui/Form/FormSection';
import { fieldIcons } from '../../components/ui/Form/FormConfig';
import SubmitButton from '../../components/ui/Form/SubmitButton';
import GoBackButton from '../../components/ui/GoBackButton';
import AnimatedHeader from '../../components/ui/Form/AnimatedHeader';
import { useGetTeamInfoQuery, useInsertUsersToTeamsMutation } from '../../../features/query/teamQueryService';
import { getAuthUser } from '../../../features/auth/auth.slice';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { useRegisterMutation } from '../../../features/query/authQueryService';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AddUserPage = () => {
  const user = useSelector((state: RootState) => getAuthUser(state));
  const { data: teamsData, isLoading, isError } = useGetTeamInfoQuery(user?.teams);
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

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = SCREEN_HEIGHT * 0.4;

  const insertUserToTeam = async (userId: string) => {
    try {
      const response = await insertUsersToTeams({
        team_ids: form.team_ids,
        user_ids: [userId]
      }).unwrap();
      console.log('User added to team:', response);
    } catch (error) {
      console.error('Failed to add user to team:', error.data);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await registerUser(form).unwrap();
      console.log('User created:', response);
      if (response.status === 'success' && response.user._id) {
        await insertUserToTeam(response.user._id);
      }
    } catch (error) {
      console.error('Failed to create user:', error.data);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 dark:bg-dacka-black">
      <AnimatedHeader
        scrollY={scrollY}
        headerHeight={headerHeight}
        imageSource={require('../../../assets/Mobile login-amico.png')}
      />
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        className="flex-1"
        contentContainerStyle={{ paddingTop: headerHeight }}
      >
        <View className="px-5 py-5">
          <View className="p-6 mb-6 bg-white shadow-md dark:bg-dacka-dark-gray rounded-xl">
            <Text className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
              User Information
            </Text>
            <FormSection
              form={form}
              fieldIcons={fieldIcons}
              handleInputChange={handleInputChange}
              teamsData={teamsData || []}
            />
          </View>
          <SubmitButton
            onPress={handleSubmit}
            title="Create User"
            className="py-4 bg-teal-600 shadow-md rounded-xl"
            textClassName="text-white font-bold text-lg"
          />
        </View>
      </Animated.ScrollView>
      <GoBackButton className="absolute z-20 top-12 left-4" />
    </View>
  );
};

export default AddUserPage;