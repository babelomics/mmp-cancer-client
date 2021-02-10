import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaContainer from '../../GaiaContainer';
import { Dialog, Grid, TextField } from '@material-ui/core';
import { useStyles } from '../popupStyle';

interface IProps {
  open?: boolean;
  onClose?: () => void;
  openPopupParent?: any;
  setValueField: (data: any) => void;
  checkRegion: (region: any, assembly: any) => Promise<any>;
  titlePopup: string;
  assembly: string;
}

export const PopupUsersSelection = ({ open = false, onClose, openPopupParent, setValueField, titlePopup, checkRegion, assembly }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [chromosome, setChromosome] = useState('');
  const [initPosition, setInitPosition] = useState('');
  const [endPosition, setEndPosition] = useState('');
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClickAccept = () => {
    const region = {
      regionIdentifier: `${chromosome}:${initPosition}:${endPosition}`,
      chromosome: chromosome !== '' ? chromosome : null,
      initPosition: initPosition !== '' ? initPosition : null,
      endPosition: endPosition !== '' ? endPosition : null
    };
    checkRegion(region, assembly).then(
      (result) => {
        if (result.done) {
          setError(false);
          setValueField(region);
          handleClose();
        }
      },
      () => {
        setError(true);
      }
    );
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
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }}>
      <GaiaContainer title={titlePopup} onBack={handleClose} onAccept={handleClickAccept}>
        <Grid item xs={12}>
          {t('tabPanelDiagnostic.fields.chromosomeSequence')} : {t('tabPanelDiagnostic.fields.initPosition')} - {t('tabPanelDiagnostic.fields.endPosition')}
        </Grid>
        <Grid container>
          <Grid item xs={4} alignItems="center" style={{ display: 'flex' }}>
            <TextField size="small" style={{ marginRight: '10px' }} value={chromosome} onChange={(e) => setChromosome(e.target.value)} /> :
          </Grid>
          <Grid item xs={4} alignItems="center" style={{ display: 'flex' }}>
            <TextField size="small" style={{ marginLeft: '10px', marginRight: '10px' }} value={initPosition} onChange={(e) => setInitPosition(e.target.value)} /> -
          </Grid>
          <Grid item xs={4}>
            <TextField size="small" style={{ marginLeft: '10px' }} value={endPosition} onChange={(e) => setEndPosition(e.target.value)} />
          </Grid>
        </Grid>
        {error && (
          <Grid item xs={12} style={{ color: 'red', marginTop: 10 }}>
            {t('tabPanelDiagnostic.error.notValirRegion')}
          </Grid>
        )}
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupUsersSelection;
