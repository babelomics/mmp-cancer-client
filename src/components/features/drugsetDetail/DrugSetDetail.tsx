import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import store from '../../../app/store'
import { getDrugs, getLoading } from "../../../app/drugsSlice";
import Card from "../../UI/Card";
import Loading from "../../UI/Loading";
import DrugsList from "../drugList/DrugList";
import UpdateList from "../updateList/UpdateList";
import Drugset from "../../../models/Drugset";
import MmpCancerClient from "../../../clients/mmpCancerClient";
import Drug from "../../../models/Drug";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";
import DrugsTablePagination from "../../../utils/materialUI/drugTablePaginator";

function DrugSetDetail() {
  let { id } = useParams();
  const [drugSet, setDrugSet] = useState<Drugset>();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPost = async () => {
      store.dispatch({type: 'drugList/isLoading', payload: true})
      let data: Drugset;
      data = await MmpCancerClient.getDrugsetById(id, undefined, abortController.signal);
      setDrugSet(data);
      store.dispatch({type: 'drugList/updateList', payload: drugSet?.drugs})
      store.dispatch({type: 'drugList/isLoading', payload: false})
    };
    fetchPost();
  }, [id]);


  const handleDrag = (event: React.DragEvent<HTMLAnchorElement>) => {
    alert("dragged");
  };

  return (
    <React.Fragment>
      {!getLoading(store.getState()) ? (
        <Loading></Loading>
      ) : (
        <>
        <Card className="drugsetDetail">
          <div className="grid">
            <div className="col-5">
              <IconButton color="primary" aria-label="Home" size="large" href={"/"} onDrag={handleDrag}>
                <HomeIcon />
              </IconButton>
            </div>
            <div className="col-7"><h3>{drugSet?.name}</h3></div>
            <div className="col-3"><strong>Description:</strong> {drugSet?.description}</div>
            <div className="col-2">
              <strong>Created on:</strong> {moment(drugSet?.created_at).format("MMMM Do YYYY")}
            </div>
            <div className="col-2"><strong>Last updated:</strong> {moment(drugSet?.updated_at).format("MMMM Do YYYY")}</div>
            <div className="col-2">
              <strong>Drugs:</strong> {drugSet?.drugs && Object.keys(drugSet?.drugs).length}
            </div>
          </div>
        </Card>
          <UpdateList />
        <DrugsTablePagination></DrugsTablePagination>
        <DrugsList/>
        </>
      )}
    </React.Fragment>
  );
}

export default DrugSetDetail;
