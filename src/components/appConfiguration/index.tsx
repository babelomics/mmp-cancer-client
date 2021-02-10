import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../store';
import { operations } from './duck';
import AppConfiguration from './AppConfiguration';
import { IConfiguration, IGenomicDictConfig, IPandrugsConfig } from './interfaces';
import { FormikErrors } from 'formik';
import { withTranslation } from 'react-i18next';

interface IProps extends RouteComponentProps {
  loading: boolean;
  configData: IConfiguration;
  validationPundrugs: boolean;
  validationGenomDict: boolean;
  [key: string]: any;
  fetchConfigRequest: (t: any) => void;
  setNewConfig: (config: IConfiguration, t: any) => Promise<any>;
  validateGenomicDictionaryUrl: (url: string, setFormikErrors: (errors: FormikErrors<IGenomicDictConfig>) => void, t: any) => void;
  validatePanDrugs: (pandrugsConfig: IPandrugsConfig, setFormikErrors: (errors: FormikErrors<IPandrugsConfig>) => void, t: any) => void;
  updateConfigData: (config: IConfiguration) => void;
  setValidationPandrug: (validationState: boolean) => void;
  setValidationGenomDict: (validationState: boolean) => void;
  resetValidations: () => void;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    this.props.fetchConfigRequest(this.props.t);
  }

  render() {
    return <AppConfiguration {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.appConfiguration.loading,
  configData: state.appConfiguration.configData,
  validationPundrugs: state.appConfiguration.validationPundrugs,
  validationGenomDict: state.appConfiguration.validationGenomDict
});

const mapDispatchToProps = { ...operations };
const TranslatedWrapper = withTranslation()<any>(Wrapper);
export default connect(mapStateToProps, mapDispatchToProps)(TranslatedWrapper);
