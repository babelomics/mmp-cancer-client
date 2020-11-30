import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexpEmail = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const generateValidationSchemaPanDrugs = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string().nullable().required(t('commons.error.required')).matches(regexpEmail, t('commons.error.invalidEmail')),
    user: Yup.string().nullable().required(t('commons.error.user')),
    url: Yup.string().nullable().required(t('commons.error.url')),
    password: Yup.string().nullable().required(t('login.messages.emptyPassword'))
  });

export const generateValidationSchemaDictonaryGen = (t: TFunction) =>
  Yup.object().shape({
    url: Yup.string().nullable().required(t('commons.error.url'))
  });
