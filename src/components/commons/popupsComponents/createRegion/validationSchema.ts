import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexPosition = new RegExp(/^([1-9]{0,})$/);

export const checkValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    chromosome: Yup.string().nullable().required(t('commons.error.required')),
    initPosition: Yup.string().nullable().required(t('commons.error.required')).matches(regexPosition, t('tabPanelDiagnostic.error.notValidPosition')),
    endPosition: Yup.string().nullable().required(t('commons.error.required')).matches(regexPosition, t('tabPanelDiagnostic.error.notValidPosition'))
  });
