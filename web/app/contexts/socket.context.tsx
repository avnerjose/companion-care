import {
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Socket, io } from "socket.io-client";
import { type DefaultEventsMap } from "socket.io/dist/typed-events";

interface SocketContextProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps,
);

export function connect() {
  return io("https://companion-care-backend-production.up.railway.app");
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
