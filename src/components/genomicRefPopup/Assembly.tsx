import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';

import { TextField } from '@material-ui/core';

import { IAssembly, ITableAssemblyData } from './interfaces';
import GaiaIconButton from '../commons/GaiaIconButton';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { IRootState } from '../../store';
import { operations } from './duck';
import ModalTableAssembly from './ModalTableAssembly';

interface IProps {
  dataAssembly: IAssembly;
  taxonomyId: string | undefined;
  setActiveEnsemblRelease: (data: boolean) => void;
  //From redux
  openAssemblyPopup: boolean;

  //From Operation
  updateGenomicReferenceData: (data: any) => void;
  setOpenAssemblyPopup: (data: boolean) => void;
}

const Assembly = (props: IProps) => {
  const { t } = useTranslation();

  const clickModify = () => {
    props.setActiveEnsemblRelease(false);
    props.setOpenAssemblyPopup(true);
  };

  const handleClickRow = (species: ITableAssemblyData) => {
    props.updateGenomicReferenceData({
      accession: species.accession,
      accessionType: species.accessionType,
      name: species.name,
      ucscAlias: species.ucscAlias
    });
    props.setOpenAssemblyPopup(false);
    props.setActiveEnsemblRelease(true);
  };

  return (
    <React.Fragment>
      {/*MODAL TABLE ASSEMBLY*/}
      <ModalTableAssembly
        handleClickRow={handleClickRow}
        taxonomyId={props.taxonomyId ?? ''}
        titlePopup={t('panelSetCreate.titlePopupTableAssemblies')}
        open={props.openAssemblyPopup}
        openPopupParent={props.setOpenAssemblyPopup}
      />

      <Typography variant="subtitle2" style={{ marginBottom: 20 }}>
        {t('panelSetCreate.subTitlePopupAssemblies')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <TextField label={t('commons.fields.id')} fullWidth disabled name="id" value={props.dataAssembly.id} />
        </Grid>
        <Grid item xs={4}>
          <TextField label={t('commons.fields.description')} fullWidth disabled name="description" value={props.dataAssembly.description} />
        </Grid>
        <Grid item xs={2}>
          <TextField label={t('commons.fields.name')} fullWidth disabled name="name" value={props.dataAssembly.name} />
        </Grid>
        <Grid item xs={2}>
          <TextField label={t('commons.fields.uscAlias')} fullWidth disabled name="uscAlias" value={props.dataAssembly.ucscAlias} />
        </Grid>
        <Grid item xs={1}>
          {props.taxonomyId && (
            <GaiaIconButton
              icon={<EditIcon />}
              onClick={() => clickModify()}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IRootState) => ({
  openAssemblyPopup: state.genomicRefPopup.openAssemblyPopup
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Assembly);
