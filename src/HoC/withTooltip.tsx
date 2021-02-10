// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

import React from 'react';
import { Tooltip } from '@material-ui/core';

interface IProps {
  tooltip: string;
  placement?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
}

const withTooltip = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P & IProps> => ({ tooltip, placement = 'bottom', ...props }: IProps) => {
  return (
    <Tooltip title={tooltip} placement={placement}>
      <div>
        <WrappedComponent {...(props as P)} />
      </div>
    </Tooltip>
  );
};

export default withTooltip;
