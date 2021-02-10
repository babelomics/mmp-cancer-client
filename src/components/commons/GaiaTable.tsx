import React, { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar, Query, QueryResult } from 'material-table';
import { Chip, TextField, Typography } from '@material-ui/core';
import _ from 'lodash';

import GaiaButton from './GaiaButton';
import usePrevious from '../../hooks/usePrevious';
import useWindowSize from '../../hooks/useWindowSize';
import withPopover from '../../HoC/withPopover';
import GaiaDateRangePicker from './GaiaDateRangePicker';
import GaiaIcon from './GaiaIcon';
import GaiaCheckBox from './GaiaCheckBox';
import GaiaDoubleCheckBox from './GaiaDoubleCheckBox';

interface IProps {
  loading?: boolean;
  title?: string;
  columns: (IColumn | any)[];
  remoteData?: (query: Query<any>, filters: ITableFilter, previousData: any, exclude?: any, idUpperLevel?: any) => Promise<QueryResult<any>>;
  changeAvailable?: (drugs: string[], available: boolean, user: string) => Promise<any>;
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
  onSelectionChange?: (rows?: any) => void;
  onAddClick?: () => void;
  selection?: boolean;
  selectedRows?: string[];
  resetSelection?: () => void;
  refreshTable?: () => Promise<any>;
  user?: string | null;
  refreshUser?: string | null;
  defaulFilter?: object;
  exclude?: string[];
  idUpperLevel?: string;
  style?: any;
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
  type?: 'string' | 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency' | 'dboolean';
  hidden?: boolean;
  forFilter?: any;
}

const useStyles = makeStyles((theme) => ({
  numberInput: {
    width: '100%',
    border: 0,
    height: '1.1876em',
    margin: 0,
    display: 'block',
    padding: '6px 0 7px',
    background: 'none',
    boxSizing: 'content-box'
  }
}));

export interface ITableFilter {
  [key: string]: any;
}

const GaiaTable = ({
  loading = false,
  title,
  columns,
  remoteData,
  data,
  pageSize = 25,
  paging = false,
  emptyRowsWhenPaging = false,
  filtersMenu = false,
  filtersSpace = 10,
  rowStyle,
  showTitle = true,
  onFilter,
  onRowClick,
  onAddClick,
  onSelectionChange,
  changeAvailable,
  selectedRows = [],
  selection = false,
  resetSelection,
  refreshTable,
  user,
  refreshUser,
  defaulFilter = {},
  exclude = [],
  idUpperLevel = undefined,
  style
}: IProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [columnsState, setColumnsState] = useState(columns);
  const [dataState, setDataState] = useState<any>(data);
  //const [filtersState, setFiltersState] = useState<ITableFilter>({});
  const [filters, setFilters] = useState<ITableFilter>(defaulFilter);
  const [pageSizeState, setPageSize] = React.useState(pageSize);
  let filtersTemp = { ...filters };
  const [previousData, setPreviousData] = useState<any>([]);
  const [checkLast, setCheckLast] = useState(false);

  const wSize = useWindowSize();
  useEffect(() => {
    setPreviousData([]);
    refT.current.dataManager.changeCurrentPage(0);
  }, []);

  const refT = React.createRef<any>();
  const refS = React.createRef<any>();

  // Update data when received data by props has changed
  const prevData = usePrevious(data);
  useEffect(() => {
    if (!remoteData) {
      if (!_.isEqual(data, prevData)) {
        if (Array.isArray(data)) setDataState(data);
      }
    }
  }, [prevData, data, remoteData]);

  // Filters data when filters object state has changed
  //const prevFilters = usePrevious(filters);
  useEffect(() => {
    if (remoteData) {
      setPreviousData([]);
      refT.current.dataManager.changeCurrentPage(0);
      refT.current.onQueryChange({ page: 0 });
      if (resetSelection) {
        resetSelection();
      }
    }
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
            case 'dboolean':
              return renderDoubleCheckBox(c);
            case 'numeric':
              return renderNumberField(c, i);
          }
          return null;
        })}
        <GaiaButton text={t('commons.buttons.filter')} fullWidth onClick={addFilters} />
        <GaiaButton text={t('commons.buttons.reset')} fullWidth onClick={resetFilters} style={{ marginTop: 15 }} />
      </div>
    );
  };

  const renderNumberField = (column: IColumn, index: number) => {
    return (
      <div style={{ display: 'blok', marginBottom: filtersSpace }}>
        <div style={{ display: 'flex' }}>
          <TextField
            key={`${column.field}-${index}`}
            label={'Min ' + column.title}
            defaultValue={filtersTemp[column.field + 'Min']}
            variant="outlined"
            onChange={(e) => {
              let value = null;
              if (e.target.value !== e.target.defaultValue) {
                value = e.target.value;
              } else if (e.target.defaultValue !== '') {
                value = e.target.defaultValue;
              }
              const regexNumber = /^(\d*)(,\d{0,2})?$/g;
              if (value === '') {
                value = null;
              } else if (value !== null) {
                if (!regexNumber.test(value)) {
                  e.target.value = value.slice(0, -1);
                  value = value.slice(0, -1);
                }
                if (value.slice(-1) === ',') {
                  value = value + '00';
                }
              }
              filtersTemp = { ...filtersTemp, [column.field + 'Min']: value };
            }}
          />
          <div style={{ alignSelf: 'center', marginLeft: 10, marginRight: 10 }}>-</div>
          <TextField
            key={`${column.field}-${index}`}
            label={'Max ' + column.title}
            defaultValue={filtersTemp[column.field + 'Max']}
            variant="outlined"
            onChange={(e) => {
              let value = null;
              if (e.target.value !== e.target.defaultValue) {
                value = e.target.value;
              } else if (e.target.defaultValue !== '') {
                value = e.target.defaultValue;
              }
              const regexNumber = /^(\d*)(,\d{0,2})?$/g;
              if (value === '') {
                value = null;
              } else if (value !== null) {
                if (!regexNumber.test(value)) {
                  e.target.value = value.slice(0, -1);
                  value = value.slice(0, -1);
                }
                if (value.slice(-1) === ',') {
                  value = value + '00';
                }
              }
              filtersTemp = { ...filtersTemp, [column.field + 'Max']: value };
            }}
          />
        </div>
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

  const renderDoubleCheckBox = (column: IColumn) => {
    return (
      <div style={{ display: 'block', marginBottom: filtersSpace }}>
        <Typography style={{ paddingTop: 5, paddingBottom: 5 }}>{column.forFilter.title}</Typography>
        <GaiaDoubleCheckBox
          name={column.field}
          text={column.forFilter.title}
          option1={column.forFilter.values[0][0]}
          name1={column.forFilter.values[0][1]}
          option2={column.forFilter.values[1][0]}
          name2={column.forFilter.values[1][1]}
          checked={filters[column.field] ?? null}
          onChange={(value) => {
            filtersTemp = { ...filtersTemp, [column.field]: value };
          }}
        />
      </div>
    );
  };

  const renderFilterChips = () => {
    let filtersChips: string[] = [];
    if (filters !== null && Object.keys(filters).length > 0) {
      return Object.keys(filters).map((k) => {
        let findColumn: IColumn = columns.find((c: IColumn) => c.field === k);
        if (!findColumn) {
          findColumn = columns.find((c: IColumn) => c.field + 'Max' === k || c.field + 'Min' === k);
        }
        if (findColumn.title) {
          if (!filtersChips.includes(findColumn.title)) {
            filtersChips.push(findColumn.title);
            return <Chip label={findColumn.title} color="primary" style={{ marginRight: 5 }} onDelete={() => deleteFilter(findColumn.field)} />;
          }
        }
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
    if (obj[key] || obj[key] === false) {
      delete obj[key];
    } else {
      if (obj[key + 'Min']) {
        delete obj[key + 'Min'];
      }
      if (obj[key + 'Max']) {
        delete obj[key + 'Max'];
      }
    }
    setFilters(obj);
  };

  const onScrollBottom = () => {
    if (remoteData) {
    const tableDiv = refS.current;
    const table = refT.current;
    if (tableDiv.scrollTop == tableDiv.scrollHeight - tableDiv.clientHeight) {
      setPreviousData(table.dataManager.data);
      if (table.dataManager.data.length > previousData.length) {
        table.onQueryChange({ page: table.dataManager.currentPage + 1 });
        table.dataManager.changeCurrentPage(table.dataManager.currentPage + 1);
      }
    }
  }
  };

  const changeAvailability = (available: boolean) => {
    if (remoteData) {
    const table = refT.current;
    if (changeAvailable && user) {
      changeAvailable(selectedRows, available, user).then((result) => {
        if (result.done) {
          setPreviousData([]);
          table.dataManager.changeCurrentPage(0);
          table.onQueryChange({ page: 0 });
          if (resetSelection) {
            resetSelection();
          }
        }
      });
    }
  }
  };

  const refreshTableUser = () => {
    if (remoteData) {
    const table = refT.current;
    if (refreshTable) {
      refreshTable().then((result) => {
        if (result.done) {
          setPreviousData([]);
          table.dataManager.changeCurrentPage(0);
          table.onQueryChange({ page: 0 });
          if (resetSelection) {
            resetSelection();
          }
        }
      });
    }
  }
  };

  const GaiaButtonPopover = withPopover(GaiaIcon);
  return (
    <div
      ref={refS}
      onScroll={onScrollBottom}
      style={{
        maxHeight: 'calc(' + wSize.height.toString() + 'px - 340px)',
        overflowY: 'auto'
      }}
    >
      <MaterialTable
        tableRef={refT}
        isLoading={loading}
        title={title || 'Table title'}
        columns={columnsState}
        data={remoteData ? (query: Query<any>) => remoteData(query, filters, previousData, exclude, idUpperLevel) : dataState}
        options={{
          debounceInterval: 1000,
          showTitle: showTitle,
          filtering: false,
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
          },
          {
            icon: () => <GaiaIcon icon="archive" />,
            isFreeAction: true,
            tooltip: t('drugsManagement.refresDrugs'),
            hidden: refreshTable === undefined,
            onClick: (event, data) => {
              if (refreshTable) {
                refreshTableUser();
              }
            }
          }
        ]}
        components={{
          Toolbar: (props: any) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ overflow: 'hidden' }}>
                {showFiltersMenu() && <div style={{ padding: '0px 10px', display: 'inline-block', float: 'left' }}>{renderFilterChips()}</div>}
                {selectedRows.length > 0 && changeAvailable !== undefined && (
                  <div style={{ padding: '0px 25px', display: 'inline-block', float: 'right', right: 0 }}>
                    <GaiaButton style={{ marginLeft: 10 }} text={t('commons.buttons.noAvailable')} variant="outlined" onClick={(available: boolean) => changeAvailability(false)} />
                    <GaiaButton style={{ marginLeft: 10 }} text={t('commons.buttons.available')} variant="outlined" onClick={(available: boolean) => changeAvailability(true)} />
                  </div>
                )}
              </div>
            </div>
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
        onSelectionChange={onSelectionChange}
        style={style}
      />
    </div>
  );
};
export default GaiaTable;
