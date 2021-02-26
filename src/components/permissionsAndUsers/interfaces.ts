import SortDirection from '../commons/tableFilter/interfaces/SortDirection';

// Interfaces related to the component Example

export default interface IState {
  loading: boolean;
}

interface IDynamic {
  [key: string]: string | boolean | undefined;
}

// =====  USERGROUPS
export type IGroup = IDynamic & {
  groupId: string;
  name: string;
  description: string;
  permission: IPermissions[];
  users: string[];
  permissionsNameList: string[];
};
// ======= PERMISSIONS

export type IPermissions = IDynamic & {
  name: string;
  action: string;
  entity_type: string;
  entity_id: string;
};

export type IFilterUsersGroups = IDynamic & {
  permission?: string;
  searchText?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
};
export type IPermissionUsersGroups = IDynamic & {
  action: string;
  entity_type: string;
  entity_id: string;
};
