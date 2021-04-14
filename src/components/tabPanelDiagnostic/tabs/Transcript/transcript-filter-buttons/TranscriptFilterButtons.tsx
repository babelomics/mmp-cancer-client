import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

import { ITranscriptFilter } from '../../interfaces';
import Searchbar from '../../../../commons/tableFilter/Searchbar';

interface IProps {
  filter: any;
  hideAddBtn: boolean;
  setFilter: (newTranscriptFilter: ITranscriptFilter) => void;
  setTranscriptOpenPopup: () => void;
}

const TranscriptFilterButtons = (props: IProps) => {
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
        <Box display="flex" flexDirection="row" padding={2} alignSelf="end" alignItems="center" justifyContent="flex-end" style={{ width: '100%' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Searchbar variant="outlined" margin="dense" value={searchText} onChange={handleSearchTextChange} />
          </form>

          {!props.hideAddBtn && (
            <Tooltip title={addTooltip}>
              <IconButton onClick={props.setTranscriptOpenPopup}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          )}
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

export default TranscriptFilterButtons;
