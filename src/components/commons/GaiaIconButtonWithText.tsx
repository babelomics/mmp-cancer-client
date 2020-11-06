import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

interface IProps {
  icon: React.ReactNode | (() => React.ReactNode);
  iconSize?: number;
  text: string;
  textAlign?: 'bottom' | 'top' | 'right' | 'left';
  color?: 'primary' | 'inherit' | 'secondary' | 'default' | undefined;
  variant?: 'outlined' | 'text' | 'contained' | undefined;
  disabled?: boolean;
  onClick?: (e: any) => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    height: 150,
    width: 150
  },
  labelBottom: {
    flexDirection: 'column'
  },
  labelTop: {
    flexDirection: 'column-reverse'
  },
  labelRight: {
    flexDirection: 'row'
  },
  labelLeft: {
    flexDirection: 'row-reverse'
  },
  icon: {
    marginBottom: theme.spacing(2)
  }
}));

const GaiaIconButtonWithText = ({ icon, iconSize = 32, text, textAlign = 'bottom', color = 'primary', variant = 'outlined', disabled, onClick }: IProps) => {
  const classes = useStyles();

  const getTextAlign = (): string => {
    if (textAlign === 'bottom') return classes.labelBottom;
    if (textAlign === 'top') return classes.labelTop;
    if (textAlign === 'right') return classes.labelRight;
    if (textAlign === 'left') return classes.labelLeft;

    return classes.labelBottom;
  };

  return (
    <Button classes={{ root: classes.button, label: getTextAlign() }} variant={variant} color={color} disableRipple={true} disabled={disabled} onClick={onClick}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: classes.icon, style: { fontSize: iconSize } })}
      {text}
    </Button>
  );
};
export default GaiaIconButtonWithText;
