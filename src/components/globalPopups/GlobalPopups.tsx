import React from 'react';
import { useTranslation } from 'react-i18next';

import GaiaPopup from '../commons/GaiaPopup';

interface IProps {
  open?: boolean;
  type?: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm';
  message?: string;
  onClose?: () => void;
  setPopupOpen: (open: boolean) => void;
}

export const GlobalPopup = (props: IProps) => {
  const { t } = useTranslation();

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
