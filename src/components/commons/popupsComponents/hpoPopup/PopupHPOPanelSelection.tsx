import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaContainer from '../../GaiaContainer';
import { Dialog } from '@material-ui/core';
import { IHPOPopupFilter } from './interfaces';
import { useStyles } from '../popupStyle';
import HPOPopupFilterButtons from './hpo-popup-filter-buttons/HPOPopupFilterButtons';
import HPOPopupTable from './hpo-popup-table/HPOPopupTable';

const defaultPanelFilter = { isDeleted: false } as IHPOPopupFilter;

interface IProps {
  open?: boolean;
  onClose?: () => void;
  openPopupParent?: any;
  titlePopup: string;
  assembly: string;
  addHPO: (hpo: any) => void;
  exclude: string[];
}

export const PopupHPOtPanelSelection = ({ open = false, onClose, openPopupParent, titlePopup, assembly, addHPO, exclude }: IProps) => {
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

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }} PaperProps={{ id: 'HPOModal' }}>
      <GaiaContainer title={titlePopup} onBack={handleClose}>
        <HPOPopupFilterButtons filter={filter} setFilter={setFilter} />
        <HPOPopupTable filter={filter} setFilter={setFilter} assembly={assembly} addHPO={handleAdd} exclude={exclude} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupHPOtPanelSelection;
