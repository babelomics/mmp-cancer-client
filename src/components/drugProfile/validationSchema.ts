import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexpCost = new RegExp(/^(\d+[.]?\d{2})*$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    cost: Yup.string().nullable().matches(regexpCost, t('commons.error.invalidCost'))
  });
