import { TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';

type InputFieldProps = {
  placeholder: string;
  name: string;
  placeholderTextColor: 'dark' | 'light';
  handleInputChange: (name: string, text: string) => void;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  additionalStyles?: string;
  secureTextEntry?: boolean;
  icon?: React.ReactNode;
};

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  placeholderTextColor,
  handleInputChange,
  name,
  keyboardType = 'default',
  autoCapitalize = 'none',
  additionalStyles = '',
  secureTextEntry = false,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const placeholderColor = placeholderTextColor === 'light' ? '#919191' : '#242424';
  const eyeIcon = showPassword ? 'eye-off' : 'eye';

  return (
    <View className={`relative w-full bg-white opacity-80 rounded-lg focus:opacity-100 h-12 flex-row items-center ${additionalStyles}`}>
      {icon && <View className="ml-3">{icon}</View>}
      <TextInput
        keyboardType={keyboardType}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        placeholderTextColor={placeholderColor}
        onChangeText={(text) => handleInputChange(name, text)}
        className=' flex-1 ml-3'
      />
      {secureTextEntry && (
        <TouchableOpacity
          className='absolute right-3 top-1'
          onPress={() => setShowPassword((prevState) => !prevState)}
        >
          <Feather name={eyeIcon} size={24} color="#919191" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
