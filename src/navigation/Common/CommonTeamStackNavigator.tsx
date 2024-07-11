import { CommonTeamStack} from "../StackNavigators";
import TeamListPage from "../../app/pages/common/TeamListPage";
import TeamDetailPage from "../../app/pages/common/TeamDetailPage";




export const CommonTeamStackNavigator = () => (
  <CommonTeamStack.Navigator screenOptions={{ headerShown: false }}>
    <CommonTeamStack.Screen name="TeamListPage" options={{title: 'Team List'}} component={TeamListPage} />
    <CommonTeamStack.Screen name="TeamDetailPage" options={{title: 'Team Detail'}} component={TeamDetailPage} />
  </CommonTeamStack.Navigator>
);