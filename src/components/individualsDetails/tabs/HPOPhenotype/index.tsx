import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HPOPhenotypeTable from './hpoPhenotype-table/HPOPhenotypeTable';
import HPOPhenotypeFilterButtons from './hpoPhenotype-filter-buttons/HPOPhenotypeFilterButtons';
import PopupHPOPanelSelection from '../../../commons/popupsComponents/hpoPopup/PopupHPOPanelSelection';
import HPODetailsPopup from './HPODetailsPopup';
import { IHumanPhenotype } from '../../../individualsManagement/interfaces';
import GaiaDeleteConfirmPopup from '../../../commons/GaiaDeleteConfirmPopup';

interface IProps {
  itemsList: any[];
  addHPO: (data: IHumanPhenotype) => void;
  deleteHPO: (id: string) => void;
  updateHPO: (data: IHumanPhenotype) => void;
}

const HPOList = (props: IProps) => {
  const { t } = useTranslation();

  const [openPopupSearchHPO, setOpenPopupSearchHPO] = useState<boolean>(false);
  const [openDeletePopup, setOpenDeletePopup] = useState<{
    open: boolean;
    data?: IHumanPhenotype;
  }>({
    open: false
  });

  const [hpoDetailsPopup, setHpoDetailsPopup] = useState<{
    open: boolean;
    data?: IHumanPhenotype;
    mode: 'new' | 'edit';
  }>({
    open: false,
    mode: 'new'
  });

  const handleDelete = () => {
    if (openDeletePopup.data) {
      props.deleteHPO(openDeletePopup.data.phenotypeId);
    }
    closeDeletePopup();
  };

  const closeDeletePopup = () => {
    setOpenDeletePopup({ ...openDeletePopup, open: false });
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" style={{ marginBottom: 20 }}>
        {t('individuals.hpoPhenotypeTab')}
      </Typography>
      <HPOPhenotypeFilterButtons setHPOOpenPopup={() => setOpenPopupSearchHPO(true)} />
      <HPOPhenotypeTable
        {...props}
        itemsList={props.itemsList}
        onDelete={(hpo: IHumanPhenotype) => setOpenDeletePopup({ open: true, data: hpo })}
        rowClick={(hpo: IHumanPhenotype) => setHpoDetailsPopup({ open: true, data: hpo, mode: 'edit' })}
      />

      {openPopupSearchHPO && (
        <PopupHPOPanelSelection
          titlePopup={t('commons.fields.fenotypesHPO')}
          open={true}
          openPopupParent={() => setOpenPopupSearchHPO(false)}
          abnormality={true}
          addHPO={(hpo: any) => {
            setHpoDetailsPopup({ open: true, data: { phenotypeId: hpo.hpoId, observed: '', modifiers: [], comment: '' }, mode: 'new' });
            setOpenPopupSearchHPO(false);
          }}
          exclude={props.itemsList.map((hpo: IHumanPhenotype) => hpo.phenotypeId)}
          hideParents
          hideChildren
        />
      )}

      {/* HPO Details Popup */}
      <HPODetailsPopup
        open={hpoDetailsPopup.open}
        onClose={() => setHpoDetailsPopup({ ...hpoDetailsPopup, open: false })}
        data={hpoDetailsPopup.data}
        addHPO={props.addHPO}
        updateHPO={props.updateHPO}
        mode={hpoDetailsPopup.mode}
      />

      {/* Delete HPO Popup */}
      <GaiaDeleteConfirmPopup
        open={openDeletePopup.open}
        actionText={t('individuals.deletePopupDescription')}
        title={t('individuals.deleteHPOTitle')}
        onClose={closeDeletePopup}
        onAccept={handleDelete}
      />
    </React.Fragment>
  );
};

export default HPOList;
