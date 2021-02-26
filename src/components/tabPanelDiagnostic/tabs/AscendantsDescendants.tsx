import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { IRootState } from '../../../store';
import { operations } from '../duck';
import { Grid, List, ListItem, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';
import { RemoveCircle, AddCircle } from '@material-ui/icons';
import GaiaPopup from '../../commons/GaiaPopup';
import { Panel } from '../../commons/popupsComponents/selectPanel/interfaces';
import GaiaLink from '../../commons/GaiaLink';
import withTooltip from '../../../HoC/withTooltip';

interface IProps {
  loading: boolean;
  ascendants: any;
  descendants: any;
  panelIdentifier: string;
  isDeleted?: boolean;
  clickAddAsc: () => void;
  clickAddDesc: () => void;
  deleteAscendant: (ascendant: any) => void;
  deleteDescendant: (data: any) => void;
  navegateTo: (guid: string, general?: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  gridList: {
    margin: '15px 30px'
  },
  divList: {
    border: 'solid 1px rgba(0, 0, 0, 0.12);'
  },
  itemList: {
    borderTop: 'solid 1px rgba(0, 0, 0, 0.12);',
    cursor: 'pointer'
  },
  titleList: {
    fontSize: 20
  },
  idList: {
    flex: 'unset',
    width: 100
  }
}));

export const AscendantsDescendants = (props: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [openDelAsc, setOpenDelAsc] = useState<boolean>(false);
  const [openDelDesc, setOpenDelDesc] = useState<boolean>(false);
  const [openDelDescRemoveChild, setOpenDelDescRemoveChild] = useState<boolean>(false);
  const [messageDel, setMessageDel] = useState<string>('');
  const [selectedIdentifier, setSelectedIdentifier] = useState<string>('');
  const Link = withTooltip(GaiaLink);

  const clickRemovedAsc = (identifier: string) => {
    if (props.ascendants.length === 1) {
      setMessageDel(t('tabPanelDiagnostic.confirmDeleteRelationRoot', { panel: identifier }));
    } else {
      setMessageDel(t('tabPanelDiagnostic.confirmDeleteRelation', { panel: identifier }));
    }
    setSelectedIdentifier(identifier);
    setOpenDelAsc(true);
  };

  const clickRemovedDesc = (identifier: string, parent: string[]) => {
    setSelectedIdentifier(identifier);
    if (parent.length === 1 && parent[0] === props.panelIdentifier) {
      setMessageDel(t('tabPanelDiagnostic.confirmDeleteRelationChild', { panel: identifier }));
      setOpenDelDescRemoveChild(true);
    } else {
      setMessageDel(t('tabPanelDiagnostic.confirmDeleteRelation', { panel: identifier }));
      setOpenDelDesc(true);
    }
  };

  const continueDelAsc = () => {
    props.deleteAscendant(selectedIdentifier);
    closeDel();
  };

  const continueDelDescRoot = () => {
    props.deleteDescendant({ identifier: selectedIdentifier, delete: false });
    closeDel();
  };

  const continueDelDesc = () => {
    props.deleteDescendant({ identifier: selectedIdentifier, delete: true });
    closeDel();
  };

  const closeDel = () => {
    setOpenDelAsc(false);
    setOpenDelDesc(false);
    setOpenDelDescRemoveChild(false);
    setSelectedIdentifier('');
    setMessageDel('');
  };

  return (
    <>
      <Grid container justify="center">
        <Grid item sm={12} md={5} className={classes.gridList}>
          <div className={classes.divList}>
            <List>
              <ListItem>
                <ListItemText primary={t('commons.fields.ascendants')} primaryTypographyProps={{ variant: 'h6', color: 'primary' }} />
                {!props.isDeleted && (
                  <ListItemSecondaryAction>
                    <IconButton edge="end" color="primary" onClick={props.clickAddAsc}>
                      <AddCircle />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {props.ascendants.map((i: Panel) => (
                <ListItem className={classes.itemList} onClick={() => props.navegateTo(i.guid, true)}>
                  <Grid item xs={6}>
                    <ListItemText>
                      <Link text={i.diagnosticPanelIdentifier} tooltip={i.diagnosticPanelIdentifier} placement={'bottom-start'}></Link>
                    </ListItemText>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemText>
                      <Link text={i.name} tooltip={i.name} placement={'bottom-start'}></Link>
                    </ListItemText>
                  </Grid>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={(identifier) => clickRemovedAsc(i.diagnosticPanelIdentifier)}>
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
                <ListItemText primary={t('commons.fields.descendants')} primaryTypographyProps={{ variant: 'h6', color: 'primary' }} />
                {!props.isDeleted && (
                  <ListItemSecondaryAction>
                    <IconButton edge="end" color="primary" onClick={props.clickAddDesc}>
                      <AddCircle />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {props.descendants.map((i: any) => (
                <>
                  {i.toDelete !== true && (
                    <ListItem className={classes.itemList} onClick={() => props.navegateTo(i.guid, true)}>
                      <Grid item xs={6}>
                        <ListItemText classes={{ root: classes.idList }}>
                          <Link text={i.diagnosticPanelIdentifier} tooltip={i.diagnosticPanelIdentifier} placement={'bottom-start'}></Link>
                        </ListItemText>
                      </Grid>
                      <Grid item xs={6}>
                        <ListItemText>
                          <Link text={i.name} tooltip={i.name} placement={'bottom-start'}></Link>
                        </ListItemText>
                      </Grid>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => clickRemovedDesc(i.diagnosticPanelIdentifier, i.parentIds)}>
                          <RemoveCircle />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
      <GaiaPopup open={openDelAsc} type="warningConfirm" message={messageDel} onAccept={continueDelAsc} onClose={closeDel} />
      <GaiaPopup open={openDelDesc} type="warningConfirm" message={messageDel} onAccept={continueDelDescRoot} onClose={closeDel} />
      <GaiaPopup open={openDelDescRemoveChild} type="warningTwoOptions" message={messageDel} onFirstAction={continueDelDescRoot} onSecondAction={continueDelDesc} onClose={closeDel} />
    </>
  );
};
const mapStateToProps = (state: IRootState) => ({
  loading: state.tabPanelDiagnostic.loading,
  panelIdentifier: state.tabPanelDiagnostic.diagnosticPanelGlobal.diagnosticPanelIdentifier,
  ascendants: state.tabPanelDiagnostic.diagnosticPanelGlobal.ascendants,
  descendants: state.tabPanelDiagnostic.diagnosticPanelGlobal.descendants
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(AscendantsDescendants);
