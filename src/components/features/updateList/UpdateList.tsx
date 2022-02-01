import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DrugUpdate from "../../../models/DrugUpdate";
import MmpCancerClient from "../../../clients/mmpCancerClient";

function UpdateList() {
  let { id } = useParams();
  const [updates, setUpdates] = useState<DrugUpdate[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchUpdates = async () => {
      let data: Array<DrugUpdate>;
      data = await MmpCancerClient.getDrugsetUpdate(id, undefined, abortController.signal);
      setUpdates(data);
    };
    fetchUpdates();
  }, [id]);

  const formatCreationDateTemplate = (rowData: any) => {
    return moment(rowData.created_at).format("MMMM Do YYYY [at] HH:mm:ss");
  }

  return (
    <React.Fragment>
      <DataTable value={updates} dataKey="id" sortField="created_at" sortOrder={-1}>
        <Column header="Updated at" body={formatCreationDateTemplate}></Column>
      </DataTable>
    </React.Fragment>
  );
}

export default UpdateList;