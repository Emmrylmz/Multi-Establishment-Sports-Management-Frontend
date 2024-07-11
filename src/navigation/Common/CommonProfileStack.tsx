import { CommonProfileStack} from "../StackNavigators";

import ProfilePage from "../../app/pages/common/ProfilePage";




export const CommonProfileStackNavigator = () => (
  <CommonProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <CommonProfileStack.Screen name="TeamListPage" options={{title: 'Team List'}} component={ProfilePage} />
  </CommonProfileStack.Navigator>
);