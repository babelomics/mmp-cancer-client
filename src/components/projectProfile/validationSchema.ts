import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexIdentifier = new RegExp(/^([a-zA-Z0-9_]{3,32})$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    projectId: Yup.string().nullable().required(t('commons.error.required')).matches(regexIdentifier, t('commons.error.invalidIdentifier')),
    name: Yup.string().nullable().required(t('commons.error.required')).max(50, t('commons.error.maxName')),
    description: Yup.string().nullable().max(500, t('commons.error.maxDescription')),
    organism: Yup.string().nullable().required(t('commons.error.required')),
    assembly: Yup.string().nullable().required(t('commons.error.required')),
    ensemblRelease: Yup.string().nullable().required(t('commons.error.required'))
  });
