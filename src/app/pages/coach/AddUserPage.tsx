import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import AppLayout from '../../components/layout/AppLayout';
import InputField from '../../components/ui/Form/InputField';
import { addUserPageTexts } from '../../../utils/constants/texts';
import {
  FontAwesome,
  Feather,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedHeader from '../../components/ui/Form/AnimatedHeader';
import FormSection from '../../components/ui/Form/FormSection';
import { fieldIcons } from '../../components/ui/Form/FormConfig';
import SubmitButton from '../../components/ui/Form/SubmitButton';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AddUserPage = () => {
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

  const handleInputChange = (name: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = SCREEN_HEIGHT * 0.33;

  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  const handleSubmit = () => {
    console.log('Form submitted:', formRef.current);
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#4ca2d5', '#3FA454']}
      className="flex-1"
    >
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        className="flex-grow"
      >
        <AnimatedHeader
          imageSource={require('../../../assets/Mobile login-amico.png')}
          scrollY={scrollY}
          headerHeight={headerHeight}
        />

        <View className="bg-white rounded-t-3xl px-6 pt-8 pb-6 -mt-8 shadow-lg">
          <Text className="text-3xl font-bold text-center  mb-8 shadow-sm">
            Add New User
          </Text>
          
          <Text className="text-xl font-semibold text-gray-700 mb-6">
            User Information
          </Text>

          <FormSection
            form={form}
            fieldIcons={fieldIcons}
            handleInputChange={handleInputChange}
          />

          <SubmitButton
            onPress={handleSubmit}
            title="Create User"
          />
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
};

export default AddUserPage;