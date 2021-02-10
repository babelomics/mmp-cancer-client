import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { IRootState } from '../../../store';
import { operations } from '../duck';
import { Grid, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';
import { RemoveCircle, AddCircle } from '@material-ui/icons';
import GaiaPopup from '../../commons/GaiaPopup';

interface IProps {
  loading: boolean;
  regionList: any;
  variantList: any;
  clickAddRegion: () => void;
  clickAddVariant: () => void;
  deleteRegion: (region: any) => void;
  deleteVariant: (variant: any) => void;
}

const useStyles = makeStyles((theme) => ({
  gridList: {
    margin: '15px 30px'
  },
  divList: {
    border: 'solid 1px rgba(0, 0, 0, 0.12);'
  },
  itemList: {
    borderTop: 'solid 1px rgba(0, 0, 0, 0.12);'
  },
  titleList: {
    fontSize: 20
  },
  idList: {
    flex: 'unset',
    width: 100
  }
}));

const RegionVariant = (props: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [messageDel, setMessageDel] = useState<string>('');
  const [selectedIdentifier, setSelectedIdentifier] = useState<string>('');
  const [openDelregion, setOpenDelRegion] = useState<boolean>(false);
  const [openDelVariant, setOpenDelVariant] = useState<boolean>(false);
  //min-width: min-content;

  const clickRemovedRegion = (identifier: string) => {
    setMessageDel(t('tabPanelDiagnostic.confirmDeleteRegion'));
    setSelectedIdentifier(identifier);
    setOpenDelRegion(true);
  };

  const clickRemovedVariant = (identifier: string) => {
    setMessageDel(t('tabPanelDiagnostic.confirmDeleteVariant'));
    setSelectedIdentifier(identifier);
    setOpenDelVariant(true);
  };

  const continueDelRegion = () => {
    props.deleteRegion(selectedIdentifier);
    closeDel();
  };

  const continueDelVariant = () => {
    props.deleteVariant(selectedIdentifier);
    closeDel();
  };

  const closeDel = () => {
    setSelectedIdentifier('');
    setMessageDel('');
    setOpenDelRegion(false);
    setOpenDelVariant(false);
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item sm={12} md={5} className={classes.gridList}>
          <div className={classes.divList}>
            <List>
              <ListItem>
                <ListItemText primary={t('commons.fields.regionsNumber')} primaryTypographyProps={{ variant: 'h6', color: 'primary' }} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="primary" onClick={props.clickAddRegion}>
                    <AddCircle />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {props.regionList.map((i: any) => (
                <ListItem className={classes.itemList}>
                  <ListItemText primary={`${i.chromosome}:${i.initPosition}-${i.endPosition}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={(identifier) => clickRemovedRegion(i.regionIdentifier)}>
                      <RemoveCircle />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
        <Grid item sm={12} md={5} className={classes.gridList}>
          <div className={classes.divList}>
            <List>
              <ListItem>
                <ListItemText primary={t('commons.fields.variantsNumber')} primaryTypographyProps={{ variant: 'h6', color: 'primary' }} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="primary" onClick={props.clickAddVariant}>
                    <AddCircle />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {props.variantList.map((i: any) => (
                <ListItem className={classes.itemList}>
                  <ListItemText primary={`${i.chromosomeSequence}:${i.initPosition}:${i.reference}:${i.alternative}`} />
                  <ListItemSecondaryAction>
                    {!i.isChildren && (
                      <IconButton edge="end" onClick={() => clickRemovedVariant(i.variantIdentifier)}>
                        <RemoveCircle />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
      <GaiaPopup open={openDelregion} type="warningConfirm" message={messageDel} onAccept={continueDelRegion} onClose={closeDel} />
      <GaiaPopup open={openDelVariant} type="warningConfirm" message={messageDel} onAccept={continueDelVariant} onClose={closeDel} />
    </>
  );
};
const mapStateToProps = (state: IRootState) => ({
  loading: state.tabPanelDiagnostic.loading,
  regionList: state.tabPanelDiagnostic.diagnosticPanelGlobal.regionList,
  variantList: state.tabPanelDiagnostic.diagnosticPanelGlobal.variantList
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(RegionVariant);
