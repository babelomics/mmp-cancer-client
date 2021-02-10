import React, { useCallback, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { UserFilter } from '../interfaces';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface IProps {
    filter: UserFilter;
    setFilter: (newUserFilter: UserFilter) => void;
    label: string;
}

function UserTypeSelector(props: IProps) {
    const { t } = useTranslation();
    const { filter, setFilter, label } = props;
    const [typeValue, setTypeValue] = useState<string | undefined>(filter.userType);

    const userTypes = [t('commons.fields.userTypeOptions.admin'), t('commons.fields.userTypeOptions.user')];

    useEffect(() => {
        setTypeValue(filter.userType);
      }, [filter]);

    const handleChange = useCallback((event: object, value: string | null) => {
        if (!value && !!filter.userType) {
            const { userType, ...newFilter } = filter;
            setFilter(newFilter);
        } else if (!!value) {
            const newFilter = { ...filter, userType: value } as UserFilter;
            setFilter(newFilter);
        }
    }, [filter, setFilter])

    return (
        <Autocomplete key={typeValue} fullWidth options={userTypes} value={typeValue} onChange={handleChange} inputValue={typeValue}
            renderInput={(params) => (
                <TextField margin="dense" variant="outlined" label={label} {...params}/>
            )}
        />
    );
}

export default UserTypeSelector;
