import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import GaiaModalFormik from '../../../commons/GaiaModalFormik';
import GaiaTextField from '../../../commons/GaiaTextField';
import { usersPermissionsValidationSchema } from '../../validationSchema';
import PermissionsTree from '../../PermissionsTree';
import { IPermission } from '../../permissions';
import { IGroup, IUserPermission } from '../../interfaces';
import GaiaButton from '../../../commons/GaiaButton';
import PopupUsersSelection from '../../../commons/popupsComponents/selectUserPopup/PopupUsersSelection';
import GroupSelectTable from './group-table/GroupTable';
import GaiaPopup from '../../../commons/GaiaPopup';

interface IProps {
  projectId: string;
  exclude: string[];
  open: boolean;
  data?: IUserPermission | null;
  onSubmit?: (data: IUserPermission) => void;
  onClose?: () => void;
}

interface IFormikForm {
  identifier: string;
  name: string;
}

const UsersPermissionsPopup = (props: IProps) => {
  const { t } = useTranslation();

  const [permissions, setPermissions] = useState<IPermission[] | undefined>([]);
  const [selectedGroups, setSelectedGroups] = useState<{
    arr: IGroup[];
    prev: IGroup[];
    itemClicked: IGroup | null;
    checked: boolean;
    openWarning: boolean;
    warningOpt: 'yes' | 'no' | 'cancel' | null;
  }>({
    arr: [],
    prev: [], // State for editing
    itemClicked: null,
    checked: false,
    openWarning: false,
    warningOpt: null
  });
  const [openSelectUserPopup, setOpenSelectUserPopup] = useState<boolean>(false);

  // Update permissions list based on selected groups
  useEffect(() => {
    let groupsPermissions = [] as IPermission[] | undefined;

    // Keep group permissions
    if (selectedGroups.warningOpt === 'yes' || selectedGroups.warningOpt === null) {
      groupsPermissions = selectedGroups.itemClicked?.permissions.map((p) => {
        const foundPerm = selectedGroups.arr.find((g) => g.permissions.find((gp) => gp.action === p.action && gp.entityType === p.entityType));
        if (!foundPerm) {
          return { ...p, checked: true, isGroupPermission: false };
        }
        return { ...p, checked: true, isGroupPermission: true };
      });
    } else if (selectedGroups.warningOpt === 'cancel') {
      groupsPermissions = selectedGroups.itemClicked?.permissions.map((p) => {
        return { ...p, checked: true };
      });
    } else {
      // Uncheck group permissions
      groupsPermissions = selectedGroups.itemClicked?.permissions.map((p) => {
        const foundPerm = selectedGroups.arr.find((g) => g.permissions.find((gp) => gp.action === p.action && gp.entityType === p.entityType));
        if (!foundPerm) {
          return { ...p, checked: false, isGroupPermission: false };
        }
        return { ...p, checked: true, isGroupPermission: true };
      });
    }

    let newPermissions = [] as IPermission[];

    if (permissions && permissions.length && groupsPermissions) {
      newPermissions = permissions.map((p) => {
        const found = groupsPermissions?.find((gP) => gP.entityType === p.entityType && gP.action === p.action);
        if (found) {
          return { ...found };
        }
        return p;
      });
    } else {
      newPermissions = groupsPermissions || [];
    }

    setPermissions(newPermissions);
  }, [selectedGroups]);

  // Load data from fetched data
  useEffect(() => {
    const groupPermissionsMap = props.data?.groupPermissions?.map((g) => g.permissions.map((gp) => ({ ...gp, isGroupPermission: true, checked: true }))).flat();
    let userPermissions = props.data?.permissions?.map((p) => {
      p.checked = true;
      return p;
    });

    // Mark selected groups
    if (props.data?.groupPermissions) {
      setSelectedGroups({
        ...selectedGroups,
        arr: props.data.groupPermissions,
        prev: props.data.groupPermissions.map((g) => {
          return { ...g, permissions: g.permissions.map((gp) => ({ ...gp, isGroupPermission: true })) };
        }),
        itemClicked: null,
        checked: false
      });
    }

    // Check Permissions
    if (userPermissions) {
      if (groupPermissionsMap) {
        userPermissions = userPermissions.map((p) => {
          const found = groupPermissionsMap.find((gp) => gp.entityType === p.entityType && gp.action === p.action);
          if (found) {
            return { ...found };
          }
          return p;
        });
        setPermissions(userPermissions);
      } else {
        setPermissions(userPermissions);
      }
    } else {
      setPermissions(groupPermissionsMap);
    }
  }, [props.data]);

  const formik = useFormik<IFormikForm>({
    initialValues: {
      identifier: props.data?.userId ?? '',
      name: props.data?.userName ?? ''
    },
    enableReinitialize: true,
    validationSchema: usersPermissionsValidationSchema(t),
    onSubmit: (values) => {
      const data = {
        userId: values.identifier,
        groupGuidList: selectedGroups.arr.map((g) => g.guid.toString()),
        permissions: permissions
          ?.filter((p) => p.action && p.checked)
          .map((p) => {
            const copy = { ...p };
            copy.entityId = props.projectId;
            delete copy.checked;
            delete copy.isGroupPermission;
            delete copy.isDisabled;
            return copy;
          })
      } as IUserPermission;

      if (props.onSubmit) {
        props.onSubmit(data);
      }
      handleClose();
    }
  });

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  const changeGroupSelection = (selectedItems: any[], item?: IGroup, checked?: boolean) => {
    const prevFound = selectedGroups.prev.find((g) => g.groupId === item?.groupId);

    if (props.data && prevFound && !checked) {
      setSelectedGroups({
        ...selectedGroups,
        arr: selectedItems,
        openWarning: true,
        itemClicked: prevFound || null
      });
    } else {
      setSelectedGroups({
        ...selectedGroups,
        arr: selectedItems,
        itemClicked: item || null,
        checked: checked || false
      });
    }
  };

  return (
    <GaiaModalFormik id="usersPermissions" open={props.open} title={t('permissionsAndUsers.associatedUsers.popupTitle')} formik={formik} onClose={handleClose}>
      {/* User Selection Popup */}
      <PopupUsersSelection
        titlePopup={t('permissionsAndUsers.associatedUsers.selectUserPopupTitle')}
        open={openSelectUserPopup}
        openPopupParent={setOpenSelectUserPopup}
        setValueField={(selectedUser) => {
          formik.setFieldValue('identifier', selectedUser.identifier);
          formik.setFieldValue('name', `${selectedUser.firstName} ${selectedUser.lastName}`);
          formik.validateForm({ ...formik.values, identifier: selectedUser.identifier, name: `${selectedUser.firstName} ${selectedUser.lastName}` });
        }}
        exclude={props.exclude}
        showUsersOnly
      />

      {/* Warning popup */}
      <GaiaPopup
        title={t('permissionsAndUsers.associatedUsers.warningPopup.title')}
        message={t('permissionsAndUsers.associatedUsers.warningPopup.message')}
        type="warningTwoOptions"
        open={selectedGroups.openWarning}
        textFirst={t('commons.buttons.yes')}
        onFirstAction={() => setSelectedGroups({ ...selectedGroups, warningOpt: 'yes', openWarning: false })}
        textSecond={t('commons.buttons.no')}
        onSecondAction={() => setSelectedGroups({ ...selectedGroups, warningOpt: 'no', openWarning: false })}
        onClose={() =>
          setSelectedGroups({
            ...selectedGroups,
            arr: selectedGroups.prev,
            openWarning: false,
            warningOpt: 'cancel'
          })
        }
      />

      <Grid container spacing={3}>
        <Grid item xs={props.data ? 6 : 4}>
          <GaiaTextField label={t('commons.fields.identifier')} name="identifier" formik={formik} disabled />
        </Grid>
        <Grid item xs={props.data ? 6 : 4}>
          <GaiaTextField label={t('commons.fields.name')} name="name" formik={formik} disabled />
        </Grid>
        {!props.data && (
          <Grid container item xs={4} alignItems="center">
            <GaiaButton text={t('commons.buttons.selectUser')} onClick={() => setOpenSelectUserPopup(true)} />
          </Grid>
        )}
      </Grid>
      <div style={{ marginTop: 25 }}>
        <Typography color="primary" variant="body2">
          {t('permissionsAndUsers.permissionsLabel')}
        </Typography>
        <PermissionsTree projectId={props.projectId} onChange={(permissionsData: IPermission[]) => setPermissions(permissionsData)} permissions={permissions} />
      </div>
      <div style={{ marginTop: 25 }}>
        <Typography color="primary" variant="body2">
          {t('permissionsAndUsers.groupsLabel')}
        </Typography>
        <GroupSelectTable projectId={props.projectId} selectedRows={selectedGroups.arr} setSelectedRows={changeGroupSelection} />
      </div>
    </GaiaModalFormik>
  );
};

export default UsersPermissionsPopup;
