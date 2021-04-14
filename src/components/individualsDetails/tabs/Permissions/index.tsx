import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PermissionTabTable from './permissionTab-table/PermissionTabTable';
import PermissionTabFilterButtons from './permissionTab-filter-buttons/PermissionTabFilterButtons';
import PermissionDetailsPopup from './PermissionDetailsPopup';
import { IUserPermission } from '../../../permissionsAndUsers/interfaces';
import GaiaDeleteConfirmPopup from '../../../commons/GaiaDeleteConfirmPopup';

interface IProps {
  loading?: boolean;
  inddividualId: string;
  projectId: string;
  permissionsData: IUserPermission | null;
  exclude: string[];

  addPermission: (data: IUserPermission, projectId: string, t: any) => void;
  fetchIndividualPermissions: (individualId: string, projectId: string, userId: string, t: any) => void;
  setPermissionsData: (data: IUserPermission | null) => void;
  setExcludedUsers: (ids: string | string[]) => void;
  updatePermissions: (data: IUserPermission, projectId: string, individualId: string, t: any) => void;
  deletePermissions: (userId: string, projectId: string, individualId: string, t: any) => void;
}

const PermissionTabList = (props: IProps) => {
  const { t } = useTranslation();

  const [permissionDetailsPopup, setPermissionDetailsPopup] = useState<{
    open: boolean;
    mode: 'add' | 'edit';
    data: IUserPermission | null;
  }>({
    open: false,
    mode: 'add',
    data: null
  });

  const [openDeletePopup, setOpenDeletePopup] = useState<{
    open: boolean;
    data?: IUserPermission;
  }>({
    open: false
  });

  useEffect(() => {
    setPermissionDetailsPopup({ ...permissionDetailsPopup, data: props.permissionsData });
  }, [props.permissionsData]);

  const onRowClick = (data: IUserPermission) => {
    setPermissionDetailsPopup({ ...permissionDetailsPopup, open: true, mode: 'edit', data: { ...data, permissions: [] } });
  };

  const handleDelete = () => {
    if (openDeletePopup.data) {
      // props.deleteHPO(openDeletePopup.data.phenotypeId);
      props.deletePermissions(openDeletePopup.data.userId, props.projectId, props.inddividualId, t);
    }
    closeDeletePopup();
  };

  const closeDeletePopup = () => {
    setOpenDeletePopup({ ...openDeletePopup, open: false });
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" style={{ marginBottom: 20 }}>
        {t('individuals.permissions')}
      </Typography>
      <PermissionTabFilterButtons onAdd={() => setPermissionDetailsPopup({ ...permissionDetailsPopup, open: true, mode: 'add', data: null })} />
      <PermissionTabTable {...props} onRowClick={onRowClick} onDelete={(userPermissions: IUserPermission) => setOpenDeletePopup({ open: true, data: userPermissions })} />

      {/* Permissions details popup */}
      <PermissionDetailsPopup
        open={permissionDetailsPopup.open}
        individualId={props.inddividualId}
        projectId={props.projectId}
        data={permissionDetailsPopup.data}
        loading={props.loading}
        fetchIndividualPermissions={props.fetchIndividualPermissions}
        onClose={() => setPermissionDetailsPopup({ ...permissionDetailsPopup, open: false, mode: 'add' })}
        addPermission={props.addPermission}
        setPermissionsData={props.setPermissionsData}
        setExcludedUsers={props.setExcludedUsers}
        exclude={props.exclude}
        mode={permissionDetailsPopup.mode}
        updatePermissions={props.updatePermissions}
        deletePermissions={props.deletePermissions}
      />

      {/* Delete Permissions Popup */}
      <GaiaDeleteConfirmPopup
        open={openDeletePopup.open}
        message={t('individuals.deletePopupDescription')}
        title={t('individuals.permissionsDetails.deleteTitle')}
        onClose={closeDeletePopup}
        onAccept={handleDelete}
      />
    </React.Fragment>
  );
};

export default PermissionTabList;
