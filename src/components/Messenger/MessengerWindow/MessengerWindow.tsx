import { FC } from 'react';
import { Message } from 'src/server.types';
import { MessageData } from 'src/components/Messenger/types';

export type MessagesViewProps = {
  className?: string;
  userId: string;
  messages: Message[];
  onSend: (data: MessageData) => void;
};

export const MessengerWindow: FC<MessagesViewProps> = () => null;
