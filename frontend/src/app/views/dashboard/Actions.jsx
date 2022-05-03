import * as React from 'react';
import { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FormDialog from './FormDialog'
import jsPDF from 'jspdf'
import 'jspdf-autotable'


export default function Actions({ columns, rows }) {
  const [age, setAge] = React.useState('');
  const [uni, setUni] = React.useState('');
  const [dep, setDep] = React.useState('');
  const [lan, setLan] = React.useState('');

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
      if (c.id != 'dep2') {
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
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <FormDialog open={openAddRecord} handleClose={() => handleClose()} />

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
  );
}