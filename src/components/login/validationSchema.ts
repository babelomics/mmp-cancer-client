import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    username: Yup.string().nullable().required(t('login.messages.emptyUsername')),
    password: Yup.string().nullable().required(t('login.messages.emptyPassword'))
  });
