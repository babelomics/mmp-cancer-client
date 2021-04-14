import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITableAssemblyData, ITableAssemblyDataFilter } from './interfaces';
import AssemblyFilterButtons from './assembly-filter-buttons/AssemblyFilterButtons';
import AssemblyTable from './assembly-table/AssemblyTable';
import { Dialog, DialogActions, makeStyles } from '@material-ui/core';
import GaiaButton from '../commons/GaiaButton';
import GaiaContainer from '../commons/GaiaContainer';

interface IProps {
  taxonomyId?: string;
  open?: boolean;
  openPopupParent?: any;
  titlePopup?: string;
  onClose?: () => void;
  setValueField?: (data: ITableAssemblyData) => void;
  handleClickRow: (data: ITableAssemblyData) => void;
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

const PopupTableSpecies = ({ handleClickRow, open = false, onClose, openPopupParent, taxonomyId, titlePopup = 'TITLE POPUP' }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);

  const defaultSpeciesDataFilter = {} as ITableAssemblyDataFilter;

  const [filter, setFilter] = useState<ITableAssemblyDataFilter>(defaultSpeciesDataFilter);

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

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }}>
      <GaiaContainer title={titlePopup} onBack={handleClose}>
        <AssemblyFilterButtons filter={filter} setFilter={setFilter} />
        <AssemblyTable rowClick={handleClickRow} filter={filter} setFilter={setFilter} taxonomyId={taxonomyId} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupTableSpecies;
