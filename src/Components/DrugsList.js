import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "./UI/Card";
import Loading from "./UI/Loading";

function DrugsList() {
  const [drugs, setDrugs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams();

  const fetchPost = async () => {
    setIsLoading(true);
    const response = await fetch(
      "http://localhost:8080/drugSets/" + id + "/drugs"
    );
    const data = await response.json();
    setDrugs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="Drugs">
          {drugs.map((drug) => (
            <>
              <Card className="drug">
                <div>
                  <h3>{drug.standardName}</h3>
                </div>
                <div>Common Name: {drug.commonName}</div>
                <div>
                  Drug Names:
                  <ul className="list-group">
                    {drug.drugNames.map((drugName) => (
                      <>
                        <li>
                          <div>Name: {drugName.name}</div>
                          <div>Source: {drugName.drugSource.shortName}</div>
                        </li>

                        <br></br>
                      </>
                    ))}
                  </ul>
                </div>
              </Card>
            </>
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

export default DrugsList;
