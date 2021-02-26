import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Box, Chip, IconButton, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { ICommonFilter } from '../../interfaces';

interface IProps {
  filter: any;
  hideAddBtn: boolean;
  setFilter: (newGeneFilter: ICommonFilter) => void;
  setIcd10OpenPopup: () => void;
}

const Icd10FilterButtons = (props: IProps) => {
  const { filter, setFilter } = props;
  const { t } = useTranslation();

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
          {!props.hideAddBtn && (
            <Tooltip title={addTooltip}>
              <IconButton onClick={props.setIcd10OpenPopup}>
                <Add />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Icd10FilterButtons;
