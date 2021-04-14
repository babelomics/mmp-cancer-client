import { ITokenData } from '../components/login/interfaces';
import { IPermission } from '../components/permissionsAndUsers/permissions';

export const userCanDelete = (user: ITokenData, entityType: string, entityId: string): boolean =>
  (user.permissions?.includes(`delete-${entityType}-${entityId}`) || user.permissions?.includes(`delete-${entityType}-undefined`) || user.userType === 'Admin') ?? false;
export const userCanUpdate = (user: ITokenData, entityType: string, entityId: string): boolean =>
  (user.permissions?.includes(`update-${entityType}-${entityId}`) || user.permissions?.includes(`update-${entityType}-undefined`) || user.userType === 'Admin') ?? false;
export const userCanCreate = (user: ITokenData, entityType: string, entityId: string): boolean =>
  (user.permissions?.includes(`create-${entityType}-${entityId}`) || user.permissions?.includes(`create-${entityType}-undefined`) || user.userType === 'Admin') ?? false;
export const userCanRead = (user: ITokenData, entityType: string, entityId: string): boolean =>
  (user.permissions?.includes(`read-${entityType}-${entityId}`) || user.permissions?.includes(`read-${entityType}-undefined`) || user.userType === 'Admin') ?? false;

export const userCanReadMultiple = (user: ITokenData, arr: string[], entityId: string, operator?: 'AND' | 'OR'): boolean => {
  let canRead = false;

  arr.forEach((entity: string) => {
    if (operator === 'AND') {
      canRead = canRead && userCanRead(user, entity, entityId);
    } else {
      canRead = canRead || userCanRead(user, entity, entityId);
    }
  });

  return canRead;
};

export const permissionsContains = (permissionsList: IPermission[], action: string, entityType: string, entityId: string): boolean => {
  const found = permissionsList.find((x) => x.entityType === entityType && x.entityId === entityId && x.action === action);
  if (found) return true;
  return false;
};
