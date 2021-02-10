import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaContainer from '../../GaiaContainer';
import { Dialog } from '@material-ui/core';
import { IGene, IPopupSearchGeneFilter } from './interfaces';
import PopupSearchGeneTable from './popup-panel-table/PopupSearchGeneTable';
import PopupSearchGenesFilterButtons from './popup-panel-filter-button/PopupSearchGenesFilterButtons';
import { useStyles } from '../popupStyle';

const defaultPanelFilter = { isDeleted: false } as IPopupSearchGeneFilter;

interface IProps {
  open?: boolean;
  openPopupParent?: any;
  assembly: string;
  title: string;
  exclude: string[];
  onClose?: () => void;
  addGene: (gene: any) => void;
}

export const PopupSearchGenes = ({ open = false, onClose, openPopupParent, assembly, title, addGene, exclude }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [filter, setFilter] = useState<IPopupSearchGeneFilter>(defaultPanelFilter);
  const { t } = useTranslation();

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

  const handleAdd = (gene: any) => {
    addGene(gene);
    handleClose();
  };

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }} PaperProps={{ id: 'geneModal' }}>
      <GaiaContainer title={title} onBack={handleClose}>
        <PopupSearchGenesFilterButtons filter={filter} setFilter={setFilter} />
        <PopupSearchGeneTable filter={filter} setFilter={setFilter} assembly={assembly} addGene={handleAdd} exclude={exclude} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupSearchGenes;
