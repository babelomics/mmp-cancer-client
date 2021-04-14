import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexpEmail = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
let regexIdentifier = new RegExp(/^([a-zA-Z0-9_]{3,32})$/);

export const loginValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    username: Yup.string().nullable().required(t('commons.error.required')),
    password: Yup.string().nullable().required(t('commons.error.required'))
  });

const isEmpty = (value: string | null | undefined) => {
  if (value) {
    return value?.trim().length > 0;
  }
  return false;
};

export const signUpValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    identifier: Yup.string().nullable().required(t('commons.error.required')).matches(regexIdentifier, t('commons.error.invalidIdentifier')),
    organization: Yup.string()
      .nullable()
      .required(t('commons.error.required'))
      .test('emptyStringCheck', t('commons.error.required'), (value) => isEmpty(value))
      .max(150, t('commons.error.maxOrganization')),
    firstName: Yup.string()
      .nullable()
      .required(t('commons.error.required'))
      .test('emptyStringCheck', t('commons.error.required'), (value) => isEmpty(value))
      .max(25, t('commons.error.maxFirstName')),
    lastName: Yup.string()
      .nullable()
      .required(t('commons.error.required'))
      .test('emptyStringCheck', t('commons.error.required'), (value) => isEmpty(value))
      .max(40, t('commons.error.maxLastName')),
    email: Yup.string().nullable().required(t('commons.error.required')).matches(regexpEmail, t('commons.error.invalidEmail')),
    accessRequestReason: Yup.string()
      .nullable()
      .required(t('commons.error.required'))
      .test('emptyStringCheck', t('commons.error.required'), (value) => isEmpty(value))
      .max(500, t('commons.error.maxAccessRequestReason')),
    attended: Yup.string()
      .nullable()
      .when('isReviewing', { is: true, then: Yup.string().nullable().required(t('commons.error.required')) })
  });
