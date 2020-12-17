

import React from 'react';
import { Table, TableBody } from '@material-ui/core';
import { useSelector } from 'react-redux';
import UserFilter from '../../../cbra/models/UserFilter';
import LazyList from '../../../cbra/components/LazyList';
import UserRow from './UserRow';
import MmpClient from '../../../cbra/clients/MmpClient';
import User from '../../../cbra/models/User';
import UserTableHeader from './UserTableHeader';
import UserRowWrapper from './UserRowWrapper';


interface IProps {
    filter: UserFilter;
    setFilter: (newFilter: UserFilter) => void;
}


function getUserId(user: User) {
    return user.identifier;
}


function UserTable(props: IProps) {

    const { filter, setFilter } = props;

    const sessionToken = useSelector((state: any) => state.login.localUser.token.substring(7));

    const fetchUserPage = (pageSize: number, page: number, abortSignal: AbortSignal) => {
        return MmpClient.getUserPage(sessionToken, filter, pageSize, page, abortSignal);
    }

    return (
        <Table>
            <UserTableHeader {...props} />
            <TableBody>
                <LazyList<User> token={filter} ChildElem={UserRow} fetchPage={fetchUserPage} ChildWrapper={UserRowWrapper} />
            </TableBody>
        </Table>
    );
}


export default UserTable;