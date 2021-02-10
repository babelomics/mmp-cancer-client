import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { RegistrationFilter, Registration } from '../interfaces';
import LazyList from '../../commons/tableFilter/LazyList';
import RegistrationRow from './RegistrationRow';
import MmpClient from '../../commons/tableFilter/MmpClient';
import RegistrationTableHeader from './RegistrationTableHeader';
import RegistrationRowWrapper from './RegistrationRowWrapper';

interface IProps {
  filter: RegistrationFilter;
  setFilter: (newFilter: RegistrationFilter) => void;
}

function getRegistrationId(registration: Registration) {
  return registration.identifier;
}

function RegistrationTable(props: IProps) {
  const { filter } = props;

  const fetchRegistrationPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getRegistrationPage(filter, pageSize, page);
    },
    [filter]
  );

  return (
    <TableContainer>
      <Table>
        <RegistrationTableHeader {...props} />
        <TableBody>
          <LazyList<Registration> token={filter} ChildElem={RegistrationRow} fetchPage={fetchRegistrationPage} ChildWrapper={RegistrationRowWrapper} getElemId={getRegistrationId} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RegistrationTable;
