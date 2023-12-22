"use client";

import {
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { Doctor } from "@/entities/Doctor";
import axios from "axios";


interface UserContextProps {
  user: Doctor | null;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get<Doctor>("/api/me");

      setUser(data);
    };

    if (!user) fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
