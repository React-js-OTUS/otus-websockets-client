import React, { FC } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { usersSelectors } from 'src/store/users';
import { UserButtons } from './UserButtons';
import s from './Messenger.sass';

export type MessengerProps = {
  className?: string;
};

export const Messenger: FC<MessengerProps> = ({ className }) => {
  const users = useSelector<RootState, RootState['users']>(usersSelectors.get);
  return (
    <div className={cn(s.root, className)}>
      <UserButtons value={users} onClick={console.log} />
    </div>
  );
};
