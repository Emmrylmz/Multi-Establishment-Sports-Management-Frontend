import React,{useState,useEffect} from 'react';
import { View, TextInput, TouchableOpacity,Keyboard,Text } from 'react-native';

const SearchBar = ({ visible, onClose }) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  if (!visible) return null;

  return (
   <View className='absolute top-0 bottom-0 left-0 right-0 z-10 h-screen transition-all bg-dacka-spotlight-bg'>
      <Text className='text-center text-white'>— AirballAI LLM 4.5 turbo model —</Text>
      <View className='items-center justify-center h-full'>
      <TouchableOpacity
      activeOpacity={1}
      onPressOut={onClose}
    >
      <View className='w-[80%] p-3 rounded-lg mx-auto'>
        <TextInput
          autoFocus
          placeholderTextColor={'#fff'}
          placeholder="Search"
          className='w-full text-white border-b border-dacka-gra'
          returnKeyType="search"
        />
      </View>
    </TouchableOpacity>
      </View>
   </View>
  );
};


export default SearchBar;