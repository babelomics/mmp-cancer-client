import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GaiaContainer from '../commons/GaiaContainer';
import DrugFilterButtons from './drug-filter-buttons/DrugFilterButtons';
import DrugTable from './drug-table/DrugTable';
import { DrugFilter } from './interfaces';
import MmpClient from '../commons/tableFilter/MmpClient';
import routes from '../router/routes';
import { useHistory } from 'react-router-dom';

const defaultDrugFilter = { isDeleted: false } as DrugFilter;

interface IProps {
  manualDrugsUpdate: () => Promise<any>;
  changeAvailable: (drugs: string[], available: boolean, user: string, isAllSelected: boolean, filters: any) => Promise<any>;
  user: string | null | undefined;
}

export const DrugsManagement = (props: IProps) => {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [filter, setFilter] = useState<DrugFilter>(defaultDrugFilter);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const history = useHistory();

  const refreshTableUser = () => {
    setLoading(true);
    props.manualDrugsUpdate().then((result) => {
      if (result.done) {
        resetSelected();
        setFilter(defaultDrugFilter);
        setLoading(false);
      }
    });
  };

  const changeAvailability = (available: boolean) => {
    if (props.user) {
      setLoading(true);
      let filters: { [k: string]: any } = {};
      if (!!filter.searchText) {
        filters.search = filter.searchText;
      }
      if (!!filter.standardName) {
        filters.standardName = filter.standardName;
      }
      if (!!filter.commonName) {
        filters.organization = filter.commonName;
      }
      if (filter.hasOwnProperty('available') && (filter.available === true || filter.available === false)) {
        filters.isAvailable = filter.available;
      }
      if (!!filter.lastModificationAfter) {
        filters.dateModifiedStart = MmpClient.translateDate(filter.lastModificationAfter.toISOString().substring(0, 10));
      }
      if (!!filter.lastModificationBefore) {
        filters.dateModifiedEnd = MmpClient.translateDate(filter.lastModificationBefore.toISOString().substring(0, 10));
      }
      if (filter.hasOwnProperty('isDeleted') && (filter.isDeleted === true || filter.isDeleted === false)) {
        filters.isDeleted = filter.isDeleted.toString();
      }
      props.changeAvailable(selectedRows, available, props.user, selectAll, filters).then((result) => {
        if (result.done) {
          resetSelected();
          setLoading(false);
        }
      });
    }
  };

  const resetSelected = () => {
    setSelectedRows([]);
    setSelectAll(false);
  };
  const goHome = () => {
    history.push(routes.PATH_HOME);
  };
  return (
    <GaiaContainer icon="local_pharmacy" title={t('drugsManagement.title')} onBack={goHome}>
      <DrugFilterButtons
        filter={filter}
        setFilter={setFilter}
        loading={loading}
        manualUpdate={refreshTableUser}
        changeAvailability={changeAvailability}
        showAvailability={selectedRows.length !== 0 || selectAll}
      />
      <DrugTable filter={filter} setFilter={setFilter} loading={loading} selectedRows={selectedRows} setSelectedRows={setSelectedRows} selectAll={selectAll} setSelectAll={setSelectAll} />
    </GaiaContainer>
  );
};

export default DrugsManagement;
