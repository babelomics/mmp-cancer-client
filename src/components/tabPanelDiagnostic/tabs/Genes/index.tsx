import React, { useState } from 'react';
import { IGene, ICommonFilter } from '../interfaces';
import GeneFilterButtons from './genes-filter-buttons/GeneFilterButtons';
import GeneTable from './genes-table/GeneTable';

interface IProps {
  panelId: string;
  itemsList: any[];
  setGenesOpenPopup: () => void;
  deleteGene: (id: string) => void;
}

const defaultUserFilter = {} as ICommonFilter;

const GenesList = (props: IProps) => {
  const [filter, setFilter] = useState<ICommonFilter>(defaultUserFilter);

  const handleDelete = (gene: IGene) => {
    props.deleteGene(gene.geneId);
  };

  return (
    <React.Fragment>
      <GeneFilterButtons filter={filter} setFilter={setFilter} setGenesOpenPopup={props.setGenesOpenPopup} />
      <GeneTable filter={filter} setFilter={setFilter} {...props} onDelete={handleDelete} itemsList={props.itemsList} />
    </React.Fragment>
  );
};

export default GenesList;
