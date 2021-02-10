import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import routes from '../../router/routes';
import { Box, Chip, Grid, IconButton, makeStyles, Popover, Tooltip } from '@material-ui/core';
import { FilterList, Add } from '@material-ui/icons';
import GaiaButton from '../../commons/GaiaButton';

import { UserFilter } from '../interfaces';
import Searchbar from '../../commons/tableFilter/Searchbar';
import UserTypeSelector from './UserTypeSelector';
import FilterDateField from '../../commons/tableFilter/FilterDateField';
import FilterTextField from '../../commons/tableFilter/FilterTextField';

interface IProps {
  filter: any;
  setFilter: (newUserFilter: UserFilter) => void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    width: 450
  }
}));

const UserFilterButtons = (props: IProps) => {
  const { filter, setFilter } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
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

  const handleNewUser = useCallback(() => {
    history.push(routes.PATH_ADMIN_CREATE_USER);
  }, [history]);

  const deleteFilter = (key: string) => {
    const obj = { ...filter } as any;
    if (obj[key] || obj[key] === false) {
      delete obj[key];
    }
    setFilter(obj);
  };

  const tooltipFilter = t('commons.table.filters.filterTooltip');
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
          <Tooltip title={tooltipFilter}>
            <IconButton onClick={handleExpandClick}>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title={addTooltip}>
            <IconButton onClick={handleNewUser}>
              <Add />
            </IconButton>
          </Tooltip>
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
              <FilterTextField label={t('commons.fields.identifier')} value={filter.identifier} onChange={handleFilter} field="identifier" />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.firstName')} value={filter.firstName} onChange={handleFilter} field="firstName" />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.lastName')} value={filter.lastName} onChange={handleFilter} field="lastName" />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.email')} value={filter.email} onChange={handleFilter} field="email" />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.organization')} value={filter.organization} onChange={handleFilter} field="organization" />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.createdAfter} onChange={handleFilter} label={t('commons.fields.createdAfter')} field="createdAfter" />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.createdBefore} onChange={handleFilter} label={t('commons.fields.createdBefore')} field="createdBefore" />
            </Grid>
            <Grid item xs={12}>
              <UserTypeSelector filter={filter} setFilter={setFilter} label={t('commons.fields.userType')} />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.lastAccessAfter} onChange={handleFilter} label={t('commons.fields.lastAccessAfter')} field="lastAccessAfter" />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.lastAccessBefore} onChange={handleFilter} label={t('commons.fields.lastAccessBefore')} field="lastAccessBefore" />
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

export default UserFilterButtons;
