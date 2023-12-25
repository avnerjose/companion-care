import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { api } from "@/services/api";
import { useNotification } from "./notification.context";

interface UserSession {
  name: string;
  email: string;
  token: string;
  role: string;
  hospitalProcedureId: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userSession: UserSession | null;
  signIn: (email: string, code: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: PropsWithChildren) {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const { expoPushToken } = useNotification();

  const updateUserSessionFromToken = (token: string) => {
    const { name, role, sub: email, hospitalProcedureId } = jwtDecode(
      token
    ) as {
      name: string;
      role: string;
      sub: string;
      hospitalProcedureId: string;
    };

    setUserSession({
      name,
      email,
      token,
      role,
      hospitalProcedureId,
    });
  };

  const signIn = async (email: string, code: string) => {
    console.log(email, code, expoPushToken);
    try {
      const { data } = await api.post("/auth/verify-code", {
        email,
        code,
        notificationToken: expoPushToken,
      });

      const { access_token } = data;

      await SecureStore.setItemAsync("token", access_token);

      updateUserSessionFromToken(access_token);
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("token");
    setUserSession(null);
  };

  const loadUserSessionFromStorage = async () => {
    const token = await SecureStore.getItemAsync("token");

    if (token) {
      updateUserSessionFromToken(token);
    }
  };

  useEffect(() => {
    loadUserSessionFromStorage();
  }, []);

  useProtectedRoute(!!userSession);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!userSession,
        signIn,
        signOut,
        userSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useProtectedRoute(isAuthenticated: boolean) {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/get-code");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [isAuthenticated, segments, navigationState]);
}

export const useAuth = () => useContext(AuthContext);
