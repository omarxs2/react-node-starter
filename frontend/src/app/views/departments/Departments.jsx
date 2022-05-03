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

const columns = [
  { id: 'id', label: 'ID', minWidth: 200 },
  { id: 'nameEN', label: 'Name EN', minWidth: 200 },
  { id: 'nameAR', label: 'Name AR', minWidth: 200 },
  { id: 'years', label: 'Years', minWidth: 200 },

];


const rows = [
  {
    id: 12,
    nameEN: 'Computer Scince',
    nameAR: 'علوم حاسوب',
    years: '4 years'
  },
  {
    id: 12,
    nameEN: 'Computer Scince',
    nameAR: 'علوم حاسوب',
    years: '4 years'
  },
  {
    id: 12,
    nameEN: 'Computer Scince',
    nameAR: 'علوم حاسوب',
    years: '4 years'
  },
  {
    id: 12,
    nameEN: 'Computer Scince',
    nameAR: 'علوم حاسوب',
    years: '4 years'
  },
  {
    id: 12,
    nameEN: 'Computer Scince',
    nameAR: 'علوم حاسوب',
    years: '4 years'
  },
  {
    id: 12,
    nameEN: 'Computer Scince',
    nameAR: 'علوم حاسوب',
    years: '4 years'
  },
  {
    id: 12,
    nameEN: 'Computer Scince',
    nameAR: 'علوم حاسوب',
    years: '4 years'
  },
  {
    id: 12,
    nameEN: 'Computer Scince',
    nameAR: 'علوم حاسوب',
    years: '4 years'
  },
];

export default function Agents() {

  const theme = useTheme();

  const [openAddRecord, setOpenRecord] = React.useState(false);
  const [rowData, setRowData] = React.useState('');

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

                <StickyHeadTable setRowData={setRowData} openDialopg={handleClickOpen} source='departments' columns={columns} rows={rows} />

              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
