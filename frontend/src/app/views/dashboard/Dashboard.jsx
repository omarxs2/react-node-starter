import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from "@emotion/react";
import Copyright from '../../components/Copyright'
import StickyHeadTable from '../../components/StickyHeadTable'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FormDialog from './FormDialog'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useDispatch, useSelector } from 'react-redux';
import { getPrices } from '../store/dashboardSlice';
import { getUniversities } from '../store/universitySlice';
import { getDepartments } from '../store/departmentSlice';
import TextField from '@mui/material/TextField';
import { Can } from '../../../rules/Can';

const columns = [
  { id: 'department_en', label: 'Department EN', minWidth: 200 },
  { id: 'department_ar', label: 'Department AR', minWidth: 200 },
  { id: 'university', label: 'University', minWidth: 200 },
  { id: 'language', label: 'Language', minWidth: 120 },
  { id: 'degree', label: 'Degree', minWidth: 120 },
  { id: 'years', label: 'Yesrs', minWidth: 120 },
  { id: 'price_before', label: 'Price Befor', minWidth: 155 },
  { id: 'price_after', label: 'Price After', minWidth: 155 },
];


export default function Dashboard() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const prices = useSelector((state) => state.app.dashboardApp.prices)
  const departments = useSelector((state) => state.app.departmentApp.departments)
  const universities = useSelector((state) => state.app.universityApp.universities)


  React.useEffect(() => {
    dispatch(getPrices({ department: '', language: '', university: '', degree: '' }));
    dispatch(getDepartments());
    dispatch(getUniversities());
  }, []);

  const [rowData, setRowData] = React.useState('');

  const handleChange = (event, type) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let value = event.target.value
    data.set(type, value);
  };


  const [openAddRecord, setOpenRecord] = React.useState(false);

  const handleClickOpen = () => {
    setOpenRecord(true);
  };

  const handleClose = () => {
    setOpenRecord(false);
    setRowData('');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(getPrices({
      department: data.get('department').startsWith('All') ? '' : data.get('department'),
      language: data.get('language').startsWith('All') ? '' : data.get('language'),
      university: data.get('university').startsWith('All') ? '' : data.get('university'),
      degree: data.get('degree').startsWith('All') ? '' : data.get('degree')
    }));
  };

  const downlaodData = () => {
    // const doc = new jsPDF({ filters: ['ASCIIHexEncode'] })
    // doc.text(rows[0].dep1, 10, 10)
    // let labels = []
    // columns.map(c => {
    //   if (c.id !== 'dep2') {
    //     labels.push(c.label)
    //   }
    // })
    // let data = []
    // rows.map(r => {
    //   delete r.dep2
    //   data.push(Object.values(r))
    // })


    // doc.autoTable({
    //   head: [labels],
    //   body: data,
    //   bodyStyles: { font: "Amiri" }
    // })
    // doc.save('price.pdf')
  };

  return (

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Box component="form" onSubmit={handleSearch} sx={{ mt: 1 }}>
          <Grid item xs={12}>


            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormDialog rowData={rowData} open={openAddRecord} handleClose={() => handleClose()} />

              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  select
                  size='small'
                  label="Department"
                  name='department'
                  sx={{ m: 1, minWidth: 180, maxWidth: 250 }}
                  // onChange={(e) => handleChange(e, 'department')}
                  defaultValue={'All Departments'}
                >
                  <MenuItem key={'init'} value={'All Departments'}>
                    All Departments
                  </MenuItem>
                  {departments.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.department_name_en} - {option.department_name_ar}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  size='small'
                  sx={{ m: 1, minWidth: 180, maxWidth: 250 }}
                  select
                  label="Language"
                  name='language'
                  // onChange={(e) => handleChange(e, 'language')}
                  defaultValue={'All Languages'}
                >
                  <MenuItem key={'init'} value={'All Languages'}>
                    All Languages
                  </MenuItem>
                  <MenuItem key={'English'} value={'English'}>
                    English
                  </MenuItem>
                  <MenuItem key={'Turkish'} value={'Turkish'}>
                    Turkish
                  </MenuItem>
                  <MenuItem key={'Other'} value={'Other'}>
                    Other
                  </MenuItem>
                </TextField>


                <TextField
                  select
                  size='small'
                  label="University"
                  name='university'
                  sx={{ m: 1, minWidth: 180, maxWidth: 250 }}
                  // onChange={(e) => handleChange(e, 'university')}
                  defaultValue={'All Universities'}

                >
                  <MenuItem key={'init'} value={'All Universities'}>
                    All Universities
                  </MenuItem>
                  {universities.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.university_name_en} - {option.university_name_en}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  size='small'
                  sx={{ m: 1, minWidth: 180, maxWidth: 250 }}
                  name="degree"
                  select
                  label="Degree"
                  defaultValue={'All Degrees'}
                // onChange={(e) => handleChange(e, 'degree')}
                >
                  <MenuItem key={'init'} value={'All Degrees'}>
                    All Degrees
                  </MenuItem>
                  <MenuItem key={10} value={'Associate'}>
                    Associate
                  </MenuItem>
                  <MenuItem key={10} value={'Bachelor'}>
                    Bachelor
                  </MenuItem>
                  <MenuItem key={10} value={'Master'}>
                    Master
                  </MenuItem>
                  <MenuItem key={10} value={'PhD'}>
                    PhD
                  </MenuItem>
                </TextField>

                <Button type='submit' sx={{ m: 1, minWidth: 120 }} variant="outlined" startIcon={<ManageSearchRoundedIcon />}>
                  Search
                </Button>
                <Button onClick={downlaodData} sx={{ m: 1, minWidth: 120 }} variant="contained" startIcon={<DownloadForOfflineIcon />}>
                  Download
                </Button>


              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Can I="add" a="Record">
                  <Button onClick={handleClickOpen} sx={{ m: 1, minWidth: 120 }} variant="contained" startIcon={<AddCircleIcon />}>
                    Add Record
                  </Button>
                </Can>


              </Grid>
            </Grid>

            <StickyHeadTable
              departments={departments}
              universities={universities}
              setRowData={setRowData}
              openDialopg={handleClickOpen}
              source='dashboard'
              columns={columns}
              rows={prices} />

          </Grid>
        </Box>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}