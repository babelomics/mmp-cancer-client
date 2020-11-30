import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Query } from 'material-table';

import GaiaTable, { ITableFilter } from '../commons/GaiaTable';
import GaiaButton from '../commons/GaiaButton';
import IDrugsManagement, { ITableData } from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import routes from '../router/routes';
import { doDateFormat } from '../../utils/utils';
import {Checkbox } from '@material-ui/core';

interface IProps {
  fetchDrugs: (query: Query<any>, filters: ITableFilter, previousData: any) => Promise<any>;
  manualDrugsUpdate: () => Promise<any>;
  changeAvailable: (drugs: string[], available: boolean, user: string) => Promise<any>;
  drugsManagement: IDrugsManagement;
  user: string | null | undefined ;
}

export const DrugsManagement = (props: IProps) => {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const { t } = useTranslation();
  const history = useHistory();

  /*const updateDrugs = () => {
    props.manualDrugsUpdate();
  }*/

  const selectRow = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rows = [...selectedRows];
    if(e.target.checked) {
      rows.push(e.target.value);
    }
    else {
      const index = rows.indexOf(e.target.value);
      rows.splice(index, 1);
    }
    setSelectedRows([...rows]);
  }

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked) {
      let rows: any[] = [];
      props.drugsManagement.drugsData.forEach(elem => rows.push(elem.standardName));
      setSelectedRows([...rows]);
    }
    else {
      setSelectedRows([]);
    }
  }

  const resetSelected = () =>{
    setSelectedRows([]);
  }
  return (
    <GaiaContainer icon="local_pharmacy" title={t('drugsManagement.title')}>
      <GaiaTable
        showTitle={false}
        loading={props.drugsManagement.loading}
        columns={[
          {
            title: <Checkbox value='all' color="default" onChange={selectAll} style={{marginLeft: 16}} checked={props.drugsManagement.drugsData.length === selectedRows.length && props.drugsManagement.drugsData.length!==0 }/>,
            field:'check',
            type: 'notfilter',
            disableClick: true,
            sorting: false,
            cellStyle: {
              width: 40,
              maxWidth: 40
            },
            headerStyle: {
              display: 'inline',
              padding: 1
            },
            size: 'small',
            render: (rowData: ITableData) => <Checkbox color="default" value={rowData.standardName} checked={selectedRows.includes(rowData.standardName)} onChange={selectRow}/>
          },
          {
            title: t('commons.fields.standardName'),
            field: 'standardName'
          },
          {
            title: t('commons.fields.commonName'),
            field: 'commonName'
          },
          {
            title: t('commons.fields.available'),
            field: 'isAvailable',
            type: 'dboolean',
            render: (rowData: ITableData) => {
              if (rowData.available) {
                return t('commons.fields.avaType.yes')
              }
              else {
                return t('commons.fields.avaType.no')
              }
            },
            forFilter: {
              title: '',
              values: [[t('commons.fields.avaFilter.yes'), 'yes'], [t('commons.fields.avaFilter.no'), 'no']]
            }
          },
          {
            title: t('commons.fields.cost'),
            field: 'cost',
            type: 'numeric',
            align: 'left',
            render:(rowData: ITableData) => {
              if (rowData.cost) {
                return rowData.cost.toFixed(2).replace('.', ',');
              }
              else {
                return '-';
              }
            }
          },
          {
            title: t('commons.fields.lastModificationDate'),
            field: 'dateModified',
            type: 'date',
            headerStyle: {
              whiteSpace: 'nowrap'
            },
            render: (rowData: ITableData) => {
              if (rowData.deletionDate) {
                return doDateFormat(rowData.deletionDate);
              }
              else {
                return doDateFormat(rowData.creationDate);
              }
            }
          },
          {
            title: t('commons.fields.drugDeleted'),
            field: 'isDeleted',
            type: 'dboolean',
            hidden: true,
            render: (rowData: ITableData) => {
              if (rowData.deletionDate) {
                return true;
              }
              else {
                return false;
              }
            },
            forFilter: {
              title: t('commons.fields.delFilter.title'),
              values: [[t('commons.fields.delFilter.yes'), 'yes'], [t('commons.fields.delFilter.no'), 'no']]
            }
          }
        ]}
        //selection={true}
        remoteData={props.fetchDrugs}
        rowStyle={(data: ITableData) => {
          if (data.deletionDate) {
            return {
              backgroundColor: 'lightgray'
            };
          }

          return {};
        }}
        filtersMenu={true}
        selectedRows= {selectedRows}
        changeAvailable={props.changeAvailable}
        resetSelection={resetSelected}
        refreshTable={props.manualDrugsUpdate}
        user={props.user}
        defaulFilter={{isDeleted: false}}
        onRowClick={(e, rowData) => {
          history.push(`${routes.PATH_DRUG_PROFILE}/${rowData.id}`);
        }}
      />
    </GaiaContainer>
  );
};

export default DrugsManagement;
