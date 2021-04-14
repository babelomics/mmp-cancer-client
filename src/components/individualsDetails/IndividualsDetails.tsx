import { Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { userCanUpdate } from '../../utils/permissionsUtils';

import GaiaContainer from '../commons/GaiaContainer';
import GaiaLoading from '../commons/GaiaLoading';
import GaiaModalFormik from '../commons/GaiaModalFormik';
import GaiaTabsPanel, { GaiaTab } from '../commons/GaiaTabs';
import GaiaTextField from '../commons/GaiaTextField';
import { IHumanPhenotype, IIndividual, IHumanDisease } from '../individualsManagement/interfaces';
import { IUserPermission } from '../permissionsAndUsers/interfaces';
import { P_PROJECT_KEYWORD } from '../permissionsAndUsers/permissions';
import routes from '../router/routes';
import { IDeleteForm } from './interfaces';
import BasicInfo from './tabs/BasicInfo/BasicInfo';
import Diseases from './tabs/Diseases';
import HPOPhenotype from './tabs/HPOPhenotype';
import Permissions from './tabs/Permissions';
import { deleteSchema, basicInfoSchema } from './validationSchema';

interface IProps {
  login: any;
  loading: boolean;
  t: any;
  individualId: string;
  projectId: string;
  tab?: string;
  individualData: IIndividual;
  permissionsPopupLoading: boolean;
  permissionsData: IUserPermission | null;
  excludedUsers: string[];

  deleteIndividualData: (individualId: string, projectId: string, t: any) => void;
  updateIndividual: (projectId: string, data: IIndividual, t: any) => void;
  createIndividual: (projectId: string, data: IIndividual, t: any) => void;
  addHPO: (data: IHumanPhenotype) => void;
  deleteHPO: (id: string) => void;
  addIcd10: (data: IHumanDisease) => void;
  deleteICD10: (id: string) => void;
  updateHPO: (data: IHumanPhenotype) => void;
  updateICD10: (data: IHumanDisease) => void;

  addIndividualPermission: (data: IUserPermission, projectId: string, t: any) => void;
  fetchIndividualPermissions: (individualId: string, projectId: string, userId: string, t: any) => void;
  setPermissionsData: (data: IUserPermission | null) => void;
  setExcludedUsers: (ids: string | string[]) => void;
  updateIndividualPermissions: (data: IUserPermission, projectId: string, individualId: string, t: any) => void;
  deleteIndividualPermissions: (userId: string, projectId: string, individualId: string, t: any) => void;
}

const IndividualsDetails = (props: IProps) => {
  const { t } = useTranslation();

  const history = useHistory();
  const [value, setValue] = useState<number>(props.tab ? parseInt(props.tab) : 0);
  const [openDeletePopup, setOpenDeletePopup] = useState<boolean>(false);

  useEffect(() => {
    if (props.tab) {
      setValue(parseInt(props.tab));
    }
  }, [props.tab]);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const getActions = () => {
    if (props.individualId) {
      return [
        {
          icon: <Delete />,
          onClick: () => setOpenDeletePopup(true)
        }
      ];
    }
  };

  const deleteFormik = useFormik<IDeleteForm>({
    initialValues: { confirmation: '' },
    enableReinitialize: true,
    validationSchema: deleteSchema(t),
    onSubmit: () => {
      setOpenDeletePopup(false);
      deleteFormik.resetForm();
      props.deleteIndividualData(props.individualId, props.projectId, t);
    }
  });

  const individualFormik = useFormik<IIndividual>({
    initialValues: {
      individualId: props.individualData.individualId ?? '',
      name: props.individualData.name ?? '',
      dateOfBirth: props.individualData.dateOfBirth ?? null,
      lifeStatus: {
        detail: props.individualData?.lifeStatus?.detail ?? '',
        status: props.individualData?.lifeStatus?.status ?? ''
      },
      sex: props.individualData.sex ?? '',
      comment: props.individualData.comment ?? '',
      karyotypicSex: props.individualData.karyotypicSex ?? '',
      humanEthnicity: props.individualData.humanEthnicity ?? '',
      isHuman: props.individualData.isHuman ?? false
    },
    enableReinitialize: true,
    validationSchema: basicInfoSchema(t),
    onSubmit: (values) => {
      const data = { ...values };

      if (!data.lifeStatus?.status) {
        delete data.lifeStatus;
      }

      if (!data.sex) {
        delete data.sex;
      }

      if (props.individualId) {
        props.updateIndividual(props.projectId, data, t);
      } else {
        props.createIndividual(props.projectId, data, t);
      }
    }
  });

  const handleSubmit = () => {
    const hasErrors = Object.values(individualFormik.errors).filter((x) => x !== '');

    if (hasErrors.length) {
      setValue(0);
    }

    individualFormik.handleSubmit();
  };

  return (
    <GaiaContainer
      icon="person_pin"
      title={t('individuals.individualsDetailsTitle')}
      actions={getActions()}
      onAccept={handleSubmit}
      onBack={() => history.push(`${routes.PATH_INDIVIDUALS_MANAGEMENT}/${props.projectId}`)}
      onCancel={() => history.push(`${routes.PATH_INDIVIDUALS_MANAGEMENT}/${props.projectId}`)}
    >
      {props.loading ? (
        <GaiaLoading />
      ) : (
        <div style={{ overflow: 'auto' }}>
          <GaiaTabsPanel value={value} onChange={handleChange}>
            <GaiaTab title={t('individuals.basicInfo')} component={<BasicInfo formik={individualFormik} data={props.individualData} individualId={props.individualId} />} />
            <GaiaTab
              title={t('individuals.hpoPhenotype')}
              component={
                <HPOPhenotype
                  itemsList={props.individualData.humanPhenotype ?? []}
                  deleteHPO={(id: string) => {
                    props.deleteHPO(id);
                  }}
                  addHPO={props.addHPO}
                  updateHPO={props.updateHPO}
                />
              }
            />
            <GaiaTab
              title={t('individuals.diseases')}
              component={
                <Diseases
                  itemsList={props.individualData.humanDisease ?? []}
                  addIcd10={props.addIcd10}
                  deleteICD10={(id: string) => {
                    props.deleteICD10(id);
                  }}
                  updateICD10={props.updateICD10}
                />
              }
            />
            <GaiaTab title={t('individuals.samples')} component={''} />
            <GaiaTab title={t('individuals.familyRelationships')} component={''} />
            <GaiaTab
              title={t('individuals.permissions')}
              component={
                <Permissions
                  inddividualId={props.individualData.individualId}
                  projectId={props.projectId}
                  permissionsData={props.permissionsData}
                  loading={props.permissionsPopupLoading}
                  addPermission={props.addIndividualPermission}
                  fetchIndividualPermissions={props.fetchIndividualPermissions}
                  setPermissionsData={props.setPermissionsData}
                  setExcludedUsers={props.setExcludedUsers}
                  exclude={props.excludedUsers}
                  updatePermissions={props.updateIndividualPermissions}
                  deletePermissions={props.deleteIndividualPermissions}
                />
              }
              hidden={!userCanUpdate(props.login.user, P_PROJECT_KEYWORD, props.projectId)}
            />
          </GaiaTabsPanel>
        </div>
      )}
      {/* Confirm Delete Individual Modal */}
      <GaiaModalFormik
        open={openDeletePopup}
        title={t('individuals.deleteTitle')}
        formik={deleteFormik}
        onClose={() => {
          setOpenDeletePopup(false);
        }}
      >
        <Typography variant="body1">{t('individuals.deleteDescription')}</Typography>
        <GaiaTextField required name="confirmation" label={t('commons.fields.confirmation')} formik={deleteFormik} fullWidth />
      </GaiaModalFormik>
    </GaiaContainer>
  );
};

export default IndividualsDetails;
