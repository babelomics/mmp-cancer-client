import React from 'react';
import { Box } from '@material-ui/core';

import { IFilterUsersPermissions } from '../../../interfaces';
import Searchbar from '../../../../commons/tableFilter/Searchbar';
interface IProps {
  filter: any;
  hideAddBtn?: boolean;
  projectDeleted: boolean;
  setFilter: (newPermissionFilter: IFilterUsersPermissions) => void;
  onAdd: () => void;
}

const SpecificsPermissionsFilterButtons = (props: IProps) => {
  const search = props.filter.search || '';

  const handleSearchTextChange = (newValue: string) => {
    props.setFilter({ ...props.filter, search: newValue });
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
            <Searchbar variant="outlined" margin="dense" value={search} onChange={handleSearchTextChange} />
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SpecificsPermissionsFilterButtons;
