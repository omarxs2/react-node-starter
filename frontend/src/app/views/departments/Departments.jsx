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
import SubjectIcon from '@mui/icons-material/Subject';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments } from '../store/departmentSlice';

const columns = [
  { id: 'id', label: 'ID', minWidth: 200 },
  { id: 'department_name_en', label: 'Name EN', minWidth: 200 },
  { id: 'department_name_ar', label: 'Name AR', minWidth: 200 },
];


export default function Departments() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openAddRecord, setOpenRecord] = React.useState(false);
  const [rowData, setRowData] = React.useState('');

  const departments = useSelector((state) => state.app.departmentApp.departments)

  React.useEffect(() => {
    dispatch(getDepartments())
  }, []);


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
                    Departments
                  </Typography>

                  <Button
                    onClick={handleClickOpen}
                    sx={{ m: 1, minWidth: 120 }}
                    variant="contained"
                    startIcon={<SubjectIcon />}>
                    Add Department
                  </Button>
                </Grid>
                {departments &&
                  <StickyHeadTable setRowData={setRowData}
                    openDialopg={handleClickOpen}
                    source='departments'
                    columns={columns}
                    rows={departments}
                    rpp={departments.length}
                  />

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
