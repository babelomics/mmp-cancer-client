import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

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

export const UnderMaintenance = (props: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.root} boxShadow={1} justifyContent="center" alignItems="center">
      <div className={classes.wrapper}>
        <div className={classes.row}>
          <Typography variant="h1">{t('UnderMaintenance.title')}</Typography>
        </div>
      </div>
    </Box>
  );
};

export default UnderMaintenance;
