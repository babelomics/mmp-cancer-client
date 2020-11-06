import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexpEmail = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
let regexIdentifier = new RegExp(/^([a-zA-Z0-9_]{5,10})$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    identifier: Yup.string().nullable().required(t('commons.error.required')).matches(regexIdentifier, t('commons.error.invalidIdentifier')),
    organization: Yup.string().nullable().required(t('commons.error.required')).max(150),
    firstName: Yup.string().nullable().required(t('commons.error.required')),
    lastName: Yup.string().nullable().required(t('commons.error.required')),
    email: Yup.string().nullable().required(t('commons.error.required')).matches(regexpEmail, t('commons.error.invalidEmail')),
    accessRequestReason: Yup.string().nullable().required(t('commons.error.required')).max(500),
    attended: Yup.string()
      .nullable()
      .when('isReviewing', { is: true, then: Yup.string().nullable().required(t('commons.error.required')) })
  });
