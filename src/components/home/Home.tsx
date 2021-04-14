import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { GridList, GridListTile } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import Alert from '@material-ui/lab/Alert';

import getMenuItems from './menuItems';
import GaiaIconButtonHome from '../commons/GaiaIconButtonHome';
import { ITokenData } from '../login/interfaces';

interface IProps {
  user: ITokenData | null;
  width: any;
  configured: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: 30
  },
  gridList: {
    alignItems: 'center'
    // width: '80%',
    // height: '100%'
  },
  tile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export const Home = (props: IProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  // const getGridListCols = () => {
  //   if (isWidthUp('xl', props.width)) {
  //     return 5;
  //   }

  //   if (isWidthUp('lg', props.width)) {
  //     return 4;
  //   }

  //   if (isWidthUp('md', props.width)) {
  //     return 3;
  //   }

  //   if (isWidthUp('sm', props.width)) {
  //     return 2;
  //   }

  //   return 1;
  // };

  const isHidden = (item: any) => {
    if (props.user) {
      if (!props.configured && props.user.isAdmin) {
        return !item.notConfigured && props.user.isAdmin;
      }
      return item.hidden && !props.user.isAdmin;
    }
    return true;
  };

  return (
    <div className={classes.root}>
      {!props.configured && <Alert severity="error">{t('appConfiguration.alertNotConfigured')}</Alert>}
      <GridList spacing={10} cols={3} className={classes.gridList} cellHeight={220}>
        {getMenuItems(t).map((item, i) => {
          return (
            <GridListTile
              key={i}
              classes={{
                tile: classes.tile
              }}
              hidden={isHidden(item)}
            >
              <GaiaIconButtonHome icon={item.icon} iconSize={item.iconSize} text={item.text} color={item.color} darkColor={item.darkColor} onClick={() => history.push(item.route)} fixedSize />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default withWidth()(Home);
