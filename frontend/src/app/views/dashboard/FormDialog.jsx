import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { createPrice, updatePrice, deletePrice } from '../store/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteIcon from '@mui/icons-material/Delete';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function FormDialog({ open, handleClose, rowData }) {
    const dispatch = useDispatch();
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);

    const departments = useSelector((state) => state.app.departmentApp.departments)
    const universities = useSelector((state) => state.app.universityApp.universities)

    const handleChange = (event, type) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let value = event.target.value
        data.set(type, value);
    };

    const handleAdd = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoading(true);
        setError(false);
        let dataValues = {
            department_id: data.get('department'),
            university_id: data.get('university'),
            language: data.get('language'),
            years: data.get('years'),
            degree: data.get('degree'),
            currency: data.get('currency'),
            price_before: data.get('price_before'),
            price_after: data.get('price_after')
        }
        dispatch(
            rowData ?
                updatePrice(dataValues, rowData.id)
                :
                createPrice(dataValues)
        ).then((res) => {
            setLoading(false)
            if (res) {
                data.set('department', '');
                data.set('university', '');
                data.set('language', 'English');
                data.set('years', 4);
                data.set('degree', 'Bachalor');
                data.set('currency', 'usd');
                data.set('isActive', '');
                data.set('price_after', '');
                handleClose();
                setError(false)
            } else {
                setError(true)
            }
        });
    };

    const handleDelete = () => {
        setLoading(true);
        setError(false);
        dispatch(deletePrice(rowData.id)).then((res) => {
            setLoading(false)
            setConfirm(false)
            if (res) {
                handleClose();
                setError(false)
            } else {
                setError(true)
            }
        });
    };


    return (
        <div>
            <Dialog
                open={confirm}
                onClose={() => { setConfirm(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this record?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By deleting this record there is no way to restor data back.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setConfirm(false) }}>Cancel</Button>
                    <Button variant='contained' onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                TransitionComponent={Transition}
                open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleAdd} sx={{ mt: 1 }}>
                    <DialogTitle>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center">
                            {rowData ? 'Edit Record' : 'Add Record'}
                            {
                                rowData &&
                                <Button onClick={() => { setConfirm(true) }} variant='outlined' startIcon={<DeleteIcon />}>Delete Record</Button>
                            }
                        </Grid>
                    </DialogTitle>

                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">

                            <TextField
                                required
                                sx={{ m: 1, mx: 2, minWidth: 250 }}
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Department"
                                name='department'
                                onChange={(e) => handleChange(e, 'department')}
                                defaultValue={rowData?.department_id}
                            >
                                {departments.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.department_name_en} - {option.department_name_ar}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                required
                                sx={{ m: 1, mx: 2, minWidth: 250 }}
                                id="outlined-select-currency-native"
                                select
                                label="University"
                                fullWidth
                                name='university'
                                onChange={(e) => handleChange(e, 'university')}
                                defaultValue={rowData?.university_id}

                            >
                                {universities.map((option) => (

                                    <MenuItem key={option.id} value={option.id}>
                                        {option.university_name_en} -  {option.university_name_ar}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                select
                                label="Years"
                                name='years'
                                defaultValue={rowData?.years || 4}
                                onChange={(e) => handleChange(e, 'years')}
                            >
                                <MenuItem key={1} value={1}>{'1 Year'}</MenuItem>
                                <MenuItem key={2} value={2}>{'2 Years'}</MenuItem>
                                <MenuItem key={3} value={3}>{'3 Years'}</MenuItem>
                                <MenuItem key={4} value={4}>{'4 Years'}</MenuItem>
                                <MenuItem key={5} value={5}>{'5 Years'}</MenuItem>
                                <MenuItem key={6} value={6}>{'6 Years'}</MenuItem>
                            </TextField>

                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                name="degree"
                                select
                                label="Degree"
                                defaultValue={rowData?.degree || 'Bachelor'}
                                onChange={(e) => handleChange(e, 'degree')}
                            >
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

                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                select
                                label="Language"
                                name='language'
                                defaultValue={rowData?.language || 'English'}
                                onChange={(e) => handleChange(e, 'language')}
                            >
                                <MenuItem key={10} value={'English'}>
                                    English
                                </MenuItem>
                                <MenuItem key={20} value={'Turkish'}>
                                    Turkish
                                </MenuItem>
                                <MenuItem key={30} value={'Other'}>
                                    Other
                                </MenuItem>
                            </TextField>

                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                id="outlined-select-currency"
                                select
                                label="Currency"
                                name='currency'
                                defaultValue={rowData?.currency || 'usd'}
                                onChange={(e) => handleChange(e, 'currency')}
                            >
                                <MenuItem key={10} value={'usd'}>
                                    USD $
                                </MenuItem>
                                <MenuItem key={10} value={'tl'}>
                                    TL ₺
                                </MenuItem>
                            </TextField>


                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="price_before"
                                label="Price Before"
                                type="number"
                                defaultValue={rowData?.price_before || ''}

                            />

                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="price_after"
                                label="Price After"
                                type="number"
                                defaultValue={rowData?.price_after || ''}
                            />

                        </Grid>


                        {error &&

                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert sx={{ m: 1, minWidth: 250 }}
                                    severity="error"
                                    onClose={() => { setError(false) }}>
                                    Error, Try again</Alert>
                            </Stack>
                        }
                        {
                            loading &&
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <LinearProgress sx={{ m: 1, minWidth: 250 }} />
                            </Stack>
                        }


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant='contained' >{rowData ? 'Edit' : 'Add'}</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
