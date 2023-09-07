import { FC } from 'react';
import { Message } from 'src/server.types';

export type MessageViewProps = {
  className?: string;
  value: Message;
  own?: boolean;
};

export const MessageView: FC<MessageViewProps> = () => null;
