import React, { useState } from 'react';
import { IGroup, IFilterUsersGroups } from '../../interfaces';
import UsersGroupsFilterButtons from './usersGroups-filter-buttons/UsersGroupsFilterButtons';
import UsersGroupsTable from './usersGroups-table/UsersGroupsTable';

interface IProps {
  groupId: string;
  name: string;
  description: string;
  permission: any[];
  users: string[];
  permissionsNameList: string[];
}

const defaultUserFilter = {} as IFilterUsersGroups;

const UsersGroupsList = (props: IProps) => {
  const [filter, setFilter] = useState<IFilterUsersGroups>(defaultUserFilter);

  const handleDelete = (groups: IGroup) => {
    // props.deleteGene(gene.prueba);
  };

  return (
    <React.Fragment>
      <UsersGroupsFilterButtons filter={filter} setFilter={setFilter} />
      <UsersGroupsTable filter={filter} setFilter={setFilter} {...props} onDelete={handleDelete} />
    </React.Fragment>
  );
};

export default UsersGroupsList;
