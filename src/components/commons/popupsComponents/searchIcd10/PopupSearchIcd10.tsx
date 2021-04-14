import React, { useEffect, useState } from 'react';
import GaiaContainer from '../../GaiaContainer';
import { Dialog } from '@material-ui/core';
import PopupSearchIcd10Table from './popup-panel-table/PopupSearchIcd10Table';
import PopupSearchIcd10FilterButtons from './popup-panel-filter-button/PopupSearchIcd10FilterButtons';
import { useStyles } from '../popupStyle';
import { ICommonFilter } from '../../../tabPanelDiagnostic/tabs/interfaces';
import { Close } from '@material-ui/icons';

const defaultPanelFilter = { isDeleted: false } as ICommonFilter;

interface IProps {
  open?: boolean;
  openPopupParent?: any;
  title: string;
  exclude: string[];
  onClose?: () => void;
  addIcd10: (icd10: any) => void;
}

export const PopupSearchIcd10 = ({ open = false, onClose, openPopupParent, title, addIcd10, exclude }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [filter, setFilter] = useState<ICommonFilter>(defaultPanelFilter);
  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    if (openPopupParent) {
      openPopupParent(false);
    }

    if (onClose) {
      onClose();
    }
  };

  const handleAdd = (icd10: any) => {
    addIcd10(icd10);
    handleClose();
  };

  const getActions = () => {
    return [{ icon: <Close />, onClick: handleClose }];
  };

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }} PaperProps={{ id: 'icd10Modal' }} maxWidth="lg" fullWidth>
      <GaiaContainer title={title} actions={getActions()} hideBackButton>
        <PopupSearchIcd10FilterButtons filter={filter} setFilter={setFilter} />
        <PopupSearchIcd10Table filter={filter} setFilter={setFilter} addIcd10={handleAdd} exclude={exclude} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupSearchIcd10;
