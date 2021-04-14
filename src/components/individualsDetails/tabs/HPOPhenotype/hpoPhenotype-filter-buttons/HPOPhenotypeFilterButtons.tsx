import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import routes from '../../../../router/routes';
import { useHistory } from 'react-router-dom';

interface IProps {
  setHPOOpenPopup: () => void;
}

const HPOPhenoptypeFilterButtons = (props: IProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const addTooltip = t('commons.table.addTooltip');

  const handleProject = useCallback(() => {
    history.push(routes.PATH_PROJECT_PROFILE);
  }, [history]);

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" padding={2} alignSelf="end" alignItems="center" justifyContent="flex-end" style={{ width: '100%' }}>
          <Tooltip title={addTooltip} onClick={handleProject}>
            <IconButton onClick={props.setHPOOpenPopup}>
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default HPOPhenoptypeFilterButtons;
