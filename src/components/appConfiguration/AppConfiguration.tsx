import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import GaiaContainer from '../commons/GaiaContainer';
import GaiaLoading from '../commons/GaiaLoading';
import PanDrugsConfig from './PanDrugsConfig';
import TextConfig from './TextConfig';
import GenomicDictionaryConfig from './GenomicDictionaryConfig';
import ContactAdminConfig from './ContactAdminConfig';
import { IConfiguration, IAdminConfig, IPandrugsConfig, IGenomicDictConfig } from './interfaces';

interface IProps {
  loading: boolean;
  configData: IConfiguration;
  fetchConfigRequest: () => void;
  setNewConfig: (config: IConfiguration) => void;
  validateCellbaseUrl: (url: string, formikError?: any) => Promise<any>;
  validatePanDrugs: (user: string, password: string, url: string) => Promise<any>;
  createPanDrugsUser: (user: string, password: string, url: string, email: string) => Promise<any>;
}

export const AppConfiguration = (props: IProps) => {
  const { t } = useTranslation();

  const [identifierAdmin, setIdentifierAdmin] = useState<string>('');
  const [nameAdmin, setNameAdmin] = useState<string>('');
  const [surnameAdmin, setSurnameAdmin] = useState<string>('');
  const [emailAdmin, setEmailAdmin] = useState<string>('');
  const [urlPanDrugs, setUrlPanDrugs] = useState<string>('');
  const [userPanDrugs, setUserPanDrugs] = useState<string>('');
  const [emailPanDrugs, setEmailPanDrugs] = useState<string>('');
  const [passwordPanDrugs, setPasswordPanDrugs] = useState<string>('');
  const [urlDictonargen, setUrlDictonarGen] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [validationPundrugsState, setValidationPundrugsState] = useState<boolean>(false);
  const [validationGenomicDictState, setValidationGenomicDictState] = useState<boolean>(false);

  useEffect(() => {
    setIdentifierAdmin(props.configData.contactIdentifier ?? '');
    setNameAdmin(props.configData.contactName ?? '');
    setSurnameAdmin(props.configData.contactLastName ?? '');
    setEmailAdmin(props.configData.contactEmail ?? '');
    setUrlPanDrugs(props.configData.pandrugURL ?? '');
    setUserPanDrugs(props.configData.pandrugUser ?? '');
    setPasswordPanDrugs(props.configData.pandrugPassword ?? '');
    setEmailPanDrugs(props.configData.pandrugEmail ?? '');
    setUrlDictonarGen(props.configData.cellbaseURL ?? '');
    setTextValue(props.configData.setupInformation ?? '');
  }, [props.configData]);

  const clickAccept = () => {
    const objConfig = {
      cellbaseURL: urlDictonargen,
      contactEmail: emailAdmin,
      contactIdentifier: identifierAdmin,
      contactLastName: surnameAdmin,
      contactName: nameAdmin,
      pandrugPassword: passwordPanDrugs,
      pandrugURL: urlPanDrugs,
      pandrugUser: userPanDrugs,
      setupInformation: textValue,
      pandrugEmail: emailPanDrugs
    };

    //PUT ON DATABASE
    props.setNewConfig(objConfig);
    console.log('++++objConfig+++');
    console.log(objConfig);
  };

  const setAdminState = (adminConfig: IAdminConfig) => {
    setIdentifierAdmin(adminConfig.identifier);
    setNameAdmin(adminConfig.name);
    setSurnameAdmin(adminConfig.surname);
    setEmailAdmin(adminConfig.email);
  };

  const setPanDrugState = (pandrugsConfig: IPandrugsConfig) => {
    setUrlPanDrugs(pandrugsConfig.url);
    setUserPanDrugs(pandrugsConfig.user);
    setPasswordPanDrugs(pandrugsConfig.password);
    setEmailPanDrugs(pandrugsConfig.email);
  };

  const setGenomicDictState = (pandrugsConfig: IGenomicDictConfig) => {
    setUrlDictonarGen(pandrugsConfig.url);
  };

  return (
    <GaiaContainer
      icon="settings_applications"
      title={t('appConfiguration.title')}
      onAccept={!props.loading && !validationPundrugsState && !validationGenomicDictState ? () => clickAccept() : undefined}
    >
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <>
          <ContactAdminConfig
            setAdminState={setAdminState}
            ident={props.configData.contactIdentifier}
            name={props.configData.contactName}
            surname={props.configData.contactLastName}
            email={props.configData.contactEmail}
          />
          <TextConfig textValue={textValue} onChange={setTextValue} />
          <PanDrugsConfig
            validationState={validationPundrugsState}
            setValidationParentState={setValidationPundrugsState}
            setPundrugsParentState={setPanDrugState}
            apiCreatePanDrugsUser={props.createPanDrugsUser}
            apiValidPanDrugs={props.validatePanDrugs}
            pandrugUrl={props.configData.pandrugURL}
            pandrugUser={props.configData.pandrugUser}
            pandrugPassword={props.configData.pandrugPassword}
            pandrugEmail={props.configData.pandrugEmail}
          />
          <GenomicDictionaryConfig
            validationState={validationGenomicDictState}
            setValidationParentState={setValidationGenomicDictState}
            apiValidUrl={props.validateCellbaseUrl}
            setGenomicDictParentState={setGenomicDictState}
            cellbaseURL={props.configData.cellbaseURL}
          />
        </>
      )}
    </GaiaContainer>
  );
};
export default AppConfiguration;
