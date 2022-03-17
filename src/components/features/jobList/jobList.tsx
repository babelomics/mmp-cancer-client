import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import MmpCancerClient from "../../../clients/mmpCancerClient";
import { Box, Dialog, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, dialogTitleClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "@mui/material/styles";
import JobSynchronization from "../../../models/jobSynchronization";
import CheckIcon from '@mui/icons-material/Check';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

function JobsListTablePagination(props: any) {
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
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  JobsListTablePagination.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  
  function JobsList(props: any) {
    const { onClose, open } = props;
    let { id } = useParams();
    const [jobs, setJobs] = useState<JobSynchronization[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangeRowsPerPage = (event: any) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    useEffect(() => {
      const abortController = new AbortController();
      const fetchUpdates = async () => {
        let data: Array<JobSynchronization>;
        data = await MmpCancerClient.getJobs(id, undefined, abortController.signal);
        setJobs(data);
      };
      fetchUpdates();
    }, [id]);
  
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));

    const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
        [`&.${dialogTitleClasses.root}`]: {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.common.white,
        },
      }));
  
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - jobs.length) : 0;
  
    const handleChangePage = (event: any, newPage: any) => {
      setPage(newPage);
    };
    
    const handleClose = () => {
      onClose();
    }
  
    const handleStatusIcon = (status: String) => {

        if (status === "Complete") { 
            return <CheckIcon sx={{ color: 'green', mr: 1, my: 0.5}}></CheckIcon>
        } else if (status === "Waiting") { 
            return <AvTimerIcon sx={{ color: 'Orange', mr: 1, my: 0.5}}></AvTimerIcon>
        } else if (status === "Running") { 
            return <DirectionsRunIcon sx={{ color: 'Blue', mr: 1, my: 0.5}}></DirectionsRunIcon>
        }

    } 

    return (
      <React.Fragment>
        <Dialog onClose={handleClose} open={open}>
          <StyledDialogTitle  sx={{ color: 'primary.main' }}>Estado de las actualizaciones</StyledDialogTitle>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                {(rowsPerPage > 0
                  ? jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : jobs
                ).map((row: JobSynchronization) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {handleStatusIcon(row.status)}
                      { row.status }
                    </TableCell>
                  </TableRow>
                ))}
  
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={2} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                    colSpan={2}
                    count={jobs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={JobsListTablePagination}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Dialog>
      </React.Fragment>
      );
    }
  
    JobsList.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  }
  
  export default JobsList;