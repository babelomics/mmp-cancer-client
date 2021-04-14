import React, { useCallback } from 'react';
import { Table, TableBody, TableContainer } from '@material-ui/core';
import { IHumanPhenotype } from '../../../../individualsManagement/interfaces';
import HPOPhenotypeRow from './HPOPhenotypeRow';
import MmpClient from '../../../../commons/tableFilter/MmpClient';
import HPOPhenotypeRowWrapper from './HPOPhenotypeRowWrapper';
import HPOPhenotypeTableHeader from './HPOPhenotypeTableHeader';
import LazyList from '../../../../commons/tableFilter/LazyList';

interface IProps {
  itemsList: IHumanPhenotype[];
  onDelete: (id: IHumanPhenotype) => void;
  rowClick: (hpo: IHumanPhenotype) => void;
}

function getHPOPhenotypeId(hpoPhenotype: IHumanPhenotype) {
  return hpoPhenotype.phenotypeId;
}

const HPOPhenotypeTable = (props: IProps) => {
  const { onDelete } = props;

  const fetchhpoIndividualsPage = useCallback(
    (pageSize: number, page: number) => {
      return MmpClient.getHPOIndividuals(props.itemsList);
    },
    [props.itemsList]
  );

  return (
    <TableContainer>
      <Table>
        <HPOPhenotypeTableHeader label={''} {...props} />
        <TableBody>
          <LazyList<IHumanPhenotype>
            token={{}}
            ChildElem={HPOPhenotypeRow}
            fetchPage={fetchhpoIndividualsPage}
            ChildWrapper={HPOPhenotypeRowWrapper}
            getElemId={getHPOPhenotypeId}
            onDelete={onDelete}
            isReduxOnly
            rowClick={props.rowClick}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HPOPhenotypeTable;
