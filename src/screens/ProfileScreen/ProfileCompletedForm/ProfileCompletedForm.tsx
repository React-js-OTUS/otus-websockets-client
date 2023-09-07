import React, { memo, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { FormikConfig, useFormik } from 'formik';
import { useMutation } from 'src/client/hooks';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ProfileForm, ProfileFormValues, ProfileFormErrors } from 'src/components/Forms/ProfileForm';
import { createErrorHandlers } from 'src/utils/createErrorHandlers';
import { isNotDefinedString } from 'src/utils/validation';
import { profileSelectors } from 'src/store/profile';
import { Title } from 'src/components/Title';
import { UpdateProfileResponse, UpdateProfileVars } from './connection';
import s from './ProfileCompletedForm.sass';

export type ProfileCompletedFormProps = {
  className?: string;
};

export const ProfileCompletedForm = memo<ProfileCompletedFormProps>(({ className }) => {
  const profile = useSelector(profileSelectors.get);
  const { t } = useTranslation();
  const [update, { loading }] = useMutation<UpdateProfileResponse, UpdateProfileVars>('/profile');

  const { onSubmit, validate, initialValues } = useMemo<
    Pick<FormikConfig<ProfileFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
  >(() => {
    const { catcherValidator } = createErrorHandlers<keyof ProfileFormValues>(
      (code, error) => {
        if (code === null) {
          message.error(t(`errors.${error.message}`));
        } else {
          message.error(t(`errors.${code}`));
        }
      },
      {
        name: ['ERR_INVALID_NICKNAME'],
      }
    );
    return {
      initialValues: {
        name: profile?.name,
      },
      onSubmit: (values, { setErrors }) => {
        update({ variables: { name: values.name?.trim() } })
          .then(() => message.success(t(`screens.ProfileScreen.updateProfile.success`)))
          .catch(catcherValidator({ setErrors, getMessage: (code) => t(`errors.${code}`) }));
      },
      validate: (values) => {
        const errors = {} as ProfileFormErrors;
        if (isNotDefinedString(values.name)) {
          errors.name = t(`errors.is_required`);
        }
        return errors;
      },
    };
  }, [profile, t, update]);

  const formManager = useFormik<ProfileFormValues>({
    initialValues,
    onSubmit,
    validate,
  });
  const { submitForm, setValues } = formManager;

  useEffect(() => {
    setValues({ name: profile?.name });
  }, [profile, setValues]);

  return (
    <div className={cn(s.root, className)}>
      <Title className={s.title}>{t(`screens.ProfileScreen.updateProfile.title`)}</Title>
      <ProfileForm formManager={formManager} />
      <Button type="primary" loading={loading} onClick={submitForm}>
        {t(`screens.ProfileScreen.updateProfile.save`)}
      </Button>
    </div>
  );
});

ProfileCompletedForm.displayName = 'ProfileCompletedForm';
