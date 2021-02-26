import React, { useState } from 'react';
import { IIcd10, ICommonFilter } from '../interfaces';
import Icd10TableFilterButtons from './icd10-filter-buttons/Icd10FilterButtons';
import Icd10Table from './icd10-table/Icd10Table';

interface IProps {
  itemsList: any[];
  isDeleted?: boolean;
  setIcd10OpenPopup: () => void;
  deleteIcd10: (id: string) => void;
}

const defaultUserFilter = {} as ICommonFilter;

const Icd10 = (props: IProps) => {
  const [filter, setFilter] = useState<ICommonFilter>(defaultUserFilter);

  const handleDelete = (icdn10: IIcd10) => {
    props.deleteIcd10(icdn10.id);
  };

  return (
    <React.Fragment>
      <Icd10TableFilterButtons filter={filter} setFilter={setFilter} setIcd10OpenPopup={props.setIcd10OpenPopup} hideAddBtn={props.isDeleted ?? false} />
      <Icd10Table filter={filter} setFilter={setFilter} {...props} onDelete={handleDelete} itemsList={props.itemsList} isDeleted={props.isDeleted ?? false} />
    </React.Fragment>
  );
};

export default Icd10;
