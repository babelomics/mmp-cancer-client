import { TFunction } from 'i18next';
import * as Yup from 'yup';

const regexKaryotypicSex = new RegExp(/X+Y*/);
const regexIdentifier = new RegExp(/^([a-zA-Z0-9_]{3,32})$/);

export const basicInfoSchema = (t: TFunction) =>
  Yup.object().shape({
    individualId: Yup.string().required(t('commons.error.required')).matches(regexIdentifier, t('commons.error.invalidIdentifier')),
    name: Yup.string().required(t('commons.error.required')).max(50, t('commons.error.maxName')),
    karyotypicSex: Yup.string().matches(regexKaryotypicSex, t('individuals.inavlidKaryotypicSex'))
  });

export const deleteSchema = (t: TFunction) =>
  Yup.object().shape({
    confirmation: Yup.string()
      .required(t('commons.error.required'))
      .test('MatchConfirmWord', t('panelProfileSet.delete.error'), (value) => value === t('panelProfileSet.delete.confirmWord'))
  });
