import SortDirection from '../commons/tableFilter/interfaces/SortDirection';
import { IPermission } from './permissions';

// Interfaces related to the component Example

export default interface IState {
  loading: boolean;
  excludeGroups: string[];
  excludeUsers: string[];
  groupData: IGroup | null;
  userPermissionData: IUserPermission | null;
}

// =====  USERGROUPS
export interface IGroup {
  groupId: string;
  name: string;
  description: string;
  permissions: IPermission[];
  users?: string[];
  permissionsNameList?: string[];
  guid: string;
}
export interface IFilterUsersGroups {
  permission?: string;
  searchText?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
}

export interface IDeleteForm {
  confirmation: string;
}

export interface IUserPermission {
  userId: string;
  userName?: string;
  permissionsNameList?: string[];
  groupsIdList?: string[];
  groupGuidList?: string[];
  permissions?: IPermission[];
  groupPermissions?: IGroup[];
}
export interface IFilterUsersPermissions {
  userId?: string;
  userName?: string;
  permission?: string;
  group?: string;
  search?: string;
  sortBy?: string;
  sortDirection?: SortDirection;
}
