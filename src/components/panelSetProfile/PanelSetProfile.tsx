import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { IFormData, IPanelSetData, IReference, IDeleteForm } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import { generateValidationSchema, deleteSchema } from './validationSchema';
import { Fab, Grid, Tooltip, Typography } from '@material-ui/core';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaLoading from '../commons/GaiaLoading';
import GaiaButton from '../commons/GaiaButton';
import GenomicRefPopup from '../genomicRefPopup/GenomicRefPopup';
import PanelsTable from './PanelsTable';
import { IGenomicReferenceData } from '../genomicRefPopup/interfaces';
import GaiaModalFormik from '../commons/GaiaModalFormik';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import GaiaPopup from '../commons/GaiaPopup';
import routes from '../router/routes';
import { useHistory } from 'react-router-dom';

interface IProps {
  loading: boolean;
  panelSetData: IPanelSetData;
  fetchPanelSetData: (identifier: string) => void;
  deletePanelSetData: (identifier: string, t: any) => void;
  updatePanelSetData: (identifier: string, dataPanelProfile: IPanelSetData, t: any) => Promise<any>;
  updateReferencePanelSetData: (data: IReference) => void;
  exportPanel: (identifier: string, t: any, filename?: string) => void;
}

const PanelSetProfile = (props: IProps) => {
  const history = useHistory();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openPupExport, setOpenPopupExport] = useState<boolean>(false);
  const { t } = useTranslation();

  const initialValues = (dataPanel: IPanelSetData) => {
    return {
      diagnosticPanelSetIdentifier: dataPanel.diagnosticPanelSetIdentifier ?? '',
      name: dataPanel.name ?? '',
      creationDate: dataPanel.creationDate ?? '',
      description: dataPanel.description ?? '',
      assembly: dataPanel.reference.assembly ?? '',
      ensemblRelease: dataPanel.reference.ensemblRelease ?? ''
    };
  };

  const formik = useFormik<IFormData>({
    initialValues: initialValues(props.panelSetData),
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      clickAccept();
    }
  });

  const deleteFormik = useFormik<IDeleteForm>({
    initialValues: { confirmation: '' },
    enableReinitialize: true,
    validationSchema: deleteSchema(t),
    onSubmit: () => {
      setOpenDeleteModal(false);
      props.deletePanelSetData(props.panelSetData.diagnosticPanelSetIdentifier, t);
    }
  });

  const clickAccept = () => {
    const newData = {
      diagnosticPanelSetIdentifier: formik.values.diagnosticPanelSetIdentifier,
      name: formik.values.name,
      description: formik.values.description,
      panelsNumber: props.panelSetData.panelsNumber,
      creationDate: props.panelSetData.creationDate,
      deletionDate: props.panelSetData.deletionDate,
      author: props.panelSetData.author,
      reference: {
        ensemblRelease: formik.values.ensemblRelease,
        assembly: formik.values.assembly
      }
    };

    props.updatePanelSetData(formik.values.diagnosticPanelSetIdentifier, newData, t).then((result) => {
      if (result.done) {
        props.fetchPanelSetData(props.panelSetData.diagnosticPanelSetIdentifier);
      }
    });
  };

  const clickModify = () => {
    setOpenPopup(!openPopup);
  };

  const clickDelete = () => {
    setOpenDeleteModal(true);
  };

  const clickAcceptPopup = (data: IGenomicReferenceData) => {
    setOpenPopup(false);
    const dataReference = {
      reference: { ensemblRelease: data.ensemblRelease, assembly: data.accession }
    };
    props.updateReferencePanelSetData(dataReference);
  };

  const openPopupExport = () => {
    setOpenPopupExport(true);
  };
  const closePopupExport = () => {
    setOpenPopupExport(false);
  };

  const doExport = () => {
    props.exportPanel(props.panelSetData.diagnosticPanelSetIdentifier, t, `export-panelset-${props.panelSetData.diagnosticPanelSetIdentifier}.json`);
    closePopupExport();
  };

  const handleOnBack = () => {
    history.push(`${routes.PATH_PANEL_SETS_MANAGEMENT}`);
  };

  return (
    <GaiaContainer onBack={handleOnBack} icon="dynamic_feed" title={t('panelSetCreate.title')} onAccept={!props.loading && !props.panelSetData.deletionDate ? formik.handleSubmit : undefined}>
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <React.Fragment>
          {/* DownLoad File Modal */}
          <GaiaPopup open={openPupExport} type="warningConfirm" message={t('panelProfileSet.messages.downLoadPopupMessage_1')} onAccept={doExport} onClose={() => closePopupExport()} />

          {/* Delete Panel Modal */}
          <GaiaModalFormik
            open={openDeleteModal}
            title={t('panelProfileSet.delete.title')}
            formik={deleteFormik}
            onClose={() => {
              setOpenDeleteModal(false);
              deleteFormik.resetForm();
            }}
          >
            <Typography variant="body1">{t('panelProfileSet.delete.description')}</Typography>
            <GaiaTextField required name="confirmation" label={t('commons.fields.confirmation')} formik={deleteFormik} fullWidth />
          </GaiaModalFormik>

          {/**Genomic Ref Modal */}
          <GenomicRefPopup
            accession={props.panelSetData.reference.assembly ?? ''}
            titlePopup={t('panelSetCreate.titlePopup')}
            open={openPopup}
            onClose={() => setOpenPopup(false)}
            onAccept={(data: any) => clickAcceptPopup(data)}
          />

          <Grid style={{ paddingBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            {!props.panelSetData.deletionDate && (
              <Grid item xs={1}>
                <Tooltip title={t('tabPanelDiagnostic.tooltip.delete') ?? ''} placement="top-start">
                  <Fab color="primary" size="small" component="span" aria-label="add" variant="extended" onClick={() => clickDelete()}>
                    <DeleteIcon />
                  </Fab>
                </Tooltip>
              </Grid>
            )}
            <Grid item xs={1}>
              <Tooltip title={t('panelProfileSet.tooltip.export') ?? 'Export Diagnostic Panel Set'} placement="top-start">
                <Fab color="primary" size="small" component="span" aria-label="add" variant="extended" onClick={openPopupExport}>
                  <GetAppIcon />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={2}>
              <GaiaTextField required name="diagnosticPanelSetIdentifier" label={t('commons.fields.identifier')} formik={formik} fullWidth disabled />
            </Grid>
            <Grid item xs={3}>
              <GaiaTextField required name="name" formik={formik} fullWidth label={t('commons.fields.name')} disabled={props.panelSetData.deletionDate ? true : false} />
            </Grid>
            <Grid item xs={2}>
              <GaiaTextField required name="creationDate" label={t('commons.fields.dateCreated')} formik={formik} fullWidth disabled />
            </Grid>
            <Grid item xs={5}>
              <GaiaTextField required name="description" label={t('commons.fields.description')} formik={formik} fullWidth disabled={props.panelSetData.deletionDate ? true : false} />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={3}>
              <GaiaTextField required name="assembly" formik={formik} label={t('commons.fields.assembly')} fullWidth disabled />
            </Grid>
            <Grid item xs={2}>
              <GaiaTextField required name="ensemblRelease" formik={formik} label={t('commons.fields.ensemblRelease')} fullWidth disabled />
            </Grid>
            <Grid item xs={3}>
              {props.panelSetData.panelsNumber === 0 && !props.panelSetData.deletionDate && <GaiaButton text={t('commons.buttons.modifyGenomicRef')} onClick={() => clickModify()} />}
            </Grid>
          </Grid>
          <PanelsTable panelSetData={props.panelSetData} />
        </React.Fragment>
      )}
    </GaiaContainer>
  );
};

export default PanelSetProfile;
