import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IHumanDisease } from '../../../../individualsManagement/interfaces';
import DiseasesRow from './DiseasesRow';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import DiseasesRowWrapper from './DiseasesRowWrapper';
import DiseasesTableHeader from './DiseasesTableHeader';
import LazyList from '../../../../commons/tableFilter/LazyList';

interface IProps {
  itemsList: IHumanDisease[];

  onDelete: (id: IHumanDisease) => void;
  rowClick: (disease: IHumanDisease) => void;
}

function getICD10Id(icd10: IHumanDisease) {
  return icd10.diseaseId;
}

const DiseasesTable = (props: IProps) => {
  const { onDelete } = props;

  const fetchicd10IndividualsPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getICD10Individuals(props.itemsList);
    },
    [props.itemsList]
  );

  return (
    <TableContainer>
      <Table>
        <DiseasesTableHeader label={''} {...props} />
        <TableBody>
          <LazyList<IHumanDisease>
            token={{}}
            ChildElem={DiseasesRow}
            fetchPage={fetchicd10IndividualsPage}
            ChildWrapper={DiseasesRowWrapper}
            getElemId={getICD10Id}
            onDelete={onDelete}
            isReduxOnly
            rowClick={props.rowClick}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DiseasesTable;
