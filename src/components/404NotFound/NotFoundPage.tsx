import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import GaiaButton from '../commons/GaiaButton';

interface IProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: 30,
    height: '80vh'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-evenly'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  }
}));

export const NotFoundPage = (props: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Box className={classes.root} boxShadow={1} justifyContent="center" alignItems="center">
      <div className={classes.wrapper}>
        <div className={classes.row}>
          <Typography variant="h1">404</Typography>
        </div>
        <div className={classes.row}>
          <Typography variant="h4">{t('notFoundPage.title')}</Typography>
        </div>
        <div className={classes.row}>
          <GaiaButton text={t('commons.buttons.goBackVariant')} onClick={() => history.goBack()} />
        </div>
      </div>
    </Box>
  );
};

export default NotFoundPage;
