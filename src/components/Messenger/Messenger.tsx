import React, { FC, useEffect, useState } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { usersSelectors } from 'src/store/users';
import { profileSelectors } from 'src/store/profile';
import { messagesSelectors } from 'src/store/messages';
import { useSocketContext } from 'src/socket/SocketProvider';
import { User } from 'src/server.types';
import { MessageData } from 'src/components/Messenger/types';
import { useTranslation } from 'react-i18next';
import { Alert } from 'antd';
import { UserButtons } from './UserButtons';
import { MessengerWindow } from './MessengerWindow';
import s from './Messenger.sass';

export type MessengerProps = {
  className?: string;
};

export const Messenger: FC<MessengerProps> = ({ className }) => {
  const { t } = useTranslation();
  const { socket, error } = useSocketContext();
  const users = useSelector<RootState, RootState['users']>(usersSelectors.get);
  const profile = useSelector<RootState, RootState['profile']>(profileSelectors.get);
  const messages = useSelector<RootState, RootState['messages']>(messagesSelectors.get);
  const [activeUser, setActiveUser] = useState<User>();

  useEffect(() => {
    if (activeUser) {
      socket?.emit('getMessages', { userIds: [profile?.id, activeUser?.id] });
    }
  }, [activeUser, profile?.id, socket]);

  const onSend = (data: MessageData) => {
    socket?.emit('sendMessage', { content: data.content, authorId: profile?.id, recipientIds: [activeUser.id] });
  };

  const element = (() => {
    if (error) return <Alert className={s.alert} type="error" message={t(`errors.${error.data}`)} />;
    if (!users?.length) return t`components.Messenger.empty`;
    return (
      <div className={s.wrapper}>
        <UserButtons className={s.users} value={users} activeUserId={activeUser?.id} onClick={setActiveUser} />
        {activeUser && (
          <MessengerWindow className={s.window} onSend={onSend} userId={profile?.id} messages={messages} />
        )}
      </div>
    );
  })();

  return <div className={cn(s.root, className)}>{element}</div>;
};
