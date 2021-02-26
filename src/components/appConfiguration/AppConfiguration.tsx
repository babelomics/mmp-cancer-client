import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaContainer from '../commons/GaiaContainer';
import GaiaLoading from '../commons/GaiaLoading';
import PanDrugsConfig from './PanDrugsConfig';
import TextConfig from './TextConfig';
import GenomicDictionaryConfig from './GenomicDictionaryConfig';
import ContactAdminConfig from './ContactAdminConfig';
import { IConfiguration, IPandrugsConfig, IGenomicDictConfig } from './interfaces';
import { FormikErrors } from 'formik';
import routes from '../router/routes';
import { useHistory } from 'react-router-dom';

interface IProps {
  loading: boolean;
  configData: IConfiguration;
  validationPundrugs: boolean;
  validationGenomDict: boolean;
  fetchConfigRequest: (t: any) => void;
  setNewConfig: (config: IConfiguration, t: any) => Promise<any>;
  validateGenomicDictionaryUrl: (url: string, setFormikErrors: (errors: FormikErrors<IGenomicDictConfig>) => void, t: any) => void;
  validatePanDrugs: (pandrugsConfig: IPandrugsConfig, setFormikErrors: (errors: FormikErrors<IPandrugsConfig>) => void, t: any) => void;
  updateConfigData: (config: IConfiguration) => void;
  setValidationPandrug: (validationState: boolean) => void;
  setValidationGenomDict: (validationState: boolean) => void;
  resetValidations: () => void;
}

export const AppConfiguration = (props: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  const clickAccept = () => {
    //PUT ON DATABASE
    props.setNewConfig(props.configData, t).then((result) => {
      if (result.done) {
        props.fetchConfigRequest(t);
      }
    });
  };
  const goHome = () => {
    props.resetValidations();
    history.push(routes.PATH_HOME);
  };

  return (
    <GaiaContainer
      icon="settings_applications"
      title={t('appConfiguration.title')}
      onBack={goHome}
      onAccept={!props.loading && !props.validationPundrugs && !props.validationGenomDict ? () => clickAccept() : undefined}
    >
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <>
          <ContactAdminConfig
            updateConfigData={props.updateConfigData}
            identifier={props.configData.contactIdentifier || ''}
            name={props.configData.contactName || ''}
            surname={props.configData.contactLastName || ''}
            email={props.configData.contactEmail || ''}
          />
          <TextConfig textValue={props.configData.setupInformation ?? ''} updateConfigData={props.updateConfigData} />
          <PanDrugsConfig
            validationState={props.validationPundrugs}
            setValidationPandrug={props.setValidationPandrug}
            apiValidPanDrugs={props.validatePanDrugs}
            pandrugUrl={props.configData.pandrugURL}
            pandrugUser={props.configData.pandrugUser}
            pandrugPassword={props.configData.pandrugPassword}
            pandrugEmail={props.configData.pandrugEmail}
          />
          <GenomicDictionaryConfig
            validationState={props.validationGenomDict}
            setValidationGenomDict={props.setValidationGenomDict}
            apiValidUrl={props.validateGenomicDictionaryUrl}
            genomicDictionaryURL={props.configData.genomicDictionaryURL}
          />
        </>
      )}
    </GaiaContainer>
  );
};
export default AppConfiguration;
