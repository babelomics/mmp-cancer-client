import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProjectsManagement from './ProjectsManagement';

interface IProps extends RouteComponentProps {}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <ProjectsManagement />;
  }
}

export default Wrapper;
