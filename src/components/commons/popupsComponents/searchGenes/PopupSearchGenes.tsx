import React, { useEffect, useState } from 'react';
import GaiaContainer from '../../GaiaContainer';
import { Dialog } from '@material-ui/core';
import { IPopupSearchGeneFilter } from './interfaces';
import PopupSearchGeneTable from './popup-panel-table/PopupSearchGeneTable';
import PopupSearchGenesFilterButtons from './popup-panel-filter-button/PopupSearchGenesFilterButtons';
import { useStyles } from '../popupStyle';
import { Close } from '@material-ui/icons';

const defaultPanelFilter = { isDeleted: false } as IPopupSearchGeneFilter;

interface IProps {
  open?: boolean;
  openPopupParent?: any;
  assembly: string;
  title: string;
  exclude: string[];
  ensmblRelease: string;
  onClose?: () => void;
  addGene: (gene: any) => void;
}

export const PopupSearchGenes = ({ open = false, onClose, openPopupParent, assembly, title, addGene, exclude, ensmblRelease }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [filter, setFilter] = useState<IPopupSearchGeneFilter>(defaultPanelFilter);

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

  const getActions = () => {
    return [{ icon: <Close />, onClick: handleClose }];
  };

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }} PaperProps={{ id: 'geneModal' }}>
      <GaiaContainer title={title} actions={getActions()} hideBackButton>
        <PopupSearchGenesFilterButtons filter={filter} setFilter={setFilter} />
        <PopupSearchGeneTable filter={filter} setFilter={setFilter} assembly={assembly} addGene={handleAdd} exclude={exclude} ensmblRelease={ensmblRelease} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupSearchGenes;
