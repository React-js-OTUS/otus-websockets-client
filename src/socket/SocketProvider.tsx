import React, { FC, createContext, useContext, useMemo, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { tokenSelectors } from 'src/store/token';
import { usersActions } from 'src/store/users';
import { messagesActions } from 'src/store/messages';
import config from './config.json';

const URL = process.env.LOCAL === 'true' ? config.url_dev : config.url_prod;

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

const socket = io(URL, {
  autoConnect: false,
});

export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const token = useSelector(tokenSelectors.get);
  const dispatch = useDispatch();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    socket.io.opts.query = {
      token,
    };
    socket.on('connect', (...a) => {
      console.log('connect', ...a);
    });
    socket.on('connect_error', setError);
    socket.on('disconnect', (...a) => console.log('disconnect', ...a));

    socket.on('users', (users) => {
      dispatch(usersActions.set(users));
    });

    socket.on('messages', (messages) => {
      dispatch(messagesActions.set(messages));
    });

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [dispatch, token]);

  const value = useMemo(() => ({ socket, error: error as SocketError }), [error]);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
