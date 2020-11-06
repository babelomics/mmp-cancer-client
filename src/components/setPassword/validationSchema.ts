import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const generateValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    password: Yup.string().required(t('commons.error.password.required')),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], t('commons.error.password.dontMatch'))
      .required('Password confirm is required')
  });
