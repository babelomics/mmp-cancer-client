import React, { useState } from 'react';
import { IHPO, IHPOFilter } from '../interfaces';
import HPOFilterButtons from './hpo-filter-buttons/HPOFilterButtons';
import HPOTable from './hpo-table/HPOTable';

interface IProps {
  assembly: string;
  itemsList: any[];
  setHPOOpenPopup: () => void;
  deleteHPO: (id: string) => void;
}

const defaultUserFilter = {} as IHPO;

const HPOList = (props: IProps) => {
  const [filter, setFilter] = useState<IHPOFilter>(defaultUserFilter);

  const handleDelete = (hpo: IHPO) => {
    props.deleteHPO(hpo.hpoId);
  };

  return (
    <React.Fragment>
      <HPOFilterButtons filter={filter} setFilter={setFilter} setHPOOpenPopup={props.setHPOOpenPopup} />
      <HPOTable filter={filter} setFilter={setFilter} {...props} onDelete={handleDelete} itemsList={props.itemsList} />
    </React.Fragment>
  );
};

export default HPOList;
