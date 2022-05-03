import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from "@emotion/react";
import CustomBar from '../../components/CustomBar'
import Copyright from '../../components/Copyright'
import StickyHeadTable from '../../components/StickyHeadTable'
import Actions from './Actions'
import Button from '@mui/material/Button';
import FormDialog from './FormDialog'
import Typography from '@mui/material/Typography';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


const columns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 180 },
  { id: 'phone', label: 'Phone', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 155 },
  { id: 'country', label: 'Country', minWidth: 155 },
  { id: 'CompanyName', label: 'Company Name', minWidth: 155 },
  { id: 'logo', label: 'Logo', minWidth: 155 },
];


const rows = [
  {
    name: 'Mohammed Zereeny',
    email: 'moh@zer.com',
    phone: '+90536485354',
    role: 'Admin',
    country: 'All',
    CompanyName: 'Eduturk',
    logo: './images/logo.png'
  },
  {
    name: 'Atieh Qarawi',
    email: 'atiel@alqarawi.com',
    phone: '+90536485354',
    role: 'sunAgent',
    country: 'Palestine',
    CompanyName: 'Alqarawi',
    logo: './images/logo.png'
  }, {
    name: 'Atieh Qarawi',
    email: 'atiel@alqarawi.com',
    phone: '+90536485354',
    role: 'sunAgent',
    country: 'Palestine',
    CompanyName: 'Alqarawi',
    logo: './images/logo.png'
  }, {
    name: 'Atieh Qarawi',
    email: 'atiel@alqarawi.com',
    phone: '+90536485354',
    role: 'sunAgent',
    country: 'Palestine',
    CompanyName: 'Alqarawi',
    logo: './images/logo.png'
  }, {
    name: 'Atieh Qarawi',
    email: 'atiel@alqarawi.com',
    phone: '+90536485354',
    role: 'sunAgent',
    country: 'Palestine',
    CompanyName: 'Alqarawi',
    logo: './images/logo.png'
  }, {
    name: 'Atieh Qarawi',
    email: 'atiel@alqarawi.com',
    phone: '+90536485354',
    role: 'sunAgent',
    country: 'Palestine',
    CompanyName: 'Alqarawi',
    logo: './images/logo.png'
  }, {
    name: 'Atieh Qarawi',
    email: 'atiel@alqarawi.com',
    phone: '+90536485354',
    role: 'sunAgent',
    country: 'Palestine',
    CompanyName: 'Alqarawi',
    logo: './images/logo.png'
  }, {
    name: 'Atieh Qarawi',
    email: 'atiel@alqarawi.com',
    phone: '+90536485354',
    role: 'sunAgent',
    country: 'Palestine',
    CompanyName: 'Alqarawi',
    logo: './images/logo.png'
  }, {
    name: 'Atieh Qarawi',
    email: 'atiel@alqarawi.com',
    phone: '+90536485354',
    role: 'sunAgent',
    country: 'Palestine',
    CompanyName: 'Alqarawi',
    logo: './images/logo.png'
  }, {
    name: 'Atieh Qarawi',
    email: 'atiel@alqarawi.com',
    phone: '+90536485354',
    role: 'sunAgent',
    country: 'Palestine',
    CompanyName: 'Alqarawi',
    logo: './images/logo.png'
  },
];

export default function Agents() {

  const theme = useTheme();

  const [age, setAge] = React.useState('');
  const [uni, setUni] = React.useState('');
  const [dep, setDep] = React.useState('');
  const [lan, setLan] = React.useState('');
  const [rowData, setRowData] = React.useState('');



  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [openAddRecord, setOpenRecord] = React.useState(false);

  const handleClickOpen = () => {
    setOpenRecord(true);
  };

  const handleClose = () => {
    setOpenRecord(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <CustomBar />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormDialog rowData={rowData} open={openAddRecord} handleClose={() => handleClose()} />
                  <Typography
                    component="h1"
                    variant="h7"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    Agents
                  </Typography>

                  <Button
                    onClick={handleClickOpen}
                    sx={{ m: 1, minWidth: 120 }}
                    variant="contained"
                    startIcon={<SupportAgentIcon />}>
                    Add Agent
                  </Button>
                </Grid>

                <StickyHeadTable setRowData={setRowData} openDialopg={handleClickOpen} source='agents' columns={columns} rows={rows} />

              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
