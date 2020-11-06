import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const generateValidationSchema = (t: TFunction) => Yup.object().shape({});
