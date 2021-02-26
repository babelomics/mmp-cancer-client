import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexpEmail = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
let regexIdentifier = new RegExp(/^([a-zA-Z0-9_]{3,32})$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    projectId: Yup.string().nullable().required(t('commons.error.required')).matches(regexIdentifier, t('commons.error.invalidIdentifier')),
    name: Yup.string().nullable().required(t('commons.error.required')),
    organism: Yup.string().nullable().required(t('commons.error.required')),
    assembly: Yup.string().nullable().required(t('commons.error.required')),
    ensemblRelease: Yup.string().nullable().required(t('commons.error.required'))
  });
