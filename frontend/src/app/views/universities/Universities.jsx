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
import SchoolIcon from '@mui/icons-material/School';


const columns = [
  { id: 'id', label: 'ID', minWidth: 200 },
  { id: 'nameEN', label: 'Name EN', minWidth: 200 },
  { id: 'nameAR', label: 'Name AR', minWidth: 200 },
  { id: 'tagcolor', label: 'Tag Color', minWidth: 200 },

];


const rows = [
  {
    id: 12,
    nameEN: 'Istanbul Bilgi University',
    nameAR: 'جامعة اسطنبول بيلجي',
    tagcolor: '#3f51b5'
  },
  {
    id: 12,
    nameEN: 'Istanbul Bilgi University',
    nameAR: 'جامعة اسطنبول بيلجي',
    tagcolor: '#9c27b0'
  },
  {
    id: 12,
    nameEN: 'Istanbul Bilgi University',
    nameAR: 'جامعة اسطنبول بيلجي',
    tagcolor: '#f44336'
  },
  {
    id: 12,
    nameEN: 'Istanbul Bilgi University',
    nameAR: 'جامعة اسطنبول بيلجي',
    tagcolor: '#607d8b'
  },
  {
    id: 12,
    nameEN: 'Istanbul Bilgi University',
    nameAR: 'جامعة اسطنبول بيلجي',
    tagcolor: '#fccb00'
  },
  {
    id: 12,
    nameEN: 'Istanbul Bilgi University',
    nameAR: 'جامعة اسطنبول بيلجي',
    tagcolor: '#03a9f4'
  },
  {
    id: 12,
    nameEN: 'Istanbul Bilgi University',
    nameAR: 'جامعة اسطنبول بيلجي',
    tagcolor: '#673ab7'
  },
  {
    id: 12,
    nameEN: 'Istanbul Bilgi University',
    nameAR: 'جامعة اسطنبول بيلجي',
    tagcolor: '#795548'
  },
  {
    id: 12,
    nameEN: 'Istanbul Bilgi University',
    nameAR: 'جامعة اسطنبول بيلجي',
    tagcolor: '#ff5722'
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
                    Universities
                  </Typography>
                  <Button
                    onClick={handleClickOpen}
                    sx={{ m: 1, minWidth: 120 }}
                    variant="contained"
                    startIcon={<SchoolIcon />}>
                    Add University
                  </Button>
                </Grid>

                <StickyHeadTable setRowData={setRowData} openDialopg={handleClickOpen} source='universities' columns={columns} rows={rows} />

              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
