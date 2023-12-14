import React, { FC } from 'react';
import cn from 'clsx';
import { MessageInput } from 'src/components/Messenger/MessageInput';
import { MessagesView } from 'src/components/Messenger/MessagesView';
import { Message } from 'src/server.types';
import { MessageData } from 'src/components/Messenger/types';
import s from './MessengerWindow.sass';

export type MessagesViewProps = {
  className?: string;
  userId: string;
  messages: Message[];
  onSend: (data: MessageData) => void;
};

export const MessengerWindow: FC<MessagesViewProps> = ({ className, messages, userId, onSend }) => (
  <div className={cn(s.root, className)}>
    <MessagesView className={s.messages} userId={userId} value={messages} />
    <MessageInput onSend={onSend} />
  </div>
);
