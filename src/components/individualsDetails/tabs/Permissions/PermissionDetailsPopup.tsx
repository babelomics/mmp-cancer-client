import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import GaiaModalFormik from '../../../commons/GaiaModalFormik';
import GaiaTextField from '../../../commons/GaiaTextField';
import PopupUsersSelection from '../../../commons/popupsComponents/selectUserPopup/PopupUsersSelection';
import { IUserPermission } from '../../../permissionsAndUsers/interfaces';
import { IPermission, P_DELETE_ACTION_KEYWORD, P_INDIRECT_INDIVIDUAL, P_INDIVIDUALS_KEYWORD, P_READ_ACTION_KEYWORD, P_UPDATE_ACTION_KEYWORD } from '../../../permissionsAndUsers/permissions';
import GaiaButton from '../../../commons/GaiaButton';
import PermissionsTree from '../../../permissionsAndUsers/PermissionsTree';
import { usersPermissionsValidationSchema } from '../../../permissionsAndUsers/validationSchema';
import GaiaLoading from '../../../commons/GaiaLoading';
import { permissionsContains } from '../../../../utils/permissionsUtils';
import GaiaPopup from '../../../commons/GaiaPopup';

interface IProps {
  loading?: boolean;
  open: boolean;
  individualId: string;
  projectId: string;
  mode: 'add' | 'edit';
  data?: IUserPermission | null;
  exclude?: string[];

  onClose?: () => void;
  addPermission: (data: IUserPermission, projectId: string, t: any) => void;
  fetchIndividualPermissions: (individualId: string, projectId: string, userId: string, t: any) => void;
  setPermissionsData: (data: IUserPermission | null) => void;
  setExcludedUsers: (ids: string | string[]) => void;
  updatePermissions: (data: IUserPermission, projectId: string, individualId: string, t: any) => void;
  deletePermissions: (userId: string, projectId: string, individualId: string, t: any) => void;
}

interface IForm {
  identifier: string;
  name: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10
  },
  row: {
    marginBottom: 10
  },
  label: {
    marginRight: 10
  }
}));

const PermissionDetailsPopup = (props: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [openState, setOpen] = useState<boolean>(props.open);
  const [openSelectUserPopup, setOpenSelectUserPopup] = useState<boolean>(false);
  const [openConfirmPopup, setOpenConfirmPopup] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<IPermission[] | undefined>([]);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  // Load user permission on edit
  useEffect(() => {
    if (props.mode === 'edit' && props.data) {
      props.fetchIndividualPermissions(props.individualId, props.projectId, props.data.userId, t);
    }
  }, [props.mode]);

  const checkAndUpdatePermissions = (arr: IPermission[], projectId: string, action: string, entityType: string, entityId: string, auxEntityType: string) => {
    let copyArr = arr.slice(0);

    if (permissionsContains(arr, action, entityType, projectId)) {
      if (!permissionsContains(arr, action, auxEntityType, entityId)) {
        copyArr = copyArr?.concat({ action: action, entityType: auxEntityType, entityId: entityId, checked: true, isDisabled: true, isDirectPermission: true });
      } else {
        copyArr = copyArr?.map((x) => {
          if (x.action === action && x.entityId === entityId && x.entityType === auxEntityType) {
            return { ...x, isDisabled: true };
          }
          return { ...x };
        });
      }
    }

    return copyArr;
  };

  useEffect(() => {
    if (props.data) {
      let permissions = props.data?.permissions?.map((p) => {
        p.checked = true;
        return p;
      });

      permissions = checkAndUpdatePermissions(permissions ?? [], props.projectId, P_DELETE_ACTION_KEYWORD, P_INDIVIDUALS_KEYWORD, props.individualId, P_INDIRECT_INDIVIDUAL);
      permissions = checkAndUpdatePermissions(permissions ?? [], props.projectId, P_UPDATE_ACTION_KEYWORD, P_INDIVIDUALS_KEYWORD, props.individualId, P_INDIRECT_INDIVIDUAL);
      permissions = checkAndUpdatePermissions(permissions ?? [], props.projectId, P_READ_ACTION_KEYWORD, P_INDIVIDUALS_KEYWORD, props.individualId, P_INDIRECT_INDIVIDUAL);

      // Filter permissions to remove other permissions
      permissions = permissions?.filter((x) => x.entityType === P_INDIRECT_INDIVIDUAL && x.entityId === props.individualId);

      setPermissions(permissions);
    } else {
      resetForm();
    }
  }, [props.data]);

  const handleClose = () => {
    setOpen(false);

    if (props.onClose) {
      props.onClose();
    }

    props.setPermissionsData(null);
  };

  const formik = useFormik<IForm>({
    initialValues: {
      identifier: props.data?.userId ?? '',
      name: props.data?.userName ?? ''
    },
    enableReinitialize: true,
    validationSchema: usersPermissionsValidationSchema(t),
    onSubmit: (values) => {
      const data = {
        userId: values.identifier,
        userName: values.name,
        permissions: permissions
          ?.filter((p) => p.action && p.checked)
          .map((p) => {
            const copy = { ...p };
            copy.entityId = props.individualId;
            delete copy.checked;
            delete copy.isGroupPermission;
            delete copy.isDisabled;
            return copy;
          })
      } as IUserPermission;

      const notDirectPermissionsList = data.permissions?.filter((p) => !p.isDirectPermission);
      let canSubmitForm = false;

      if (notDirectPermissionsList) {
        canSubmitForm = notDirectPermissionsList.length > 0;
      }

      if (props.mode === 'add') {
        if (canSubmitForm) {
          props.addPermission(data, props.projectId, t);
        }
      } else {
        if (!canSubmitForm) {
          setOpenConfirmPopup(true);
        } else {
          props.updatePermissions(data, props.projectId, props.individualId, t);
        }
      }
    }
  });

  const resetForm = () => {
    formik.resetForm();
    setPermissions([]);
  };

  const doDeletePermissions = () => {
    props.deletePermissions(formik.values.identifier, props.projectId, props.individualId, t);
  };

  return (
    <GaiaModalFormik title={t('individuals.permissionsDetails.title')} formik={formik} open={openState} fullWidth maxWidth="md" onClose={handleClose}>
      {/* Remove all permissions confirm popup */}
      <GaiaPopup open={openConfirmPopup} type="info" message={t('individuals.permissionsDetails.removeAllText')} onAccept={doDeletePermissions} onClose={() => setOpenConfirmPopup(false)} />

      <Grid container className={classes.container} style={props.loading ? { padding: 50 } : undefined}>
        {/* User Selection Popup */}
        <PopupUsersSelection
          titlePopup={t('permissionsAndUsers.associatedUsers.selectUserPopupTitle')}
          open={openSelectUserPopup}
          openPopupParent={setOpenSelectUserPopup}
          setValueField={(selectedUser: any) => {
            formik.setFieldValue('identifier', selectedUser.identifier);
            formik.setFieldValue('name', `${selectedUser.firstName} ${selectedUser.lastName}`);
            formik.validateForm({ ...formik.values, identifier: selectedUser.identifier, name: `${selectedUser.firstName} ${selectedUser.lastName}` });
            props.fetchIndividualPermissions(props.individualId, props.projectId, selectedUser.identifier, t);
          }}
          exclude={props.exclude}
          showUsersOnly
        />

        {props.loading ? (
          <GaiaLoading />
        ) : (
          <React.Fragment>
            <Grid container spacing={3} className={classes.row}>
              {/* Identifier */}
              <Grid container item xs={1} justify="flex-end" alignItems="center">
                {t('commons.fields.identifier')}
              </Grid>
              <Grid item xs={3}>
                <GaiaTextField name="identifier" formik={formik} disabled />
              </Grid>

              {/* Name */}
              <Grid container item xs={1} justify="flex-end" alignItems="center">
                {t('commons.fields.name')}
              </Grid>
              <Grid item xs={3}>
                <GaiaTextField name="name" formik={formik} disabled />
              </Grid>

              {/* Select user button */}
              {props.mode === 'add' && (
                <Grid container item xs={3} alignItems="center">
                  <GaiaButton text={t('commons.buttons.selectUser')} onClick={() => setOpenSelectUserPopup(true)} />
                </Grid>
              )}
            </Grid>

            <div style={{ marginTop: 25 }}>
              <Typography color="primary" variant="body2">
                {t('permissionsAndUsers.permissionsLabel')}
              </Typography>
              <PermissionsTree
                projectId={props.projectId}
                onChange={(permissionsData: IPermission[]) => setPermissions(permissionsData)}
                permissions={permissions}
                showIndirectPermissionsOnly // required
                showIndirectIndividualPermissionsOnly
              />
            </div>
          </React.Fragment>
        )}
      </Grid>
    </GaiaModalFormik>
  );
};

export default PermissionDetailsPopup;
