import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from "@emotion/react";
import Copyright from '../../components/Copyright'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import { getSingleApplication } from '../store/applicationSlice';
import Chip from '@mui/material/Chip';
import { useHistory, useParams } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import { API_BASE_URL } from '../../../configs/configs';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import fileService from '../../../services/fileService'
import DeleteIcon from '@mui/icons-material/Delete';
import { updateApplication } from '../store/applicationSlice';
import LinearProgress from '@mui/material/LinearProgress';




const Input = styled('input')({
    display: 'none',
});
export default function Applications() {
    const theme = useTheme();
    let history = useHistory();
    const dispatch = useDispatch();
    let { id } = useParams();

    const application = useSelector((state) => state?.app?.applicationApp?.singleApplication)
    const user = useSelector((state) => state?.auth?.loginApp?.user)


    const [disable, setDisable] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [type, setType] = React.useState('')
    const [notes, setNotes] = React.useState('')
    const [status, setStatus] = React.useState('')

    const [payment, setPayment] = React.useState(application.payment || '')
    const [condLetter, setCondLetter] = React.useState(application.payment || '')
    const [finalLetter, setFinalLetter] = React.useState(application.payment || '')



    React.useEffect(() => {
        dispatch(getSingleApplication(id, user?.role));
    }, []);


    const handleRedirect = () => {
        history.push("/applications");
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
                    case 'Payment':
                        setPayment(target.files[0])
                        break;
                    case 'Final Acceptance':
                        setFinalLetter(target.files[0])
                        break;
                    case 'Conditional Acceptance':
                        setCondLetter(target.files[0])
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

    const handleUpdate = () => {
        setLoading(true)
        let dataValues = {
            status: status,
            notes: notes,
            payment_receipt: payment.path,
            conditional_acceptance: condLetter.path,
            final_acceptance: finalLetter.path,
        }

        dispatch(updateApplication(application.id, dataValues)).then((res) => {
            setLoading(false)
            if (res) {
                history.push(`/applications/${id}`);
            } else {
                setError('Error While Submtting! Try Again.')
            }
        });
    };

    const handleDocChange = (e) => {
        setType(e.target.value)
        setDisable(false)
    };

    return (application ?
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <IconButton onClick={handleRedirect} aria-label="back">
                            <ArrowBackIcon />
                        </IconButton>

                        <Typography
                            component="h1"
                            variant="h7"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {application?.full_name}
                        </Typography>
                        {application && <Chip
                            size="medium"
                            label={application?.status}
                            sx={{
                                m: 1,
                                backgroundColor: application?.status == 'pending' ? '#9c27b0'
                                    : application?.status == 'waiting conditional' ? '#3f51b5'
                                        : application?.status == 'waiting payment' ? '#009688'
                                            : application?.status == 'waiting final' ? '#4fc3f7'
                                                : application?.status == 'canceled' ? '#f44336'
                                                    : '#4caf50'
                                ,
                                color: 'white'
                            }}
                            variant="contained" />
                        }
                        <Button sx={{ mx: 1 }} onClick={handleUpdate} variant="contained" >
                            Update
                        </Button>
                    </Grid>


                    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>

                        {
                            application ?
                                <Grid
                                    sx={{ width: '100%', mt: 2, p: 1 }}
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                >
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

                                    {
                                        application.notes &&
                                        <Grid sx={{ m: 1 }} item xs={12}>
                                            <Stack sx={{ width: '100%' }} spacing={2}>
                                                <Alert
                                                    severity="warning">
                                                    <AlertTitle>Notes:</AlertTitle>
                                                    {application.notes}
                                                </Alert>
                                            </Stack>
                                        </Grid>
                                    }
                                    <Grid item sx={{ m: 1 }} xs={4}>
                                        <TextField
                                            disabled
                                            required
                                            name="full_name"
                                            label="Full Name"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.full_name}
                                        />
                                    </Grid>

                                    <Grid item sx={{ m: 1 }} xs={4}>
                                        <TextField
                                            disabled
                                            required
                                            name="full_name"
                                            label="Email"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.email}
                                        />
                                    </Grid>

                                    <Grid item sx={{ m: 1 }} xs={3}>
                                        <TextField
                                            disabled
                                            required
                                            name="phone"
                                            label="Phone"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.phone}
                                        />
                                    </Grid>
                                    <Grid item sx={{ m: 1 }} xs={3}>
                                        <TextField
                                            disabled
                                            required
                                            name="father"
                                            label="Father"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.father}
                                        />
                                    </Grid>
                                    <Grid item sx={{ m: 1 }} xs={4}>
                                        <TextField
                                            disabled
                                            required
                                            name="mother"
                                            label="Mother"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.mother}
                                        />
                                    </Grid>


                                    <Grid item sx={{ m: 1 }} xs={4}>
                                        <TextField
                                            disabled
                                            required
                                            name="passport_number"
                                            label="Passport"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.passport_number}
                                        />
                                    </Grid>

                                    <Grid item sx={{ m: 1 }} xs={4}>
                                        <TextField
                                            disabled
                                            required
                                            name="nationality"
                                            label="Nationality"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.nationality}
                                        />
                                    </Grid>
                                    <Grid item sx={{ m: 1 }} xs={4}>
                                        <TextField
                                            disabled
                                            required
                                            name="school_name"
                                            label="High School"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.school_name}
                                        />
                                    </Grid>
                                    <Grid item sx={{ m: 1 }} xs={3}>
                                        <TextField
                                            disabled
                                            required
                                            name="gpa"
                                            label="GPA"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.gpa}
                                        />
                                    </Grid>
                                    <Grid item sx={{ m: 1 }} xs={5}>
                                        <TextField
                                            disabled
                                            required
                                            name="graduation_year"
                                            label="Graduation Year"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.graduation_year}
                                        />
                                    </Grid>
                                    <Grid item sx={{ m: 1 }} xs={5}>
                                        <TextField
                                            disabled
                                            required
                                            name="address"
                                            label="Address"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="outlined"
                                            defaultValue={application?.address}
                                        />
                                    </Grid>
                                    {
                                        user.role === 'Admin' &&
                                        <>
                                            <Grid item sx={{ m: 1 }} xs={12}>
                                                <TextField
                                                    name="notes"
                                                    label="Notes"
                                                    fullWidth
                                                    autoComplete="given-name"
                                                    variant="outlined"
                                                    defaultValue={application?.notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                />

                                            </Grid>

                                            <Grid item sx={{ m: 1 }} xs={12}>

                                                <TextField
                                                    select
                                                    name="status"
                                                    label="Status"
                                                    fullWidth
                                                    variant="outlined"
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    defaultValue={application?.status}
                                                >
                                                    <MenuItem key={'pending'} value={'pending'}>
                                                        pending
                                                    </MenuItem>
                                                    <MenuItem key={'waiting payment'} value={'waiting payment'}>
                                                        waiting payment
                                                    </MenuItem>
                                                    <MenuItem key={'waiting conditional acceptance'} value={'waiting conditional acceptance'}>
                                                        waiting conditional acceptance
                                                    </MenuItem>
                                                    <MenuItem key={'waiting final acceptance'} value={'waiting final acceptance'}>
                                                        waiting final acceptance
                                                    </MenuItem>
                                                    <MenuItem key={'officially accepted'} value={'officially accepted'}>
                                                        officially accepted
                                                    </MenuItem>
                                                    <MenuItem key={'canceled'} value={'canceled'}>
                                                        canceled
                                                    </MenuItem>
                                                </TextField>

                                            </Grid></>
                                    }

                                    <Grid sx={{ m: 1 }} item xs={12}>
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert
                                                action={
                                                    <Button color="inherit" size="small" >
                                                        edit
                                                    </Button>
                                                }
                                                severity="success">
                                                <AlertTitle>Application Details:</AlertTitle>
                                                Department: <strong>{application.department}</strong>,
                                                University: <strong> {application.university}</strong>,
                                                Language: <strong>{application.language}</strong>,
                                                Degree: <strong>{application.degree}</strong>
                                            </Alert>
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <List fullWidth dense={false}>
                                            <ListItem
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <FolderIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={'Transcript'}
                                                    secondary={<a target="_blank" href={`${API_BASE_URL}/file/${application.transcript}`}>Transcript</a>}
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <List fullWidth dense={false}>
                                            <ListItem
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <FolderIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={'Diploma'}
                                                    secondary={<a target="_blank" href={`${API_BASE_URL}/file/${application.diploma}`}>Diploma</a>}
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <List fullWidth dense={false}>
                                            <ListItem
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <FolderIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={'Personal Image'}
                                                    secondary={<a target="_blank" href={`${API_BASE_URL}/file/${application.personal_image}`}>Personal Image</a>}
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <List fullWidth dense={false}>
                                            <ListItem
                                            >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <FolderIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={'Passport'}
                                                    secondary={<a target="_blank" href={`${API_BASE_URL}/file/${application.passport}`}>Passport</a>}
                                                />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    {
                                        application.other_files &&
                                        <Grid item xs={3}>
                                            <List fullWidth dense={false}>
                                                <ListItem
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <FolderIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={'Other'}
                                                        secondary={<a target="_blank" href={`${API_BASE_URL}/file/${application.other_files}`}>Other</a>}
                                                    />
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    }

                                    {
                                        application.final_acceptance &&
                                        <Grid item xs={3}>
                                            <List fullWidth dense={false}>
                                                <ListItem
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <FolderIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={'Final Acceptance'}
                                                        secondary={<a target="_blank" href={`${API_BASE_URL}/file/${application.final_acceptance}`}>Final Acceptance</a>}
                                                    />
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    }

                                    {
                                        application.conditional_acceptance &&
                                        <Grid item xs={3}>
                                            <List fullWidth dense={false}>
                                                <ListItem
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <FolderIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={'Conditional Acceptance'}
                                                        secondary={<a target="_blank" href={`${API_BASE_URL}/file/${application.conditional_acceptance}`}>Conditional Acceptance</a>}
                                                    />
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    }

                                    {
                                        application.payment_receipt &&
                                        <Grid item xs={3}>
                                            <List fullWidth dense={false}>
                                                <ListItem
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <FolderIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={'Payment'}
                                                        secondary={<a target="_blank" href={`${API_BASE_URL}/file/${application.payment_receipt}`}>Payment</a>}
                                                    />
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    }
                                    {
                                        application.other_files &&
                                        <Grid item xs={3}>
                                            <List fullWidth dense={false}>
                                                <ListItem
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <FolderIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={'Other'}
                                                        secondary={<a target="_blank" href={`${API_BASE_URL}/file/${application.other_files}`}>Other</a>}
                                                    />
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    }
                                    <Grid item xs={12}>
                                        <Divider>Documents</Divider>
                                    </Grid>


                                    <Grid
                                        sx={{ m: 1 }}
                                        container
                                        spacing={3}
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center">
                                        <Grid item xs={6} >
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                select
                                                label="Select Type"
                                                onChange={handleDocChange}
                                            >
                                                {user.role === 'Admin' && <MenuItem key={'Conditional Acceptance'} value={'Conditional Acceptance'}> {'Conditional Acceptance'}</MenuItem>}
                                                {user.role === 'Admin' && <MenuItem key={'Final Acceptance'} value={'Final Acceptance'}> {'Final Acceptance'}</MenuItem>}
                                                {user.role != 'Admin' && <MenuItem key={'Payment'} value={'Payment'}> {'Payment'}</MenuItem>}

                                            </TextField>
                                        </Grid>

                                        <Grid item spacing={3} xs={3}>
                                            <label htmlFor="contained-button-file">
                                                <Input onChange={handleCapture} accept="image/*, application/*" id="contained-button-file" multiple type="file" />
                                                <Button disabled={disable} variant="contained" component="span">
                                                    Upload
                                                </Button>
                                            </label>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <List fullWidth dense={false}>
                                            {
                                                payment &&
                                                <ListItem
                                                    secondaryAction={
                                                        <IconButton onClick={() => setPayment(null)} edge="end" aria-label="delete">
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
                                                        primary={'Payment'}
                                                        secondary={<a href={`${API_BASE_URL}/file/${payment.path}`}>{payment.name}</a>}
                                                    />
                                                </ListItem>
                                            }
                                            {
                                                condLetter &&
                                                <ListItem
                                                    secondaryAction={
                                                        <IconButton onClick={() => setCondLetter(null)} edge="end" aria-label="delete">
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
                                                        primary={'Condetional Acceptance Letter'}
                                                        secondary={<a href={`${API_BASE_URL}/file/${condLetter.path}`}>{condLetter.name}</a>}
                                                    />
                                                </ListItem>
                                            }
                                            {
                                                finalLetter &&
                                                <ListItem
                                                    secondaryAction={
                                                        <IconButton onClick={() => setFinalLetter(null)} edge="end" aria-label="delete">
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
                                                        primary={'Final Acceptance Letter'}
                                                        secondary={<a href={`${API_BASE_URL}/file/${finalLetter.path}`}>{finalLetter.name}</a>}
                                                    />
                                                </ListItem>
                                            }
                                        </List>
                                    </Grid>

                                </Grid>


                                :

                                <Grid
                                    item
                                    xs={12}
                                    direction="column"
                                    justifyContent="centert"
                                    alignItems="center"
                                >

                                    <h1>Application not found</h1>

                                </Grid>


                        }



                    </Paper>



                </Grid>
            </Grid >
            <Copyright sx={{ pt: 4 }} />
        </Container >
        :
        <></>
    );
}
