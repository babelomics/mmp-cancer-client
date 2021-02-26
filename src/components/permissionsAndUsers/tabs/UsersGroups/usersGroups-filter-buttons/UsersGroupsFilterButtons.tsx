import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Grid, IconButton, makeStyles, Popover, Tooltip } from '@material-ui/core';
import { FilterList, Add } from '@material-ui/icons';

import { IFilterUsersGroups } from '../../../interfaces';
import Searchbar from '../../../../commons/tableFilter/Searchbar';
import FilterTextField from '../../../../commons/tableFilter/FilterTextField';
import GaiaButton from '../../../../commons/GaiaButton';

interface IProps {
  filter: any;
  hideAddBtn?: boolean;
  setFilter: (newGroupsFilter: IFilterUsersGroups) => void;
  setGenesOpenPopup?: () => void;
}
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    width: 450
  }
}));

const UsersGroupsFilterButtons = (props: IProps) => {
  const { filter, setFilter } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const searchText = filter.searchText || '';

  const handleSearchTextChange = (newValue: string) => {
    props.setFilter({ ...props.filter, searchText: newValue });
  };
  const handleExpandClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setExpanded(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setExpanded(false);
    setAnchorEl(null);
  };

  const handleFilter = (newValue: string | Date | undefined, field: string) => {
    const { filter, setFilter } = props;
    const newFilter = { ...filter, [field]: newValue };
    setFilter(newFilter);
  };

  const resetFilters = () => {
    const { setFilter } = props;
    const newFilter = {};
    setFilter(newFilter);
    handleClose();
  };

  const deleteFilter = (key: string) => {
    const obj = { ...filter } as any;
    if (obj[key] || obj[key] === false) {
      delete obj[key];
    }
    setFilter(obj);
  };
  const addTooltip = t('commons.table.addTooltip');
  const tooltipFilter = t('commons.table.filters.filterTooltip');

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
          <Tooltip title={tooltipFilter}>
            <IconButton onClick={handleExpandClick}>
              <FilterList />
            </IconButton>
          </Tooltip>
          {!props.hideAddBtn && (
            <Tooltip title={addTooltip}>
              <IconButton onClick={props.setGenesOpenPopup}>
                <Add />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Popover
          id="simple-popover"
          open={expanded}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          classes={{
            paper: classes.paper
          }}
        >
          <Grid container justify="space-between" alignItems="center" spacing={1}>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.permission')} value={filter.permission} onChange={handleFilter} field="permission" />
            </Grid>
            <Grid item xs={12}>
              <GaiaButton text={t('commons.buttons.reset')} fullWidth onClick={resetFilters} />
            </Grid>
          </Grid>
        </Popover>
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

export default UsersGroupsFilterButtons;
