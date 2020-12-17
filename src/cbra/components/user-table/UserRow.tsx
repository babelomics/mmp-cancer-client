import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { TableCell, TableRow } from '@material-ui/core';
import routes from '../../../components/router/routes';
import User from '../../../cbra/models/User';
import { doDateFormat } from '../../../utils/utils';


interface IProps {
    item: User;
}


function UserRow(props: IProps) {
    const { item: user } = props;

    const history = useHistory();
    const handleClick = useCallback((event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        history.push(`${routes.PATH_USER_PROFILE}/${user.identifier}`);
    }, [history, user]);

    return (
        <TableRow onClick={handleClick}>
            <TableCell>{user.identifier}</TableCell>
            <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.organization}</TableCell>
            <TableCell>{doDateFormat(undefined === user.dateCreated ? null : user.dateCreated)}</TableCell>
            <TableCell>{user.userType}</TableCell>
            <TableCell>{doDateFormat(undefined === user.dateLastAccess ? null : user.dateLastAccess)}</TableCell>
        </TableRow>
    );
}


export default UserRow;