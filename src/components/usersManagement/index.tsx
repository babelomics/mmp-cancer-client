import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UsersManagement from './UsersManagement';

interface IProps extends RouteComponentProps {
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <UsersManagement />;
  }
}

export default Wrapper;
