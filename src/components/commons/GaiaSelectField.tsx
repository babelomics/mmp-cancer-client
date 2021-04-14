import React, { ReactNode, useEffect, useState } from 'react';
import { FormControl, FormHelperText, MenuItem, Select, makeStyles, Tooltip, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import _ from 'lodash';

import AppTheme from '../../theme';
import { useTranslation } from 'react-i18next';

interface IProps {
  name: string;
  label?: String;
  formik?: any;
  items: any[];
  value?: any;
  valueAccessor?: string;
  labelAccessor?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
  tooltip?: string;
  tooltipAccessor?: string;
  onChange?: (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
}

const useStyles = makeStyles((theme) => ({
  filled: {
    borderRadius: 0,
    backgroundColor: theme.textfield.background
  },
  error: {
    color: 'red'
  }
}));

const filledTheme = createMuiTheme({
  palette: AppTheme.palette,
  overrides: {
    MuiOutlinedInput: {
      root: {
        '& $notchedOutline': {
          borderColor: 'transparent'
        }
      }
    }
  }
});

const GaiaSelectField = ({
  required,
  disabled,
  items,
  value,
  valueAccessor,
  labelAccessor,
  name,
  label,
  formik,
  className,
  fullWidth = true,
  variant = 'outlined',
  tooltip,
  tooltipAccessor,
  onChange
}: IProps) => {
  const [valueState, setValue] = useState<string>(value || '');
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    if (formik) {
      const findValue = _.get(formik.values, name);

      if (typeof findValue === 'string') {
        let index = -1;

        if (valueAccessor && labelAccessor) {
          index = items.findIndex((x) => x[valueAccessor].toLowerCase() === findValue.toLowerCase());
          if (index > -1) {
            setValue(items[index][valueAccessor]);
          }
        } else {
          index = items.findIndex((x) => x.toLowerCase() === findValue.toLowerCase());
          if (index > -1) {
            setValue(items[index]);
          }
        }
      } else {
        setValue(findValue);
      }
    }
  }, [formik?.values]);

  const renderItems = (): ReactNode => {
    let array = [];
    if (!required) {
      if (valueAccessor || labelAccessor) {
        array.push({
          key: '',
          value: t('commons.selectOption')
        });
      } else {
        array.push('');
      }
    }
    array = array.concat(items);
    return array.map((e: any, i: number) => {
      let value = e;
      let label = e;
      if (valueAccessor) value = e[valueAccessor];
      if (labelAccessor) label = e[labelAccessor];

      return (
        <MenuItem key={`select-${i}`} value={value}>
          {label}
        </MenuItem>
      );
    });
  };

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode | undefined
  ) => {
    const value = e.target.value;

    if (formik) {
      formik.handleChange(e);
      if (onChange) {
        onChange(e, child);
      }
    } else {
      setValue(value as string);
      if (onChange) {
        onChange(e, child);
      }
    }
  };

  const getValueByFormik = () => {
    const findValue = _.get(formik.values, name);

    if (typeof findValue === 'string') {
      const index = items.findIndex((x) => {
        if (labelAccessor && valueAccessor) {
          return x[valueAccessor].toLowerCase() === findValue.toLowerCase();
        }
        return x.toLowerCase() === findValue.toLowerCase();
      });

      if (index > -1) {
        if (labelAccessor && valueAccessor) {
          return items[index][valueAccessor];
        }
        return items[index];
      }
    }

    return findValue;
  };

  const renderSelect = () => (
    <MuiThemeProvider theme={variant === 'filled' ? filledTheme : AppTheme}>
      <Select
        className={variant === 'filled' ? classes.filled : ''}
        classes={{
          root: variant === 'filled' ? classes.filled : undefined,
          outlined: variant === 'filled' ? classes.filled : undefined,
          select: formik && formik.submitCount > 0 && !!formik.errors[name] ? classes.error : undefined,
          icon: formik && formik.submitCount > 0 && !!formik.errors[name] ? classes.error : undefined
        }}
        variant="outlined"
        disabled={disabled}
        name={name}
        error={formik ? formik.submitCount > 0 && !!formik.errors[name] : undefined}
        value={formik ? getValueByFormik() : valueState}
        onChange={handleChange}
        displayEmpty
        renderValue={(v: any) => {
          if (v) {
            if (labelAccessor && valueAccessor && !value) {
              return items.find((x) => x[valueAccessor] === v)[labelAccessor];
            }
            if (value) {
              return value;
            }
            return v;
          }
          if (value) {
            return value;
          }
          return `${label || t('commons.selectOption')} ${required ? '*' : ''}`;
        }}
        style={variant === 'outlined' ? { height: 45 } : {}}
        IconComponent={KeyboardArrowDown}
      >
        {renderItems()}
      </Select>
    </MuiThemeProvider>
  );

  const getTooltip = () => {
    if (!tooltipAccessor) return tooltip;

    if (valueState && valueAccessor) {
      return items.find((x) => x[valueAccessor] === valueState)[tooltipAccessor];
    }
    return '';
  };

  return (
    <FormControl required={required} className={className} style={{ width: fullWidth ? '100%' : 'auto' }}>
      {tooltip || tooltipAccessor ? <Tooltip title={getTooltip()}>{renderSelect()}</Tooltip> : renderSelect()}
      <FormHelperText style={{ color: 'red' }}> {formik ? formik.submitCount > 0 && formik.errors[name] : ''}</FormHelperText>
    </FormControl>
  );
};
export default GaiaSelectField;
