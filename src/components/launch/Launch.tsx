import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Grid, Paper, Typography } from '@material-ui/core';
import ILaunchState from './interfaces';
import GaiaContainer from '../commons/GaiaContainer';
import parse from 'html-react-parser';

interface IProps {
  launch: ILaunchState;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto'
    },
    image: {
      width: 225,
      height: 225,
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%'
    },
    innerPaper: {
      padding: theme.spacing(2),
      margin: 'auto',
      backgroundColor: '#F5F5F5',
    }
  })
);

export const Launch = (props: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <GaiaContainer isLaunchScreen>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <img className={classes.image} alt="icon" src={'/images/Icono2.png'} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.innerPaper}>
            <Typography gutterBottom variant="h6">
              {t('launch.administrationInfoTitle')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {parse(props.launch.data.text)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.innerPaper}>
            <Typography gutterBottom variant="h6">
              {t('launch.installationInfoTitle')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('launch.installationInfoText')}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </GaiaContainer>
  );
};

export default Launch;
