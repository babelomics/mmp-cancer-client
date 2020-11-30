import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from '../../store';
import { operations } from './duck';
import DrugProfile from './DrugProfile';
import IDrugProfile from './interfaces';

interface IProps extends RouteComponentProps {
  drugProfile: IDrugProfile;
  fetchDrugData: (identifier: string) => void;
  updateDrug: (data: any) => Promise<any>;
}

class Wrapper extends React.Component<IProps, {}> {
  componentDidMount() {
    const pathParts = this.props.history.location.pathname.split('/');
    const drugIdentifier = pathParts[2];

    // If an drug id exists in url
    if (drugIdentifier) {      
        this.props.fetchDrugData(drugIdentifier);
    }
  }

  render() {
    return <DrugProfile {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  drugProfile: state.drugProfile
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
