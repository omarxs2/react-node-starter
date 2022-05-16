import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { getUniversities } from '../store/universitySlice';
import { getDepartments } from '../store/departmentSlice';
import { getPrices } from '../store/dashboardSlice';

import Box from '@mui/material/Box';
import fileService from '../../../services/fileService'
import { API_BASE_URL } from '../../../configs/configs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';

import { createApplication } from '../store/applicationSlice';
import LinearProgress from '@mui/material/LinearProgress';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';

const columns = [
  { id: 'department_en', label: 'Department EN', minWidth: 200 },
  { id: 'department_ar', label: 'Department AR', minWidth: 200 },
  { id: 'university', label: 'University', minWidth: 200 },
  { id: 'language', label: 'Language', minWidth: 120 },
  { id: 'degree', label: 'Degree', minWidth: 120 },
  { id: 'years', label: 'Yesrs', minWidth: 120 },
  { id: 'price_after', label: 'Price After', minWidth: 155 },
  { id: 'action', label: 'Action', minWidth: 155 },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#aaabab',
    // theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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

const Input = styled('input')({
  display: 'none',
});

export default function PreferenceForm({ handleBack, personalInfo, setRef, handleNext, setPersonalInfo }) {
  const dispatch = useDispatch();

  const departments = useSelector((state) => state.app?.departmentApp?.departments)
  const universities = useSelector((state) => state.app?.universityApp?.universities)
  const user = useSelector((state) => state.auth?.loginApp?.user)
  const prices = useSelector((state) => state.app.dashboardApp.prices)

  const [type, setType] = React.useState('')
  const [disable, setDisable] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [transcript, setTranscript] = React.useState();
  const [diploma, setDiploma] = React.useState();
  const [personal, setPersonal] = React.useState();
  const [passport, setPassport] = React.useState();
  const [other, setOther] = React.useState();
  const [application, setApplication] = React.useState();

  const [dep, setDep] = React.useState('');
  const [lan, setLan] = React.useState('');
  const [uni, setUni] = React.useState('');
  const [deg, setDeg] = React.useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    dispatch(getDepartments());
    dispatch(getUniversities());
    dispatch(getPrices({ department: '', language: '', university: '', degree: '' }));

  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleSearch = (fiter) => {

    let filter = {
      department: dep?.id || '',
      university: uni?.id || '',
      language: lan?.label || '',
      degree: deg?.label || '',
    }

    dispatch(getPrices(filter)).then(() => {
      setPage(0);
    });
  }

  const handleChange = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!transcript || !diploma || !personal || !passport) {
      setError('Please Upload All Required Documents !')
    }
    if (!application) {
      setError('Please Select Application First !')
    }

    let dataValues = {
      ...personalInfo,
      department: application.department_id,
      language: application.language,
      degree: application.degree,
      university: application.university_id,
      transcript: transcript.path,
      diploma: diploma.path,
      personal_image: personal.path,
      passport: passport.path,
      other_files: other?.path || '',
      agent_id: user.id
    }

    dispatch(createApplication(dataValues)).then((res) => {
      setLoading(false)
      if (res) {
        setRef(res.reference_code)
        setPersonalInfo({})
        handleNext()
        setTranscript('')
        setDiploma('')
        setPersonal('')
        setPassport('')
        setOther('')
        setError(false)
      } else {
        setError('Error While Submtting! Try Again.')
      }
    });
  };


  const handleDocChange = (e) => {
    setType(e.target.value)
    setDisable(false)
  };


  const handleCapture = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    let data = new FormData()
    data.append('file', target.files[0])
    setDisable(true)

    fileService.sendFile(data).then(res => {
      if (res.response.success) {
        target.files[0].documentType = type
        target.files[0].path = res.response.path
        switch (type) {
          case 'Diploma':
            setDiploma(target.files[0])
            break;
          case 'Transcript':
            setTranscript(target.files[0])
            break;
          case 'Passport':
            setPassport(target.files[0])
            break;
          case 'Personal Image':
            setPersonal(target.files[0])
            break;
          case 'Other':
            setOther(target.files[0])
            break;
          default:
            break;
        }
        target.value = ''

      }
      else {
        return setError('Error While Uploading, Try Again.')
      }
    })
  };


  return (
    <React.Fragment>
      <Box component="form" onSubmit={handleChange} sx={{ mt: 1 }}>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center">

          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              required
              id="department"
              name="department"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              label="Department"
              options={departments}
              getOptionLabel={option => option.department_name_en}
              onChange={(event, newValue) => {
                setDep(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Department" />}
            />
          </Grid>

          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              required
              id="language"
              name="language"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              label="Language"
              options={languages}
              onChange={(event, newValue) => {
                setLan(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Language" />}
            />
          </Grid>


          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              required
              id="degree"
              name="degree"
              fullWidth
              variant="outlined"
              label="Degree"
              options={degrees}
              onChange={(event, newValue) => {
                setDeg(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Degree" />}
            />
          </Grid>

          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              required
              id="university"
              name="university"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              label="University"
              options={universities}
              getOptionLabel={option => option.university_name_en}
              onChange={(event, newValue) => {
                setUni(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="University" />}
            />
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="outlined"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>



          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {
                      columns && columns.map(column => (
                        <StyledTableCell key={column.id} align={'center'}>{column.label}</StyledTableCell>

                      ))
                    }

                  </TableRow>
                </TableHead>
                <TableBody>
                  {prices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      let department = departments.filter(r => r.id === row['department_id'])[0];
                      let university = universities.filter(r => r.id === row['university_id'])[0];
                      return (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="right">{department.department_name_en}</StyledTableCell>
                          <StyledTableCell align="right">{department.department_name_ar}</StyledTableCell>
                          <StyledTableCell align="right">{university.university_name_en}</StyledTableCell>
                          <StyledTableCell align="right">{row.language}</StyledTableCell>
                          <StyledTableCell align="right">{row.years}</StyledTableCell>
                          <StyledTableCell align="right">{row.degree}</StyledTableCell>
                          <StyledTableCell align="right">{row.price_after}</StyledTableCell>
                          <StyledTableCell align="right">
                            <Button
                              size="small" variant="contained" component="span"
                              onClick={() => setApplication(row)}>
                              select
                            </Button>
                          </StyledTableCell>

                        </StyledTableRow>
                      )
                    })
                  }

                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={prices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>


          {
            application &&
            <Grid item xs={12}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert
                  action={
                    <Button color="inherit" size="small" onClick={() => setApplication(null)}>
                      delete
                    </Button>
                  }
                  severity="info">
                  <AlertTitle>Selected Application:</AlertTitle>
                  Department: <strong>{departments.filter(r => r.id === application['department_id'])[0].department_name_en}</strong>,
                  University: <strong> {universities.filter(r => r.id === application['university_id'])[0].university_name_en} </strong>,
                  Language: <strong>{application.language}</strong>,
                  Degree: <strong>{application.degree}</strong>,
                  Price: <strong>{application.price_after}{application.currency == 'usd' ? '$' : 'TL'}</strong>,
                </Alert>
              </Stack>
            </Grid>
          }

          <Grid item xs={12}>
            <Divider>Documents</Divider>
          </Grid>

          <Grid item xs={6} >
            <TextField
              fullWidth
              variant="outlined"
              select
              label="Select Type"
              onChange={handleDocChange}
            >
              <MenuItem key={'Diploma'} value={'Diploma'}> {'Diploma'}</MenuItem>
              <MenuItem key={'Transcript'} value={'Transcript'}> {'Transcript'}</MenuItem>
              <MenuItem key={'Passport'} value={'Passport'}> {'Passport'}</MenuItem>
              <MenuItem key={'Personal Image'} value={'Personal Image'}> {'Personal Image'}</MenuItem>
              <MenuItem key={'Other'} value={'Other'}> {'Other'}</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <label htmlFor="contained-button-file">
              <Input onChange={handleCapture} accept="image/*, application/*" id="contained-button-file" multiple type="file" />
              <Button disabled={disable} variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Grid>


          <Grid item xs={12}>
            <List fullWidth dense={false}>
              {
                diploma &&
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => setDiploma(null)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={'Diploma'}
                    secondary={<a href={`${API_BASE_URL}/file/${diploma.path}`}>{diploma.name}</a>}
                  />
                </ListItem>
              }
              {
                transcript &&
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => setTranscript(null)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={'Transcript'}
                    secondary={<a href={`${API_BASE_URL}/file/${transcript.path}`}>{transcript.name}</a>}
                  />
                </ListItem>
              }
              {
                personal &&
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => setPersonal(null)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={'Personal Image'}
                    secondary={<a href={`${API_BASE_URL}/file/${personal.path}`}>{personal.name}</a>}
                  />
                </ListItem>
              }
              {
                passport &&
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => setPassport(null)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={'Passport'}
                    secondary={<a href={`${API_BASE_URL}/file/${passport.path}`}>{passport.name}</a>}
                  />
                </ListItem>
              }
              {
                other &&
                <ListItem
                  secondaryAction={
                    <IconButton onClick={() => setOther(null)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={'Other'}
                    secondary={<a href={`${API_BASE_URL}/file/${other.path}`}>{other.name}</a>}
                  />
                </ListItem>
              }
            </List>
          </Grid>
          {
            error &&
            <Grid item xs={12}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert
                  fullWidth
                  sx={{ m: 1 }}
                  severity="error"
                  onClose={() => { setError(false) }}>
                  {error || 'Error, Try again'}
                </Alert>
              </Stack>
            </Grid>
          }
          {
            loading &&
            <Grid item xs={12}>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <LinearProgress sx={{ m: 1, minWidth: 250 }} />
              </Stack>
            </Grid>
          }
          <Grid
            container
            direction="row"
            justifyContent="right"
            alignItems="right">
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ mt: 3, ml: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment >
  );
}