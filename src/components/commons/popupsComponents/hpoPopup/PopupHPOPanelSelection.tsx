import React, { useEffect, useState } from 'react';
import GaiaContainer from '../../GaiaContainer';
import { Dialog } from '@material-ui/core';
import { IHPOPopupFilter } from './interfaces';
import { useStyles } from '../popupStyle';
import HPOPopupFilterButtons from './hpo-popup-filter-buttons/HPOPopupFilterButtons';
import HPOPopupTable from './hpo-popup-table/HPOPopupTable';
import { Close } from '@material-ui/icons';

const defaultPanelFilter = { isDeleted: false } as IHPOPopupFilter;

interface IProps {
  open?: boolean;
  openPopupParent?: any;
  titlePopup: string;
  exclude: string[];
  hideParents?: boolean;
  hideChildren?: boolean;
  addHPO: (hpo: any) => void;
  onClose?: () => void;
  abnormality: boolean;
}

export const PopupHPOtPanelSelection = ({ open = false, onClose, openPopupParent, titlePopup, addHPO, exclude, hideParents, hideChildren, abnormality }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [filter, setFilter] = useState<IHPOPopupFilter>(defaultPanelFilter);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleAdd = (hpo: any) => {
    addHPO(hpo);
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
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }} PaperProps={{ id: 'HPOModal' }}>
      <GaiaContainer title={titlePopup} actions={getActions()} hideBackButton>
        <HPOPopupFilterButtons filter={filter} setFilter={setFilter} />
        <HPOPopupTable filter={filter} setFilter={setFilter} addHPO={handleAdd} exclude={exclude} hideParents={hideParents} hideChildren={hideChildren} abnormality={abnormality} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupHPOtPanelSelection;
