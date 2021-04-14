import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaModalFormik from '../../../commons/GaiaModalFormik';
import { IUserPermission, IFilterUsersPermissions, IDeleteForm } from '../../interfaces';
import AssociatedGroupsFilterButtons from './associated-filter-buttons/AssociatedGroupsFilterButtons';
import AssociatedGroupsTable from './associated-table/AssociatedGroupsTable';
import GaiaTextField from '../../../commons/GaiaTextField';
import { useFormik } from 'formik';
import { deleteSchema } from '../../validationSchema';

interface IProps {
  projectId: string;
  projectDeleted: boolean;
  onAdd: () => void;
  deleteUserGroup: (identifier: string, userId: string, t: any) => void;
  handleRowClick: (userPermission: IUserPermission) => void;
}

const defaultGroupFilter = {} as IFilterUsersPermissions;

const AssociatedGroupsList = (props: IProps) => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState<IFilterUsersPermissions>(defaultGroupFilter);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [userIdState, setUserIdState] = useState<string>('');

  const handleDelete = (associated: IUserPermission) => {
    setOpenDeleteModal(true);
    setUserIdState(associated.userId);
  };

  const doDelete = () => {
    props.deleteUserGroup(props.projectId, userIdState, t);
  };

  const deleteFormik = useFormik<IDeleteForm>({
    initialValues: { confirmation: '' },
    enableReinitialize: true,
    validationSchema: deleteSchema(t),
    onSubmit: () => {
      setOpenDeleteModal(false);
      deleteFormik.resetForm();
      doDelete();
    }
  });

  return (
    <React.Fragment>
      <AssociatedGroupsFilterButtons filter={filter} setFilter={setFilter} onAdd={props.onAdd} projectDeleted={props.projectDeleted} />
      <AssociatedGroupsTable filter={filter} setFilter={setFilter} {...props} onDelete={handleDelete} />

      {/* Confirm Delete Panel Modal */}
      <GaiaModalFormik
        open={openDeleteModal}
        title={t('permissionsAndUsers.delete.titleAssociated')}
        formik={deleteFormik}
        onClose={() => {
          setOpenDeleteModal(false);
        }}
      >
        <Typography variant="body1">{t('permissionsAndUsers.delete.descriptionAssociated')}</Typography>
        <GaiaTextField required name="confirmation" label={t('commons.fields.confirmation')} formik={deleteFormik} fullWidth />
      </GaiaModalFormik>
    </React.Fragment>
  );
};

export default AssociatedGroupsList;
