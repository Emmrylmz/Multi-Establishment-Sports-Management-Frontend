// FormSection.tsx
import React from 'react';
import { Text, View } from 'react-native';
import InputField from './InputField';
import { addUserPageTexts } from '../../../../utils/constants/texts';
import { AddUserForm } from '../../../../utils/constants/formConfig';

interface FormSectionProps {
  form: AddUserForm;
  fieldIcons: Record<keyof AddUserForm, JSX.Element>;
  handleInputChange: (name: string, value: string) => void;
}

const FormSection = ({ form, fieldIcons, handleInputChange }) => (
  <View className="space-y-6">
    {Object.entries(form).map(([key, value]) => (
      <View key={key} className="mb-4">
        <Text className="text-base font-semibold text-gray-700 mb-2">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Text>
        <InputField
          name={key}
          value={value}
          placeholder={`Enter ${key}`}
          handleInputChange={handleInputChange}
          icon={fieldIcons[key]}
          additionalStyles='border-b-2 border-gray-300 p-3 shadow-md'
          placeholderTextColor='#999'
        />
      </View>
    ))}
  </View>
);

export default FormSection;