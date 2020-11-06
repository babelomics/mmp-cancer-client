import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GaiaButton from './GaiaButton';
import GaiaLoading from './GaiaLoading';

interface IProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
}

const GaiaLoadingModal = ({ open, title, onClose }: IProps) => {
  const { t } = useTranslation();
  const [openState, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    setOpen(open);
  }, [open]);

  return (
    <Dialog open={openState} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div style={{ padding: 90 }}>
          <GaiaLoading />
        </div>
      </DialogContent>
      <DialogActions>
        <GaiaButton text={t('commons.buttons.cancel')} uppercase onClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
};
export default GaiaLoadingModal;
