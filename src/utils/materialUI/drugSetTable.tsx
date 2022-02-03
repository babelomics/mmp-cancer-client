import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import UpdateIcon from '@mui/icons-material/Update';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux";
import store from '../../app/store';
import moment from 'moment';
import LoadingButton from '@mui/lab/LoadingButton';
import Drugset from '../../models/Drugset';
import MmpCancerClient from '../../clients/mmpCancerClient';
import Loading from '../../components/UI/Loading';
import { Button } from '@mui/material';

function DrugsetsTablePagination(props: any) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };


  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

DrugsetsTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  
export default function DrugSetTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  
  const updateSet = async () => {
    setIsLoading(true);
    const abortController = new AbortController();
    let data: Drugset;
    await MmpCancerClient.updatePandrugSet(undefined, abortController.signal);
    data = await MmpCancerClient.getDrugsets(undefined, abortController.signal);
    store.dispatch({type: 'drugSetList/updateSetList', payload: data})
    setIsLoading(false);
  }


  const handleDrag = (event: React.DragEvent<HTMLAnchorElement>) => {
    alert("dragged");
  };


  const rows: Drugset[] = useSelector((state: any) => state.drugSetList.drugSetList || undefined);
  

  const formatUpdatedDateTemplate = (rowData: Drugset) => {

    if(typeof rowData.updated_at !== 'undefined'){
        return moment(rowData.updated_at).format("MMMM Do YYYY")
    }
    return "-";
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  
  return (
        <React.Fragment>
            {isLoading ? (
              <Loading></Loading>
            ) : (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                          <StyledTableCell >Nombre</StyledTableCell>
                          <StyledTableCell align="center">Descripción</StyledTableCell>
                          <StyledTableCell align="center">Creado</StyledTableCell>
                          <StyledTableCell align="center">Última Actualización</StyledTableCell>
                          <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : rows
                        ).map((row: Drugset) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              <Button variant="text" href={"/drugsets/" + row.id} onDrag={handleDrag}>{row.name}</Button>
                            </TableCell>
                            <TableCell style={{ width: 260}} align="center">
                              {row.description}
                            </TableCell>
                            <TableCell style={{ width: 260 }} align="center">
                              {moment(row.created_at).format("MMMM Do YYYY")}
                            </TableCell>
                            <TableCell style={{ width: 260 }} align="center">
                              {formatUpdatedDateTemplate(row)}
                            </TableCell>
                            <TableCell  style={{ width: 150 }} align="center">
                              <LoadingButton
                                      color="primary"
                                      onClick={updateSet}
                                      startIcon={<UpdateIcon />}
                                      variant="contained"
                                  >
                                      Update
                              </LoadingButton>
                          </TableCell>
                          </TableRow>
                        ))}

                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={4}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: {
                                'aria-label': 'rows per page',
                              },
                              native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={DrugsetsTablePagination}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                  )}

        </React.Fragment>
  );
}