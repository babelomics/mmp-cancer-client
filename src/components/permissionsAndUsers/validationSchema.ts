import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexIdentifier = new RegExp(/^([a-zA-Z0-9_]{3,32})$/);

export const groupValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    identifier: Yup.string().nullable().required(t('commons.error.required')).matches(regexIdentifier, t('commons.error.invalidIdentifier')),
    name: Yup.string().nullable().required(t('commons.error.required')).max(50, t('commons.error.maxName')),
    description: Yup.string().nullable().required(t('commons.error.required')).max(500, t('commons.error.maxDescription'))
  });

export const usersPermissionsValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    identifier: Yup.string().nullable().required(t('commons.error.required')),
    name: Yup.string().nullable().required(t('commons.error.required'))
  });

export const deleteSchema = (t: TFunction) =>
  Yup.object().shape({
    confirmation: Yup.string()
      .required(t('commons.error.password.required'))
      .test('MatchConfirmWord', t('panelProfileSet.delete.error'), (value) => value === t('panelProfileSet.delete.confirmWord'))
  });
