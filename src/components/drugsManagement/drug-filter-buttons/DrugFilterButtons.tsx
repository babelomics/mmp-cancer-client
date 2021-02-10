import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Grid, IconButton, makeStyles, Popover, Tooltip, Typography } from '@material-ui/core';
import { FilterList, Archive } from '@material-ui/icons';
import GaiaButton from '../../commons/GaiaButton';

import { DrugFilter } from '../interfaces';
import Searchbar from '../../commons/tableFilter/Searchbar';
import FilterDateField from '../../commons/tableFilter/FilterDateField';
import FilterTextField from '../../commons/tableFilter/FilterTextField';
import FilterCheckTrueFalseField from '../../commons/tableFilter/FilterCheckTrueFalseField';

interface IProps {
  filter: any;
  setFilter: (newDrugFilter: DrugFilter) => void;
  manualUpdate: () => void;
  changeAvailability: (available: boolean) => void;
  showAvailability: boolean;
  loading: boolean;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    width: 450
  }
}));

const DrugFilterButtons = (props: IProps) => {
  const { filter, setFilter, manualUpdate, changeAvailability, showAvailability, loading } = props;
  const classes = useStyles();
  const { t } = useTranslation();
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

  const handleFilter = (newValue: string | Date | boolean | undefined, field: string) => {
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
    if (!props.loading) {
      const obj = { ...filter } as any;

      if (obj[key] || obj[key] === false) {
        delete obj[key];
      }
      setFilter(obj);
    }
  };

  const tooltipFilter = t('commons.table.filters.filterTooltip');
  const tooltipUpdate = t('drugsManagement.refresDrugs');

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" padding={2} alignSelf="end" justifyContent="flex-end" style={{ width: '100%' }}>
          {!loading && showAvailability && (
            <>
              <GaiaButton style={{ marginRight: 10 }} text={t('commons.buttons.noAvailable')} variant="outlined" onClick={(available: boolean) => changeAvailability(false)} />
              <GaiaButton style={{ marginRight: 10 }} text={t('commons.buttons.available')} variant="outlined" onClick={(available: boolean) => changeAvailability(true)} />
            </>
          )}
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
          <Tooltip title={tooltipUpdate}>
            <IconButton onClick={manualUpdate}>
              <Archive />
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
              <FilterTextField label={t('commons.fields.standardName')} value={filter.standardName} onChange={handleFilter} field="standardName" />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.commonName')} value={filter.commonName} onChange={handleFilter} field="commonName" />
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ paddingTop: 5, paddingBottom: 5 }}>{t('commons.fields.available')}</Typography>
              <FilterCheckTrueFalseField
                value={filter.available}
                labelTrue={t('commons.fields.yesNoField.yes')}
                labelFalse={t('commons.fields.yesNoField.no')}
                field="available"
                onChange={handleFilter}
              />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.lastModificationAfter} onChange={handleFilter} label={t('commons.fields.lastModificationAfter')} field="lastModificationAfter" />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.lastModificationBefore} onChange={handleFilter} label={t('commons.fields.lastModificationBefore')} field="lastModificationBefore" />
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ paddingTop: 5, paddingBottom: 5 }}>{t('commons.fields.isDeleted')}</Typography>
              <FilterCheckTrueFalseField
                value={filter.isDeleted}
                labelTrue={t('commons.fields.yesNoField.yes')}
                labelFalse={t('commons.fields.yesNoField.no')}
                field="isDeleted"
                onChange={handleFilter}
              />
            </Grid>
            <Grid item xs={12}>
              <GaiaButton text={t('commons.buttons.reset')} fullWidth onClick={resetFilters} />
            </Grid>
          </Grid>
        </Popover>
        {!props.loading && (
          <Box display="flex" flexDirection="row">
            {Object.keys(filter).map((k: string) => (
              <>
                {(filter[k] || filter[k] === false) && k !== 'searchText' && k !== 'sortBy' && k !== 'sortDirection' && (
                  <Chip label={t('commons.fields.' + k)} color="primary" style={{ marginRight: 5 }} onDelete={() => deleteFilter(k)} />
                )}
              </>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default DrugFilterButtons;
