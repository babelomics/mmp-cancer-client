import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

interface IProps extends RouteComponentProps {}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <NotFoundPage {...this.props} />;
  }
}

export default Wrapper;
