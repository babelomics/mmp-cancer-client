import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';
import CreateNewUser from './CreateNewUser';
import { IFormData } from './interfaces';
import { FormikErrors } from 'formik/dist/types';

interface IProps extends RouteComponentProps {
  loading: boolean;
  error: any;
  success: boolean | null;
  createUser: (data: any, setFormikErrors: (errors: FormikErrors<IFormData>) => void, t: any) => void;
  resetPopups: () => void;
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <CreateNewUser {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  loading: state.createNewUser.loading,
  error: state.createNewUser.error,
  success: state.createNewUser.success
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
