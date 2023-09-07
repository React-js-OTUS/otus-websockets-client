import React, { FC, useEffect, useRef } from 'react';
import cn from 'clsx';
import { Message } from 'src/server.types';
import { MessageView } from '../MessageView';
import s from './MessagesView.sass';

export type MessagesViewProps = {
  className?: string;
  value: Message[];
  userId: string;
};

export const MessagesView: FC<MessagesViewProps> = ({ className, value, userId }) => {
  const root = useRef<HTMLDivElement>();

  useEffect(() => {
    if (root.current) {
      const elems = root.current.querySelectorAll('[data-element-type="message-view"]');
      elems[elems.length - 1].scrollIntoView({ behavior: 'smooth' });
    }
  }, [value]);

  if (!value?.length) return null;
  return (
    <div ref={root} className={cn(s.root, className)}>
      {value.map((item) => (
        <MessageView value={item} key={item.id} own={userId === item.author?.id} />
      ))}
    </div>
  );
};
