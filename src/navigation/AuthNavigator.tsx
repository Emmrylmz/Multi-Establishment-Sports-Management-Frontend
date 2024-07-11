import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../app/pages/login/LoginPage";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginPage} />
      {/* Add other auth-related screens here */}
    </AuthStack.Navigator>
  );

export default AuthNavigator