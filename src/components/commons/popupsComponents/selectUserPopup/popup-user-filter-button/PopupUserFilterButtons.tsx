import React from 'react';
import { Box } from '@material-ui/core';

import { PopupUserFilter } from '../interfaces';
import Searchbar from '../../../tableFilter/Searchbar';

interface IProps {
  filter: any;
  setFilter: (newUserFilter: PopupUserFilter) => void;
}

const PopupUserFilterButtons = (props: IProps) => {
  const { filter } = props;
  const searchText = filter.searchText || '';

  const handleSearchTextChange = (newValue: string) => {
    props.setFilter({ ...props.filter, searchText: newValue });
  };
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" padding={2} alignSelf="end" alignItems="center" justifyContent="flex-end" style={{ width: '100%' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Searchbar variant="outlined" margin="dense" value={searchText} onChange={handleSearchTextChange} />
          </form>
        </Box>
      </Box>
    </>
  );
};

export default PopupUserFilterButtons;
