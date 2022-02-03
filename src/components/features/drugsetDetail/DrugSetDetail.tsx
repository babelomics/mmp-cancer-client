import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import store from '../../../app/store'
import Card from "../../UI/Card";
import Loading from "../../UI/Loading";
import UpdateList from "../updateList/UpdateList";
import Drugset from "../../../models/Drugset";
import MmpCancerClient from "../../../clients/mmpCancerClient";
import Drug from "../../../models/Drug";
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from "@mui/material";
import DrugList from "../drugList/DrugList";
import LoadingButton from '@mui/lab/LoadingButton';
import ListAltIcon from '@mui/icons-material/ListAlt';

function DrugSetDetail() {
  let { id } = useParams();
  const [drugSet, setDrugSet] = useState<Drugset>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchPost = async () => {
      setIsLoading(true);
      let data: Drugset;
      data = await MmpCancerClient.getDrugsetById(id, undefined, abortController.signal);
      setDrugSet(data);
      store.dispatch({type: 'drugList/updateList', payload: data?.drugs})
      setIsLoading(false);
    };
    fetchPost();
  }, [id]);


  const handleDrag = (event: React.DragEvent<HTMLAnchorElement>) => {
    alert("dragged");
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
        <br></br>
        <Card className="drugsetDetail">
          <div className="grid">
            <div className="col-5">
              <IconButton color="primary" aria-label="Home" size="large" href={"/"} onDrag={handleDrag}>
                <HomeIcon />
              </IconButton>
            </div>
            <div className="col-7"><h3>{drugSet?.name}</h3></div>
            <div className="col-3"><strong>Descripción:</strong> {drugSet?.description}</div>
            <div className="col-2">
              <strong>Creado:</strong> {moment(drugSet?.created_at).format("MMMM Do YYYY")}
            </div>
            <div className="col-2"><strong>Última Actualización</strong> {moment(drugSet?.updated_at).format("MMMM Do YYYY")}</div>
            <div className="col-2">
              <strong>Fármacos:</strong> {drugSet?.drugs && Object.keys(drugSet?.drugs).length}
            </div>
            <div className="col-2">
              <LoadingButton
                  color="primary"
                  onClick={handleClickOpen}
                  startIcon={<ListAltIcon />}
                  variant="contained"
              >
                Actualizaciones
              </LoadingButton>
            </div>
          </div>
        </Card>
        <UpdateList open={open} onClose={handleClose}/>
          <br></br>
        <Card className="drugs">
          <DrugList></DrugList>
        </Card>
        </>
      )}
    </React.Fragment>
  );
}

export default DrugSetDetail;
