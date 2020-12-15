import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import User from '../../../cbra/models/User';
import { doDateFormat } from '../../../utils/utils';


interface IProps {
    item: User;
}


function UserRow(props: IProps) {
    const { item: user } = props;
    return (
        <TableRow>
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