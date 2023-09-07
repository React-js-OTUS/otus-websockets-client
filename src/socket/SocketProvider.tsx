import React, { FC, createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { URL } from 'src/client/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { tokenSelectors } from 'src/store/token';
import { usersActions } from 'src/store/users';

export type SocketProviderProps = {
  children: React.ReactNode;
};

export type SocketProviderContextType = {
  socket: Socket;
  error: Error;
};
const SocketProviderContext = createContext<SocketProviderContextType>(null);

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const [data, setData] = useState<SocketProviderContextType>();
  const dispatch = useDispatch();
  const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);

  useEffect(() => {
    const _socket = io(URL, { auth: { token: '232' } });

    _socket.on('connect', () => {
      setData({ socket: _socket, error: null });
    });

    _socket.on('disconnect', () => {
      setData({ socket: null, error: null });
    });

    _socket.on('connect_error', (error) => {
      setData({ socket: _socket, error });
    });

    _socket.on('users', (users) => {
      dispatch(usersActions.set(users));
    });

    return () => {
      setData(null);
      _socket.disconnect();
    };
  }, [dispatch, token]);

  return <SocketProviderContext.Provider value={data}>{children}</SocketProviderContext.Provider>;
};
