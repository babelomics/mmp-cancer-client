export interface IPermission {
  action: string;
  entityType: string;
  entityId: string;
  checked?: boolean;
  name?: string;
  isGroupPermission?: boolean;
  isDisabled?: boolean;
  [key: string]: any;
}

export const P_PROJECT_KEYWORD = 'project';
export const P_ANALYSES_KEYWORD = 'analyses';
export const P_SAMPLES_KEYWORD = 'samples';
export const P_INDIVIDUALS_KEYWORD = 'individuals';
export const P_DRUGS_KEYWORD = 'drugs';
export const P_DIAGNOSTIC_PANELS_KEYWORD = 'diagnostic-panels';
export const P_PERMISSIONS_KEYWORD = 'permissions';

export const P_INDIRECT_INDIVIDUAL = 'individual';
export const P_INDIRECT_PROJECT = 'projects';

// Permissions Actions constants
export const P_DELETE_ACTION_KEYWORD = 'delete';
export const P_UPDATE_ACTION_KEYWORD = 'update';
export const P_CREATE_ACTION_KEYWORD = 'create';
export const P_READ_ACTION_KEYWORD = 'read';

export const permissionsList = [
  {
    action: P_DELETE_ACTION_KEYWORD,
    entityType: P_PROJECT_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_UPDATE_ACTION_KEYWORD,
    entityType: P_PROJECT_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    // Dummy Permission - Do not delete
    action: '',
    entityType: P_PROJECT_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_READ_ACTION_KEYWORD,
    entityType: P_PROJECT_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_DELETE_ACTION_KEYWORD,
    entityType: P_ANALYSES_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_UPDATE_ACTION_KEYWORD,
    entityType: P_ANALYSES_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_CREATE_ACTION_KEYWORD,
    entityType: P_ANALYSES_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_READ_ACTION_KEYWORD,
    entityType: P_ANALYSES_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_DELETE_ACTION_KEYWORD,
    entityType: P_SAMPLES_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_UPDATE_ACTION_KEYWORD,
    entityType: P_SAMPLES_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_CREATE_ACTION_KEYWORD,
    entityType: P_SAMPLES_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_READ_ACTION_KEYWORD,
    entityType: P_SAMPLES_KEYWORD,
    entityId: '',
    checked: false
  },

  {
    action: P_DELETE_ACTION_KEYWORD,
    entityType: P_INDIVIDUALS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_UPDATE_ACTION_KEYWORD,
    entityType: P_INDIVIDUALS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_CREATE_ACTION_KEYWORD,
    entityType: P_INDIVIDUALS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_READ_ACTION_KEYWORD,
    entityType: P_INDIVIDUALS_KEYWORD,
    entityId: '',
    checked: false
  },

  {
    action: P_DELETE_ACTION_KEYWORD,
    entityType: P_DRUGS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_UPDATE_ACTION_KEYWORD,
    entityType: P_DRUGS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_CREATE_ACTION_KEYWORD,
    entityType: P_DRUGS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_READ_ACTION_KEYWORD,
    entityType: P_DRUGS_KEYWORD,
    entityId: '',
    checked: false
  },

  {
    action: P_DELETE_ACTION_KEYWORD,
    entityType: P_DIAGNOSTIC_PANELS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_UPDATE_ACTION_KEYWORD,
    entityType: P_DIAGNOSTIC_PANELS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_CREATE_ACTION_KEYWORD,
    entityType: P_DIAGNOSTIC_PANELS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_READ_ACTION_KEYWORD,
    entityType: P_DIAGNOSTIC_PANELS_KEYWORD,
    entityId: '',
    checked: false
  },
  {
    action: P_UPDATE_ACTION_KEYWORD,
    entityType: P_PERMISSIONS_KEYWORD,
    entityId: '',
    checked: false
  }
];

// Indirect permissions
export const indirectPermissionsList = [
  {
    action: P_DELETE_ACTION_KEYWORD,
    entityType: P_INDIRECT_INDIVIDUAL,
    entityId: '',
    checked: false
  },
  {
    action: P_UPDATE_ACTION_KEYWORD,
    entityType: P_INDIRECT_INDIVIDUAL,
    entityId: '',
    checked: false
  },
  {
    action: P_READ_ACTION_KEYWORD,
    entityType: P_INDIRECT_INDIVIDUAL,
    entityId: '',
    checked: false
  }
];
