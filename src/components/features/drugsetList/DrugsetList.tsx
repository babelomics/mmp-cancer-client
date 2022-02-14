import React, { useState, useEffect } from "react";
import Loading from "../../UI/loading";
import store from '../../../app/store'
import MmpCancerClient from "../../../clients/mmpCancerClient";
import Drugset from "../../../models/drugset";
import DrugSetTable from "../../../utils/materialUI/drugSetTable";
import Card from "../../UI/card";

function DrugsetList() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPost = async () => {
      setIsLoading(true);
      let data: Array<Drugset>;
      data = await MmpCancerClient.getDrugsets(undefined, abortController.signal);
      store.dispatch({type: 'drugSetList/updateSetList', payload: data})
      setIsLoading(false);
    };
    fetchPost();    
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
        <br></br>
        <Card className="drugsetList">
        <DrugSetTable></DrugSetTable>
        </Card>
        </>
      )}
    </React.Fragment>
  );
}

export default DrugsetList;
