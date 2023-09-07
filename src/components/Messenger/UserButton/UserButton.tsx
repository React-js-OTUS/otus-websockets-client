import React, { FC } from 'react';
import cn from 'clsx';
import { User } from 'src/server.types';
import s from './UserButton.sass';

export type UserButtonProps = {
  className?: string;
  active: boolean;
  value: User;
  onClick: (value: User) => void;
};

export const UserButton: FC<UserButtonProps> = ({ className, active, value, onClick }) => {
  if (!value) return null;
  return (
    <button type="button" className={cn(s.root, active && s.active, className)} onClick={() => onClick(value)}>
      {value.name}
    </button>
  );
};
