import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable, { MTableToolbar, Query, QueryResult } from 'material-table';
import { Chip, TextField, Typography } from '@material-ui/core';
import _ from 'lodash';

import GaiaButton from './GaiaButton';
import usePrevious from '../../hooks/usePrevious';
import withPopover from '../../HoC/withPopover';
import GaiaDateRangePicker from './GaiaDateRangePicker';
import GaiaIcon from './GaiaIcon';
import GaiaCheckBox from './GaiaCheckBox';

interface IProps {
  loading?: boolean;
  title?: string;
  columns: (IColumn | any)[];
  remoteData?: (query: Query<any>, filters: ITableFilter) => Promise<QueryResult<any>>;
  data?: any[];
  pageSize?: number;
  paging?: boolean;
  emptyRowsWhenPaging?: boolean;
  filtersMenu?: boolean;
  filtersSpace?: number;
  rowStyle?: React.CSSProperties | ((data: any, index: number, level: number) => React.CSSProperties) | undefined;
  showTitle?: boolean;
  onFilter?: (filters: ITableFilter) => void;
  onRowClick?: (event?: React.MouseEvent<Element, MouseEvent> | undefined, rowData?: any) => void;
  onAddClick?: () => void;
}

export interface IColumn {
  cellStyle?: React.CSSProperties | ((rowData: any) => ReactNode | string | undefined);
  customFilterAndSearch?: () => any;
  customSort?: (a: any, b: any) => number;
  field: string;
  title?: string;
  render?: (data: any) => ReactNode | string | number;
  filtering?: boolean;
  sorting?: boolean;
  searchable?: boolean;
  type?: 'string' | 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency';
  hidden?: boolean;
}

export interface ITableFilter {
  [key: string]: any;
}

const GaiaTable = ({
  loading = false,
  title,
  columns,
  remoteData,
  data,
  pageSize = 5,
  paging = true,
  emptyRowsWhenPaging = false,
  filtersMenu = false,
  filtersSpace = 10,
  rowStyle,
  showTitle = true,
  onFilter,
  onRowClick,
  onAddClick
}: IProps) => {
  const { t } = useTranslation();
  const [columnsState, setColumnsState] = useState(columns);
  const [dataState, setDataState] = useState<any>(data);
  //const [filtersState, setFiltersState] = useState<ITableFilter>({});
  const [filters, setFilters] = useState<ITableFilter>({});
  const [pageSizeState, setPageSize] = React.useState(pageSize);
  let filtersTemp = { ...filters };

  // Update data when received data by props has changed
  const prevData = usePrevious(data);
  useEffect(() => {
    if (!remoteData) {
      if (!_.isEqual(data, prevData)) {
        if (Array.isArray(data)) setDataState(data);
      }
    }
  }, [prevData, data, remoteData]);

  const refT = React.createRef<any>();

  // Filters data when filters object state has changed
  //const prevFilters = usePrevious(filters);
  useEffect(() => {
    refT.current.onQueryChange();
  }, [filters]);

  // Map columns
  const prevColumns = usePrevious(columns);
  useEffect(() => {
    if (!_.isEqual(prevColumns, columns)) {
      const mappedColumns = columns.map((c: IColumn) => {
        // Set filtering to TRUE by default
        if (c.filtering === undefined) {
          c.filtering = true;
        }

        // Set column type to TEXT by default
        if (c.type === undefined) {
          c.type = 'string';
        }

        return c;
      });

      setColumnsState(mappedColumns);
    }
  }, [prevColumns, columns]);

  const showFiltersMenu = (): boolean => {
    if (filtersMenu) {
      return columnsState.map((c: IColumn) => c.filtering).filter((x: any) => x).length > 0;
    }
    return false;
  };

  const renderFiltersMenu = () => {
    const columnsFilter: IColumn[] = columns.filter((c: IColumn) => c.type && c.filtering);

    return (
      <div style={{ padding: 15, width: 350 }}>
        {columnsFilter.map((c, i) => {
          switch (c.type) {
            case 'string':
              return renderTextField(c, i);
            case 'date':
              return renderDatePicker(c);
            case 'boolean':
              return renderCheckBox(c);
          }
          return null;
        })}
        <GaiaButton text="Filtrar" fullWidth onClick={addFilters} />
        <GaiaButton text="Reset" fullWidth onClick={resetFilters} style={{ marginTop: 15 }} />
      </div>
    );
  };

  const renderTextField = (column: IColumn, index: number) => {
    return (
      <div style={{ display: 'blok', marginBottom: filtersSpace }}>
        <TextField
          key={`${column.field}-${index}`}
          label={column.title}
          defaultValue={filtersTemp[column.field]}
          variant="outlined"
          fullWidth
          onChange={(e) => {
            let value = null;
            if (e.target.value !== e.target.defaultValue) {
              value = e.target.value;
            } else if (e.target.defaultValue !== '') {
              value = e.target.defaultValue;
            }
            if (value === '') {
              value = null;
            }
            filtersTemp = { ...filtersTemp, [column.field]: value };
            /*setFiltersState({
              ...filtersState,
              [column.field]: e.target.value
            });*/
          }}
        />
      </div>
    );
  };

  const renderDatePicker = (column: IColumn) => {
    return (
      <div style={{ display: 'block', marginBottom: filtersSpace }}>
        <Typography style={{ paddingTop: 5, paddingBottom: 5 }}>{column.title}</Typography>
        <GaiaDateRangePicker
          onChange={(value) => {
            filtersTemp = { ...filtersTemp, [column.field]: value };
          }}
          range={filters[column.field] ?? null}
        />
      </div>
    );
  };

  const renderCheckBox = (column: IColumn) => {
    return (
      <div style={{ display: 'block', marginBottom: filtersSpace }}>
        <GaiaCheckBox
          name={column.field}
          text={column.title}
          checked={filters[column.field] ?? null}
          onChange={(value) => {
            filtersTemp = { ...filtersTemp, [column.field]: value };
          }}
        />
      </div>
    );
  };

  const renderFilterChips = () => {
    if (filters !== null && Object.keys(filters).length > 0) {
      return Object.keys(filters).map((k) => {
        const findColumn: IColumn = columns.find((c: IColumn) => c.field === k);
        return <Chip label={findColumn.title} color="primary" style={{ marginRight: 5 }} onDelete={() => deleteFilter(k)} />;
      });
    }
    return null;
  };

  const addFilters = () => {
    Object.keys(filtersTemp).forEach((key) => {
      if (filtersTemp[key] === null) {
        delete filtersTemp[key];
      }
    });
    setFilters(filtersTemp);
  };

  const resetFilters = () => {
    setFilters({});
  };

  const deleteFilter = (key: string) => {
    const obj = { ...filters };
    delete obj[key];
    setFilters(obj);
  };

  const GaiaButtonPopover = withPopover(GaiaIcon);
  return (
    <MaterialTable
      tableRef={refT}
      isLoading={loading}
      title={title || 'Table title'}
      columns={columnsState}
      data={remoteData ? (query: Query<any>) => remoteData(query, filters) : dataState}
      options={{
        showTitle: showTitle,
        filtering: filtersMenu ? false : true,
        paging: paging,
        pageSize: pageSizeState,
        pageSizeOptions: [1, 2, 3, 4, 5, 10, 20],
        emptyRowsWhenPaging: emptyRowsWhenPaging,
        rowStyle: rowStyle
      }}
      actions={[
        {
          icon: () => <GaiaButtonPopover icon="filter_alt">{renderFiltersMenu()}</GaiaButtonPopover>,
          isFreeAction: true,
          hidden: !(filtersMenu && showFiltersMenu()),
          onClick: (event) => undefined
        },
        {
          icon: () => <GaiaIcon icon="add" />,
          isFreeAction: true,
          hidden: onAddClick === undefined,
          onClick: (event, data) => {
            if (onAddClick) {
              onAddClick();
            }
          }
        }
      ]}
      components={{
        Toolbar: (props: any) =>
          showFiltersMenu() ? (
            <>
              <MTableToolbar {...props} />
              <div style={{ padding: '0px 10px' }}>{renderFilterChips()}</div>
            </>
          ) : (
            <MTableToolbar {...props} />
          )
      }}
      localization={{
        header: {
          actions: t('commons.table.header.actions')
        },
        body: {
          emptyDataSourceMessage: t('commons.table.emptyDataSourceMessage'),
          editTooltip: t('commons.table.editTooltip'),
          deleteTooltip: t('commons.table.deleteTooltip'),
          editRow: {
            cancelTooltip: t('commons.table.edit.cancelTooltip'),
            saveTooltip: t('commons.table.edit.saveTooltip'),
            deleteText: t('commons.table.edit.deleteText')
          }
        },
        grouping: {
          placeholder: t('commons.table.grouping.placeholder'),
          groupedBy: t('commons.table.grouping.groupedBy')
        },
        pagination: {
          labelDisplayedRows: t('commons.table.pagination.labelDisplayedRows'),
          labelRowsSelect: t('commons.table.pagination.labelRowsSelect'),
          labelRowsPerPage: t('commons.table.pagination.labelRowsPerPage'),
          firstAriaLabel: t('commons.table.pagination.firstAriaLabel'),
          firstTooltip: t('commons.table.pagination.firstTooltip'),
          previousAriaLabel: t('commons.table.pagination.previousAriaLabel'),
          previousTooltip: t('commons.table.pagination.previousTooltip'),
          nextAriaLabel: t('commons.table.pagination.nextAriaLabel'),
          nextTooltip: t('commons.table.pagination.nextTooltip'),
          lastAriaLabel: t('commons.table.pagination.lastAriaLabel'),
          lastTooltip: t('commons.table.pagination.lastTooltip')
        },
        toolbar: {
          addRemoveColumns: t('commons.table.toolbar.addRemoveColumns'),
          nRowsSelected: t('commons.table.toolbar.nRowsSelected'),
          showColumnsTitle: t('commons.table.toolbar.showColumnsTitle'),
          showColumnsAriaLabel: t('commons.table.toolbar.showColumnsAriaLabel'),
          exportTitle: t('commons.table.toolbar.exportTitle'),
          exportAriaLabel: t('commons.table.toolbar.exportAriaLabel'),
          exportCSVName: t('commons.table.toolbar.exportCSVName'),
          exportPDFName: t('commons.table.toolbar.exportPDFName'),
          searchTooltip: t('commons.table.toolbar.searchTooltip'),
          searchPlaceholder: t('commons.table.toolbar.searchPlaceholder')
        }
      }}
      onRowClick={onRowClick}
      onChangeRowsPerPage={(pageSize) => setPageSize(pageSize)}
    />
  );
};
export default GaiaTable;
