import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';

import { TextField } from '@material-ui/core';
import { ISpeciesOrganism, ITableSpeciesData } from './interfaces';
import GaiaIconButton from '../commons/GaiaIconButton';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { IRootState } from '../../store';
import { operations } from './duck';
import ModalTableSpecies from './ModalTableSpecies';

interface IProps {
  dataSpeciesOrganism: ISpeciesOrganism;

  //From redux
  openSpeciesPopup: boolean;

  //From Operation
  updateGenomicReferenceData: (data: any) => void;
  setOpenSpeciesPopup: (data: boolean) => void;
}

const SpeciesOrganism = (props: IProps) => {
  const { t } = useTranslation();

  const clickModify = () => {
    props.setOpenSpeciesPopup(true);
  };

  const handleClickRow = (species: ITableSpeciesData) => {
    props.updateGenomicReferenceData({ species: { commonName: species.commonName, scientificName: species.scientificName, taxonomyId: species.taxonomyId } });
    props.setOpenSpeciesPopup(false);
  };

  return (
    <React.Fragment>
      {/*Table Species Modal*/}
      <ModalTableSpecies handleClickRow={handleClickRow} titlePopup={t('panelSetCreate.titlePopupTableSpecies')} open={props.openSpeciesPopup} openPopupParent={props.setOpenSpeciesPopup} />

      <Typography variant="subtitle2" style={{ marginBottom: 20 }}>
        {t('panelSetCreate.subTitlePopupSpecies')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <TextField label={t('commons.fields.identifier')} fullWidth disabled name="id" value={props.dataSpeciesOrganism.taxonomyId ?? ''} />
        </Grid>
        <Grid item xs={4}>
          <TextField label={t('commons.fields.name')} fullWidth disabled name="name" value={props.dataSpeciesOrganism.scientificName ?? ''} />
        </Grid>
        <Grid item xs={4}>
          <TextField label={t('commons.fields.commonName')} fullWidth disabled name="commonName" value={props.dataSpeciesOrganism.commonName ?? ''} />
        </Grid>
        <Grid item xs={2}>
          <GaiaIconButton
            icon={<EditIcon />}
            onClick={() => clickModify()}
            onKeyPress={(e) => {
              e.key === 'Enter' && e.preventDefault();
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IRootState) => ({
  openSpeciesPopup: state.genomicRefPopup.openSpeciesPopup
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesOrganism);
