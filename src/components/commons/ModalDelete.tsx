import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface IProps {
  open: boolean;
  elementText: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalDelete = ({ open, elementText, onClose, onConfirm }: IProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      <DialogTitle id="alert-dialog-title">{t('commons.confirmDelete')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{elementText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          {t('commons.agree')}
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          {t('commons.disagree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
