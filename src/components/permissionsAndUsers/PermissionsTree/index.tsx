import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import TreeView from '@material-ui/lab/TreeView';
import _ from 'lodash';

import {
  IPermission,
  permissionsList,
  P_ANALYSES_KEYWORD,
  P_DIAGNOSTIC_PANELS_KEYWORD,
  P_DRUGS_KEYWORD,
  P_INDIVIDUALS_KEYWORD,
  P_PERMISSIONS_KEYWORD,
  P_PROJECT_KEYWORD,
  P_SAMPLES_KEYWORD,
  P_INDIRECT_INDIVIDUAL,
  indirectPermissionsList
} from '../permissions';
import StyledTreeItem from './StyledTreeItem';
import usePrevious from '../../../hooks/usePrevious';

interface IProps {
  projectId: string;
  permissions?: IPermission[];
  showIndirectPermissionsOnly?: boolean;
  showIndirectIndividualPermissionsOnly?: boolean;
  onChange?: (permissions: IPermission[]) => void;
}

const PermissionsTree = (props: IProps) => {
  const { t } = useTranslation();
  const [permissionsState, setPermissionsState] = useState<IPermission[]>(!props.showIndirectPermissionsOnly ? permissionsList : indirectPermissionsList);

  const prevPermissions = usePrevious(permissionsState);
  useEffect(() => {
    if (props.permissions && props.permissions.length && !_.isEqual(prevPermissions, props.permissions)) {
      let newPermissions = permissionsState.map((perm) => {
        const found = props.permissions?.find((p) => p.entityType === perm.entityType && p.action === perm.action);
        if (found) {
          return { ...found };
        }
        return { ...perm };
      });

      let perms = newPermissions.slice(0);

      newPermissions.forEach((p: IPermission) => {
        if (p.checked) {
          perms = handlePermissionCheck(p.checked || true, perms, p.action, p.entityType).slice(0);
        }
      });

      if (props.onChange) {
        props.onChange(perms);
      }

      setPermissionsState(perms);
    }
  }, [props.permissions]);

  const MinusSquare = (props: SvgIconProps) => {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  };

  const PlusSquare = (props: SvgIconProps) => {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        {/* tslint:disable-next-line: max-line-length */}
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  };

  const handlePermissionCheck = (checked: boolean, arr: IPermission[], action?: string, entity?: string, saveState?: boolean): IPermission[] => {
    if (action && entity) {
      let newPermissions = arr.map((p) => {
        if (p.action === action && p.entityType === entity) {
          const obj = { ...p };
          obj.checked = checked;
          return obj;
        }
        return p;
      });

      // Change permissions that depends of the project
      if (entity === P_PROJECT_KEYWORD) {
        // Check project checked action index
        const projectActionIndex = newPermissions.filter((p) => p.entityType === P_PROJECT_KEYWORD).findIndex((p) => p.checked);

        const project = checkPermissionsBassedOn(projectActionIndex, P_PROJECT_KEYWORD, newPermissions);
        const analyses = checkPermissionsBassedOn(projectActionIndex, P_ANALYSES_KEYWORD, newPermissions);
        const samples = checkPermissionsBassedOn(projectActionIndex, P_SAMPLES_KEYWORD, newPermissions);
        const individuals = checkPermissionsBassedOn(projectActionIndex, P_INDIVIDUALS_KEYWORD, newPermissions);
        const drugs = checkPermissionsBassedOn(projectActionIndex, P_DRUGS_KEYWORD, newPermissions);
        const panels = checkPermissionsBassedOn(projectActionIndex, P_DIAGNOSTIC_PANELS_KEYWORD, newPermissions);

        newPermissions = newPermissions.map((p) => {
          if (p.entityType === P_PERMISSIONS_KEYWORD && action === 'delete' && checked) {
            return { ...p, checked: true };
          }

          const projectFound = project.find((e) => e.entityType === p.entityType && e.action === p.action && e.action);
          const analysesFound = analyses.find((e) => e.entityType === p.entityType && e.action === p.action);
          const samplesFound = samples.find((e) => e.entityType === p.entityType && e.action === p.action);
          const individualsFound = individuals.find((e) => e.entityType === p.entityType && e.action === p.action);
          const drugsFound = drugs.find((e) => e.entityType === p.entityType && e.action === p.action);
          const panelsFound = panels.find((e) => e.entityType === p.entityType && e.action === p.action);

          if (checked && projectFound) {
            return { ...projectFound };
          }

          if (analysesFound) {
            return { ...analysesFound };
          }

          if (samplesFound) {
            return { ...samplesFound };
          }

          if (individualsFound) {
            return { ...individualsFound };
          }

          if (drugsFound) {
            return { ...drugsFound };
          }

          if (panelsFound) {
            return { ...panelsFound };
          }

          return p;
        });
      } else {
        const entityActionIndex = newPermissions.filter((p) => p.entityType === entity).findIndex((p) => p.checked);
        const entityPerm = checkPermissionsBassedOn(entityActionIndex, entity, newPermissions);

        newPermissions = newPermissions.map((p) => {
          const foundEntity = entityPerm.find((e) => e.entityType === p.entityType && e.action === p.action);
          if (checked && foundEntity) {
            return { ...foundEntity };
          }
          return p;
        });
      }

      if (saveState) {
        setPermissionsState(newPermissions);

        if (props.onChange) {
          props.onChange(newPermissions);
        }
      }

      return newPermissions;
    }

    return [];
  };

  const checkPermissionsBassedOn = (pIndex: number, entity: string, arr: IPermission[]): IPermission[] => {
    return arr
      .filter((p) => p.entityType === entity)
      .map((e, i) => {
        if (i >= pIndex && pIndex > -1) {
          const copy = { ...e };
          copy.checked = true;
          return copy;
        }
        return e;
      });
  };

  return (
    <TreeView defaultExpanded={['2', '6', '10', '15', '20', '25']} defaultCollapseIcon={<MinusSquare />} defaultExpandIcon={<PlusSquare />}>
      {!props.showIndirectPermissionsOnly ? (
        <React.Fragment>
          <StyledTreeItem
            nodeId="1"
            label={`${t('permissionsAndUsers.updateKeyword')} ${t('permissionsAndUsers.permissionsEntityKeyword').toLowerCase()}`}
            entity={P_PERMISSIONS_KEYWORD}
            action="update"
            permissions={permissionsState}
            handlePermissionCheck={handlePermissionCheck}
          />

          <StyledTreeItem nodeId="2" label={`${t('permissionsAndUsers.projectEntityKeyword')}`} permissions={permissionsState} hasChildren>
            <StyledTreeItem
              nodeId="3"
              label={`${t('permissionsAndUsers.deleteKeyword')} ${t('permissionsAndUsers.projectEntityKeyword').toLowerCase()}`}
              entity={P_PROJECT_KEYWORD}
              action="delete"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="4"
              label={`${t('permissionsAndUsers.updateKeyword')} ${t('permissionsAndUsers.projectEntityKeyword').toLowerCase()}`}
              entity={P_PROJECT_KEYWORD}
              action="update"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="5"
              label={`${t('permissionsAndUsers.readKeyword')} ${t('permissionsAndUsers.projectEntityKeyword').toLowerCase()}`}
              entity={P_PROJECT_KEYWORD}
              action="read"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
          </StyledTreeItem>

          <StyledTreeItem nodeId="6" label={`${t('permissionsAndUsers.analysesEntityKeyword')}`} permissions={permissionsState} hasChildren>
            <StyledTreeItem
              nodeId="7"
              label={`${t('permissionsAndUsers.deleteKeyword')} ${t('permissionsAndUsers.analysesEntityKeyword').toLowerCase()}`}
              entity={P_ANALYSES_KEYWORD}
              action="delete"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="8"
              label={`${t('permissionsAndUsers.updateKeyword')} ${t('permissionsAndUsers.analysesEntityKeyword').toLowerCase()}`}
              entity={P_ANALYSES_KEYWORD}
              action="update"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="8"
              label={`${t('permissionsAndUsers.createKeyword')} ${t('permissionsAndUsers.analysesEntityKeyword').toLowerCase()}`}
              entity={P_ANALYSES_KEYWORD}
              action="create"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="9"
              label={`${t('permissionsAndUsers.readKeyword')} ${t('permissionsAndUsers.analysesEntityKeyword').toLowerCase()}`}
              entity={P_ANALYSES_KEYWORD}
              action="read"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
          </StyledTreeItem>

          <StyledTreeItem nodeId="10" label={`${t('permissionsAndUsers.samplesEntityKeyword')}`} permissions={permissionsState} hasChildren>
            <StyledTreeItem
              nodeId="11"
              label={`${t('permissionsAndUsers.deleteKeyword')} ${t('permissionsAndUsers.samplesEntityKeyword').toLowerCase()}`}
              entity={P_SAMPLES_KEYWORD}
              action="delete"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="12"
              label={`${t('permissionsAndUsers.updateKeyword')} ${t('permissionsAndUsers.samplesEntityKeyword').toLowerCase()}`}
              entity={P_SAMPLES_KEYWORD}
              action="update"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="13"
              label={`${t('permissionsAndUsers.createKeyword')} ${t('permissionsAndUsers.samplesEntityKeyword').toLowerCase()}`}
              entity={P_SAMPLES_KEYWORD}
              action="create"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="14"
              label={`${t('permissionsAndUsers.readKeyword')} ${t('permissionsAndUsers.samplesEntityKeyword').toLowerCase()}`}
              entity={P_SAMPLES_KEYWORD}
              action="read"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
          </StyledTreeItem>

          <StyledTreeItem nodeId="15" label={`${t('permissionsAndUsers.individualsEntityKeyword')}`} permissions={permissionsState} hasChildren>
            <StyledTreeItem
              nodeId="16"
              label={`${t('permissionsAndUsers.deleteKeyword')} ${t('permissionsAndUsers.individualsEntityKeyword').toLowerCase()}`}
              entity={P_INDIVIDUALS_KEYWORD}
              action="delete"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="17"
              label={`${t('permissionsAndUsers.updateKeyword')} ${t('permissionsAndUsers.individualsEntityKeyword').toLowerCase()}`}
              entity={P_INDIVIDUALS_KEYWORD}
              action="update"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="18"
              label={`${t('permissionsAndUsers.createKeyword')} ${t('permissionsAndUsers.individualsEntityKeyword').toLowerCase()}`}
              entity={P_INDIVIDUALS_KEYWORD}
              action="create"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="19"
              label={`${t('permissionsAndUsers.readKeyword')} ${t('permissionsAndUsers.individualsEntityKeyword').toLowerCase()}`}
              entity={P_INDIVIDUALS_KEYWORD}
              action="read"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
          </StyledTreeItem>

          <StyledTreeItem nodeId="20" label={`${t('permissionsAndUsers.drugsEntityKeyword')}`} permissions={permissionsState} hasChildren>
            <StyledTreeItem
              nodeId="21"
              label={`${t('permissionsAndUsers.deleteKeyword')} ${t('permissionsAndUsers.drugsEntityKeyword').toLowerCase()}`}
              entity={P_DRUGS_KEYWORD}
              action="delete"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="22"
              label={`${t('permissionsAndUsers.updateKeyword')} ${t('permissionsAndUsers.drugsEntityKeyword').toLowerCase()}`}
              entity={P_DRUGS_KEYWORD}
              action="update"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="23"
              label={`${t('permissionsAndUsers.createKeyword')} ${t('permissionsAndUsers.drugsEntityKeyword').toLowerCase()}`}
              entity={P_DRUGS_KEYWORD}
              action="create"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="24"
              label={`${t('permissionsAndUsers.readKeyword')} ${t('permissionsAndUsers.drugsEntityKeyword').toLowerCase()}`}
              entity={P_DRUGS_KEYWORD}
              action="read"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
          </StyledTreeItem>

          <StyledTreeItem nodeId="25" label={`${t('permissionsAndUsers.panelsEntityKeyword')}`} permissions={permissionsState} hasChildren>
            <StyledTreeItem
              nodeId="26"
              label={`${t('permissionsAndUsers.deleteKeyword')} ${t('permissionsAndUsers.panelsEntityKeyword').toLowerCase()}`}
              entity={P_DIAGNOSTIC_PANELS_KEYWORD}
              action="delete"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="27"
              label={`${t('permissionsAndUsers.updateKeyword')} ${t('permissionsAndUsers.panelsEntityKeyword').toLowerCase()}`}
              entity={P_DIAGNOSTIC_PANELS_KEYWORD}
              action="update"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="28"
              label={`${t('permissionsAndUsers.createKeyword')} ${t('permissionsAndUsers.panelsEntityKeyword').toLowerCase()}`}
              entity={P_DIAGNOSTIC_PANELS_KEYWORD}
              action="create"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
            <StyledTreeItem
              nodeId="29"
              label={`${t('permissionsAndUsers.readKeyword')} ${t('permissionsAndUsers.panelsEntityKeyword').toLowerCase()}`}
              entity={P_DIAGNOSTIC_PANELS_KEYWORD}
              action="read"
              permissions={permissionsState}
              handlePermissionCheck={handlePermissionCheck}
            />
          </StyledTreeItem>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {props.showIndirectIndividualPermissionsOnly && (
            <React.Fragment>
              <StyledTreeItem
                nodeId="30"
                label={`${t('permissionsAndUsers.deleteKeyword')} ${t('permissionsAndUsers.individualEntityKeyword').toLowerCase()}`}
                entity={P_INDIRECT_INDIVIDUAL}
                action="delete"
                permissions={permissionsState}
                handlePermissionCheck={handlePermissionCheck}
              />
              <StyledTreeItem
                nodeId="31"
                label={`${t('permissionsAndUsers.updateKeyword')} ${t('permissionsAndUsers.individualEntityKeyword').toLowerCase()}`}
                entity={P_INDIRECT_INDIVIDUAL}
                action="update"
                permissions={permissionsState}
                handlePermissionCheck={handlePermissionCheck}
              />
              <StyledTreeItem
                nodeId="32"
                label={`${t('permissionsAndUsers.readKeyword')} ${t('permissionsAndUsers.individualEntityKeyword').toLowerCase()}`}
                entity={P_INDIRECT_INDIVIDUAL}
                action="read"
                permissions={permissionsState}
                handlePermissionCheck={handlePermissionCheck}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </TreeView>
  );
};

export default PermissionsTree;
