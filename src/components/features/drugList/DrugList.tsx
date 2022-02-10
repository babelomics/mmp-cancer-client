import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import Drug from "../../../models/drug";
import { useSelector } from "react-redux";
import Row from "../../../utils/materialUI/collapsibleDrugList";
import { Grid, Input, InputAdornment, TableSortLabel } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MmpCancerClient from "../../../clients/mmpCancerClient";
import { useParams } from "react-router-dom";

function descendingComparator(a: Drug, b: Drug, orderBy: any) {
  let elementA = (orderBy === 'standardName') ? a.standardName : a.commonName;
  let elementB = (orderBy === 'standardName') ? b.standardName : b.commonName;
  if (elementB < elementA) {
    return -1;
  }
  if (elementB > elementA) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator(order: Order, orderBy: string,): (a: Drug, b: Drug,) => number {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array: Drug[], comparator: (a: Drug, b: Drug) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [Drug, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Drug) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Drug) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="left" style={{ width: 50 }}></StyledTableCell>
        <StyledTableCell
          align="left"
          key="standardName"
          sortDirection={orderBy === 'standardName' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'standardName'}
            direction={orderBy === 'standardName' ? order : 'asc'}
            onClick={createSortHandler('standardName')}
          >
            Nombre Estándar
            {orderBy === 'standardName' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </StyledTableCell>
        <StyledTableCell
          align="left"
          key="commonName"
          sortDirection={orderBy === 'commonName' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'commonName'}
            direction={orderBy === 'commonName' ? order : 'asc'}
            onClick={createSortHandler('commonName')}
          >
            Nombre Común
            {orderBy === 'commonName' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

function DrugsTablePagination(props: any) {
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

DrugsTablePagination.propTypes = {
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

export default function DrugList() {
  let { id } = useParams();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('standardName');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState<Date | null>(null);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Drug,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const originalRows: Drug[] = useSelector((state: any) => state.drugList.drugList || undefined);
  const [rows, setRows] = React.useState<Drug[]>(originalRows);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const clearSearch = () => {
    setSearchTerm("");
    searchDrugs("");
  }

  const searchDrugs = (value: string) => {
    setSearchTerm(value);
    const filteredRows = originalRows.filter((row) => {
      return row.commonName.toLowerCase().includes(value.toLowerCase()) || row.standardName.toLowerCase().includes(value.toLowerCase());
    });
    setRows(filteredRows);
  }

  const fromDate = async (value: Date | null) => {
    setDateFrom(value);
    console.log(value);
    if (value) {
      const abortController = new AbortController();
      let data: Array<Drug>;
      data = await MmpCancerClient.getDrugsByDrugset(id, undefined, value, abortController.signal);
      setRows(data);
    }
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: 1 }}>
              <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}></SearchIcon>
              <Input
                placeholder="Buscar"
                type="text"
                value={searchTerm}
                onChange={(newValue) => searchDrugs(newValue.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton><ClearIcon onClick={clearSearch} /></IconButton>
                  </InputAdornment>
                }
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', padding: 1}}>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                <DatePicker
                  label="Fecha desde..."
                  value={dateFrom}
                  onChange={(newValue) => {
                    fromDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
          />
          <TableBody>
          {(rowsPerPage > 0
              ? stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : stableSort(rows, getComparator(order, orderBy))
            ).map((row) => (
            <Row key={row.id} row={row} />
          ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={2}
                count={rows.length}
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
                ActionsComponent={DrugsTablePagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}