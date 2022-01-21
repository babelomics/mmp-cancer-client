import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import Card from "./UI/Card";
import Loading from "./UI/Loading";

function DrugsList() {
  const [drugs, setDrugs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [expandedRows, setExpandedRows] = useState(null);
  const isMounted = useRef(false);
  let { id } = useParams();

  const fetchPost = async () => {
    setIsLoading(true);
    const response = await fetch(
      "http://localhost:8080/drugSets/" + id + "/drugs"
    );
    const data = await response.json();
    setDrugs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    isMounted.current = true;
    fetchPost();
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const expandAll = () => {
    let _expandedRows = {};
    drugs.forEach(d => _expandedRows[`${d.id}`] = true);
    setExpandedRows(_expandedRows);
  }

  const collapseAll = () => {
    setExpandedRows(null);
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
      <div className="table-header-container">
        <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} className="mr-2" />
        <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
      </div>
      </>
    )
  }

  const header = renderHeader();

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <DataTable value={drugs} paginator header={header} rows={10} dataKey="id" first={first} onPage={(e) => setFirst(e.first)}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" filters={filters}
        expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={drugBodyTemplate}>
          <Column expander style={{ width: '3em' }} />
          <Column header="Standard Name" field="standardName"></Column>
          <Column header="Common Name" field="commonName"></Column>
        </DataTable>
      )}
    </React.Fragment>
  );
}

const drugBodyTemplate = (rowData) => {
  return (
    <Card className="drug">
      <div>
        <h3>{rowData.standardName}</h3>
      </div>
      <div>Common Name: {rowData.commonName}</div>
      <div>Drug Names:
        <ul className="list-group">
          {rowData.drugNames.map((drugName) => (
            <>
              <li>
                <div>Name: {drugName.name}</div>
                <div>Source: {drugName.drugSource.shortName}</div>
              </li>
              <br></br>
            </>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export default DrugsList;
