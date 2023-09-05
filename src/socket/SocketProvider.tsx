import React, { FC, createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketProviderContext = createContext<Socket>(null);

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const _socket = io('http://localhost:4001', {
      auth: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjZkOTIxNDRjNWZlZjdkNzcwMTQ0OSIsImlhdCI6MTY5MzkxMTUyMSwiZXhwIjoxNjk0Nzc1NTIxfQ.OEXcfc2u4tFSjEWm0VG8TUXYfbG-2IZvXTp7vgf8Ato',
      },
    });

    _socket.on('connect', (...a) => {
      console.log(...a);
    });

    _socket.on('connect_error', console.dir);

    setSocket(_socket);

    return () => {
      setSocket(null);
      _socket.disconnect();
    };
  }, []);

  return <SocketProviderContext.Provider value={socket}>{children}</SocketProviderContext.Provider>;
};
