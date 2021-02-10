import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Chip } from '@material-ui/core';

import { ITableAssemblyDataFilter } from '../interfaces';
import Searchbar from '../../commons/tableFilter/Searchbar';

interface IProps {
  filter: any;
  setFilter: (newAssemblyFilter: ITableAssemblyDataFilter) => void;
}

const AssemblyFilterButtons = (props: IProps) => {
  const { filter, setFilter } = props;
  const { t } = useTranslation();

  const searchText = filter.searchText || '';

  const handleSearchTextChange = (newValue: string) => {
    props.setFilter({ ...props.filter, searchText: newValue });
  };

  const deleteFilter = (key: string) => {
    const obj = { ...filter } as any;
    if (obj[key] || obj[key] === false) {
      delete obj[key];
    }
    setFilter(obj);
  };

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" padding={2} alignSelf="end" justifyContent="flex-end" style={{ width: '100%' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Searchbar variant="outlined" margin="dense" value={searchText} onChange={handleSearchTextChange} />
          </form>
        </Box>
        <Box display="flex" flexDirection="row">
          {Object.keys(filter).map((k: string) => (
            <>
              {(filter[k] || filter[k] === false) && k !== 'searchText' && k !== 'sortBy' && k !== 'sortDirection' && (
                <Chip label={t('commons.fields.' + k)} color="primary" style={{ marginRight: 5 }} onDelete={() => deleteFilter(k)} />
              )}
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default AssemblyFilterButtons;
