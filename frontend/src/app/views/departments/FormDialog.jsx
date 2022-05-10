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
import { createDepartment, deleteDepartment, updateDepartment } from '../store/departmentSlice';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog({ open, handleClose, rowData }) {
    const dispatch = useDispatch();
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);

    const handleAdd = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoading(true);
        setError(false);
        let dataValues = {
            department_name_en: data.get('nameEN'),
            department_name_ar: data.get('nameAR'),
        }

        dispatch( rowData ?
            updateDepartment(dataValues, rowData.id)
            :
            createDepartment(dataValues)
            ).then((res) => {
            setLoading(false)
            if (res) {
                data.set('nameEN', '');
                data.set('nameAR', '');
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
        dispatch(deleteDepartment(rowData.id)).then((res) => {
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
                            {rowData ? 'Edit Department' : 'Add Department'}
                            {/* {
                                rowData &&
                                <Button onClick={() => { setConfirm(true) }} variant='outlined' startIcon={<DeleteIcon />}>Delete Department</Button>
                            } */}
                        </Grid>
                    </DialogTitle>

                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <TextField
                                fullWidth
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="nameEN"
                                label="Name EN"
                                type="text"
                                defaultValue={rowData?.department_name_en || ''}
                            />
                            <TextField
                                fullWidth
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="nameAR"
                                label="Name AR"
                                type="text"
                                defaultValue={rowData?.department_name_ar || ''}

                            />
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
                        </Grid>
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
