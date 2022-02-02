import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from 'primereact/api';
import MmpCancerClient from "../../../clients/mmpCancerClient";
import { getDrugs } from "../../../app/drugsSlice";
import store from '../../../app/store'
import Drug from "../../../models/Drug";
import DrugName from "../../../models/DrugName";

function DrugsList() {

  const [first, setFirst] = useState(0);
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const renderHeader = () => {
    return (
      <>
      <div className="p-d-flex p-jc-between p-ai-center">
        <h5 className="p-m-0">Drug List</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
      </>
    )
  }

  const header = renderHeader();

  return (
    <React.Fragment>
      <DataTable value={getDrugs(store.getState())} paginator header={header} rows={10} dataKey="id" first={first} onPage={(e) => setFirst(e.first)}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" filters={filters}>
          <Column header="Standard Name" field="standardName" sortable></Column>
          <Column header="Common Name" field="commonName" sortable></Column>
        </DataTable>
    </React.Fragment>
  );
}

export default DrugsList;
