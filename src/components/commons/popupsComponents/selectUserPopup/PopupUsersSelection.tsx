import React, { useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';

import { PopupUserFilter, User } from './interfaces';
import GaiaContainer from '../../GaiaContainer';
import PopupUserFilterButtons from './popup-user-filter-button/PopupUserFilterButtons';
import PopupUserTable from './popup-user-table/PopupUserTable';
import { useStyles } from '../popupStyle';
import { Close } from '@material-ui/icons';

const defaultUserFilter = {} as PopupUserFilter;

interface IProps {
  open?: boolean;
  onClose?: () => void;
  openPopupParent?: any;
  setValueField: (data: User) => void;
  exclude: any;
  titlePopup: string;
  showAdminsOnly?: boolean;
  showUsersOnly?: boolean;
}

export const PopupUsersSelection = ({ open = false, onClose, openPopupParent, setValueField, exclude, titlePopup, showAdminsOnly, showUsersOnly }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [filter, setFilter] = useState<PopupUserFilter>({ ...defaultUserFilter, ...(showAdminsOnly ? { userType: 'Admin' } : showUsersOnly ? { userType: 'User' } : {}) });

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

  const getActions = () => {
    return [{ icon: <Close />, onClick: handleClose }];
  };

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }} onClose={handleClose} PaperProps={{ id: 'selectUserPopup' }}>
      <GaiaContainer title={titlePopup} actions={getActions()} hideBackButton>
        <PopupUserFilterButtons filter={filter} setFilter={setFilter} />
        <PopupUserTable filter={filter} setFilter={setFilter} rowClick={handleClickRow} exclude={exclude} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupUsersSelection;
