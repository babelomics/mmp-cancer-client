import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

interface IProps {
  icon: React.ReactNode | (() => React.ReactNode);
  iconSize?: number;
  buttonSizeHeight?: number;
  buttonSizeWidth?: number;
  text: string;
  textAlign?: 'bottom' | 'top' | 'right' | 'left';
  color?: 'primary' | 'inherit' | 'secondary' | 'default' | undefined;
  variant?: 'outlined' | 'text' | 'contained' | undefined;
  disabled?: boolean;
  style?: any;
  fixedSize?: boolean;
  onClick?: (e: any) => void;
}

const useStyles = makeStyles((theme) => ({
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

const GaiaIconButtonWithText = ({
  icon,
  iconSize = 32,
  buttonSizeWidth = 150,
  buttonSizeHeight = 150,
  text,
  textAlign = 'bottom',
  color = 'primary',
  variant = 'outlined',
  disabled,
  style,
  fixedSize,
  onClick
}: IProps) => {
  const classes = useStyles();

  const getTextAlign = (): string => {
    if (textAlign === 'bottom') return classes.labelBottom;
    if (textAlign === 'top') return classes.labelTop;
    if (textAlign === 'right') return classes.labelRight;
    if (textAlign === 'left') return classes.labelLeft;

    return classes.labelBottom;
  };

  return (
    <Button
      classes={{ label: getTextAlign() }}
      variant={variant}
      color={color}
      disableRipple={true}
      disabled={disabled}
      onClick={onClick}
      style={{ ...style, width: fixedSize ? buttonSizeHeight : 'auto', minWidth: buttonSizeWidth, height: buttonSizeHeight, justifyContent: 'space-between' }}
    >
      {React.cloneElement(icon as React.ReactElement<any>, { className: textAlign === 'bottom' ? classes.icon : '', style: { fontSize: iconSize } })}
      {text}
    </Button>
  );
};
export default GaiaIconButtonWithText;
