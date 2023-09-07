import React, { FC } from 'react';
import cn from 'clsx';
import { User } from 'src/server.types';
import { UserButton } from '../UserButton';
import s from './UserButtons.sass';

export type UserButtonsProps = {
  className?: string;
  activeUserId: string;
  value: User[];
  onClick: (value: User) => void;
};

export const UserButtons: FC<UserButtonsProps> = ({ className, activeUserId, value, onClick }) => {
  if (!value?.length) return null;
  return (
    <div className={cn(s.root, className)}>
      {value.map((item) => (
        <UserButton key={item.id} value={item} active={activeUserId === item.id} onClick={onClick} />
      ))}
    </div>
  );
};
