import { filter } from 'lodash';
import '../App.css'
import { sentenceCase } from 'change-case';
import { useEffect, useState ,useRef,createRef} from 'react';
import Swal from 'sweetalert2';
import { CSVLink } from "react-csv";
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link as RouterLink, Navigate,useNavigate } from 'react-router-dom';
import { renderToString } from "react-dom/server";
import JsPDF from "jspdf";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid
} from '@mui/material';
// components
import Pdf from "react-to-pdf";
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import {
  // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppCurrentVisits,
  AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  // AppCurrentSubject,
  // AppConversionRates,
} from '../sections/@dashboard/app';
// mock
import USERLIST from '../_mock/user';
import AwaitingApproval from './fetchpending'
import WithdrawalTable from './withdrawalTable';




// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Allwithdrawal() {
    const [loader,setLoader] = useState(false);
    const [DATA,setDATA] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    const ref = createRef();



  return (
    <Page title="All Withdrawal">
      <Container>


        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            All Withdrawal
          </Typography>
          
          <CSVLink data={DATA}>
              <Button variant="contained" startIcon={<Iconify icon="clarity:export-line" />}>
              Export To CsV
            </Button>
          </CSVLink>
          <Button variant="contained"  startIcon={<Iconify icon="clarity:export-line" />}>
              Export To PDF
            </Button>
        </Stack>
        <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
         
            <WithdrawalTable handleData={setDATA}/>

        </Grid>

        
      </Container>
    </Page>
  );
}
