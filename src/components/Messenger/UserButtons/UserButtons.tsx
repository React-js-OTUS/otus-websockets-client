import { FC } from 'react';
import { User } from 'src/server.types';

export type UserButtonsProps = {
  className?: string;
  activeUserId: string;
  value: User[];
  onClick: (value: User) => void;
};

export const UserButtons: FC<UserButtonsProps> = () => null;
