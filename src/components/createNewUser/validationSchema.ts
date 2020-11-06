import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexpEmail = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    identifier: Yup.string().nullable().required(t('commons.error.required')),
    organization: Yup.string().nullable().required(t('commons.error.required')),
    firstName: Yup.string().nullable().required(t('commons.error.required')),
    lastName: Yup.string().nullable().required(t('commons.error.required')),
    userType: Yup.string().nullable().required(t('commons.error.required')),
    email: Yup.string().nullable().required(t('commons.error.required')).matches(regexpEmail, t('commons.error.invalidEmail'))
  });
