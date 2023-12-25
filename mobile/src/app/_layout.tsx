import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import Toast from "react-native-toast-message";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { AuthProvider } from "@/contexts/auth.context";
import { HospitalProcedureProvider } from "@/contexts/hospital-procedure.context";
import { SocketProvider } from "@/contexts/socket.context";
import { NotificationProvider } from "@/contexts/notification.context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <NotificationProvider>
        <AuthProvider>
          <SocketProvider>
            <HospitalProcedureProvider>
              <Slot />
              <Toast />
            </HospitalProcedureProvider>
          </SocketProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
