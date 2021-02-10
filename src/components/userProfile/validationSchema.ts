import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexpEmail = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string().nullable().required(t('commons.error.required')).matches(regexpEmail, t('commons.error.invalidEmail')),
    firstName: Yup.string().nullable().required(t('commons.error.required')),
    lastName: Yup.string().nullable().required(t('commons.error.required')),
    userType: Yup.string().nullable().required(t('commons.error.required'))
  });

export const modifyPasswordSchema = (t: TFunction) =>
  Yup.object().shape({
    password: Yup.string().required(t('commons.error.password.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('commons.error.password.dontMatch'))
      .required(t('commons.error.password.required'))
  });

export const unsubscribeSchema = (t: TFunction) =>
  Yup.object().shape({
    confirmation: Yup.string()
      .test('MatchConfirmWord', t('userProfile.unsubscribe.error'), (value) => value === t('userProfile.unsubscribe.confirmWord'))
  });
