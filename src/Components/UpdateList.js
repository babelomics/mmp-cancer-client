import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function UpdateList() {
  let { id } = useParams();
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      const response2 = await fetch("http://localhost:8080/drugSets/" + id + "/updates");
      const data2 = await response2.json();
      setUpdates(data2);
    };
    fetchUpdates();
  }, [id]);

  const formatCreationDateTemplate = (rowData) => {
    return moment(rowData.createdAt).format("MMMM Do YYYY [at] HH:mm:ss");
  }

  return (
    <React.Fragment>
      <DataTable value={updates} dataKey="id" sortField="createdAt" sortOrder={-1}>
        <Column header="Updated at" body={formatCreationDateTemplate}></Column>
      </DataTable>
    </React.Fragment>
  );
}

export default UpdateList;