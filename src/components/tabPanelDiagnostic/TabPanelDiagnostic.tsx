import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaContainer from '../commons/GaiaContainer';
import General from './tabs/General';
import Genes from './tabs/Genes';
import Transcript from './tabs/Transcript';
import HPO from './tabs/HPO';
import RegionVariant from './tabs/RegionVariant';
import AscendantsDescendants from './tabs/AscendantsDescendants';
import PopupPanelSelection from '../commons/popupsComponents/selectPanel/PopupPanelSelection';
import PopupCreateRegion from '../commons/popupsComponents/createRegion/PopupCreateRegion';
import { Fab, Grid, Tooltip, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteIcon from '@material-ui/icons/Delete';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaModalFormik from '../commons/GaiaModalFormik';
import { IDeleteForm, IDiagnosticPanelGlobal, IDiagnosticPanelGlobalUpdate, IGeneralData } from './interfaces';
import { useFormik } from 'formik';
import { deleteSchema, generateValidationSchema } from './validationSchema';
import GaiaPopup from '../commons/GaiaPopup';
import PopupCreateVariant from '../commons/popupsComponents/createVariant/PopupCreateVariant';
import PopupTranscriptPanelSelection from '../commons/popupsComponents/transcriptPopup/PopupTranscriptPanelSelection';
import PopupHPOPanelSelection from '../commons/popupsComponents/hpoPopup/PopupHPOPanelSelection';
import GaiaTabsPanel, { GaiaTab } from '../commons/GaiaTabs';
import PopupSearchGenes from '../commons/popupsComponents/searchGenes/PopupSearchGenes';
import PopupSearchIcd10 from '../commons/popupsComponents/searchIcd10/PopupSearchIcd10';
import { IGene, ITranscript, IIcd10, IHPO } from './tabs/interfaces';
import Icd10 from './tabs/ICD-10';
import { doDateFormat } from '../../utils/utils';
import { IPanelSetData } from '../panelSetProfile/interfaces';
import { Save } from '@material-ui/icons';
import _ from 'lodash';
import GaiaLoading from '../commons/GaiaLoading';
import routes from '../router/routes';
import { useHistory } from 'react-router-dom';

interface IProps {
  loading: boolean;
  panelSetIdentifier: string;
  panelIdentifier: string;
  panelPreviousVersion: string;
  panelNextVersion: string;
  panelguid: string;
  diagnosticPanelGeneral: IDiagnosticPanelGlobal;

  ascendants: any;
  descendants: any[];
  assembly: string;
  isHuman: boolean | undefined;
  guid: string;
  geneList: any[];
  transcriptList: any[];
  hpoList: any[];
  icd10List: any[];
  mode: 'new' | 'edit';
  panelSetData: IPanelSetData;
  author: string;

  updatePanelGeneral: (newData: IDiagnosticPanelGlobalUpdate) => void;
  updatePanelGlobal: (identifier: string, dataPanelProfile: IDiagnosticPanelGlobal, t: any) => Promise<any>;
  fetchPanelGlobal: (guid: string) => void;
  deletePanelGlobal: (panelSetId: string, guid: string, children: boolean, t: any) => void;
  createPanel: (data: IDiagnosticPanelGlobal, t: any) => void;
  addNewAscendant: (newAscendant: any) => void;
  addNewDescendant: (newDescendant: any) => void;
  addNewRegion: (newRegion: any) => void;
  addNewVariant: (newVariant: any) => void;
  checkRegion: (region: any, assembly: any) => Promise<any>;
  resetRedux: () => void;
  deleteGene: (id: string) => void;
  addGene: (gene: IGene) => void;
  deleteTranscript: (id: string) => void;
  addTranscript: (transcript: ITranscript) => void;
  deleteHPO: (id: string) => void;
  addHPO: (hpo: IHPO) => void;
  addIcd10: (icd10: IIcd10) => void;
  deleteIcd10: (id: string) => void;
}

export const TabPanelDiagnostic = (props: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [openDelDescRemoveChild, setOpenDelDescRemoveChild] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openPopupAsc, setOpenPopupAsc] = useState<boolean>(false);
  const [excludeAsc, setExcludeAsc] = useState<string[]>([]);
  const [openPopupDesc, setOpenPopupDesc] = useState<boolean>(false);
  const [excludeDesc, setExcludeDesc] = useState<string[]>([]);
  const [openPopupRegion, setOpenPopupRegion] = useState<boolean>(false);
  const [openPopupVariant, setOpenPopupVariant] = useState<boolean>(false);
  const [openPopupSearchGenes, setOpenPopupSearchGenes] = useState<boolean>(false);
  const [openPopupSearchTranscript, setOpenPopupSearchTranscript] = useState<boolean>(false);
  const [openPopupSearchHPO, setOpenPopupSearchHPO] = useState<boolean>(false);
  const [openPopupSearchIcd10, setOpenPopupSearchIcd10] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [prevPanelVersion, setPrevPanelVersion] = useState<IDiagnosticPanelGlobalUpdate | null>(null);

  useEffect(() => {
    if (prevPanelVersion === null || !prevPanelVersion.assembly || prevPanelVersion.previousVersion !== props.diagnosticPanelGeneral.previousVersion) {
      setPrevPanelVersion(props.diagnosticPanelGeneral);
    }
  }, [props.diagnosticPanelGeneral, prevPanelVersion]);

  const clickAddAsc = () => {
    let exclude = [];
    exclude.push(props.panelIdentifier);
    props.ascendants.forEach((element: any) => {
      exclude.push(element.diagnosticPanelIdentifier);
    });
    setExcludeAsc(exclude);
    setOpenPopupAsc(!openPopupAsc);
  };

  const clickAddDesc = () => {
    let exclude = [];
    exclude.push(props.panelIdentifier);
    props.descendants.forEach((element: any) => {
      exclude.push(element.diagnosticPanelIdentifier);
    });
    setExcludeDesc(exclude);
    setOpenPopupDesc(!openPopupDesc);
  };

  const addAscendants = (newAscendant: any) => {
    props.addNewAscendant({
      diagnosticPanelIdentifier: newAscendant.diagnosticPanelIdentifier ?? '',
      guid: newAscendant.guid ?? '',
      name: newAscendant.name ?? '',
      description: newAscendant.description ?? '',
      parentIds: newAscendant.parentIds ?? {}
    });
  };

  const addDescendants = (newDescendant: any) => {
    props.addNewDescendant({
      diagnosticPanelIdentifier: newDescendant.diagnosticPanelIdentifier ?? '',
      guid: newDescendant.guid ?? '',
      name: newDescendant.name ?? '',
      description: newDescendant.description ?? '',
      parentIds: newDescendant.parentIds ?? {}
    });
  };

  const clickAddRegion = () => {
    setOpenPopupRegion(!openPopupRegion);
  };

  const clickAddVariant = () => {
    setOpenPopupVariant(!openPopupVariant);
  };
  const addRegions = (newRegion: any) => {
    props.addNewRegion({
      regionIdentifier: newRegion.regionIdentifier ?? '',
      chromosome: newRegion.chromosome ?? '',
      initPosition: newRegion.initPosition ?? '',
      endPosition: newRegion.endPosition ?? ''
    });
  };

  const addVariants = (newVariant: any) => {
    props.addNewVariant({
      variantIdentifier: newVariant.variantIdentifier ?? '',
      chromosomeSequence: newVariant.chromosomeSequence ?? '',
      initPosition: newVariant.initPosition ?? '',
      reference: newVariant.reference ?? {},
      alternative: newVariant.alternative ?? {},
      isChildren: false
    });
  };

  const crupdPanelGeneral = (values: IGeneralData | IDiagnosticPanelGlobalUpdate) => {
    if (props.mode === 'new') {
      props.createPanel({ ...props.diagnosticPanelGeneral, ...values }, t);
    } else {
      const prevWithoutRegionAndAscDesc = _.omit({ ...prevPanelVersion }, ['descendants']);
      const newWithoutRegionAndAscDesc = _.omit({ ...(props.diagnosticPanelGeneral as IDiagnosticPanelGlobalUpdate), ...values }, ['descendants']);
      const areEquals = _.isEqual(prevWithoutRegionAndAscDesc, newWithoutRegionAndAscDesc);

      props.updatePanelGlobal(props.panelguid, { ...props.diagnosticPanelGeneral, ...values, isNewVersion: !areEquals }, t).then((result) => {
        if (result.done && result.nextVersion) {
          navegateTo(result.nextVersion);
        }
      });
    }
  };

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const clickDelete = () => {
    setOpenDeleteModal(true);
  };

  const clickRightArrow = () => {
    navegateTo(props.panelNextVersion);
  };

  const clickLeftArrow = () => {
    navegateTo(props.panelPreviousVersion);
  };

  const generalFormik = useFormik<IGeneralData | IDiagnosticPanelGlobalUpdate>({
    initialValues: {
      author: props.author ?? '',
      diagnosticPanelSetIdentifier: (props.panelSetData.diagnosticPanelSetIdentifier || props.diagnosticPanelGeneral.diagnosticPanelSetIdentifier) ?? '',
      diagnosticPanelIdentifier: props.diagnosticPanelGeneral.diagnosticPanelIdentifier ?? '',
      name: props.diagnosticPanelGeneral.name ?? '',
      creationDate: props.diagnosticPanelGeneral.creationDate ? doDateFormat(props.diagnosticPanelGeneral.creationDate, 'YYYY-MM-DD') : '',
      deletionDate: props.diagnosticPanelGeneral.deletionDate ? doDateFormat(props.diagnosticPanelGeneral.deletionDate, 'YYYY-MM-DD') : '',
      description: props.diagnosticPanelGeneral.description ?? ''
    },
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      crupdPanelGeneral(values);
    }
  });

  const deleteFormik = useFormik<IDeleteForm>({
    initialValues: { confirmation: '' },
    enableReinitialize: true,
    validationSchema: deleteSchema(t),
    onSubmit: () => {
      setOpenDeleteModal(false);
      deleteFormik.resetForm();
      if (props.descendants.length) {
        setOpenDelDescRemoveChild(true);
      } else {
        deletePanel();
      }
    }
  });

  const closeChooseDeletePopup = () => {
    setOpenDelDescRemoveChild(false);
  };

  const deletePanel = () => {
    setOpenDelDescRemoveChild(false);
    props.deletePanelGlobal(props.panelSetIdentifier, props.panelguid, false, t);
  };

  const deletePanelChildren = () => {
    setOpenDelDescRemoveChild(false);
    props.deletePanelGlobal(props.panelSetIdentifier, props.panelguid, true, t);
  };

  const navegateTo = (guid: string) => {
    history.push(`${routes.PATH_TAB_PANEL_DIAGNOSTIC}/${guid}`);
  };
  const backScreenBefore = () => {
    props.resetRedux();

    if (props.panelSetIdentifier) {
      history.push(`${routes.PATH_PANEL_SET_PROFILE}/${props.panelSetIdentifier}`);
    } else {
      history.push(routes.PATH_PANEL_SETS_MANAGEMENT);
    }
  };
  return (
    <GaiaContainer icon="folder_open" title={t('tabPanelDiagnostic.title')} onBack={backScreenBefore}>
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <div style={{ overflow: 'auto' }}>
          {/* Confirm Delete Panel Modal */}
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

          {/* Delete Panel Modal */}
          <GaiaPopup
            open={openDelDescRemoveChild}
            type="warningTwoOptions"
            message={t('tabPanelDiagnostic.messages.chooseDeletion')}
            onFirstAction={deletePanel}
            onSecondAction={deletePanelChildren}
            onClose={closeChooseDeletePopup}
          />

          <Grid style={{ paddingBottom: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Grid item xs={1}>
              <Tooltip title={t('tabPanelDiagnostic.tooltip.leftArrow') ?? ''} placement="top-start">
                <Fab color="primary" size="small" component="span" aria-label="add" variant="extended" onClick={clickLeftArrow} disabled={props.panelPreviousVersion ? false : true}>
                  <ArrowBackIosIcon />
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item xs={1}>
              <Tooltip title={t('tabPanelDiagnostic.tooltip.rightArrow') ?? ''} placement="top-start">
                <Fab color="primary" size="small" component="span" aria-label="add" variant="extended" onClick={clickRightArrow} disabled={props.panelNextVersion ? false : true}>
                  <ArrowForwardIosIcon />
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item xs={1}>
              <Tooltip title={t('tabPanelDiagnostic.tooltip.delete') ?? ''} placement="top-start">
                <Fab color="primary" size="small" component="span" aria-label="add" variant="extended" onClick={clickDelete}>
                  <DeleteIcon />
                </Fab>
              </Tooltip>
            </Grid>
            <Grid item xs={1}>
              <Tooltip title={t('tabPanelDiagnostic.tooltip.save') ?? ''} placement="top-start">
                <Fab color="primary" size="small" component="span" aria-label="add" variant="extended" onClick={() => generalFormik.handleSubmit()} disabled={props.panelNextVersion ? true : false}>
                  <Save />
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>

          <GaiaTabsPanel value={value} onChange={handleChange}>
            <GaiaTab
              title={t('tabPanelDiagnostic.tabs.general')}
              component={<General formik={generalFormik} loading={props.loading} nextVersion={props.panelNextVersion ? true : false} mode={props.mode} />}
            />
            <GaiaTab
              title={t('tabPanelDiagnostic.tabs.icd-10.title')}
              component={<Icd10 deleteIcd10={props.deleteIcd10} itemsList={props.icd10List} setIcd10OpenPopup={() => setOpenPopupSearchIcd10(true)} />}
              hidden={!props.isHuman}
            />
            <GaiaTab
              title={t('tabPanelDiagnostic.tabs.hpo')}
              component={
                <HPO
                  assembly={props.assembly}
                  setHPOOpenPopup={() => setOpenPopupSearchHPO(true)}
                  deleteHPO={(id: string) => {
                    props.deleteHPO(id);
                  }}
                  itemsList={props.hpoList}
                />
              }
              hidden={!props.isHuman}
            />
            <GaiaTab title={t('tabPanelDiagnostic.tabs.omim')} component={<div>Item 4</div>} />
            <GaiaTab
              title={t('tabPanelDiagnostic.tabs.gene')}
              component={
                <Genes
                  panelId={props.guid}
                  setGenesOpenPopup={() => setOpenPopupSearchGenes(true)}
                  deleteGene={(id: string) => {
                    props.deleteGene(id);
                  }}
                  itemsList={props.geneList}
                />
              }
            />
            <GaiaTab
              title={t('tabPanelDiagnostic.tabs.transcript')}
              component={
                <Transcript
                  assembly={props.assembly}
                  setTranscriptOpenPopup={() => setOpenPopupSearchTranscript(true)}
                  deleteTranscript={(id: string) => {
                    props.deleteTranscript(id);
                  }}
                  itemsList={props.transcriptList}
                />
              }
            />
            <GaiaTab title={t('tabPanelDiagnostic.tabs.regionVatiant')} component={<RegionVariant clickAddRegion={clickAddRegion} clickAddVariant={clickAddVariant} />} />
            <GaiaTab title={t('tabPanelDiagnostic.tabs.ascendingDescending')} component={<AscendantsDescendants clickAddAsc={clickAddAsc} clickAddDesc={clickAddDesc} navegateTo={navegateTo} />} />
          </GaiaTabsPanel>

          {openPopupAsc && (
            <PopupPanelSelection
              titlePopup={t('tabPanelDiagnostic.titlePanelPopup')}
              open={true}
              openPopupParent={setOpenPopupAsc}
              setValueField={addAscendants}
              setId={[props.panelSetIdentifier]}
              exclude={excludeAsc}
            />
          )}
          {openPopupDesc && (
            <PopupPanelSelection
              titlePopup={t('tabPanelDiagnostic.titlePanelPopup')}
              open={true}
              openPopupParent={setOpenPopupDesc}
              setValueField={addDescendants}
              setId={[props.panelSetIdentifier]}
              exclude={excludeDesc}
            />
          )}
          {openPopupRegion && (
            <PopupCreateRegion
              titlePopup={t('commons.fields.regionsNumber')}
              open={true}
              openPopupParent={setOpenPopupRegion}
              setValueField={addRegions}
              checkRegion={props.checkRegion}
              assembly={props.assembly}
            />
          )}
          {openPopupVariant && (
            <PopupCreateVariant titlePopup={t('commons.fields.variantsNumber')} open={true} openPopupParent={setOpenPopupVariant} setValueField={addVariants} assembly={props.assembly} />
          )}
          {openPopupSearchGenes && (
            <PopupSearchGenes
              title={t('commons.fields.geneSelection')}
              open={true}
              openPopupParent={() => setOpenPopupSearchGenes(false)}
              assembly={props.assembly}
              addGene={props.addGene}
              exclude={props.geneList.map((g: IGene) => g.geneId)}
            />
          )}
          {openPopupSearchTranscript && (
            <PopupTranscriptPanelSelection
              titlePopup={t('commons.fields.transcriptSelection')}
              open={true}
              openPopupParent={() => setOpenPopupSearchTranscript(false)}
              assembly={props.assembly}
              addTranscript={props.addTranscript}
              exclude={props.transcriptList.map((t: ITranscript) => t.transcriptId)}
            />
          )}
          {openPopupSearchHPO && (
            <PopupHPOPanelSelection
              titlePopup={t('commons.fields.fenotypesHPO')}
              open={true}
              openPopupParent={() => setOpenPopupSearchHPO(false)}
              assembly={props.assembly}
              addHPO={props.addHPO}
              exclude={props.hpoList.map((h: IHPO) => h.hpoId)}
            />
          )}
          {openPopupSearchIcd10 && (
            <PopupSearchIcd10
              title={t('tabPanelDiagnostic.tabs.icd-10.selectionTitle')}
              open={true}
              openPopupParent={() => setOpenPopupSearchIcd10(false)}
              addIcd10={props.addIcd10}
              exclude={props.icd10List.map((g: IIcd10) => g.id)}
            />
          )}
        </div>
      )}
    </GaiaContainer>
  );
};

export default TabPanelDiagnostic;
