import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterService } from 'primereact/api';
import Card from "./UI/Card";
import Loading from "./UI/Loading";

function DrugsList() {
  const [drugs, setDrugs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [filters, setFilters] = useState({
    'drugsfilter': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  let { id } = useParams();
  FilterService.register('drugsfilter', (a, b) => {
    console.log(a, b); // TEST
    return false;
  });

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
    fetchPost();
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  const renderHeader = () => {
    return (
      <div className="p-d-flex p-jc-between p-ai-center">
        <h5 className="p-m-0">Drug List</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
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
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
          <Column header="" body={drugBodyTemplate} style={{width:'100%'}}></Column>
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
