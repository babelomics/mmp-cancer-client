import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loading from "./UI/Loading";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { ContextMenu } from 'primereact/contextmenu';

function DrugSetsList() {
  const [drugSets, setDrugSets] = useState([]);
  const [first, setFirst] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDrugSet, setSelectedDrugSet] = useState(null);
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const cm = useRef(null);
  const menuModel = [
    {label: 'Update DrugSet', icon: 'pi pi-fw pi-refresh', command: () => updateSet(selectedDrugSet)}
  ]
  const navigate = useNavigate();

  function getDetails(drugSet) {
    navigate("drugsets/" + drugSet.id);
  }

  const updateSet = async (drugSet) => {
    setIsLoading(true);
    await fetch("http://localhost:8080/drugSets/pandrugs/updates", { method: 'POST', mode: 'no-cors' });
    drugSet.updatedAt = new Date();
    setIsLoading(false);
  }

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/drugSets");
      const data = await response.json();
      setDrugSets(data);
      setIsLoading(false);
    };
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
        <h5 className="p-m-0">Drugset List</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    )
  }

  const formatCreationDateTemplate = (rowData) => {
    return moment(rowData.createdAt).format("MMMM Do YYYY");
  }

  const formatUpdatedDateTemplate = (rowData) => {
    return moment(rowData.updatedAt).format("MMMM Do YYYY");
  }

  const header = renderHeader();

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
        <ContextMenu model={menuModel} ref={cm} onHide={() => setSelectedDrugSet(null)}></ContextMenu>
        <DataTable value={drugSets} paginator header={header} rows={10} dataKey="id" first={first} onPage={(e) => setFirst(e.first)}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" filters={filters} onRowDoubleClick={e => getDetails(e.data)}
        selectionMode="single" selection={selectedDrugSet} onSelectionChange={e => setSelectedDrugSet(e.value)}
        contextMenuSelection={selectedDrugSet} onContextMenuSelectionChange={e => setSelectedDrugSet(e.value)} onContextMenu={e => cm.current.show(e.originalEvent)}>
          <Column header="Name" field="name"></Column>
          <Column header="Creation Date" body={formatCreationDateTemplate}></Column>
          <Column header="Last Update" body={formatUpdatedDateTemplate}></Column>
        </DataTable>
        </>
      )}
    </React.Fragment>
  );
}

export default DrugSetsList;
