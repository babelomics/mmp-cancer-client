import { makeStyles } from '@material-ui/core';
import React from 'react';

import './loading.css';

interface IProps {
  size?: number;
  numberOfDots?: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const GaiaLoading = ({ size = 150, numberOfDots = 10 }: IProps) => {
  const classes = useStyles();

  const renderDna = () => {
    const arr: any[] = [];

    for (var i = 0; i <= numberOfDots; i++) {
      arr.push(<div key={`dna-${i}`} className="dna" style={{ animationDelay: `${0.2 * i}s` }} />);
    }

    return arr;
  };

  return (
    <div className={classes.root}>
      <div id="DNA">{renderDna()}</div>
    </div>
  );
};
export default GaiaLoading;
