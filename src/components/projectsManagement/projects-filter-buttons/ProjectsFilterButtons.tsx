import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Box, Chip, Grid, makeStyles, Popover } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import GaiaButton from '../../commons/GaiaButton';

import { IProjectsFilter } from '../interfaces';
import Searchbar from '../../commons/tableFilter/Searchbar';
import FilterDateField from '../../commons/tableFilter/FilterDateField';
import FilterTextField from '../../commons/tableFilter/FilterTextField';
import { ITableAssemblyData } from '../../genomicRefPopup/interfaces';
import ModalTableAssembly from '../../genomicRefPopup/ModalTableAssembly';
import ILogin from '../../login/interfaces';

interface IProps {
  filter: any;
  setFilter: (newProjectsFilter: IProjectsFilter) => void;
  login: ILogin;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 15,
    width: 450
  }
}));

const ProjectsFilterButtons = (props: IProps) => {
  const { filter, setFilter } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openAssemblyPopup, setOpenAssemblyPopup] = useState<boolean>(false);
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

  const clicAssemblyButton = () => {
    setOpenAssemblyPopup(true);
  };

  const handleClickRow = (assembly: ITableAssemblyData) => {
    handleFilter(assembly.accession, 'assembly');
    setOpenAssemblyPopup(false);
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
              <FilterTextField label={t('commons.fields.projectId')} value={filter.projectId} onChange={handleFilter} field="projectId" />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.name')} value={filter.name} onChange={handleFilter} field="name" />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.organism')} value={filter.organism} onChange={handleFilter} field="organism" />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.assembly')} disabled value={filter.assembly || ''} onChange={handleFilter} field="assembly" />
            </Grid>
            <Grid item xs={12}>
              <GaiaButton text={t('commons.buttons.selectAssemblyFilter')} fullWidth onClick={clicAssemblyButton} />
            </Grid>
            <Grid item xs={12}>
              <FilterTextField label={t('commons.fields.ensemblRelease')} value={filter.ensemblRelease} onChange={handleFilter} field="ensemblRelease" />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.creationDateStart} onChange={handleFilter} label={t('commons.fields.createdAfter')} field="creationDateStart" />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.creationDateEnd} onChange={handleFilter} label={t('commons.fields.createdBefore')} field="creationDateEnd" />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.modificationDateStart} onChange={handleFilter} label={t('commons.fields.lastUpdateAfter')} field="modificationDateStart" />
            </Grid>
            <Grid item xs={6}>
              <FilterDateField value={filter.modificationDateEnd} onChange={handleFilter} label={t('commons.fields.lastUpdateBefore')} field="modificationDateEnd" />
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
        {openAssemblyPopup && <ModalTableAssembly handleClickRow={handleClickRow} titlePopup={t('panelSetCreate.titlePopupTableAssemblies')} open={true} openPopupParent={setOpenAssemblyPopup} />}
      </Box>
    </>
  );
};

export default ProjectsFilterButtons;
