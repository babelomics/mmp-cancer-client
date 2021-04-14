import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, makeStyles, Typography, Grid, Button } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Cancel, Close, Publish } from '@material-ui/icons';
import GaiaIconButton from './GaiaIconButton';
import GaiaButton from './GaiaButton';
import { useTranslation } from 'react-i18next';
import GaiaTextField from './GaiaTextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GaiaFabButton from './GaiaFabButton';

interface IProps {
  message: string;
  title?: string;
  open?: boolean;
  type?: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm' | 'uploadFile';
  buttonType?: number | null;
  onClose?: () => void;
  onAccept?: (file: any) => void;
}

interface IFile {
  lastModified: number | null;
  name: string | null;
  size: number | null;
  type: string | null;
  webkitRelativePath?: string | null;
  prevState: null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));

const DialogTitle = (props: any) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? <GaiaFabButton color="default" icon={<Close />} onClick={onClose} /> : null}
    </MuiDialogTitle>
  );
};

export const GaiaPopupUpload = ({ message, title, open = false, type = 'info', buttonType = null, onClose, onAccept }: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openState, setOpen] = useState(open);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
      setSelectedFile(null);
      setFileName('');
    }
  };

  const renderTitle = () => {
    if (!title) {
      if (type === 'info' || 'uploadFile') {
        return title;
      }

      if (type === 'error') {
        return 'Error';
      }

      if (type === 'success') {
        return 'Success!';
      }

      if (type === 'warning' || 'warningConfirm') {
        return 'Warning';
      }
    }

    return title;
  };

  const generateValidationSchema = (t: any) =>
    Yup.object().shape({
      filSelection: Yup.string().nullable().required(t('commons.error.required'))
    });

  const importFormik = useFormik<any>({
    initialValues: { filSelection: fileName },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      if (onAccept) {
        onAccept(selectedFile);
      }
      handleClose();
    }
  });

  function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      const data = new FormData();
      data.append('file', event.currentTarget.files[0]);
      setSelectedFile(event.currentTarget.files[0]);
      setFileName(event.currentTarget.files[0].name);
    }
  }

  return (
    <Dialog onClose={handleClose} open={openState}>
      <DialogTitle className={classes.title} onClose={handleClose}>
        {renderTitle()}
      </DialogTitle>
      <DialogContent style={{ padding: '20px 24px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} container alignItems="center">
            <Typography variant="h6">{message}</Typography>
          </Grid>
        </Grid>
        {type === 'uploadFile' && (
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={9}>
              <GaiaTextField required name="filSelection" formik={importFormik} label={t('commons.fields.filSelection')} fullWidth disabled />
            </Grid>
            <Grid item xs={2}>
              <label htmlFor="file_input_file">
                <Button variant="contained" color="primary" component="span">
                  {t('commons.buttons.selection')}
                </Button>
              </label>
              <input hidden accept="application/gzip, .gz,.json,.zip" type="file" id="file_input_file" onChange={handleFileSelected} />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        {type === 'uploadFile' && (
          <>
            <GaiaButton icon={<Publish />} variant="outlined" text={t('commons.buttons.upload')} onClick={importFormik.handleSubmit} />
            <GaiaButton icon={<Cancel />} color="default" text={t('commons.buttons.cancel')} onClick={handleClose} />
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GaiaPopupUpload;
