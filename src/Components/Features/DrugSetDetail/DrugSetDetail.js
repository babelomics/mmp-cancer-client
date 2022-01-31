import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../UI/Card";
import Loading from "../../UI/Loading";
import DrugsList from "../DrugsList/DrugsList";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import UpdateList from "../UpdateList/UpdateList";

function DrugSetDetail() {
  let { id } = useParams();
  const [drugSet, setDrugSet] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/drugSets/" + id);
      const data = await response.json();
      setDrugSet(data);
      setIsLoading(false);
    };
    fetchPost();
  }, [id]);

  const dialogFuncMap = {
    'displayModal': setDisplayModal
  }

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  }

  const onHide = (name) => {
      dialogFuncMap[`${name}`](false);
  }

  function home() {
    navigate("/");
  }

  const renderFooter = () => {
    return (
      <div>
        <Button label="OK" icon="pi pi-check" onClick={() => onHide('displayModal')} autoFocus></Button>
      </div>
    );
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
            <div className="col-7"><h3>{drugSet.name}</h3></div>
            <div className="col-3"><strong>Description:</strong> {drugSet.description}</div>
            <div className="col-2">
              <strong>Created on:</strong> {moment(drugSet.createdAt).format("MMMM Do YYYY")}
            </div>
            <div className="col-2"><strong>Last updated:</strong> {moment(drugSet.updatedAt).format("MMMM Do YYYY")}</div>
            <div className="col-2">
              <strong>Drugs:</strong> {drugSet.drugs && Object.keys(drugSet.drugs).length}
            </div>
            <div className="col-2">
              <Button label="Show All Updates" icon="pi pi-external-link" onClick={() => onClick('displayModal')}></Button>
            </div>
          </div>
        </Card>
        <Dialog header="Update List" visible={displayModal} modal={true} style={{width: '40%'}} footer={renderFooter} onHide={() => onHide('displayModal')}>
          <UpdateList />
        </Dialog>
        <DrugsList />
        </>
      )}
    </React.Fragment>
  );
}

export default DrugSetDetail;
