import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PopupUserFilter, User } from './interfaces';
import GaiaContainer from '../../GaiaContainer';
import { Dialog } from '@material-ui/core';
import PopupUserFilterButtons from './popup-user-filter-button/PopupUserFilterButtons';
import PopupUserTable from './popup-user-table/PopupUserTable';
import { useStyles } from '../popupStyle';

const defaultUserFilter = { userType: 'Admin' } as PopupUserFilter;

interface IProps {
  open?: boolean;
  onClose?: () => void;
  openPopupParent?: any;
  setValueField: (data: User) => void;
  exclude: any;
  titlePopup: string;
}

export const PopupUsersSelection = ({ open = false, onClose, openPopupParent, setValueField, exclude, titlePopup }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [filter, setFilter] = useState<PopupUserFilter>(defaultUserFilter);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClickRow = (user: User) => {
    if (setValueField) {
      setValueField(user);
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    if (openPopupParent) {
      openPopupParent(false);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }}>
      <GaiaContainer title={titlePopup} onBack={handleClose}>
        <PopupUserFilterButtons filter={filter} setFilter={setFilter} />
        <PopupUserTable filter={filter} setFilter={setFilter} rowClick={handleClickRow} exclude={exclude} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupUsersSelection;
