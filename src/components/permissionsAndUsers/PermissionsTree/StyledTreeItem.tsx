import React from 'react';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { IPermission } from '../permissions';
import { Checkbox } from '@material-ui/core';

type IProps = TreeItemProps & {
  permissions: IPermission[];
  entity?: string;
  action?: string;
  checked?: boolean;
  hasChildren?: boolean;
  children?: any;
  onPermissionChange?: (permissions: IPermission[]) => void;
  handlePermissionCheck?: (checked: boolean, arr: IPermission[], action?: string, entity?: string, saveState?: boolean) => IPermission[];
};

const StyledTreeItem = (props: IProps) => {
  const isChecked = () => {
    const entity = props.entity;
    const action = props.action;

    if (entity && action) {
      return props.permissions.find((p) => p.action === action && p.entityType === entity && p.action)?.checked ?? false;
    }

    return false;
  };

  const isDisabled = () => {
    const entity = props.entity;
    const action = props.action;

    if (action && entity) {
      //Check if permission come from group permissions or is disabled
      const foundGroupPerm = props.permissions.find((p) => p.entityType === entity && p.action === action && (p.isGroupPermission || p.isDisabled));
      if (foundGroupPerm) {
        return true;
      }

      // Check project checked action index
      let projectActionIndex = props.permissions.filter((p) => p.entityType === 'project').findIndex((p) => p.checked);
      if (projectActionIndex === 2) {
        projectActionIndex++;
      }
      const filtered = props.permissions.filter((p) => p.entityType === entity && p.action);
      const entityActionIndex = filtered.findIndex((p) => p.checked);
      const currentIndex = filtered.findIndex((p) => p.action === action);

      if (projectActionIndex > -1) {
        if (entity === 'permissions') {
          return projectActionIndex === 0; // Index === 0 => Delete project
        }

        return entity === 'project' ? currentIndex > projectActionIndex : currentIndex > entityActionIndex || currentIndex === projectActionIndex;
      }
      return currentIndex > entityActionIndex && entityActionIndex > -1;
    }

    return false;
  };

  const handleChange = (checked: boolean) => {
    if (props.handlePermissionCheck) {
      props.handlePermissionCheck(checked, props.permissions, props.action, props.entity, true);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {!props.hasChildren && (
        <Checkbox
          color="primary"
          checked={isChecked()}
          onChange={(e, checked) => handleChange(checked)}
          style={{ marginLeft: '-12px' }}
          disabled={isDisabled()}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      )}
      <TreeItem {...props} />
    </div>
  );
};

export default StyledTreeItem;
