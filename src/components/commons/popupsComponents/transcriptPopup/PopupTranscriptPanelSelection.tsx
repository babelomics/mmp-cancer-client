import React, { useEffect, useState } from 'react';
import GaiaContainer from '../../GaiaContainer';
import { Dialog } from '@material-ui/core';
import { ITranscriptPopupFilter } from './interfaces';
import { useStyles } from '../popupStyle';
import TranscriptPopupFilterButtons from './transcript-popup-filter-buttons/TranscriptPopupFilterButtons';
import TranscriptPopupTable from './Transcript-popup-table/TranscriptPopupTable';
import { Close } from '@material-ui/icons';

const defaultPanelFilter = { isDeleted: false } as ITranscriptPopupFilter;

interface IProps {
  open?: boolean;
  onClose?: () => void;
  openPopupParent?: any;
  titlePopup: string;
  assembly: string;
  addTranscript: (transcript: any) => void;
  exclude: string[];
  ensmblRelease: string;
}

export const PopupTranscriptPanelSelection = ({ open = false, onClose, openPopupParent, titlePopup, assembly, addTranscript, exclude, ensmblRelease }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [filter, setFilter] = useState<ITranscriptPopupFilter>(defaultPanelFilter);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleAdd = (transcript: any) => {
    addTranscript(transcript);
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
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }} PaperProps={{ id: 'transcriptModal' }}>
      <GaiaContainer title={titlePopup} actions={getActions()} hideBackButton>
        <TranscriptPopupFilterButtons filter={filter} setFilter={setFilter} />
        <TranscriptPopupTable filter={filter} setFilter={setFilter} assembly={assembly} addTranscript={handleAdd} exclude={exclude} ensmblRelease={ensmblRelease} />
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupTranscriptPanelSelection;
