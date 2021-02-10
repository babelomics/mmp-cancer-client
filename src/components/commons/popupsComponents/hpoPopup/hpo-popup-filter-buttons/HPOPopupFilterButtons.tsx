import React from 'react';
import { Box } from '@material-ui/core';
import { IHPOPopupFilter } from '../interfaces';
import Searchbar from '../../../tableFilter/Searchbar';

interface IProps {
  filter: any;
  setFilter: (newHOPFilter: IHPOPopupFilter) => void;
}

const HOPPopupFilterButtons = (props: IProps) => {
  const { filter } = props;

  const searchText = filter.searchText || '';

  const handleSearchTextChange = (newValue: string) => {
    props.setFilter({ ...props.filter, searchText: newValue });
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <Box display="flex" flexDirection="row" padding={2} alignSelf="end">
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

export default HOPPopupFilterButtons;
