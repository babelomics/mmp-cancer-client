import { Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaModalFormik from '../../../commons/GaiaModalFormik';
import GaiaPopup from '../../../commons/GaiaPopup';
import GaiaTextField from '../../../commons/GaiaTextField';
import { IGroup, IFilterUsersGroups, IDeleteForm } from '../../interfaces';
import { deleteSchema } from '../../validationSchema';
import UsersGroupsFilterButtons from './usersGroups-filter-buttons/UsersGroupsFilterButtons';
import UsersGroupsTable from './usersGroups-table/UsersGroupsTable';

interface IProps {
  excludeGroups: string[];
  projectId: string;
  projectDeleted: boolean;
  onAdd: () => void;
  deleteGroups: (guid: string, option: string, t: any) => void;
  handleRowClick: (group: IGroup) => void;
}

const defaultGroupFilter = {} as IFilterUsersGroups;

const UsersGroupsList = (props: IProps) => {
  const { t } = useTranslation();

  const [filter, setFilter] = useState<IFilterUsersGroups>(defaultGroupFilter);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openGroupWarning, setOpenGroupWarning] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<IGroup>();

  const handleDelete = (group: IGroup) => {
    setOpenDeleteModal(true);
    setSelectedGroup(group);
  };

  const deleteFormik = useFormik<IDeleteForm>({
    initialValues: { confirmation: '' },
    enableReinitialize: true,
    validationSchema: deleteSchema(t),
    onSubmit: () => {
      setOpenDeleteModal(false);
      setOpenGroupWarning(true);
      deleteFormik.resetForm();
    }
  });

  const doDelete = (option: string) => {
    setOpenGroupWarning(false);
    if (selectedGroup) {
      props.deleteGroups(selectedGroup.guid, option, t);
    }
  };

  return (
    <React.Fragment>
      {/* Confirm Delete Group Modal */}
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

      {/* Delete Group Modal */}
      <GaiaPopup
        open={openGroupWarning}
        type="warningTwoOptions"
        preFormatText={true}
        message={`${t('permissionsAndUsers.messages.chooseDeletion')}
        \n • ${t('permissionsAndUsers.messages.deleteOption1')}
        \n • ${t('permissionsAndUsers.messages.deleteOption2')}
        \n • ${t('permissionsAndUsers.messages.deleteOption3')}`}
        textFirst={t('permissionsAndUsers.buttonOp1')}
        textSecond={t('permissionsAndUsers.buttonOp2')}
        textThird={t('permissionsAndUsers.buttonOp3')}
        onFirstAction={() => doDelete('op1')}
        onSecondAction={() => doDelete('op2')}
        onThirdAction={() => doDelete('op3')}
        onClose={() => {
          setOpenGroupWarning(false);
        }}
      />

      <UsersGroupsFilterButtons filter={filter} setFilter={setFilter} onAdd={props.onAdd} projectDeleted={props.projectDeleted} />
      <UsersGroupsTable
        filter={filter}
        setFilter={setFilter}
        {...props}
        onDelete={handleDelete}
        excludeGroups={props.excludeGroups}
        projectId={props.projectId}
        handleRowClick={props.handleRowClick}
      />
    </React.Fragment>
  );
};

export default UsersGroupsList;
