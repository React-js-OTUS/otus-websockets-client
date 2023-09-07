import { FC } from 'react';
import { MessageData } from 'src/components/Messenger/types';

export type MessageInputProps = {
  className?: string;
  onSend: (data: MessageData) => void;
};

export const MessageInput: FC<MessageInputProps> = () => null;
