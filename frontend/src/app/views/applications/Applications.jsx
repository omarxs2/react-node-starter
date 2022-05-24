import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from "@emotion/react";
import Copyright from '../../components/Copyright'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SubjectIcon from '@mui/icons-material/Subject';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { getApplications } from '../store/applicationSlice';
import Chip from '@mui/material/Chip';
import { useHistory } from "react-router-dom";
import { setSingleApplication } from '../store/applicationSlice'
import { API_BASE_URL } from '../../../configs/configs';

const myColumns = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
  { field: 'full_name', headerName: 'Full Name', flex: 1, minWidth: 150, },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Chip label={params.value}
        sx={{
          borderColor: params.value == 'pending' ? '#9c27b0'
            : params.value == 'waiting conditional' ? '#3f51b5'
              : params.value == 'waiting payment' ? '#009688'
                : params.value == 'waiting final' ? '#4fc3f7'
                  : ''

          ,
          backgroundColor: params.value == 'officially accepted' ? '#4caf50' : '',
          color: params.value == 'pending' ? '#9c27b0'
            : params.value == 'waiting conditional' ? '#3f51b5'
              : params.value == 'waiting payment' ? '#009688'
                : params.value == 'waiting final' ? '#4fc3f7'
                  : params.value == 'officially accepted' ? 'white'

                    : ''

        }}
        variant="outlined" />
    )
  },
  {
    field: 'conditional_acceptance',
    headerName: 'Conditional Acceptance',
    flex: 1, minWidth: 150,
    renderCell: (params) => {
      if (params.value != '') {
        return <a target="_blank" href={`${API_BASE_URL}/file/${params.value}`}>
          Conditional Acceptance
        </a>
      } else {
        return 'Not Yet'
      }
    },
  },
  {
    field: 'final_acceptance',
    headerName: 'Officail Acceptance',
    flex: 1, minWidth: 150,
    renderCell: (params) => {
      if (params.value != '') {
        return <a target="_blank" href={`${API_BASE_URL}/file/${params.value}`}>
          Officail Acceptance
        </a>
      } else {
        return 'Not Yet'
      }
    },
  },
  { field: 'department', headerName: 'Department', flex: 1, minWidth: 200 },
  { field: 'university', headerName: 'University', flex: 1, minWidth: 200 },
  { field: 'degree', headerName: 'Degree', flex: 1, minWidth: 100 },
  { field: 'language', headerName: 'Language', flex: 1, minWidth: 100 },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 150 },
  { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 150 },
  { field: 'passport_number', headerName: 'Passport No', flex: 1, minWidth: 150 },
];


const adminColumns = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
  { field: 'full_name', headerName: 'Full Name', flex: 1, minWidth: 200, },
  { field: 'agent_name', headerName: 'Agent Name', flex: 1, minWidth: 150, },
  { field: 'company', headerName: 'Comapny Name', flex: 1, minWidth: 150, },

  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Chip label={params.value}
        sx={{
          borderColor: params.value == 'pending' ? '#9c27b0'
            : params.value == 'waiting conditional' ? '#3f51b5'
              : params.value == 'waiting payment' ? '#009688'
                : params.value == 'waiting final' ? '#4fc3f7'
                  : ''

          ,
          backgroundColor: params.value == 'officially accepted' ? '#4caf50' : '',
          color: params.value == 'pending' ? '#9c27b0'
            : params.value == 'waiting conditional' ? '#3f51b5'
              : params.value == 'waiting payment' ? '#009688'
                : params.value == 'waiting final' ? '#4fc3f7'
                  : params.value == 'officially accepted' ? 'white'

                    : ''

        }}
        variant="outlined" />
    )
  },
  {
    field: 'conditional_acceptance',
    headerName: 'Conditional Acceptance',
    flex: 1, minWidth: 150,
    renderCell: (params) => {
      if (params.value != '') {
        return <a target="_blank" href={`${API_BASE_URL}/file/${params.value}`}>
          Conditional Acceptance
        </a>
      } else {
        return 'Not Yet'
      }
    },
  },
  {
    field: 'final_acceptance',
    headerName: 'Officail Acceptance',
    flex: 1, minWidth: 150,
    renderCell: (params) => {
      if (params.value != '') {
        return <a target="_blank" href={`${API_BASE_URL}/file/${params.value}`}>
          Officail Acceptance
        </a>
      } else {
        return 'Not Yet'
      }
    },
  },
  { field: 'department', headerName: 'Department', flex: 1, minWidth: 200 },
  { field: 'university', headerName: 'University', flex: 1, minWidth: 200 },
  { field: 'degree', headerName: 'Degree', flex: 1, minWidth: 100 },
  { field: 'language', headerName: 'Language', flex: 1, minWidth: 100 },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 200, maxWidth: 400 },
  { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 150 },
  { field: 'passport_number', headerName: 'Passport No', flex: 1, minWidth: 150 },
];


export default function Applications() {
  const theme = useTheme();
  let history = useHistory();
  const dispatch = useDispatch();

  const [openAddRecord, setOpenRecord] = React.useState(false);
  const [rowData, setRowData] = React.useState('');

  const applications = useSelector((state) => state?.app?.applicationApp?.applications)
  const user = useSelector((state) => state?.auth?.loginApp?.user)

  React.useEffect(() => {
    dispatch(getApplications(user?.role));
  }, []);


  const handleClose = () => {
    setOpenRecord(false);
    setRowData('');
  };
  const handleRedirect = () => {
    history.push("/apply-now");
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              component="h1"
              variant="h7"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Applications
            </Typography>

            <Button
              onClick={handleRedirect}
              sx={{ m: 1, minWidth: 120 }}
              variant="contained"
              startIcon={<SubjectIcon />}>
              New Application
            </Button>
          </Grid>

          <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>

            <div style={{ height: 550, width: '100%' }}>
              <DataGrid
                rows={applications}
                columns={user.role == 'Admin' ? adminColumns : myColumns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                components={{
                  Toolbar: GridToolbar,
                }}
                onRowDoubleClick={(params, event) => {
                  dispatch(setSingleApplication(params.row.id));
                  history.push(`/applications/${params.row.id}`);

                }}

              />
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
