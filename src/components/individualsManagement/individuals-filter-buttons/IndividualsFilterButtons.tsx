import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Box, Chip, Grid, IconButton, makeStyles, Popover, Tooltip } from '@material-ui/core';
import { FilterList, Add } from '@material-ui/icons';
import GaiaButton from '../../commons/GaiaButton';

import { IIndividualsFilter } from '../interfaces';
import Searchbar from '../../commons/tableFilter/Searchbar';
import FilterTextField from '../../commons/tableFilter/FilterTextField';
import routes from '../../router/routes';
import GaiaSelectField from '../../commons/GaiaSelectField';

interface IProps {
  filter: any;
  setFilter: (newIndividualsFilter: IIndividualsFilter) => void;
  projectId: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    width: 450
  }
}));

const IndividualsFilterButtons = (props: IProps) => {
  const { filter, setFilter } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const search = filter.search || '';

  const handleSearchTextChange = (newValue: string) => {
    props.setFilter({ ...props.filter, search: newValue });
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

  const listHandleChange = (e: any, child: any) => {
    const value = e.target.value;

    const { filter, setFilter } = props;
    const newFilter = { ...filter, [e.target.name]: value };
    setFilter(newFilter);
  };

  const getSexList = () => {
    return sexList.sort((a, b) => a.value - b.value);
  };

  const sexList = [
    {
      key: 'FEMALE',
      value: t('individuals.female')
    },
    {
      key: 'MALE',
      value: t('individuals.male')
    },
    {
      key: 'OTHER',
      value: t('individuals.other')
    },
    {
      key: 'UNKNOWN',
      value: t('individuals.unknown')
    }
  ] as any[];

  const getSelectValue = () => {
    return sexList.find((x) => x.key === filter.sex)?.value ?? '';
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
          <GaiaButton color="default" text={t('commons.buttons.filter')} icon={<FilterList />} onClick={handleExpandClick} style={{ marginLeft: 20 }} />
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
              <FilterTextField label={t('commons.fields.hpo')} value={filter.hpo} onChange={handleFilter} field="hpo" />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.icd10')} value={filter.icd10} onChange={handleFilter} field="icd10" />
            </Grid>
            <Grid item xs={12}>
              <GaiaSelectField
                label={t('commons.fields.sex')}
                name="sex"
                value={getSelectValue()}
                valueAccessor="key"
                labelAccessor="value"
                items={getSexList()}
                onChange={listHandleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.karyotypicSex')} value={filter.karyotypicSex} onChange={handleFilter} field="karyotypicSex" />
            </Grid>
            <Grid item xs={12}>
              <GaiaButton text={t('commons.buttons.reset')} fullWidth onClick={resetFilters} />
            </Grid>
          </Grid>
        </Popover>
        <Box display="flex" flexDirection="row">
          {Object.keys(filter).map((k: string) => (
            <>
              {(filter[k] || filter[k] === false) && k !== 'search' && k !== 'sortBy' && k !== 'sortDirection' && (
                <Chip label={t('commons.fields.' + k)} color="primary" style={{ marginRight: 5 }} onDelete={() => deleteFilter(k)} />
              )}
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default IndividualsFilterButtons;
