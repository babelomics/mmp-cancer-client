import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import GaiaModalFormik from '../../commons/GaiaModalFormik';
import GaiaTextField from '../../commons/GaiaTextField';
import { groupValidationSchema } from '../validationSchema';
import PermissionsTree from '../PermissionsTree';
import { IPermission } from '../permissions';
import { IGroup } from '../interfaces';

interface IProps {
  projectId: string;
  open: boolean;
  data?: IGroup | null;
  onSubmit?: (data: IGroup) => void;
  onClose?: () => void;
}

const GroupProfilePopup = (props: IProps) => {
  const { t } = useTranslation();
  const [permissions, setPermissions] = useState<IPermission[]>();

  useEffect(() => {
    if (props.data) {
      const groupPermissions = props.data?.permissions.map((p) => {
        p.checked = true;
        return p;
      });

      setPermissions(groupPermissions);
    }
  }, [props.data]);

  const formik = useFormik<any>({
    initialValues: {
      identifier: props.data?.groupId ?? '',
      name: props.data?.name ?? '',
      description: props.data?.description ?? ''
    },
    enableReinitialize: true,
    validationSchema: groupValidationSchema(t),
    onSubmit: (values) => {
      const data = {
        projectId: props.projectId,
        groupId: values.identifier,
        name: values.name,
        description: values.description,
        permissions: permissions
          ?.filter((p) => p.action && p.checked)
          .map((p) => {
            const copy = { ...p };
            copy.entityId = props.projectId;
            return copy;
          }),
        users: [], // TODO: Delete this
        guid: props.data?.guid ?? ''
      } as IGroup;

      if (props.onSubmit) {
        props.onSubmit(data);
      }
      handleClose();
    }
  });

  const handleClose = () => {
    reset();
    if (props.onClose) {
      props.onClose();
    }
  };

  const reset = () => {
    setPermissions(
      permissions?.map((p) => {
        p.checked = false;
        return p;
      })
    );
  };

  return (
    <GaiaModalFormik open={props.open} title={t('permissionsAndUsers.groupPopupTitle')} formik={formik} onClose={handleClose}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <GaiaTextField required label={t('commons.fields.identifier')} name="identifier" formik={formik} />
        </Grid>
        <Grid item xs={3}>
          <GaiaTextField required label={t('commons.fields.name')} name="name" formik={formik} />
        </Grid>
        <Grid item xs={6}>
          <GaiaTextField required label={t('commons.fields.description')} name="description" formik={formik} multiline />
        </Grid>
      </Grid>
      <div style={{ marginTop: 25 }}>
        <Typography color="primary" variant="body2">
          {t('permissionsAndUsers.permissionsLabel')}
        </Typography>
        <PermissionsTree projectId={props.projectId} onChange={(permissionsData: IPermission[]) => setPermissions(permissionsData)} permissions={permissions} />
      </div>
    </GaiaModalFormik>
  );
};

export default GroupProfilePopup;
