import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RegistrationManagement from './RegistrationManagement';

interface IProps extends RouteComponentProps {
  
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <RegistrationManagement />;
  }
}

export default Wrapper;
