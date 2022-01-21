import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import Card from "./UI/Card";
import Loading from "./UI/Loading";
import DrugsList from "./DrugsList";

function DrugSetDetail() {
  let { id } = useParams();
  const [drugSet, setDrugSet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:8080/drugSets/" + id);
    const data = await response.json();
    setDrugSet(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  function getDrugs(drugSetId) {
    navigate("/drugsets/" + drugSetId + "/drugs");
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
        <Card className="drugsetDetail">
          <div>
            <div>{drugSet.name}</div>
            <div>Description: {drugSet.description}</div>
            <div>
              Created at: {moment(drugSet.createdAt).format("MMMM Do YYYY")}
            </div>
            <div>Last updated: {drugSet.updateAt}</div>
            <div>
              Drugs: {drugSet.drugs && Object.keys(drugSet.drugs).length}
            </div>
          </div>
        </Card>
        <DrugsList />
        </>
      )}
    </React.Fragment>
  );
}

export default DrugSetDetail;
