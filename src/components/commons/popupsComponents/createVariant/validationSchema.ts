import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexPosition = new RegExp(/^([1-9]{0,})$/);
let regexAltRef = new RegExp(/^[A, C, G, T]$/);

export const checkValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    variantIdentifier: Yup.string().nullable(),
    chromosome: Yup.string().nullable(),
    initPosition: Yup.string().nullable().matches(regexPosition, t('tabPanelDiagnostic.error.notValidVariant')),
    reference: Yup.string().nullable().required(t('commons.error.required')).matches(regexAltRef, t('tabPanelDiagnostic.error.notValidReference')),
    alternative: Yup.string().nullable().required(t('commons.error.required')).matches(regexAltRef, t('tabPanelDiagnostic.error.notValidAlternative')),
    isChildren: Yup.string().nullable()
  });
