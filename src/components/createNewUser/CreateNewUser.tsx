import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormikErrors, useFormik } from 'formik';

import { IFormData } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import { generateValidationSchema } from './validationSchema';
import { Grid } from '@material-ui/core';
import GaiaSelectField from '../commons/GaiaSelectField';
import GaiaTextField from '../commons/GaiaTextField';
import GaiaCheckBox from '../commons/GaiaCheckBox';
import GaiaLoading from '../commons/GaiaLoading';
import { useHistory } from 'react-router';

interface IProps {
  loading: boolean;
  error: any;
  success: boolean | null;
  createUser: (data: any, setFormikErrors: (errors: FormikErrors<IFormData>) => void, t: any) => void;
  resetPopups: () => void;
}

export const CreateNewUser = (props: IProps) => {
  const { t } = useTranslation();
  const [showCheck, setShowCheck] = useState(false);
  const history = useHistory();

  const initialValues = (): IFormData => {
    return {
      accessType: '',
      identifier: '',
      organization: '',
      firstName: '',
      lastName: '',
      userType: '',
      email: '',
      canCreateProject: false
    };
  };

  const formik = useFormik<IFormData>({
    initialValues: initialValues(),
    enableReinitialize: true,
    validationSchema: generateValidationSchema(t),
    onSubmit: (values) => {
      props.createUser(values, formik.setErrors, t);
    }
  });

  const handleCheck = (event: any, child: any) => {
    if (event.target.value === 'User') {
      setShowCheck(true);
    } else {
      setShowCheck(false);
    }
  };

  return (
    <GaiaContainer icon="person_add" title={t('createNewUser.title')} onAccept={!props.loading ? formik.handleSubmit : undefined} onCancel={() => history.goBack()}>
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <GaiaSelectField
                required
                name="accessType"
                label={t('commons.fields.typeOfAccess.title')}
                valueAccessor="key"
                labelAccessor="value"
                items={[
                  {
                    key: 'Local',
                    value: t('commons.fields.typeOfAccess.local')
                  },
                  {
                    key: 'LDAP',
                    value: t('commons.fields.typeOfAccess.ldap')
                  },
                  {
                    key: 'Elixir',
                    value: t('commons.fields.typeOfAccess.elixir')
                  }
                ]}
                formik={formik}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <GaiaTextField required name="identifier" label={t('commons.fields.identifier')} formik={formik} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <GaiaTextField required name="organization" formik={formik} fullWidth label={t('commons.fields.organization')} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <GaiaTextField required name="firstName" label={t('commons.fields.firstName')} formik={formik} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <GaiaTextField required name="lastName" formik={formik} label={t('commons.fields.lastName')} fullWidth />
            </Grid>
            <Grid item xs={4}>
              <GaiaSelectField
                required
                name="userType"
                label={t('commons.fields.userType')}
                valueAccessor="key"
                labelAccessor="value"
                items={[
                  {
                    key: 'User',
                    value: t('commons.fields.userTypeOptions.user')
                  },
                  {
                    key: 'Admin',
                    value: t('commons.fields.userTypeOptions.admin')
                  }
                ]}
                formik={formik}
                fullWidth
                onChange={handleCheck}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={6}>
              <GaiaTextField required name="email" formik={formik} label={t('commons.fields.email')} fullWidth />
            </Grid>
            {showCheck && (
              <Grid item xs={6}>
                <GaiaCheckBox name="canCreateProject" formik={formik} text={t('commons.fields.projectCreationPermission')} labelPlacement="start" />
              </Grid>
            )}
          </Grid>
        </React.Fragment>
      )}
    </GaiaContainer>
  );
};

export default CreateNewUser;
