import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PanelSetsManagement from './PanelSetsManagement';

interface IProps extends RouteComponentProps {
  
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <PanelSetsManagement />;
  }
}

export default Wrapper;
