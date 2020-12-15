import React from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';


function UserTableHeader() {
    const { t } = useTranslation();
    return (
        <TableHead>
            <TableRow>
                <TableCell>{t('commons.fields.identifier')}</TableCell>
                <TableCell>{t('commons.fields.firstName')}</TableCell>
                <TableCell>{t('commons.fields.email')}</TableCell>
                <TableCell>{t('commons.fields.organization')}</TableCell>
                <TableCell>{t('commons.fields.dateCreated')}</TableCell>
                <TableCell>{t('commons.fields.userType.title')}</TableCell>
                <TableCell>{t('commons.fields.dateLastAccess')}</TableCell>
            </TableRow>
        </TableHead>
    );
}


export default UserTableHeader;