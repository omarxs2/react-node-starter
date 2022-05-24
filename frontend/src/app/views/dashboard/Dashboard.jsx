import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from "@emotion/react";
import Copyright from '../../components/Copyright'
import Button from '@mui/material/Button';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormDialog from './FormDialog'
import { useDispatch, useSelector } from 'react-redux';
import { getPrices } from '../store/dashboardSlice';
import { getUniversities } from '../store/universitySlice';
import { getDepartments } from '../store/departmentSlice';
import TextField from '@mui/material/TextField';
import { Can } from '../../../rules/Can';
import {
  DataGrid,
  gridSortedRowIdsSelector,
  GridToolbarContainer,
  useGridApiContext,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarExport

} from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import { createSvgIcon } from '@mui/material/utils';


const getUnfilteredRows = ({ apiRef }) => gridSortedRowIdsSelector(apiRef);
const ExportIcon = createSvgIcon(
  <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z" />,
  'SaveAlt',
);

const CustomToolbar = () => {
  const apiRef = useGridApiContext();

  const handleExport = (options) => apiRef.current.exportDataAsCsv(options);

  const buttonBaseProps = {
    color: 'primary',
    size: 'small',
    startIcon: <ExportIcon />,
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
          pageStyle: '.MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }',

        }} />
      <Button
        {...buttonBaseProps}
        onClick={() => handleExport({ getRowsToExport: getUnfilteredRows })}
      >
        Export All
      </Button>
    </GridToolbarContainer>
  );
};


const languages = [
  { label: 'English' },
  { label: 'Turkish' },
  { label: 'Other' }
]

const degrees = [
  { label: 'Associate' },
  { label: 'Bachelor' },
  { label: 'Master' },
  { label: 'PhD' }
]

export default function Dashboard() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const prices = useSelector((state) => state.app.dashboardApp.prices)
  const count = useSelector((state) => state.app.dashboardApp.count)
  const departments = useSelector((state) => state.app.departmentApp.departments)
  const universities = useSelector((state) => state.app.universityApp.universities)


  const myColumns = [
    {
      field: 'department_id',
      filterable: false,
      headerName: 'Department EN',
      flex: 1,
      minWidth: 300,
      renderCell: (params) => {
        let department = departments.filter(r => r.id === params.value)[0] || null;
        return `${department.department_name_en} - ${department.department_name_ar}`;
      }

    },
    {
      field: 'university_id',
      headerName: 'University',
      flex: 1,
      minWidth: 200,
      filterable: false,
      renderCell: (params) => {
        let university = universities.filter(r => r.id === params.value)[0] || null;
        return (
          <Chip label={university.university_name_en}
            sx={{ backgroundColor: university.color || '', color: 'white' }}
            variant="filled" />
        )

      }
    },

    { field: 'degree', filterable: false, headerName: 'Degree', flex: 1, minWidth: 100 },
    { field: 'language', filterable: false, headerName: 'Language', flex: 1, minWidth: 100 },
    {
      field: 'years', headerName: 'Years', flex: 1, minWidth: 100,
      renderCell: (params) => {
        return `${params.value} Years`;
      }
    },
    {
      field: 'price_before', headerName: 'Price Befor', flex: 1, minWidth: 120,
      renderCell: (params) => {
        if (params.row.currency === 'usd') return `${params.value}$`;
        else return `${params.value}TL`;
      }
    },
    {
      field: 'price_after', headerName: 'Price After', flex: 1, minWidth: 120,
      renderCell: (params) => {
        if (params.row.currency === 'usd') return `${params.value}$`;
        else return `${params.value}TL`;
      }
    },
  ];

  React.useEffect(() => {
    dispatch(getPrices({ department: '', language: '', university: '', degree: '' }, 0));
    dispatch(getDepartments());
    dispatch(getUniversities());
  }, []);


  const [openAddRecord, setOpenRecord] = React.useState(false);
  const [rowData, setRowData] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [department, setDep] = React.useState('');
  const [language, setLan] = React.useState('');
  const [university, setUni] = React.useState('');
  const [degree, setDeg] = React.useState('');




  const handleNextPage = (newPage) => {
    if (newPage < page) {
      setPage(newPage);
    }
    else {
      setPage(newPage);
      if (prices.length / 50 < newPage || prices.length / 50 === newPage) {
        setLoading(true);
        dispatch(getPrices(
          {
            department: department?.id || '',
            language: language?.label || '',
            university: university?.id || '',
            degree: degree?.label || ''
          }
          ,
          newPage
        )).then(res => {
          if (res) {
            setLoading(false);

          }
        });
      }
    }

  };

  const handleClickOpen = () => {
    setOpenRecord(true);
  };

  const handleClose = () => {
    setOpenRecord(false);
    setRowData('');
  };

  const handleSearch = () => {
    dispatch(getPrices(
      {
        department: department?.id || '',
        language: language.label || '',
        university: university?.id || '',
        degree: degree.label || ''
      }
      ,
      0));
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
            <FormDialog rowData={rowData} open={openAddRecord} handleClose={() => handleClose()} />

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Autocomplete
                disablePortal
                required
                id="department"
                name="department"
                size='small'
                sx={{ m: 1, minWidth: 180, maxWidth: 250 }}
                autoComplete="given-name"
                variant="outlined"
                label="Department"
                value={department}
                options={departments}
                getOptionLabel={option => option.department_name_en}
                onChange={(event, newValue) => {
                  setDep(newValue);
                }}
                onInputChange={(event, newValue, reason) => {
                  if (reason === 'reset') {
                    setDep(null)
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Department" />}
              />


              <Autocomplete
                disablePortal
                required
                id="language"
                name="language"
                sx={{ m: 1, minWidth: 180, maxWidth: 250 }}
                size='small'
                autoComplete="given-name"
                variant="outlined"
                label="Language"
                value={language}

                options={languages}
                onChange={(event, newValue) => {
                  setLan(newValue);
                }}
                onInputChange={(event, newValue, reason) => {
                  if (reason === 'reset') {
                    setLan(null)
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Language" />}
              />

              <Autocomplete
                disablePortal
                required
                sx={{ m: 1, minWidth: 180, maxWidth: 250 }}
                id="university"
                name="university"
                value={university}
                size='small'
                autoComplete="given-name"
                variant="outlined"
                label="University"
                options={universities}
                getOptionLabel={option => option.university_name_en}
                onChange={(event, newValue) => {
                  setUni(newValue);
                }}
                onInputChange={(event, newValue, reason) => {
                  if (reason === 'reset') {
                    setUni(null)
                  }
                }}
                renderInput={(params) => <TextField {...params} label="University" />}
              />

              <Autocomplete
                disablePortal
                required
                sx={{ m: 1, minWidth: 180, maxWidth: 250 }}
                size='small'
                id="degree"
                name="degree"
                value={degree}
                variant="outlined"
                label="Degree"
                options={degrees}
                onChange={(event, newValue) => {
                  setDeg(newValue);
                }}
                onInputChange={(event, newValue, reason) => {
                  if (reason === 'reset') {
                    setDeg(null)
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Degree" />}
              />

              <Button onClick={handleSearch} type='submit' sx={{ m: 1, minWidth: 120 }} variant="outlined" startIcon={<ManageSearchRoundedIcon />}>
                Search
              </Button>
              <Can I="add" a="Record">
                <Button onClick={handleClickOpen} sx={{ m: 1, minWidth: 120 }} variant="contained" startIcon={<AddCircleIcon />}>
                  Add Record
                </Button>
              </Can>

            </Grid>
          </Grid>

          <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>

            <div style={{ height: 550, width: '100%' }}>
              <DataGrid
                rows={prices}
                columns={myColumns}
                pageSize={50}
                pagination
                loading={loading}
                page={page}
                onPageChange={(newPage) => handleNextPage(newPage)}
                rowCount={count}

                components={{
                  Toolbar: CustomToolbar,
                }}
                onRowDoubleClick={(params, event) => {
                  setOpenRecord(true);
                  setRowData(params.row);
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