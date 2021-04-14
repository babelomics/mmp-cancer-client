import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

interface IProps {
  text: string;
  icon?: React.ReactNode | (() => React.ReactNode);
  iconSize?: number;
  variant?: 'contained' | 'text' | 'outlined';
  color?: 'primary' | 'secondary' | 'default';
  textAlign?: 'bottom' | 'top' | 'right' | 'left';
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit' | undefined;
  uppercase?: boolean;
  fullWidth?: boolean;
  style?: any;
  bold?: boolean;
  onClick?: (e: any) => void;
}

const useStyles = makeStyles((theme) => ({
  bPrimary: {
    backgroundColor: theme.buttons.primary.main,
    maxHeight: 36,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.buttons.primary.dark,
      boxShadow: 'none'
    },
    color: theme.buttons.primary.text
  },

  bPrimaryOutlined: {
    backgroundColor: 'transparent',
    maxHeight: 36,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.buttons.primary.main}`,
      boxShadow: 'none'
    },
    color: theme.buttons.primary.main
  },

  bSecondary: {
    backgroundColor: theme.buttons.secondary.main,
    maxHeight: 36,
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.buttons.secondary.dark,
      boxShadow: 'none'
    },
    color: theme.buttons.secondary.text
  },

  bDefault: {
    backgroundColor: theme.buttons.default.main,
    border: `1px solid ${theme.buttons.default.border?.main}`,
    boxShadow: 'none',
    fontWeight: 'bolder',
    maxHeight: 36,
    '&:hover': {
      border: `1px solid ${theme.buttons.default.border?.dark}`,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      fontWeight: 'bold'
    },
    color: theme.buttons.default.text
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

const GaiaButton = ({ text, icon, iconSize = 20, color = 'primary', textAlign = 'right', variant = 'contained', disabled, type = 'button', uppercase, fullWidth, onClick, style, bold }: IProps) => {
  const classes = useStyles();

  const getStyleClass = () => {
    if (color === 'secondary') {
      return classes.bSecondary;
    }
    if (color === 'default') {
      return classes.bDefault;
    }

    if (variant === 'outlined') {
      return classes.bPrimaryOutlined;
    }
    return classes.bPrimary;
  };

  const getTextAlign = (): string => {
    if (textAlign === 'bottom') return classes.labelBottom;
    if (textAlign === 'top') return classes.labelTop;
    if (textAlign === 'right') return classes.labelRight;
    if (textAlign === 'left') return classes.labelLeft;

    return classes.labelBottom;
  };

  return (
    <Button
      classes={{ root: getStyleClass(), label: icon ? getTextAlign() : undefined }}
      variant={variant}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      style={{ fontSize: 16, fontWeight: bold ? 'bold' : 'normal', ...style }}
    >
      {icon && React.cloneElement(icon as React.ReactElement<any>, { className: textAlign === 'bottom' ? classes.icon : '', style: { fontSize: iconSize, marginRight: 10 } })}
      {uppercase ? text?.toUpperCase() : text}
    </Button>
  );
};

export default GaiaButton;
