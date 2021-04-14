import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const checkValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    chromosome: Yup.string().nullable().required(t('commons.error.required')),
    initPosition: Yup.number().nullable().required(t('commons.error.required')).positive(),
    endPosition: Yup.number().nullable().required(t('commons.error.required')).positive().min(Yup.ref('initPosition'), t('commons.error.validationRegions'))
  });
