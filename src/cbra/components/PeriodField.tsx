import React from 'react';
import { Box } from '@material-ui/core';

import DateField from './DateField';


interface IProps {
    afterLabel: string;
    beforeLabel: string;
    after?: Date;
    before?: Date;
    onAfterChange: (newDate?: Date) => void;
    onBeforeChange: (newDate?: Date) => void;
    [props: string]: any;
}


function PeriodField(props: IProps) {
    const { afterLabel, beforeLabel, after, before, onAfterChange, onBeforeChange, ...restProps } = props;
    return (
        <Box display="flex">
            <Box flexGrow={1} />
            <Box padding={1}>
                <DateField {...restProps} label={afterLabel} value={after} onChange={onAfterChange} />
            </Box>
            <Box flexGrow={1} />
            <Box padding={1}>
                <DateField {...restProps} label={beforeLabel} value={before} onChange={onBeforeChange} />
            </Box>
            <Box flexGrow={1} />
        </Box>
    );
}


export default PeriodField;