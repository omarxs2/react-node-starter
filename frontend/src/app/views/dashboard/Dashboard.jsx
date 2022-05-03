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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FormDialog from './FormDialog'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const columns = [
  { id: 'dep1', label: 'Department EN', minWidth: 200 },
  { id: 'dep2', label: 'Department AR', minWidth: 180 },
  { id: 'university', label: 'University', minWidth: 200 },
  { id: 'language', label: 'Language', minWidth: 155 },
  { id: 'years', label: 'Yesrs', minWidth: 155 },
  { id: 'price1', label: 'Price Befor', minWidth: 155 },
  { id: 'price2', label: 'Price After', minWidth: 155 },
];


const rows = [
  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  },
  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  },

  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  },

  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  },

  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  },

  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  },

  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  }
  ,

  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  }
  ,

  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  }
  ,

  {
    dep1: 'Computer Scince',
    dep2: 'علوم حاسوب',
    university: 'Istanbul Bilgi University',
    language: 'EN',
    years: '4 Years',
    price1: '9750$',
    price2: '6600$'
  }

];

export default function Dashboard() {

  const theme = useTheme();

  const [age, setAge] = React.useState('');
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


  const downlaodData = () => {
    const doc = new jsPDF({ filters: ['ASCIIHexEncode'] })
    doc.text(rows[0].dep1, 10, 10)
    let labels = []
    columns.map(c => {
      if (c.id !== 'dep2') {
        labels.push(c.label)
      }
    })
    let data = []
    rows.map(r => {
      delete r.dep2
      data.push(Object.values(r))
    })


    doc.autoTable({
      head: [labels],
      body: data,
      bodyStyles: { font: "Amiri" }
    })
    doc.save('price.pdf')
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

                  <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">University</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="University"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Istanbul Bilgi University</MenuItem>
                      <MenuItem value={20}>Marmara University</MenuItem>
                      <MenuItem value={30}>Bahcesehir University</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">Department</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Department"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Computer Enginnering</MenuItem>
                      <MenuItem value={20}>International Relations</MenuItem>
                      <MenuItem value={30}>Medicine</MenuItem>
                    </Select>
                  </FormControl>


                  <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">Language</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Language"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>English</MenuItem>
                      <MenuItem value={20}>Turkish</MenuItem>
                      <MenuItem value={30}>Other</MenuItem>
                    </Select>
                  </FormControl>

                  <Button sx={{ m: 1, minWidth: 120 }} variant="outlined" startIcon={<ManageSearchRoundedIcon />}>
                    Search
                  </Button>
                  <Button onClick={handleClickOpen} sx={{ m: 1, minWidth: 120 }} variant="contained" startIcon={<AddCircleIcon />}>
                    Add Record
                  </Button>
                  <Button onClick={downlaodData} sx={{ m: 1, minWidth: 120 }} variant="contained" startIcon={<DownloadForOfflineIcon />}>
                    Download
                  </Button>
                </Grid>

                <StickyHeadTable setRowData={setRowData} openDialopg={handleClickOpen} source='dashboard' columns={columns} rows={rows} />

              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}