import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DiseasesTable from './diseases-table/DiseasesTable';
import DiseasesFilterButtons from './diseases-filter-buttons/DiseasesFilterButtons';

import PopupSearchIcd10 from '../../../commons/popupsComponents/searchIcd10/PopupSearchIcd10';
import ICD10DetailsPopup from './ICD10DetailsPopup';
import { IHumanDisease } from '../../../individualsManagement/interfaces';
import GaiaDeleteConfirmPopup from '../../../commons/GaiaDeleteConfirmPopup';

interface IProps {
  itemsList: any[];
  addIcd10: (data: IHumanDisease) => void;

  deleteICD10: (id: string) => void;
  updateICD10: (data: IHumanDisease) => void;
}

const DiseasesList = (props: IProps) => {
  const { t } = useTranslation();

  const [openPopupSearchIcd10, setOpenPopupSearchIcd10] = useState<boolean>(false);
  const [openDeletePopup, setOpenDeletePopup] = useState<{
    open: boolean;
    data?: IHumanDisease;
  }>({
    open: false
  });
  const [icd10DetailsPopup, setIcd10DetailsPopup] = useState<{
    open: boolean;
    data?: IHumanDisease;
    mode: 'new' | 'edit';
  }>({
    open: false,
    mode: 'new'
  });

  const handleDelete = () => {
    if (openDeletePopup.data) {
      props.deleteICD10(openDeletePopup.data.diseaseId);
    }
    closeDeletePopup();
  };

  const closeDeletePopup = () => {
    setOpenDeletePopup({ ...openDeletePopup, open: false });
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" style={{ marginBottom: 20 }}>
        {t('individuals.diseasesICD10')}
      </Typography>
      <DiseasesFilterButtons setIcd10OpenPopup={() => setOpenPopupSearchIcd10(true)} />
      <DiseasesTable
        itemsList={props.itemsList}
        onDelete={(icd10: IHumanDisease) => setOpenDeletePopup({ open: true, data: icd10 })}
        rowClick={(disease: IHumanDisease) => setIcd10DetailsPopup({ open: true, data: disease, mode: 'edit' })}
      />

      {openPopupSearchIcd10 && (
        <PopupSearchIcd10
          title={t('tabPanelDiagnostic.tabs.icd-10.selectionTitle')}
          open={true}
          openPopupParent={() => setOpenPopupSearchIcd10(false)}
          addIcd10={(icd10) => {
            setIcd10DetailsPopup({ open: true, data: { diseaseId: icd10.id, comment: '', dateOfDiagnosis: null, description: icd10.desc }, mode: 'new' });
            setOpenPopupSearchIcd10(false);
          }}
          exclude={props.itemsList.map((icd10: IHumanDisease) => icd10.diseaseId)}
        />
      )}

      {/* ICD10 Details Popup */}
      <ICD10DetailsPopup
        open={icd10DetailsPopup.open}
        onClose={() => setIcd10DetailsPopup({ ...icd10DetailsPopup, open: false })}
        data={icd10DetailsPopup.data}
        addIcd10={props.addIcd10}
        updateICD10={props.updateICD10}
        mode={icd10DetailsPopup.mode}
      />
      {/* Delete HPO Popup */}
      <GaiaDeleteConfirmPopup
        open={openDeletePopup.open}
        actionText={t('individuals.deletePopupDescription')}
        title={t('individuals.deleteICD10Title')}
        onClose={closeDeletePopup}
        onAccept={handleDelete}
      />
    </React.Fragment>
  );
};

export default DiseasesList;
