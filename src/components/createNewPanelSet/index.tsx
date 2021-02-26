import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';

import { IPanelSetData, IUpdatePanelSetData } from './interfaces';
import CreateNewPanelSet from './CreateNewPanelSet';

interface IProps extends RouteComponentProps {
  loading: boolean;
  formValues: IPanelSetData;
  genomicReference: any;
  createPanelSetData: (dataPanelProfile: IPanelSetData, t: any) => Promise<any>;
  apiSendPanelSetData: (data: any, t: any) => void;
  updateFormValue: (data: IUpdatePanelSetData) => void;
  resetRedux: () => void;
  uploadFile: (formData: FormData, t: any, showCustomConflictCodes: boolean) => Promise<any>;
  showMessage: (message: string, error: 'error' | 'info' | 'warning') => void;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    this.props.resetRedux();
  }
  render() {
    return <CreateNewPanelSet {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  genomicReference: state.genomicRefPopup.genomicReference,
  formValues: state.createNewPanelSet.formValues,
  loading:state.createNewPanelSet.loading
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
