import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const Stack = createNativeStackNavigator();
export const AuthStack = createNativeStackNavigator();
export const SharedStack = createNativeStackNavigator();
export const CoachStack = createNativeStackNavigator();
export const CommonTeamStack = createNativeStackNavigator();
export const CommonProfileStack = createNativeStackNavigator();
export const ManagerHomeStack = createNativeStackNavigator();
export const ManagerPaymentStack = createNativeStackNavigator();
export const PlayerHomeStack = createNativeStackNavigator();
export const Tab = createBottomTabNavigator();