import { createContext, useMemo } from "react";
import type { ReactNode } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

export type SocketContextType = {
  socket: Socket;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useMemo(
    () => io("https://glassy-totality-324307.uc.r.appspot.com/"),
    []
  );

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
