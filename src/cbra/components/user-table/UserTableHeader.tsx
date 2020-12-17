import React from 'react';
import { Button, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import UserFilter from '../../models/UserFilter';
import SortDirection from '../../models/SortDirection';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


function toggleSortDirection(direction?: SortDirection) {
    return SortDirection.DESC === direction ? SortDirection.ASC : SortDirection.DESC;
}


interface CHProps {
    label: string;
    sortId?: string;
    filter: UserFilter;
    setFilter: (newFilter: UserFilter) => void;
}


class ColumnHeader extends React.PureComponent<CHProps> {

    render() {
        const { label, sortId, filter } = this.props;
        if (!!sortId) {
            const selected = !!sortId && sortId === filter.sortBy;
            return (
                <TableCell>
                    <Button color={selected ? "primary" : "default"} onClick={this.handleClick} >
                        {label}
                        {selected && SortDirection.ASC === filter.sortDirection && <ArrowDownwardIcon fontSize="small" />}
                        {selected && SortDirection.DESC === filter.sortDirection && <ArrowUpwardIcon fontSize="small" />}
                    </Button>
                </TableCell>
            );
        } else {
            return (
                <TableCell>{label}</TableCell>
            );
        }
    }

    private readonly handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { sortId, filter, setFilter } = this.props;
        const newFilter = {
            ...filter,
            sortBy: sortId,
            sortDirection: sortId === filter.sortBy ? toggleSortDirection(filter.sortDirection) : filter.sortDirection || SortDirection.ASC
        } as UserFilter;
        setFilter(newFilter);
    }
}


interface IProps {
    filter: UserFilter;
    setFilter: (newFilter: UserFilter) => void;
}


function UserTableHeader(props: IProps) {
    const { filter, setFilter } = props;
    const { t } = useTranslation();
    return (
        <TableHead>
            <TableRow>
                <ColumnHeader label={t('commons.fields.identifier')} sortId="identifier" filter={filter} setFilter={setFilter} />
                <ColumnHeader label={t('commons.fields.firstName')} sortId="firstName" filter={filter} setFilter={setFilter} />
                <ColumnHeader label={t('commons.fields.email')} sortId="email" filter={filter} setFilter={setFilter} />
                <ColumnHeader label={t('commons.fields.organization')} sortId="organization" filter={filter} setFilter={setFilter} />
                <ColumnHeader label={t('commons.fields.dateCreated')} sortId="dateCreated" filter={filter} setFilter={setFilter} />
                <ColumnHeader label={t('commons.fields.userType.title')} sortId="userType" filter={filter} setFilter={setFilter} />
                <ColumnHeader label={t('commons.fields.dateLastAccess')} sortId="dateLastAccess" filter={filter} setFilter={setFilter} />
            </TableRow>
        </TableHead>
    );
}


export default UserTableHeader;