import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import store from '../../../app/store'
import { getDrugs } from "../../../app/drugListSlice";
import Card from "../../UI/Card";
import Loading from "../../UI/Loading";
import DrugsList from "../drugList/DrugList";
import { Button } from "primereact/button";
import UpdateList from "../updateList/UpdateList";
import Drugset from "../../../models/Drugset";
import MmpCancerClient from "../../../clients/mmpCancerClient";
import Drug from "../../../models/Drug";

function DrugSetDetail() {
  let { id } = useParams();
  const [drugSet, setDrugSet] = useState<Drugset>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPost = async () => {
      setIsLoading(true);
      let data: Drugset;
      data = await MmpCancerClient.getDrugsetById(id, undefined, abortController.signal);
      setDrugSet(data);
      store.dispatch({type: 'drugList/updateList', payload: data?.drugs})
      console.log()
      setIsLoading(false);
    };
    fetchPost();
  }, [id]);


  function home() {
    navigate("/");
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
        <Card className="drugsetDetail">
          <div className="grid">
            <div className="col-5"><Button icon="pi pi-home" iconPos="left" onClick={home}></Button></div>
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
        <DrugsList/>
        </>
      )}
    </React.Fragment>
  );
}

export default DrugSetDetail;
