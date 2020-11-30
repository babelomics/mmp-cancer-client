import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UnderMaintenance from './UnderMaintenance';

interface IProps extends RouteComponentProps {}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <UnderMaintenance {...this.props} />;
  }
}

export default Wrapper;
