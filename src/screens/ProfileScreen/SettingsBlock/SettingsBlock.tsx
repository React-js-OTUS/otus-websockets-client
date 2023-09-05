import React, { memo } from 'react';
import cn from 'clsx';
import { ProfileCompletedForm } from '../ProfileCompletedForm';
import s from './SettingsBlock.sass';

export type SettingsBlockProps = {
  className?: string;
};

export const SettingsBlock = memo<SettingsBlockProps>(({ className }) => (
  <div className={cn(s.root, className)}>
    <ProfileCompletedForm />
  </div>
));

SettingsBlock.displayName = 'SettingsBlock';
