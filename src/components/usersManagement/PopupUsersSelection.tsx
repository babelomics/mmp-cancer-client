import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Query } from 'material-table';
import { connect } from 'react-redux';

import GaiaTable, { ITableFilter } from '../commons/GaiaTable';
import IUsersManagement, { ITableData } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import { Dialog, DialogActions, makeStyles } from '@material-ui/core';
import GaiaButton from '../commons/GaiaButton';
import { IRootState } from '../../store';
import { operations } from './duck';

interface IProps {
  open?: boolean;
  buttonType?: number;
  //handleYes?: () => void;
  onClose?: () => void;
  openPopupParent?: any;
  setValueField?: (data: ITableData) => void;
  fetchUsers: (query: Query<any>, filters: ITableFilter, previousData: any, exclude: any) => Promise<any>;
  usersManagement: IUsersManagement;
  exclude: any;
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
    padding: '30px 10px 0 0',
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

export const PopupUsersSelection = ({ open = false, buttonType = 0, onClose, openPopupParent, setValueField, fetchUsers, usersManagement, exclude }: IProps) => {
  const classes = useStyles();
  const [openState, setOpen] = useState(open);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    if (openPopupParent) {
      openPopupParent(false);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={openState} classes={{ paper: classes.dialogPaper }}>
      <GaiaContainer title={t('usersManagement.title')} onBack={handleClose}>
        <GaiaTable
          showTitle={false}
          loading={usersManagement.loading}
          columns={[
            {
              title: t('commons.fields.identifier'),
              field: 'identifier',
              filtering: false
            },
            {
              title: t('commons.fields.firstName'),
              field: 'firstName',
              render: (rowData: ITableData) => `${rowData.firstName} ${rowData.lastName}`,
              filtering: false
            },
            {
              title: t('commons.fields.email'),
              field: 'email',
              filtering: false
            },
            {
              title: t('commons.fields.organization'),
              field: 'organization',
              filtering: false
            },
            {
              title: t('commons.fields.userType.title'),
              field: 'userType',
              hidden: true,
              filtering: false
            }
          ]}
          remoteData={fetchUsers}
          filtersMenu={false}
          exclude={exclude}
          defaulFilter={{ userType: 'Admin' }}
          onRowClick={(e, rowData) => {
            if (setValueField) {
              // setValueField(rowData.identifier, (rowData.firstName +' '+ rowData.lastName), rowData.email);
              setValueField(rowData);
            }
            handleClose();
          }}
        />
      </GaiaContainer>
      <DialogActions>
        {buttonType == 9 /*HIDDEN*/}
        {buttonType == 0 && <GaiaButton text={t('commons.buttons.accept')} onClick={handleClose} />}
        {buttonType == 1 && <GaiaButton text={t('commons.buttons.ok')} onClick={handleClose} />}
        {buttonType == 2 && (
          <>
            <GaiaButton text={t('commons.buttons.yes')} onClick={handleClose} />
            <GaiaButton text={t('commons.buttons.no')} onClick={handleClose} />
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
const mapStateToProps = (state: IRootState) => ({
  usersManagement: state.usersManagement
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(PopupUsersSelection);
