import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import { useAuth } from "@/contexts/auth.context";

export default function Layout() {
  const { signOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: styles.label,
        tabBarActiveTintColor: Colors.light.primary[500],
        tabBarStyle: styles.container,
        headerStyle: styles.header,
        headerTintColor: Colors.light.secondary[700],
        headerTitleAlign: "center",
        headerTitleStyle: styles.headerTitle,
        headerRightContainerStyle: { ...{ paddingRight: 20 } },

        headerRight: (props) => (
          <Ionicons
            name="log-out-outline"
            color={Colors.light.primary[500]}
            size={24}
            onPress={() => signOut()}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="observations"
        options={{
          title: "Observations",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(top-tabs)"
        options={{
          title: "Location",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingBottom: 4,
  },
  label: {
    fontSize: 16,
  },
  header: {
    backgroundColor: Colors.light.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: -20,
  },
});
