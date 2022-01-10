import React, { useState, useEffect } from "react";
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom';

function DrugSetsList() {
  const [drugSets, setDrugSets] = useState([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    const response = await fetch("http://localhost:8080/drugSets");
    const data = await response.json();
    setDrugSets(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  function getDetails(drugSetId){

    navigate("drugsets/" + drugSetId);

  };

  return (
    <div className="DrugSets">    
        {drugSets.map((drugSet) => (
            <>
            <div>
            <div>{drugSet.name}</div>
            <div>Created at: {moment(drugSet.createdAt).format('MMMM Do YYYY')}</div>
            <button onClick={() => getDetails(drugSet.id)}> Show Detail </button>
            </div>
            <br></br>
            </>
        ))}
     </div>
  );
}

export default DrugSetsList;
