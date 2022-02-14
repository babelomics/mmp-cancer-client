import React, { useState, useEffect } from "react";
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { useParams } from "react-router-dom";
import store from '../../../app/store'
import Card from "../../UI/card";
import Loading from "../../UI/loading";
import UpdateList from "../updateList/updateList";
import Drugset from "../../../models/drugset";
import MmpCancerClient from "../../../clients/mmpCancerClient";
import HomeIcon from '@mui/icons-material/Home';
import { Grid, IconButton } from "@mui/material";
import DrugList from "../drugList/drugList";
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

  const formatCreateDate = (value: Drugset | undefined) => {
    return (value ? format(new Date(value.createdAt), "dd MMMM yyyy", { locale: es}) : "");
  }

  const formatUpdateDate = (value: Drugset | undefined) => {
    if (value) {
      return (value.updatedAt ? format(new Date(value.updatedAt), "dd MMMM yyyy", { locale: es}) : "");
    } else {
      return "";
    }
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
        <br></br>
        <Card className="drugsetDetail">
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <IconButton color="primary" aria-label="Home" size="large" href={"/"} onDrag={handleDrag}>
                <HomeIcon />
              </IconButton>
            </Grid>
            <Grid item xs={7}><h3>{drugSet?.name}</h3></Grid>
            <Grid item xs={3}><strong>Descripción:</strong> {drugSet?.description}</Grid>
            <Grid item xs={2}><strong>Creado:</strong> { formatCreateDate(drugSet) }</Grid>
            <Grid item xs={3}><strong>Última Actualización:</strong> { formatUpdateDate(drugSet) }</Grid>
            <Grid item xs={2}>
              <strong>Fármacos:</strong> {drugSet?.drugs && Object.keys(drugSet?.drugs).length}
            </Grid>
            <Grid item xs={2}>
              <LoadingButton
                  color="primary"
                  onClick={handleClickOpen}
                  startIcon={<ListAltIcon />}
                  variant="contained"
              >
                Actualizaciones
              </LoadingButton>
            </Grid>
          </Grid>
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
