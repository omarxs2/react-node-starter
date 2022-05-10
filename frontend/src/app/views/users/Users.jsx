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
import Button from '@mui/material/Button';
import FormDialog from './FormDialog'
import Typography from '@mui/material/Typography';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/userSlice';


const columns = [
  { id: 'name', label: 'Name', minWidth: 180 },
  { id: 'email', label: 'Email', minWidth: 180 },
  { id: 'phone', label: 'Phone', minWidth: 150 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'country', label: 'Country', minWidth: 120 },
  { id: 'company', label: 'Company', minWidth: 120 },
  { id: 'isActive', label: 'status', minWidth: 100 },
  { id: 'auto_generated_password', label: 'Generated Password', minWidth: 120 },
];



export default function Users() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const users = useSelector((state) => state.app.userApp.users)

  React.useEffect(() => {
    dispatch(getUsers())
  }, []);


  const [rowData, setRowData] = React.useState('');


  const [openAddRecord, setOpenRecord] = React.useState(false);

  const handleClickOpen = () => {
    setOpenRecord(true);
  };

  const handleClose = () => {
    setOpenRecord(false);
    setRowData('');
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
                    Users
                  </Typography>

                  <Button
                    onClick={handleClickOpen}
                    sx={{ m: 1, minWidth: 120 }}
                    variant="contained"
                    startIcon={<SupportAgentIcon />}>
                    Add User
                  </Button>
                </Grid>
                {users &&
                  <StickyHeadTable setRowData={setRowData} openDialopg={handleClickOpen}
                    source='users' columns={columns} rows={users} />
                }
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
