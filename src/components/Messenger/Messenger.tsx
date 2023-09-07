import React, { FC } from 'react';
import cn from 'clsx';
import s from './Messenger.sass';

export type MessengerProps = {
  className?: string;
};

export const Messenger: FC<MessengerProps> = ({ className }) => <div className={cn(s.root, className)}>{null}</div>;
