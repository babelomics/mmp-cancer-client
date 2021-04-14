import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaModalFormik from '../../../commons/GaiaModalFormik';
import { IUserPermission, IFilterUsersPermissions, IDeleteForm } from '../../interfaces';
import SpecificsPermissionsFilterButtons from './specifics-filter-buttons/SpecificsPermissionsFilterButtons';
import SpecificsPermissionsTable from './specifics-table/SpecificsPermissionsTable';
import GaiaTextField from '../../../commons/GaiaTextField';
import { useFormik } from 'formik';
import { deleteSchema } from '../../validationSchema';
import GaiaPopup from '../../../commons/GaiaPopup';
import routes from '../../../router/routes';
import { useHistory } from 'react-router';

interface IProps {
  projectId: string;
  projectDeleted: boolean;

  onAdd: () => void;
  deleteUserGroup: (identifier: string, userId: string, t: any) => void;
}

const defaultGroupFilter = {} as IFilterUsersPermissions;

const SpecificsPermissionsList = (props: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [filter, setFilter] = useState<IFilterUsersPermissions>(defaultGroupFilter);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openGroupWarning, setOpenGroupWarning] = useState<boolean>(false);
  const [userIdState, setUserIdState] = useState<string>('');

  const handleDelete = (associated: IUserPermission) => {
    setOpenDeleteModal(true);
    setUserIdState(associated.userId);
  };

  const deleteFormik = useFormik<IDeleteForm>({
    initialValues: { confirmation: '' },
    enableReinitialize: true,
    validationSchema: deleteSchema(t),
    onSubmit: () => {
      setOpenDeleteModal(false);
      deleteFormik.resetForm();
      setOpenGroupWarning(true);
    }
  });

  const doDelete = () => {
    setOpenGroupWarning(false);
    props.deleteUserGroup(props.projectId, userIdState, t);
  };

  const navegateTo = (individualId: string, projectId: string, tab: string) => {
    history.push(`${routes.PATH_INDIVIDUALS_DETAILS}/${projectId}/${individualId}/${tab}`);
  };

  return (
    <React.Fragment>
      <SpecificsPermissionsFilterButtons filter={filter} setFilter={setFilter} onAdd={props.onAdd} projectDeleted={props.projectDeleted} />
      <SpecificsPermissionsTable filter={filter} setFilter={setFilter} {...props} onDelete={handleDelete} projectId={props.projectId} projectDeleted={props.projectDeleted} navegateTo={navegateTo} />

      {/* Confirm Delete User permissions Modal */}
      <GaiaModalFormik
        open={openDeleteModal}
        title={t('permissionsAndUsers.delete.title')}
        formik={deleteFormik}
        onClose={() => {
          setOpenDeleteModal(false);
        }}
      >
        <Typography variant="body1">{t('permissionsAndUsers.delete.description')}</Typography>
        <GaiaTextField required name="confirmation" label={t('commons.fields.confirmation')} formik={deleteFormik} fullWidth />
      </GaiaModalFormik>

      {/* Delete User permissions Modal */}
      <GaiaPopup
        open={openGroupWarning}
        type="warningTwoOptions"
        preFormatText={true}
        message={`${t('permissionsAndUsers.messages.chooseDeletion')}`}
        textFirst={t('permissionsAndUsers.buttonOp1')}
        onFirstAction={() => doDelete()}
        onClose={() => {
          setOpenGroupWarning(false);
        }}
      />
    </React.Fragment>
  );
};

export default SpecificsPermissionsList;
