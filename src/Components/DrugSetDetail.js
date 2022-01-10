import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

function DrugSetDetail() {

  let { id } = useParams();
  const [drugSet, setDrugSet] = useState([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    const response = await fetch("http://localhost:8080/drugSets/" + id);
    const data = await response.json();
    setDrugSet(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  function getDrugs(drugSetId){

    navigate("/drugsets/" + drugSetId + "/drugs");

  };

  return (
    <div className="DrugSetDetail">
      <div>
        <div>{drugSet.name}</div>
        <div>Description: {drugSet.description}</div>
        <div>
          Created at: {moment(drugSet.createdAt).format("MMMM Do YYYY")}
        </div>
        <div>Last updated: {drugSet.updateAt}</div>
        <div>Drugs: {drugSet.drugs && Object.keys(drugSet.drugs).length}</div>
        <button onClick={() => getDrugs(drugSet.id)}> Show Drugs </button>
      </div>
      <br></br>
    </div>
  );
}

export default DrugSetDetail;
