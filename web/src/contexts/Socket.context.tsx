"use client";

import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface SocketContextProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps
);

export function connect() {
  return io(process.env.NEXT_PUBLIC_API_URL as string);
}

export function SocketProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    const connection = connect();
    setSocket(connection);

    return () => {
      connection.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={useMemo(() => ({ socket }), [socket])}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
