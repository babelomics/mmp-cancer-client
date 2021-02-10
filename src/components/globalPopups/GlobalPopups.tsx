import React from 'react';

import GaiaPopup from '../commons/GaiaPopup';

interface IProps {
  open?: boolean;
  type?: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm';
  message?: string;
  onClose?: () => void;
  setPopupOpen: (open: boolean) => void;
}

export const GlobalPopup = (props: IProps) => {
  const handleClose = () => {
    props.setPopupOpen(false);
  };

  const handleAccept = () => {
    props.setPopupOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  return <GaiaPopup open={props.open} type={props.type} message={props.message || ''} onAccept={handleAccept} onClose={handleClose} />;
};

export default GlobalPopup;
