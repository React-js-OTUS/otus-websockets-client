import { FC } from 'react';
import { User } from 'src/server.types';

export type UserButtonProps = {
  className?: string;
  active: boolean;
  value: User;
  onClick: (value: User) => void;
};

export const UserButton: FC<UserButtonProps> = () => null;
