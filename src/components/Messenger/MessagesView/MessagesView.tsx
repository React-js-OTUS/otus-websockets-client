import { FC } from 'react';
import { Message } from 'src/server.types';

export type MessagesViewProps = {
  className?: string;
  value: Message[];
  userId: string;
};

export const MessagesView: FC<MessagesViewProps> = () => null;
