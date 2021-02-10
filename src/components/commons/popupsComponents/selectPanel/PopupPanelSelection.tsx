import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaContainer from '../../GaiaContainer';
import { Dialog } from '@material-ui/core';
import { Panel, PopupPanelFilter } from './interfaces';
import PopupPanelTable from './popup-panel-table/PopupPanelTable';
import PopupPanelFilterButtons from './popup-panel-filter-button/PopupPanelFilterButtons';
import { useStyles } from '../popupStyle';

const defaultPanelFilter = { isDeleted: false } as PopupPanelFilter;

interface IProps {
  open?: boolean;
  onClose?: () => void;
  openPopupParent?: any;
  setValueField?: (data: Panel) => void;
  setId: any;
  exclude: string[];
  titlePopup: string;
}

export const PopupPanelSelection = ({ open = false, onClose, exclude, openPopupParent, setValueField, setId, titlePopup }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [filter, setFilter] = useState<PopupPanelFilter>(defaultPanelFilter);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClickRow = (panel: Panel) => {
    if (setValueField) {
      setValueField(panel);
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
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }} PaperProps={{ id: 'selectPanelModal' }}>
      <GaiaContainer title={titlePopup} onBack={handleClose}>
        <PopupPanelFilterButtons filter={filter} setFilter={setFilter} />
        <PopupPanelTable filter={filter} setFilter={setFilter} rowClick={handleClickRow} exclude={exclude} panelSetId={setId} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupPanelSelection;
