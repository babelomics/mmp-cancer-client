import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { ICommonFilter } from '../../interfaces';
import Searchbar from '../../../../commons/tableFilter/Searchbar';

interface IProps {
  filter: any;
  setFilter: (newGeneFilter: ICommonFilter) => void;
  setGenesOpenPopup: () => void;
}

const GeneFilterButtons = (props: IProps) => {
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

  const addTooltip = t('commons.table.addTooltip');

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
          <Tooltip title={addTooltip}>
            <IconButton onClick={props.setGenesOpenPopup}>
              <Add />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default GeneFilterButtons;
