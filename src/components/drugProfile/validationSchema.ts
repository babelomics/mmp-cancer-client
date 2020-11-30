import { TFunction } from 'i18next';
import * as Yup from 'yup';

let regexpEmail = new RegExp(/^(\d+,?\d{2})*$/);

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    cost: Yup.string().nullable().matches(regexpEmail, t('commons.error.invalidCost'))
  });
