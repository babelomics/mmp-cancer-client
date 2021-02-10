import { TFunction } from 'i18next';
import * as Yup from 'yup';

//let regexpEmail = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    diagnosticPanelSetIdentifier: Yup.string().nullable().required(t('commons.error.required')),
    name: Yup.string().nullable().required(t('commons.error.required')),
    description: Yup.string().nullable().required(t('commons.error.required')),
    assembly: Yup.string().nullable().required(t('commons.error.required')),
    ensemblRelease: Yup.string().nullable().required(t('commons.error.required'))
  });

  export const deleteSchema = (t: TFunction) =>
  Yup.object().shape({
    confirmation: Yup.string()
      .required(t('commons.error.password.required'))
      .test('MatchConfirmWord', t('panelProfileSet.delete.error'), (value) => value === t('panelProfileSet.delete.confirmWord'))
  });
