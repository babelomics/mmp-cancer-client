import React, { useCallback } from 'react';
import { TextField } from '@material-ui/core';

import UserFilter from '../../models/UserFilter';
import Autocomplete from '@material-ui/lab/Autocomplete';


const userTypes = ["Admin", "User"];


interface IProps {
    filter: UserFilter;
    setFilter: (newUserFilter: UserFilter) => void;
}


function UserTypeSelector(props: IProps) {

    const { filter, setFilter } = props;

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
        <Autocomplete fullWidth options={userTypes} value={filter.userType} onChange={handleChange}
            renderInput={(params) => (
                <TextField margin="dense" variant="outlined" label="User type" {...params} />
            )}
        />
    );
}


export default UserTypeSelector;
