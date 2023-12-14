import React, { FC, useState } from 'react';
import cn from 'clsx';
import { MessageData } from 'src/components/Messenger/types';
import { Input } from 'antd';
import s from './MessageInput.sass';

export type MessageInputProps = {
  className?: string;
  onSend: (data: MessageData) => void;
};

export const MessageInput: FC<MessageInputProps> = ({ className, onSend }) => {
  const [value, setValue] = useState<string>();
  const send = () => {
    onSend({ content: value });
    setValue('');
  };
  return (
    <Input.TextArea
      className={cn(s.root, className)}
      onPressEnter={send}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
