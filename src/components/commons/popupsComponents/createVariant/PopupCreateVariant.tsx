import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaContainer from '../../GaiaContainer';
import { Dialog, TextField } from '@material-ui/core';
import { useStyles } from '../popupStyle';
import { string } from 'yup';

interface IProps {
  open?: boolean;
  onClose?: () => void;
  openPopupParent?: any;
  setValueField: (data: any) => void;
  titlePopup: string;
  assembly: string;
}

export const PopupUsersSelection = ({ open = false, onClose, openPopupParent, setValueField, titlePopup, assembly }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const [chromosome, setChromosome] = useState('');
  const [initPosition, setInitPosition] = useState('');
  const [reference, setReference] = useState('');
  const [alternative, setAlternative] = useState('');
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClickAccept = () => {
    const variant = {
      variantIdentifier: `${chromosome}${initPosition}${reference}${alternative}`,
      chromosomeSequence: chromosome !== '' ? chromosome : null,
      initPosition: initPosition !== '' ? initPosition : null,
      reference: reference !== '' ? reference : null,
      alternative: alternative !== '' ? alternative : null,
      isChildren: false
    };
    if (chromosome && initPosition && reference && alternative) {
      setValueField(variant);
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
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }}>
      <GaiaContainer title={titlePopup} onBack={handleClose} onAccept={handleClickAccept}>
        <div style={{ marginBottom: '10px' }}>
          {t('tabPanelDiagnostic.fields.chromosomeSequence')} : {t('tabPanelDiagnostic.fields.initPosition')} : {t('tabPanelDiagnostic.fields.reference')} :{' '}
          {t('tabPanelDiagnostic.fields.alternative')}
        </div>
        <div>
          <TextField size="small" style={{ marginRight: '10px', width: '60px' }} value={chromosome} onChange={(e) => setChromosome(e.target.value)} /> :
          <TextField size="small" style={{ marginLeft: '10px', width: '200px', marginRight: '10px' }} value={initPosition} onChange={(e) => setInitPosition(e.target.value)} /> :
          <TextField
            size="small"
            style={{ marginLeft: '10px', width: '35px', marginRight: '10px' }}
            value={reference}
            onChange={(e) => {
              const ACGT = ['A', 'C', 'G', 'T'];
              const stringAllow = e.target.value.replace(/[^a-zA-Z]+/g, '');
              if (ACGT.includes(stringAllow.toUpperCase()) || stringAllow === '') {
                setReference(e.target.value.toUpperCase());
              }
            }}
          />
          :
          <TextField
            size="small"
            style={{ marginLeft: '10px', width: '35px', marginRight: '10px' }}
            value={alternative}
            onChange={(e) => {
              const ACGT = ['A', 'C', 'G', 'T'];
              const stringAllow = e.target.value.replace(/[^a-zA-Z]+/g, '');
              if (ACGT.includes(stringAllow.toUpperCase()) || stringAllow === '') {
                setAlternative(e.target.value.toUpperCase());
              }
            }}
          />
        </div>
        {error && <div style={{ marginTop: '10px', color: 'red' }}>{t('tabPanelDiagnostic.error.notValirRegion')}</div>}
      </GaiaContainer>
    </Dialog>
  );
};

export default PopupUsersSelection;
