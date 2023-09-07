import React, { FC, createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';

export type SocketProviderProps = {
  children: React.ReactNode;
};

export type SocketError = Error & { data: string };

export type SocketContextType = {
  socket: Socket;
  error: SocketError;
};

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const useSocketContext = () => useContext(SocketContext);

/**
 * connect
 * disconnect
 * connect_error
 * users
 * messages
 * */
export const SocketProvider: FC<SocketProviderProps> = ({ children }) => (
  <SocketContext.Provider value={{ socket: null, error: null }}>{children}</SocketContext.Provider>
);
