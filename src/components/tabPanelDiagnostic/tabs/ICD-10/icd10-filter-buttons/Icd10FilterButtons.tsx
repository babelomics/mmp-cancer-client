import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

import { ICommonFilter } from '../../interfaces';

interface IProps {
  filter: any;
  hideAddBtn: boolean;
  setFilter: (newGeneFilter: ICommonFilter) => void;
  setIcd10OpenPopup: () => void;
}

const Icd10FilterButtons = (props: IProps) => {
  const { t } = useTranslation();

  const addTooltip = t('commons.table.addTooltip');

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" padding={2} alignSelf="end" alignItems="center" justifyContent="flex-end" style={{ width: '100%' }}>
          {!props.hideAddBtn && (
            <Tooltip title={addTooltip}>
              <IconButton onClick={props.setIcd10OpenPopup}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Icd10FilterButtons;
