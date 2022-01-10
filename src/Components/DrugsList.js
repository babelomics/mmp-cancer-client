import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DrugsList() {
  const [drugs, setDrugs] = useState([]);
  let { id } = useParams();

  const fetchPost = async () => {
    const response = await fetch(
      "http://localhost:8080/drugSets/" + id + "/drugs"
    );
    const data = await response.json();
    setDrugs(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="Drugs">
        {drugs.map((drug) => (
          <>
            
              <div><h3>{drug.standardName}</h3></div>
              <div>Common Name: {drug.commonName}</div>
              <div>                
                  Drug Sources:
                  <ul className="list-group">
                    {drug.drugSources.map((drugSource) => (
                      <>
                        <li>
                          <div>Short Name: {drugSource.shortName}</div>
                          <div>Name: {drugSource.name}</div>
                        </li>

                        <br></br>
                      </>
                    ))}
                  </ul>
              </div>
            <br></br>
          </>
        ))}
    </div>
  );
}

export default DrugsList;
