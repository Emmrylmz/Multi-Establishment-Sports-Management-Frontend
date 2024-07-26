import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import AppLayout from '../../components/layout/AppLayout';
import InputField from '../../components/ui/Form/InputField';
import Toast from '../../components/ui/toasts/Toast';
import { FontAwesome, Feather } from '@expo/vector-icons';
import useLogin from '../../../hooks/useLogin';
import { AuthPayload } from '../../../features/auth/auth.interface';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { handleSubmit, isLoading } = useLogin();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<AuthPayload>({
    email: '',
    password: '',
  });

  const handleInputChange = (name: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: text,
    }));
    setToastMessage(null);
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setToastMessage(t('loginPage.errors.emptyFields'));
      return false;
    }

    if (!isValidEmail(formData.email)) {
      setToastMessage(t('loginPage.errors.invalidEmail'));
      return false;
    }

    if (formData.password.length < 8) {
      setToastMessage(t('loginPage.errors.weakPassword'));
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const result = await handleSubmit(formData);
      
      if (result.success) {
        // Handle successful login
        // Navigate to next screen or perform other actions
        return;
      }

      // Handle known error types
      if (result.error) {
        switch (result.error.type) {
          case 'INVALID_CREDENTIALS':
            setToastMessage(t('loginPage.errors.incorrectCredentials'));
            break;
          case 'ACCOUNT_LOCKED':
            setToastMessage(t('loginPage.errors.accountLocked'));
            break;
          case 'ACCOUNT_NOT_VERIFIED':
            setToastMessage(t('loginPage.errors.accountNotVerified'));
            break;
          case 'TOO_MANY_ATTEMPTS':
            setToastMessage(t('loginPage.errors.tooManyAttempts'));
            break;
          case 'NETWORK_ERROR':
            setToastMessage(t('loginPage.errors.networkError'));
            break;
          case 'SERVER_ERROR':
            setToastMessage(t('loginPage.errors.serverError'));
            break;
          default:
            console.error('Unhandled error type:', result.error);
            setToastMessage(t('loginPage.errors.genericError'));
        }
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setToastMessage(t('loginPage.errors.genericError'));
    }
  };

  return (
    <AppLayout>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="error"
          position="top-right"
          animationType="slide"
          duration={5000}
          onClose={() => setToastMessage(null)}
        />
      )}
      <View className="items-center justify-center flex-1 w-full h-full px-4">
        <View className="w-full mb-8">
          <Text className="mb-4 text-2xl font-bold text-center">
            {t('loginPage.login')}
          </Text>
          <View className="mb-4 h-14">
            <InputField
              placeholder={t('loginPage.emailPlaceholder')}
              placeholderTextColor="light"
              additionalInputStyles='py-4'
              keyboardType="email-address"
              autoCapitalize="none"
              handleInputChange={handleInputChange}
              name="email"
              icon={<FontAwesome name="envelope" size={24} color="#919191" />}
            />
          </View>
          <View className="h-14">
            <InputField
              placeholder={t('loginPage.passwordPlaceholder')}
              placeholderTextColor="light"
              additionalInputStyles='py-4'
              autoCapitalize="none"
              handleInputChange={handleInputChange}
              name="password"
              secureTextEntry={true}
              icon={<Feather name="lock" size={24} color="#919191" />}
            />
          </View>
          <View className="mt-5">
            <Text className="my-1 text-center text-blue-600">
              {t('loginPage.forgotPassword')}
            </Text>
            <Text className="my-1 text-center text-blue-600">
              {t('loginPage.reset')}
            </Text>
          </View>
        </View>
        <View className="w-full">
          <TouchableOpacity
            onPress={onSubmit}
            disabled={isLoading}
            className="w-full py-3 my-3 bg-green-500 rounded-3xl"
          >
            <Text className="text-lg text-center text-white">
              {isLoading ? t('loginPage.loggingIn') : t('loginPage.login')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
};

// Helper function to validate email
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default LoginPage;