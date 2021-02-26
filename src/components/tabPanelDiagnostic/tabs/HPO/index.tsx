import React, { useState } from 'react';
import { IHPO, IHPOFilter } from '../interfaces';
import HPOFilterButtons from './hpo-filter-buttons/HPOFilterButtons';
import HPOTable from './hpo-table/HPOTable';

interface IProps {
  assembly: string;
  itemsList: any[];
  isDeleted?: boolean;
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
      <HPOFilterButtons filter={filter} setFilter={setFilter} setHPOOpenPopup={props.setHPOOpenPopup} hideAddBtn={props.isDeleted ?? false} />
      <HPOTable filter={filter} setFilter={setFilter} {...props} onDelete={handleDelete} itemsList={props.itemsList} isDeleted={props.isDeleted ?? false} />
    </React.Fragment>
  );
};

export default HPOList;
