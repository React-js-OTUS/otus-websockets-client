import React, { FC } from 'react';
import cn from 'clsx';
import { Message } from 'src/server.types';
import s from './MessageView.sass';

export type MessageViewProps = {
  className?: string;
  value: Message;
  own?: boolean;
};

export const MessageView: FC<MessageViewProps> = ({ className, own, value }) => {
  if (!value) return null;
  return (
    <div data-element-type="message-view" className={cn(s.root, own && s.own, className)}>
      <div className={cn(s.wrapper, own && s.own)}>
        <div className={s.name}>{value.author.name}</div>
        <div className={s.content}>{value.content}</div>
        <div className={s.date}>{`${new Date(value.date).toLocaleTimeString()} ${new Date(
          value.date
        ).toLocaleDateString()}`}</div>
      </div>
    </div>
  );
};
