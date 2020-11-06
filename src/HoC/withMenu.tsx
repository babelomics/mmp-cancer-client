// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

import React, { BaseSyntheticEvent, useState } from 'react';
import { Menu } from '@material-ui/core';

interface IProps {
  id: string;
  children?: any;
}

const withMenu = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P & IProps> => ({ children, ...props }: IProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: BaseSyntheticEvent) => {
    if (children) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <WrappedComponent {...(props as P)} onClick={handleClick} />
      <Menu
        id={id}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  );
};

export default withMenu;
