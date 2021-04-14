import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

interface IProps {
  icon: React.ReactNode | (() => React.ReactNode);
  iconSize?: number;
  buttonSizeHeight?: number;
  buttonSizeWidth?: number;
  text: string;
  textAlign?: 'bottom' | 'top' | 'right' | 'left';
  color?: string;
  darkColor?: string;
  variant?: 'outlined' | 'text' | 'contained' | undefined;
  disabled?: boolean;
  style?: React.CSSProperties | undefined;
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
    color: '#FFFFFF',
    width: '84px',
    height: '84px'
  },
  textButton: {
    display: 'block',
    textAlign: 'center',
    marginTop: '10px',
    fontWeight: 'bold',
    maxWidth: '150px',
    maxHeight: '20px'
  },
  root: {
    backgroundColor: (props: any) => props.color,
    '&:hover': { backgroundColor: (props: any) => props.darkColor }
  }
}));

const GaiaIconButtonHome = ({
  icon,
  iconSize = 32,
  buttonSizeWidth = 150,
  buttonSizeHeight = 150,
  text,
  textAlign = 'bottom',
  color,
  darkColor,
  variant = 'contained',
  disabled,
  style,
  fixedSize,
  onClick
}: IProps) => {
  const classes = useStyles({ color, darkColor });

  const getTextAlign = (): string => {
    if (textAlign === 'bottom') return classes.labelBottom;
    if (textAlign === 'top') return classes.labelTop;
    if (textAlign === 'right') return classes.labelRight;
    if (textAlign === 'left') return classes.labelLeft;

    return classes.labelBottom;
  };

  return (
    <React.Fragment>
      <div style={{ textAlignLast: 'center' }}>
        <Button
          classes={{ label: getTextAlign(), root: classes.root }}
          variant={variant}
          disableRipple={true}
          disabled={disabled}
          onClick={onClick}
          style={{ ...style, width: fixedSize ? buttonSizeHeight : 'auto', minWidth: buttonSizeWidth, height: buttonSizeHeight, justifyContent: 'space-between' }}
        >
          {React.cloneElement(icon as React.ReactElement<any>, { className: textAlign === 'bottom' ? classes.icon : '', style: { fontSize: iconSize } })}
        </Button>
        <span className={classes.textButton}>{text}</span>
      </div>
    </React.Fragment>
  );
};
export default GaiaIconButtonHome;
