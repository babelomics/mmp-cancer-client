import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, makeStyles, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SpeciesOrganism from './SpeciesOrganism';
import GaiaSelectField from '../commons/GaiaSelectField';
import Assembly from './Assembly';
import GaiaContainer from '../commons/GaiaContainer';
import { connect } from 'react-redux';
import { IRootState } from '../../store';
import { operations } from './duck';
import GaiaLoading from '../commons/GaiaLoading';
import { IGenomicReferenceData } from './interfaces';

interface IProps {
  accession?: string;
  titlePopup?: string;
  open?: boolean;
  buttonType?: string | null;
  onClose?: () => void;
  onAccept?: (data?: IGenomicReferenceData) => void;
  genomicReference: IGenomicReferenceData;
  loading: boolean;
  listEnsemblRelease: any[];
  fetchSpiecesAssembly: (data: string) => void;
  fechAssemblyAccession: (data: string) => void;
  resetRedux: () => void;
  updateGenomicReferenceData: (data: any) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 0
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogPaper: {
    minHeight: '60vh',
    maxHeight: '110vh',
    minWidth: '60vh',
    maxWidth: '110vh'
  }
}));

const GenomicRefPopup = ({
  listEnsemblRelease,
  fechAssemblyAccession,
  accession,
  genomicReference,
  loading,
  fetchSpiecesAssembly,
  titlePopup,
  open = false,
  onClose,
  onAccept,
  resetRedux,
  updateGenomicReferenceData
}: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openState, setOpen] = useState<boolean>(open);
  const [activeEnsemblRelease, setActiveEnsemblRelease] = useState<boolean>(false);

  useEffect(() => {
    setOpen(open);
    if (accession) {
      fetchSpiecesAssembly(accession);
      fechAssemblyAccession(accession);
      setActiveEnsemblRelease(true);
    } else {
      resetRedux();
    }
  }, [open]);

  useEffect(() => {
    if (genomicReference.accession) {
      fechAssemblyAccession(genomicReference.accession);
    }
  }, [activeEnsemblRelease]);

  const handleClose = () => {
    setOpen(false);
    resetRedux();
    if (onClose) {
      onClose();
    }
  };

  const handleAccept = () => {
    setOpen(false);
    if (onAccept) {
      onAccept(genomicReference);
    }
  };
  const setEnsemblRelease = (e: any, value: any) => {
    updateGenomicReferenceData({
      ensemblRelease: value.props.children
    });
  };

  return (
    <Dialog onClose={handleClose} open={openState} classes={{ paper: classes.dialogPaper }}>
      <GaiaContainer title={titlePopup} onBack={loading ? undefined : handleClose} onAccept={loading ? undefined : handleAccept}>
        {loading ? (
          <GaiaLoading />
        ) : (
          <>
            <DialogContent style={{ overflow: 'hidden' }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <SpeciesOrganism
                    dataSpeciesOrganism={{
                      taxonomyId: genomicReference.species ? genomicReference.species.taxonomyId : '',
                      scientificName: genomicReference.species ? genomicReference.species.scientificName : '',
                      commonName: genomicReference.species ? genomicReference.species.commonName : ''
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Assembly
                    taxonomyId={genomicReference.species ? genomicReference.species.taxonomyId : ''}
                    dataAssembly={{
                      id: genomicReference.accession ?? '',
                      description: genomicReference.accessionType ?? '',
                      name: genomicReference.name ?? '',
                      ucscAlias: genomicReference.ucscAlias ?? ''
                    }}
                    setActiveEnsemblRelease={setActiveEnsemblRelease}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  {activeEnsemblRelease && (
                    <GaiaSelectField
                      name="ensemblRelease"
                      label={t('panelSetCreate.ensemblRelease')}
                      items={listEnsemblRelease}
                      onChange={(e, value) => setEnsemblRelease(e, value)}
                      value={genomicReference.ensemblRelease ?? ''}
                      fullWidth
                    />
                  )}
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </GaiaContainer>
    </Dialog>
  );
};

const mapStateToProps = (state: IRootState) => ({
  loading: state.genomicRefPopup.loading,
  genomicReference: state.genomicRefPopup.genomicReference,
  listEnsemblRelease: state.genomicRefPopup.listEnsemblRelease
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(GenomicRefPopup);
