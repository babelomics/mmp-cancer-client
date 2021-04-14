import { IConfiguration } from '../interfaces';
import actions from './actions';
import api from './api';
import { IGenomicDictConfig, IPandrugsConfig } from '../interfaces';
import { FormikErrors } from 'formik/dist/types';
import { operations as globalPopupOperations } from '../../globalPopups/duck';
import { operations as loginOperations } from '../../login/duck';

const updateConfigData = actions.updateConfigData;

const setValidationPandrug = actions.setValidationPandrug;

const setValidationGenomDict = actions.setValidationGenomDict;

const resetValidations = actions.resetValidations;

const fetchConfigRequest = (t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());
  api
    .fetchConfigRequest()
    .then((result) => {
      dispatch(actions.loadConfigData(result.data));
      dispatch(actions.endFetch());
    })
    .catch((err: any) => {
      dispatch(actions.endFetch());
      dispatch(globalPopupOperations.showMessagePopup(t('appConfiguration.conectionError'), 'error'));
    });
};

const setNewConfig = (newConfing: IConfiguration, t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());
  return new Promise((resolve, reject) => {
    api
      .setNewConfig(newConfing)
      .then((result) => {
        dispatch(loginOperations.updateConfigData(result.data));
        resolve({ done: true });
        dispatch(actions.endFetch());
        dispatch(globalPopupOperations.showMessagePopup(t('appConfiguration.success'), 'success'));
      })
      .catch((err: any) => {
        reject(err);
        dispatch(actions.endFetch());
        dispatch(globalPopupOperations.showMessagePopup(t('appConfiguration.conectionError'), 'error'));
      });
  });
};

const validatePanDrugs = (panDrugsConfig: IPandrugsConfig, setFormikErrors: (errors: FormikErrors<IPandrugsConfig>) => void, t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());
  api
    .validatePanDrugsApi(panDrugsConfig.user, panDrugsConfig.password, panDrugsConfig.url)
    .then((result) => {
      dispatch(actions.endFetch());
      dispatch(actions.updateConfigData({ pandrugPassword: panDrugsConfig.password, pandrugURL: panDrugsConfig.url, pandrugUser: panDrugsConfig.user, pandrugEmail: panDrugsConfig.email }));
      dispatch(actions.setValidationPandrug(false));
      dispatch(globalPopupOperations.showMessagePopup(t('panDrugsConfig.messages.success'), 'success'));
    })
    .catch((err: any) => {
      dispatch(actions.endFetch());
      switch (err.status) {
        case 401:
          dispatch(
            globalPopupOperations.showMessagePopup(t('panDrugsConfig.messages.notExist') + 'Usuario: ' + panDrugsConfig.user + ' / Password: ' + panDrugsConfig.password, 'warningConfirm', () =>
              dispatch(createPanDrugsUser(panDrugsConfig, t))
            )
          );
          setFormikErrors({ user: t('commons.error.user') });
          setFormikErrors({ password: t('commons.error.password.dontMatch') });
          setFormikErrors({ email: t('commons.error.invalidEmail') });
          break;
        case 404:
          dispatch(globalPopupOperations.showMessagePopup(t('panDrugsConfig.messages.invalidUrl'), 'error'));
          setFormikErrors({ url: t('commons.error.url') });
          break;
        default:
          dispatch(globalPopupOperations.showMessagePopup(t('panDrugsConfig.messages.noConnection'), 'error'));
          setFormikErrors({ user: t('commons.error.user') });
          setFormikErrors({ password: t('commons.error.password.dontMatch') });
          setFormikErrors({ email: t('commons.error.invalidEmail') });
      }
    });
};

const createPanDrugsUser = (panDrugsConfig: IPandrugsConfig, t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());
  api
    .createPanDrugsUserApi(panDrugsConfig.user, panDrugsConfig.password, panDrugsConfig.url, panDrugsConfig.email)
    .then((result) => {
      dispatch(actions.endFetch());
      dispatch(actions.updateConfigData({ pandrugPassword: panDrugsConfig.password, pandrugURL: panDrugsConfig.url, pandrugUser: panDrugsConfig.user, pandrugEmail: panDrugsConfig.email }));
      dispatch(actions.setValidationPandrug(false));
      dispatch(globalPopupOperations.showMessagePopup(t('panDrugsConfig.messages.successCreate'), 'success'));
    })
    .catch((err: any) => {
      dispatch(actions.endFetch());
      dispatch(globalPopupOperations.showMessagePopup(t('panDrugsConfig.messages.errorCreate'), 'error'));
    });
};

const validateGenomicDictionaryUrl = (url: string, setFormikErrors: (errors: FormikErrors<IGenomicDictConfig>) => void, t: any) => (dispatch: any) => {
  dispatch(actions.initFetch());
  api
    .validateGenomicDictionaryUrlApi(url)
    .then((result) => {
      dispatch(actions.updateConfigData({ genomicDictionaryURL: url }));
      dispatch(actions.setValidationGenomDict(false));
      dispatch(actions.endFetch());
      dispatch(globalPopupOperations.showMessagePopup(t('genomicDictionaryConfig.messages.success'), 'success'));
    })
    .catch((err: any) => {
      dispatch(actions.endFetch());
      setFormikErrors({ url: t('commons.error.url') });
      switch (err.status) {
        case 401:
        case 404:
          dispatch(globalPopupOperations.showMessagePopup(t('genomicDictionaryConfig.messages.invalidUrl'), 'error'));
          break;
        default:
          dispatch(globalPopupOperations.showMessagePopup(t('genomicDictionaryConfig.messages.noConnection'), 'error'));
      }
    });
};

export default {
  resetValidations,
  fetchConfigRequest,
  updateConfigData,
  setNewConfig,
  validateGenomicDictionaryUrl,
  validatePanDrugs,
  createPanDrugsUser,
  setValidationPandrug,
  setValidationGenomDict
};
