import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Loading from "../../UI/Loading";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import store from '../../../app/store'
import { ContextMenu } from 'primereact/contextmenu';
import MmpCancerClient from "../../../clients/mmpCancerClient";
import Drugset from "../../../models/Drugset";
import { Button } from "primereact/button";
import DrugSetTable from "../../../utils/materialUI/drugSetTable";

function DrugsetList() {
  const [drugSets, setDrugSets] = useState<Drugset[]>([]);
  const [first, setFirst] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDrugSet, setSelectedDrugSet] = useState<Drugset>();
  const [filters, setFilters] = useState({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const cm = useRef(null);
  const navigate = useNavigate();

  function getDetails(drugSet: Drugset) {
    navigate("drugsets/" + drugSet.id);
  }



  useEffect(() => {
    const abortController = new AbortController();
    const fetchPost = async () => {
      setIsLoading(true);
      let data: Array<Drugset>;
      data = await MmpCancerClient.getDrugsets(undefined, abortController.signal);
      setDrugSets(data);
      store.dispatch({type: 'drugSetList/updateSetList', payload: data})
      setIsLoading(false);
    };
    fetchPost();    
  }, []);

  const onGlobalFilterChange = (e: any) => {
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

  const formatCreationDateTemplate = (rowData: any) => {
    return moment(rowData.createdAt).format("MMMM Do YYYY");
  }

  const formatUpdatedDateTemplate = (rowData: any) => {
    return moment(rowData.updatedAt).format("MMMM Do YYYY");
  }

  const header = renderHeader();

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>

        <DrugSetTable></DrugSetTable>
                
        </>
      )}
    </React.Fragment>
  );
}

export default DrugsetList;
