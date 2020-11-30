import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../../store';
//import { ITableFilter } from '../commons/GaiaTable';
import { operations } from './duck';
import AppConfiguration from './AppConfiguration';
import interfaces, { IConfiguration } from './interfaces';

interface IProps extends RouteComponentProps {
  loading: boolean;
  configData: IConfiguration;
  fetchConfigRequest: () => void;
  //updateConfigData: (newData: IConfiguration) => void;
  setNewConfig: (config: IConfiguration) => void;
  validateCellbaseUrl: (url: string, formikError?: any) => Promise<any>;
  validatePanDrugs: (user: string, password: string, url: string) => Promise<any>;
  createPanDrugsUser: (user: string, password: string, url: string, email: string) => Promise<any>;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    this.props.fetchConfigRequest();
  }

  render() {
    return <AppConfiguration {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.appConfiguration.loading,
  configData: state.appConfiguration.configData
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
