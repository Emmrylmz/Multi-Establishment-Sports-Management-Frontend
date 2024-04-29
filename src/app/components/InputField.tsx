import { TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'

type InputFieldProps = {
  placeholder: string,
  name: string,
  placeholderTextColor: "dark" | "light",
  handleInputChange: (text: string, name: string) => void,
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "name-phone-pad" | "twitter" | "web-search"
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  additionalStyles?: string,
  secureTextEntry?: boolean | undefined,
}

const InputField = ({placeholder, placeholderTextColor, handleInputChange, name, keyboardType, autoCapitalize, additionalStyles, secureTextEntry}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const placeholderColor = placeholderTextColor === 'light' ? '#919191' : '#242424';
  const eyeIcon = showPassword ? 'eye-off' : 'eye';

  if(secureTextEntry) {
    return(
    <View className='relative w-full py-2'>
      <TextInput
        keyboardType={keyboardType || 'default'}
        autoCorrect={false}
        autoCapitalize={autoCapitalize || 'none'}
        placeholder={placeholder}
        secureTextEntry={showPassword ? false : true}
        placeholderTextColor={placeholderColor}
        onChangeText={(text) => handleInputChange(text, name)}
        className={` text-dacka-gray ${additionalStyles}`}
      />
      <TouchableOpacity className='absolute right-0 top-1' onPress={() => setShowPassword((prevState) => !prevState)}>
      <Feather name={eyeIcon} size={24} color="#919191" />
      </TouchableOpacity>
    </View>
  )
  }
  return (
    <TextInput
      keyboardType={keyboardType || 'default'}
        autoCorrect={false}
        autoCapitalize={autoCapitalize || 'none'}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onChangeText={(text) => handleInputChange(text, name)}
        className={` text-dacka-gray w-full  ${additionalStyles}`}
        secureTextEntry={secureTextEntry}
      />
  )
}

export default InputField;
