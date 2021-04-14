import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexIdentifier = new RegExp(/^([a-zA-Z0-9_]{3,32})$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    diagnosticPanelSetIdentifier: Yup.string().nullable().required(t('commons.error.required')).matches(regexIdentifier, t('commons.error.invalidIdentifier')),
    name: Yup.string().nullable().required(t('commons.error.required')).max(50, t('commons.error.maxName')),
    description: Yup.string().nullable().required(t('commons.error.required')).max(500, t('commons.error.maxDescription')),
    assembly: Yup.string().nullable().required(t('commons.error.required')),
    ensemblRelease: Yup.string().nullable().required(t('commons.error.required'))
  });

export const generateValidationSchemaConfirm = (t: TFunction) =>
  Yup.object().shape({
    identifier: Yup.string().matches(regexIdentifier, t('commons.error.invalidIdentifier')),
    name: Yup.string(),
    confirmation: Yup.string()
      .nullable()
      .when(['identifier', 'name'], {
        is: '',
        then: Yup.string().required(t('commons.error.required'))
      })
      .test('MatchConfirmWord', t('userProfile.unsubscribe.error'), (value) => {
        if (value) {
          return value === t('panelSetCreate.unsubscribe.confirmWord');
        }
        return true;
      })
  });
