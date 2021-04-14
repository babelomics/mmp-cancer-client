import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Grid, GridList, GridListTile, isWidthUp, makeStyles } from '@material-ui/core';
import { Delete, Description, FindInPage, GridOn, LocalPharmacy, PersonPin, VpnKey, WebAsset } from '@material-ui/icons';
import withWidth from '@material-ui/core/withWidth';

import { generateValidationSchema } from './validationSchema';
import GaiaContainer from '../commons/GaiaContainer';
import GaiaIconButtonWithText from '../commons/GaiaIconButtonWithText';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaDeleteConfirmPopup from '../commons/GaiaDeleteConfirmPopup';
import { doDateFormat } from '../../utils/utils';
import GaiaLoading from '../commons/GaiaLoading';
import routes from '../router/routes';
import { IProject } from '../projectsManagement/interfaces';
import GaiaButton from '../commons/GaiaButton';
import GenomicRefPopup from '../genomicRefPopup/GenomicRefPopup';
import { userCanCreate, userCanDelete, userCanRead, userCanUpdate } from '../../utils/permissionsUtils';
import {
  P_ANALYSES_KEYWORD,
  P_DIAGNOSTIC_PANELS_KEYWORD,
  P_DRUGS_KEYWORD,
  P_INDIRECT_PROJECT,
  P_INDIVIDUALS_KEYWORD,
  P_PERMISSIONS_KEYWORD,
  P_PROJECT_KEYWORD,
  P_SAMPLES_KEYWORD
} from '../permissionsAndUsers/permissions';

interface IProps {
  login: any;
  width: any;
  projectData: IProject;
  loading: boolean;
  mode: 'new' | 'edit';

  updateProjectData: (identifier: string, values: IProject, t: any) => void;
  resetReduxProject: () => void;
  deleteProjectData: (identifier: string, t: any) => void;
  setMode: () => void;
  createProject: (values: IProject, t: any) => void;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: 30
  },
  tile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridInput: {
    marginRight: '20px'
  },
  gridContainPosition: {
    flexDirection: 'row',
    display: 'flex'
  }
}));

export const ProjectProfile = (props: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const [openDeletePopup, setOpenDeletePopup] = useState<boolean>(false);
  const [openModifyPopup, setOpenModifyPopup] = useState<boolean>(false);

  const formik = useFormik<IProject>({
    initialValues: {
      ...props.projectData,
      creationDate: doDateFormat(props.projectData.creationDate) ?? props.projectData.creationDate,
      modificationDate: doDateFormat(props.projectData.modificationDate) ?? props.projectData.modificationDate
    },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      if (props.mode === 'edit') {
        props.updateProjectData(props.projectData.projectId, values, t);
      } else {
        props.createProject(values, t);
      }
    }
  });

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 5;
    }

    if (isWidthUp('lg', props.width)) {
      return 4;
    }

    if (isWidthUp('md', props.width)) {
      return 3;
    }

    if (isWidthUp('sm', props.width)) {
      return 2;
    }

    return 1;
  };

  const getActions = () => {
    if (props.mode === 'edit' && !props.projectData.deletionDate && userCanDelete(props.login.user, P_PROJECT_KEYWORD, props.projectData.projectId)) {
      return [
        {
          icon: <Delete />,
          onClick: () => setOpenDeletePopup(true)
        }
      ];
    }
  };

  const backScreenBefore = () => {
    props.resetReduxProject();
    history.push(routes.PATH_PROJECTS_MANAGEMENT);
  };

  const deleteProject = () => {
    props.deleteProjectData(props.projectData.projectId, t);
  };
  const closeDeletePopup = () => {
    setOpenDeletePopup(false);
  };
  const openClosePopup = () => {
    setOpenModifyPopup(false);
  };
  const clickModify = () => {
    setOpenModifyPopup(true);
  };

  return (
    <GaiaContainer
      icon="assignment_24px"
      title={t('projectProfile.title')}
      actions={getActions()}
      onAccept={userCanUpdate(props.login.user, P_PROJECT_KEYWORD, props.projectData.projectId) || userCanCreate(props.login.user, P_INDIRECT_PROJECT, 'undefined') ? formik.handleSubmit : undefined}
      onBack={backScreenBefore}
      onCancel={backScreenBefore}
    >
      {/* Delete Popup */}
      <GaiaDeleteConfirmPopup open={openDeletePopup} actionText={t('projectProfile.deleteActionText')} title={t('projectProfile.deleteTitle')} onClose={closeDeletePopup} onAccept={deleteProject} />

      {props.loading ? (
        <GaiaLoading />
      ) : (
        <React.Fragment>
          <Grid container spacing={10}>
            <Grid item xs={12} className={classes.gridContainPosition} style={{ paddingBottom: '40px' }}>
              <Grid item xs={6} className={classes.gridContainPosition}>
                <Grid item container spacing={3} alignContent="flex-start">
                  <Grid item>
                    <GaiaTextField name="projectId" label={t('commons.fields.identifier')} formik={formik} fullWidth disabled={props.mode === 'edit'} required />
                  </Grid>
                  <Grid item>
                    <GaiaTextField
                      name="name"
                      label={t('commons.fields.name')}
                      formik={formik}
                      fullWidth
                      required
                      disabled={!(userCanUpdate(props.login.user, P_PROJECT_KEYWORD, props.projectData.projectId) || userCanCreate(props.login.user, P_INDIRECT_PROJECT, 'undefined'))}
                    />
                  </Grid>
                  {props.mode === 'edit' && userCanRead(props.login.user, P_PROJECT_KEYWORD, props.projectData.projectId) && (
                    <React.Fragment>
                      <Grid item>
                        <GaiaTextField name="creationDate" formik={formik} label={t('commons.fields.dateCreated')} fullWidth disabled />
                      </Grid>
                      <Grid xs={6} item>
                        <GaiaTextField name="author" label={t('commons.fields.author')} formik={formik} fullWidth disabled />
                      </Grid>
                      <Grid item>
                        <GaiaTextField name="modificationDate" formik={formik} label={t('commons.fields.lastModificationDate')} fullWidth disabled />
                      </Grid>
                    </React.Fragment>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <GaiaTextField
                  name="description"
                  formik={formik}
                  label={t('commons.fields.description')}
                  fullWidth
                  multiline
                  disabled={!(userCanUpdate(props.login.user, P_PROJECT_KEYWORD, props.projectData.projectId) || userCanCreate(props.login.user, P_INDIRECT_PROJECT, 'undefined'))}
                  rows={4}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} spacing={6} className={classes.gridContainPosition} style={{ paddingTop: '20px' }}>
            {props.mode === 'edit' && (
              <React.Fragment>
                {userCanRead(props.login.user, P_SAMPLES_KEYWORD, props.projectData.projectId) && (
                  <Grid xs={1} item className={classes.gridInput}>
                    <GaiaTextField name="samplesNumber" formik={formik} label={t('projectProfile.nSamples')} fullWidth disabled />
                  </Grid>
                )}

                {userCanRead(props.login.user, P_INDIVIDUALS_KEYWORD, props.projectData.projectId) && (
                  <Grid xs={1} item className={classes.gridInput}>
                    <GaiaTextField name="individualsNumber" formik={formik} label={t('projectProfile.nIndividuals')} fullWidth disabled />
                  </Grid>
                )}

                {userCanRead(props.login.user, P_SAMPLES_KEYWORD, props.projectData.projectId) && (
                  <Grid xs={1} item className={classes.gridInput}>
                    <GaiaTextField name="filesNumber" formik={formik} label={t('projectProfile.nVCF')} fullWidth disabled />
                  </Grid>
                )}

                {userCanRead(props.login.user, P_DIAGNOSTIC_PANELS_KEYWORD, props.projectData.projectId) && (
                  <Grid xs={1} item className={classes.gridInput}>
                    <GaiaTextField name="diagnosticPanelsNumber" formik={formik} label={t('projectProfile.nDiagnosticsPanels')} fullWidth disabled />
                  </Grid>
                )}

                {userCanRead(props.login.user, P_ANALYSES_KEYWORD, props.projectData.projectId) && (
                  <Grid xs={1} item className={classes.gridInput}>
                    <GaiaTextField name="analysesNumber" formik={formik} label={t('projectProfile.nAnalyses')} fullWidth disabled />
                  </Grid>
                )}

                {userCanRead(props.login.user, P_DRUGS_KEYWORD, props.projectData.projectId) && (
                  <Grid xs={1} item className={classes.gridInput}>
                    <GaiaTextField name="drugsNumber" formik={formik} label={t('projectProfile.nDrugs')} fullWidth disabled />
                  </Grid>
                )}
              </React.Fragment>
            )}
            <Grid xs={1} item className={classes.gridInput}>
              <GaiaTextField name="organism" formik={formik} label={t('commons.fields.organism')} fullWidth disabled required />
            </Grid>
            <Grid xs={2} item className={classes.gridInput}>
              <GaiaTextField name="assembly" formik={formik} label={t('commons.fields.assembly')} fullWidth disabled required />
            </Grid>
            <Grid item className={classes.gridInput}>
              <GaiaTextField name="ensemblRelease" formik={formik} label={t('commons.fields.ensemblRelease')} fullWidth disabled required />
            </Grid>
            {(userCanUpdate(props.login.user, P_PROJECT_KEYWORD, props.projectData.projectId) || userCanCreate(props.login.user, P_INDIRECT_PROJECT, 'undefined')) && (
              <Grid item xs={3}>
                <GaiaButton
                  text={t('commons.buttons.modifyGenomicRef')}
                  onClick={() => clickModify()}
                  disabled={
                    !(props.projectData.samplesNumber === 0 && props.projectData.individualsNumber === 0 && props.projectData.filesNumber === 0 && props.projectData.diagnosticPanelsNumber === 0)
                  }
                />
              </Grid>
            )}
          </Grid>
          {props.mode === 'edit' && (
            <React.Fragment>
              {/* Buttons */}
              <Grid item container style={{ marginTop: '50px' }}>
                <Grid item xs={7}>
                  <GridList cols={3} cellHeight={80} spacing={0}>
                    {userCanRead(props.login.user, P_INDIVIDUALS_KEYWORD, props.projectData.projectId) && (
                      <GridListTile
                        classes={{
                          tile: classes.tile
                        }}
                      >
                        <GaiaIconButtonWithText
                          icon={<PersonPin />}
                          iconSize={20}
                          text={t('commons.fields.individuals')}
                          textAlign={'left'}
                          buttonSizeWidth={250}
                          buttonSizeHeight={40}
                          onClick={() => history.push(`${routes.PATH_INDIVIDUALS_MANAGEMENT}/${props.projectData.projectId}`)}
                        />
                      </GridListTile>
                    )}

                    {userCanRead(props.login.user, P_SAMPLES_KEYWORD, props.projectData.projectId) && (
                      <GridListTile
                        classes={{
                          tile: classes.tile
                        }}
                      >
                        <GaiaIconButtonWithText icon={<GridOn />} iconSize={20} text={t('commons.fields.samples')} textAlign={'left'} buttonSizeWidth={250} buttonSizeHeight={40} />
                      </GridListTile>
                    )}

                    {userCanRead(props.login.user, P_ANALYSES_KEYWORD, props.projectData.projectId) && (
                      <GridListTile
                        classes={{
                          tile: classes.tile
                        }}
                      >
                        <GaiaIconButtonWithText icon={<FindInPage />} iconSize={20} text={t('commons.fields.analyses')} textAlign={'left'} buttonSizeWidth={250} buttonSizeHeight={40} />
                      </GridListTile>
                    )}

                    {userCanRead(props.login.user, P_DRUGS_KEYWORD, props.projectData.projectId) && (
                      <GridListTile
                        classes={{
                          tile: classes.tile
                        }}
                      >
                        <GaiaIconButtonWithText icon={<LocalPharmacy />} iconSize={20} text={t('commons.fields.drugs')} textAlign={'left'} buttonSizeWidth={250} buttonSizeHeight={40} />
                      </GridListTile>
                    )}

                    {userCanRead(props.login.user, P_DIAGNOSTIC_PANELS_KEYWORD, props.projectData.projectId) && (
                      <GridListTile
                        classes={{
                          tile: classes.tile
                        }}
                      >
                        <GaiaIconButtonWithText icon={<WebAsset />} iconSize={20} text={t('commons.fields.diagnosticPanels')} textAlign={'left'} buttonSizeWidth={250} buttonSizeHeight={40} />
                      </GridListTile>
                    )}

                    {userCanRead(props.login.user, P_SAMPLES_KEYWORD, props.projectData.projectId) && (
                      <GridListTile
                        classes={{
                          tile: classes.tile
                        }}
                      >
                        <GaiaIconButtonWithText icon={<Description />} iconSize={20} text={t('commons.fields.vfcFiles')} textAlign={'left'} buttonSizeWidth={250} buttonSizeHeight={40} />
                      </GridListTile>
                    )}
                  </GridList>
                </Grid>
                {userCanUpdate(props.login.user, P_PERMISSIONS_KEYWORD, props.projectData.projectId) && (
                  <Grid item xs={5} style={{ justifyContent: 'flex-end', display: 'flex', marginTop: 20 }}>
                    <GaiaIconButtonWithText
                      icon={<VpnKey />}
                      iconSize={20}
                      text={t('projectProfile.usersAndPermissions')}
                      textAlign={'left'}
                      buttonSizeWidth={250}
                      buttonSizeHeight={40}
                      onClick={() => history.push(`${routes.PATH_PERMISSIONS_AND_USERS}/${props.projectData.projectId}`)}
                    />
                  </Grid>
                )}
              </Grid>
            </React.Fragment>
          )}
          {/* Genomic Reference Modal */}
          <GenomicRefPopup
            accession={props.projectData.assembly || formik.values.assembly}
            titlePopup={t('panelSetCreate.titlePopup')}
            open={openModifyPopup}
            onClose={() => openClosePopup()}
            onAccept={(data: any) => {
              formik.setFieldValue('organism', data.species?.taxonomyId);
              formik.setFieldValue('assembly', data.accession);
              formik.setFieldValue('ensemblRelease', data.ensemblRelease);
              setOpenModifyPopup(false);
              formik.validateForm({ ...formik.values, organism: data.species?.taxonomyId, assembly: data.accession, ensemblRelease: data.ensemblRelease });
            }}
          />
        </React.Fragment>
      )}
    </GaiaContainer>
  );
};

export default withWidth()(ProjectProfile);
