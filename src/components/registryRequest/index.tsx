import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { FormikErrors } from 'formik/dist/types';

import { IRootState } from '../../store';
import { IFormData } from './interfaces';
import { operations } from './duck';
import RegistryRequest from './RegistryRequest';

interface IProps extends RouteComponentProps {
  loading: boolean;
  data: IFormData;
  fetchRequestData: (identifier: string) => void;
  createRequest: (data: any, setFormikErrors: (errors: FormikErrors<IFormData>) => void, t?: any) => void;
  processRequest: (data: any, t?: any) => void;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    const pathParts = this.props.history.location.pathname.split('/');
    const identifier = pathParts[2];

    // If an identifier exists in url
    if (identifier) {
      this.props.fetchRequestData(identifier);
    }
  }

  render() {
    return <RegistryRequest {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.registryRequest.loading,
  data: state.registryRequest.data
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
