import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

import { IHPOFilter } from '../../interfaces';

interface IProps {
  filter: any;
  hideAddBtn: boolean;
  setFilter: (newHPOFilter: IHPOFilter) => void;
  setHPOOpenPopup: () => void;
}

const HPOFilterButtons = (props: IProps) => {
  const { t } = useTranslation();

  const addTooltip = t('commons.table.addTooltip');

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" padding={2} alignSelf="end" alignItems="center" justifyContent="flex-end" style={{ width: '100%' }}>
          {!props.hideAddBtn && (
            <Tooltip title={addTooltip}>
              <IconButton onClick={props.setHPOOpenPopup}>
                <AddCircle />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HPOFilterButtons;
