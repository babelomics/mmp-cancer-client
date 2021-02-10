import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexpEmail = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape(
    {
      identifier: Yup.string()
        .nullable()
        .when(['email'], {
          is: (email) => !email,
          then: Yup.string().required(t('commons.error.invalidIdentifier'))
        }),
      email: Yup.string()
        .nullable()
        .matches(regexpEmail, t('commons.error.invalidEmail'))
        .when(['identifier'], {
          is: (identifier) => !identifier,
          then: Yup.string().required(t('commons.error.invalidEmail'))
        })
    },
    [['identifier', 'email']]
  );
