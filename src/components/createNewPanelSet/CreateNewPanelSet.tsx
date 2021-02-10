import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import PublishIcon from '@material-ui/icons/Publish';
import { useHistory } from 'react-router-dom';
import { IConfirmData, IFormData, IJsonFile, IPanelSetData, IUpdatePanelSetData } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import { generateValidationSchema, generateValidationSchemaConfirm } from './validationSchema';
import { Fab, Grid, Tooltip, Typography } from '@material-ui/core';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaLoading from '../commons/GaiaLoading';
import GaiaButton from '../commons/GaiaButton';
import GenomicRefPopup from '../genomicRefPopup/GenomicRefPopup';
import routes from '../router/routes';
import { GaiaPopupUpload } from '../commons/GaiaPopupUpload';
import { GaiaModalFormik } from '../commons/GaiaModalFormik';
import { IGenomicReferenceData } from '../genomicRefPopup/interfaces';
import JSZip from 'jszip';

interface IProps {
  loading: boolean;
  formValues: IPanelSetData;
  genomicReference: any;
  createPanelSetData: (dataPanelProfile: IPanelSetData, t: any) => Promise<any>;
  apiSendPanelSetData: (data: any, t: any) => void;
  updateFormValue: (data: IUpdatePanelSetData) => void;
  uploadFile: (formData: FormData, t: any) => Promise<any>;
}

const CreateNewPanelSet = (props: IProps) => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [openPupImport, setOpenPopupImport] = useState<boolean>(false);
  const [openImportConfirmModal, setOpenImportConfirmModal] = useState<boolean>(false);
  const [importFormData, setImportFormData] = useState<FormData>(new FormData());

  const history = useHistory();
  const { t } = useTranslation();

  const initialValues = (): IFormData => {
    return {
      diagnosticPanelSetIdentifier: props.formValues.diagnosticPanelSetIdentifier,
      name: props.formValues.name,
      description: props.formValues.description,
      assembly: props.formValues.reference.assembly,
      ensemblRelease: props.formValues.reference.ensemblRelease
    };
  };

  const panelSetFormik = useFormik<IFormData>({
    initialValues: initialValues(),
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      clickAccept();
    }
  });

  const initialValuesConfirm = (): IConfirmData => {
    return {
      identifier: '',
      name: '',
      confirmation: ''
    };
  };

  const confirmFormik = useFormik<IConfirmData>({
    initialValues: initialValuesConfirm(),
    enableReinitialize: true,
    validationSchema: generateValidationSchemaConfirm(t),
    onSubmit: (values) => {
      const formData = importFormData;
      if (values.confirmation) {
        formData.set('isOverwritten', 'true');
      } else {
        formData.set('id', values.identifier);
        formData.set('name', values.name);
        formData.set('isOverwritten', 'false');
      }
      setImportFormData(formData);
      props.uploadFile(formData, t);
      closeImportConfirmModal();
    }
  });

  const clickModify = () => {
    props.updateFormValue({ diagnosticPanelSetIdentifier: panelSetFormik.values.diagnosticPanelSetIdentifier, name: panelSetFormik.values.name, description: panelSetFormik.values.description });
    setOpenPopup(!openPopup);
  };

  const openClosePopup = () => {
    setOpenPopup(!openPopup);
  };

  const openPopupImport = () => {
    setOpenPopupImport(true);
  };
  const closePopupImport = () => {
    setOpenPopupImport(false);
  };

  const closeImportConfirmModal = () => {
    setOpenImportConfirmModal(false);
  };

  const clickUpload = async (file: File) => {
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1);

    const formData = new FormData();
    let json = null as null | IJsonFile;
    let jsonFile = null;

    if (ext === 'json') {
      const result: any = await readJsonFile(file);
      json = result.json;
      jsonFile = result.jsonFile;
    }

    if (ext === 'gz') {
      // Ungzip file
      const result: any = await ungzip(file);
      json = result.json;
      jsonFile = result.jsonFile;
    }

    if (ext === 'zip') {
      // Unzip file
      await JSZip.loadAsync(file).then(async function (zip: JSZip) {
        let zippedJson = null;
        const numJsonZippedFiles = Object.keys(zip.files).filter((k) => {
          if (k.includes('.json')) {
            zippedJson = k;
            return true;
          }
          return false;
        }).length;

        if (numJsonZippedFiles === 1 && zippedJson) {
          json = JSON.parse(await zip.files[zippedJson].async('text')) as IJsonFile;
          jsonFile = new File([await zip.files[zippedJson].async('uint8array')], zippedJson);
        }
      });
    }

    if (json && jsonFile) {
      const panelSetId = json.id;
      const panelSetName = json.name;

      formData.append('id', panelSetId);
      formData.append('name', panelSetName);
      formData.append('isOverwritten', 'false');
      formData.append('file', jsonFile);
      setImportFormData(formData);

      props.uploadFile(formData, t).catch((err) => {
        if (err.status === 409) {
          setOpenImportConfirmModal(true);
        }
      });
    }
  };

  const readJsonFile = async (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async function () {
        const data = reader.result as string;
        const json = JSON.parse(data) as IJsonFile;
        const jsonFile = new File([new TextEncoder().encode(data)], 'import.json');

        resolve({ json, jsonFile });
      };
      reader.readAsText(file);
    });
  };

  const ungzip = async (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async function () {
        const pako = require('pako');
        var data = reader.result;
        const json = JSON.parse(await pako.inflate(data, { to: 'string' })) as IJsonFile;
        const jsonFile = new File([new TextEncoder().encode(JSON.stringify(json))], 'import.json');
        resolve({ json, jsonFile });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const clickAcceptPopup = (data: IGenomicReferenceData) => {
    setOpenPopup(false);

    const dataReference = {
      reference: { ensemblRelease: data.ensemblRelease ?? '', assembly: data.accession ?? '' }
    };
    props.updateFormValue(dataReference);
  };

  const clickAccept = () => {
    const newData = {
      diagnosticPanelSetIdentifier: panelSetFormik.values.diagnosticPanelSetIdentifier,
      name: panelSetFormik.values.name,
      description: panelSetFormik.values.description,
      reference: {
        ensemblRelease: panelSetFormik.values.ensemblRelease,
        assembly: panelSetFormik.values.assembly
      }
    };

    props.createPanelSetData(newData, t).then((result) => {
      if (result.done) {
        history.push(`${routes.PATH_PANEL_SET_PROFILE}/${newData.diagnosticPanelSetIdentifier}`);
      }
    });
  };

  return (
    <GaiaContainer icon="dynamic_feed" title={t('panelSetCreate.title')} onAccept={!props.loading ? panelSetFormik.handleSubmit : undefined}>
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <React.Fragment>
          {/* Genomic Reference Modal */}
          <GenomicRefPopup
            accession={panelSetFormik.values.assembly}
            titlePopup={t('panelSetCreate.titlePopup')}
            open={openPopup}
            onClose={() => openClosePopup()}
            onAccept={(data: any) => clickAcceptPopup(data)}
          />

          {/* Upload File Modal */}
          <GaiaPopupUpload
            type={'uploadFile'}
            title={t('panelSetCreate.importPopupTitle')}
            message={t('panelSetCreate.messages.importPopupMessage_1')}
            open={openPupImport}
            onClose={() => closePopupImport()}
            onAccept={(file) => clickUpload(file)}
          />

          {/* Confirm Modal */}
          <GaiaModalFormik open={openImportConfirmModal} title={t('panelSetCreate.messages.importPopupMessage_2')} formik={confirmFormik} onClose={closeImportConfirmModal}>
            <Typography variant="body1">{t('panelSetCreate.messages.importPopupConfirm_1')}</Typography>
            <GaiaTextField
              required
              name="confirmation"
              label={t('commons.fields.confirmation')}
              formik={confirmFormik}
              fullWidth
              disabled={confirmFormik.values.identifier !== '' || confirmFormik.values.name !== ''}
            />
            <Grid style={{ paddingTop: '20px' }}>
              <Typography variant="body1">{t('panelSetCreate.messages.importPopupConfirm_2')}</Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <GaiaTextField name="identifier" label={t('commons.fields.identifier')} formik={confirmFormik} fullWidth disabled={confirmFormik.values.confirmation !== ''} />
                </Grid>
                <Grid item xs={6}>
                  <GaiaTextField name="name" label={t('commons.fields.name')} formik={confirmFormik} fullWidth disabled={confirmFormik.values.confirmation !== ''} />
                </Grid>
              </Grid>
            </Grid>
          </GaiaModalFormik>

          <Grid style={{ paddingBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="Import Diagnostic Panel Set" placement="top-start">
              <Fab color="primary" size="small" component="span" aria-label="add" variant="extended" onClick={openPopupImport}>
                <PublishIcon />
              </Fab>
            </Tooltip>
          </Grid>
          {props.loading ? (
            <GaiaLoading />
          ) : (
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <GaiaTextField required name="diagnosticPanelSetIdentifier" label={t('commons.fields.identifier')} formik={panelSetFormik} fullWidth />
                </Grid>
                <Grid item xs={3}>
                  <GaiaTextField required name="name" formik={panelSetFormik} fullWidth label={t('commons.fields.name')} />
                </Grid>
                <Grid item xs={6}>
                  <GaiaTextField required name="description" label={t('commons.fields.description')} formik={panelSetFormik} fullWidth />
                </Grid>
              </Grid>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={3}>
                  <GaiaTextField required name="assembly" formik={panelSetFormik} label={t('commons.fields.assembly')} fullWidth disabled />
                </Grid>
                <Grid item xs={3}>
                  <GaiaTextField required name="ensemblRelease" formik={panelSetFormik} label={t('commons.fields.ensemblRelease')} fullWidth disabled />
                </Grid>
                <Grid item xs={3}>
                  <GaiaButton text={t('commons.buttons.modifyGenomicRef')} onClick={() => clickModify()} />
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </GaiaContainer>
  );
};

export default CreateNewPanelSet;
