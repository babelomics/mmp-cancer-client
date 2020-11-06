// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

import React, { BaseSyntheticEvent, useState } from 'react';
import Popover from '@material-ui/core/Popover';

interface IProps {
  children?: any;
}

const withPopover = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P & IProps> => ({ children, ...props }: IProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: BaseSyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <WrappedComponent {...(props as P)} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {children}
      </Popover>
    </>
  );
};

export default withPopover;
