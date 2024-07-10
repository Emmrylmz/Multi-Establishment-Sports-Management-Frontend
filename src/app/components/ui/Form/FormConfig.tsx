// utils/constants/formConfig.ts
import { FontAwesome, Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

export type AddUserForm = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  birthDate: string;
  school: string;
};

export const fieldIcons = {
  name: <FontAwesome name="user" size={24} color="#919191" />,
  email: <FontAwesome name="envelope" size={24} color="#919191" />,
  password: <Feather name="lock" size={24} color="#919191" />,
  phone: <FontAwesome name="phone" size={24} color="#919191" />,
  address: <FontAwesome name="home" size={24} color="#919191" />,
  city: <MaterialIcons name="location-city" size={24} color="#919191" />,
  birthDate: <FontAwesome name="birthday-cake" size={24} color="#919191" />,
  school: <Ionicons name="school" size={24} color="#919191" />,
};