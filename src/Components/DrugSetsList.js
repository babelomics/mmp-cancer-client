import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Card from "./UI/Card";
import Loading from "./UI/Loading";

function DrugSetsList() {
  const [drugSets, setDrugSets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:8080/drugSets");
    const data = await response.json();
    setDrugSets(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  function getDetails(drugSetId) {
    navigate("drugsets/" + drugSetId);
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
    <div className="DrugSets">
        {drugSets.map((drugSet) => (
          <>
          <br></br>
          <Card className="drugset">
              <div>{drugSet.name}</div>
              <div>
                Created at: {moment(drugSet.createdAt).format("MMMM Do YYYY")}
              </div>
              <button onClick={() => getDetails(drugSet.id)}>
                {" "}
                Show Detail{" "}
              </button>
            </Card>
            
          </>
        ))}
    </div>
      )}
    </React.Fragment>
  );
}

export default DrugSetsList;
