import React from 'react';
import { useSelector } from 'react-redux';
import UserFilter from '../../../cbra/models/UserFilter';
import LazyList from '../../../cbra/components/LazyList';
import UserRow from './UserRow';
import MmpClient from '../../../cbra/clients/MmpClient';
import { Table, TableBody } from '@material-ui/core';
import User from '../../../cbra/models/User';
import UserTableHeader from './UserTableHeader';





interface IProps {
    filter: UserFilter;
}


function UserTable(props: IProps) {

    const { filter } = props;

    const sessionToken = useSelector((state: any) => state.login.localUser.token.substring(7));

    const fetchUserPage = (pageSize: number, page: number, abortSignal: AbortSignal) => {
        return MmpClient.getUserPage(sessionToken, filter, pageSize, page, abortSignal);
    }

    return (
        <Table>
            <UserTableHeader />
            <TableBody>
                <LazyList<User> token={filter} ChildElem={UserRow} fetchPage={fetchUserPage} />
            </TableBody>
        </Table>
    );
}


export default UserTable;