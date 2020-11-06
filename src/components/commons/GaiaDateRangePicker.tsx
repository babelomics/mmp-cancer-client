import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import usePrevious from '../../hooks/usePrevious';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment, { Moment } from 'moment';

interface IProps {
  fullWidth?: boolean;
  onChange?: (datesObj: IDates | null) => void;
  range?: IDates;
}

export interface IDates {
  [key: string]: string | Moment | null | undefined;
}

const GaiaDateRangePicker = ({ fullWidth, onChange, range }: IProps) => {
  const [dates, setDates] = useState<IDates>({
    fromDate: null,
    toDate: null
  });

  useEffect(() => {
    if (range) {
      let from = range.fromDate;
      let to = range.toDate;
      if (typeof (range.fromDate) === 'string') {
        from = moment(range.fromDate, "DD/MM/YYYY");
      }
      if (typeof (range.toDate) === 'string') {
        to = moment(range.toDate, "DD/MM/YYYY");
      }
      setDates({ fromDate: from, toDate: to });
    }
  }, []);

  const prevDates = usePrevious(dates);
  useEffect(() => {
    if (!_.isEqual(prevDates, dates) && prevDates !== undefined) {
      if (onChange) {
        if (dates.fromDate === null && dates.toDate === null) {
          onChange(null);
        }
        else {
          onChange({
            fromDate: (dates.fromDate === null ? null : moment(dates.fromDate).format('DD/MM/YYYY')),
            toDate: (dates.toDate === null ? null : moment(dates.toDate).format('DD/MM/YYYY'))
          });
        }

      }
    }
  }, [prevDates, dates]);

  const handleChange = (date: MaterialUiPickersDate, key: string, value?: string | null | undefined) => {
    setDates({ ...dates, [key]: date });
  };

  return (
    <div style={{ display: 'flex' }}>
      <KeyboardDatePicker
        autoOk
        value={dates.fromDate}
        variant="inline"
        inputVariant="outlined"
        format="DD/MM/YYYY"
        InputAdornmentProps={{ position: 'end' }}
        onChange={(date, value) => handleChange(date, 'fromDate', value)}
        fullWidth={fullWidth}
      />
      <div style={{ alignSelf: 'center', marginLeft: 10, marginRight: 10 }}>-</div>
      <KeyboardDatePicker
        autoOk
        value={dates.toDate}
        variant="inline"
        inputVariant="outlined"
        format="DD/MM/YYYY"
        InputAdornmentProps={{ position: 'end' }}
        onChange={(date, value) => handleChange(date, 'toDate', value)}
        fullWidth={fullWidth}
      />
    </div>
  );
};
export default GaiaDateRangePicker;
