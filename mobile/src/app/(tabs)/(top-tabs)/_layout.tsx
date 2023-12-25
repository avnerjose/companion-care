import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HistoryScreen from "./history";
import HospitalMapScreen from "./hospital-map";
import Colors from "@/constants/Colors";
import { View } from "react-native";

const Tab = createMaterialTopTabNavigator();
export default function Layout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPressColor: Colors.light.gray[100],
        tabBarStyle: {
          backgroundColor: Colors.light.background,
        },
        tabBarLabelStyle: {
          textTransform: "capitalize",
          color: Colors.light.secondary[700],
          fontSize: 18,
          fontWeight: "bold",
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.light.primary[500],
        },
        animationEnabled: false,
      }}
    >
      <Tab.Screen name="Histórico" component={HistoryScreen} />
      <Tab.Screen name="Mapa" component={HospitalMapScreen} />
    </Tab.Navigator>
  );
}
