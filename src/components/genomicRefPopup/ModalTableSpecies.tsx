import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITableSpeciesDataFilter } from './interfaces';
import SpecieFilterButtons from './specie-filter-buttons/SpecieFilterButtons';
import SpecieTable from './specie-table/SpecieTable';
import { ITableSpeciesData } from './interfaces';
import { Dialog, DialogActions, makeStyles } from '@material-ui/core';
import GaiaButton from '../commons/GaiaButton';
import GaiaContainer from '../commons/GaiaContainer';

interface IProps {
  open?: boolean;
  openPopupParent?: any;
  titlePopup?: string;
  onClose?: () => void;
  setValueField?: (data: ITableSpeciesData) => void;
  handleClickRow: (data: ITableSpeciesData) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 10px 0 0',
    height: 0
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogPaper: {
    minHeight: '60vh',
    maxHeight: '110vh',
    minWidth: '60vh',
    maxWidth: '110vh'
  }
}));

const ModalTableSpecies = ({ handleClickRow, open = false, onClose, openPopupParent, titlePopup = 'TITLE POPUP' }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const { t } = useTranslation();

  const defaultSpeciesDataFilter = {} as ITableSpeciesDataFilter;

  const [filter, setFilter] = useState<ITableSpeciesDataFilter>(defaultSpeciesDataFilter);

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

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }}>
      <GaiaContainer title={titlePopup} onBack={handleClose}>
        <SpecieFilterButtons filter={filter} setFilter={setFilter} />
        <SpecieTable rowClick={handleClickRow} filter={filter} setFilter={setFilter} />
      </GaiaContainer>
    </Dialog>
  );
};

export default ModalTableSpecies;
