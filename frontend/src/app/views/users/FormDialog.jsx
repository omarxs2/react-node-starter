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
import { createUser, deleteUser, updateUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';

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
            name: data.get('name'),
            email: data.get('email'),
            phone: data.get('phone'),
            company: data.get('company'),
            country: data.get('country'),
            logo: './images/logo.png',
            role: data.get('role'),
            isActive: data.get('isActive') === '0' ? 0 : 1
        }

        dispatch(rowData ?
            updateUser(dataValues, rowData.id)
            :
            createUser(dataValues)).then((res) => {
                setLoading(false)
                if (res) {
                    data.set('name', '');
                    data.set('email', '');
                    data.set('phone', '');
                    data.set('company', '');
                    data.set('country', '');
                    data.set('role', 'subagent');
                    data.set('isActive', 1);
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
        dispatch(deleteUser(rowData.id)).then((res) => {
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

    const handleChange = (event, type) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let value = event.target.value
        data.set(type, value);
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
                            {rowData ? 'Edit User' : 'Add User'}
                            {
                                rowData &&
                                <Button onClick={() => { setConfirm(true) }} variant='outlined' startIcon={<DeleteIcon />}>Delete User</Button>
                            }
                        </Grid>

                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>{
                            rowData &&
                            `Auto Generated Password:  ${rowData?.auto_generated_password||'No Password'}`
                        }

                        </DialogContentText>
                        <Grid
                            sx={{ mt: 2 }}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="name"
                                label="Name"
                                type="text"
                                defaultValue={rowData?.name || ''}
                            />
                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="email"
                                label="Email"
                                type="email"
                                defaultValue={rowData?.email || ''}
                            />
                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="phone"
                                label="Phone"
                                type="tel"
                                defaultValue={rowData?.phone || ''}

                            />
                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="country"
                                label="Country"
                                type="text"
                                defaultValue={rowData?.country || ''}

                            />
                            <TextField
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="company"
                                label="Company"
                                type="text"
                                defaultValue={rowData?.company || ''}

                            />
                            <TextField
                                sx={{ m: 1, minWidth: 250 }}
                                name="role"
                                select
                                label="Role"
                                onChange={(e) => handleChange(e, 'role')}
                                defaultValue={rowData?.role || 'SubAgent'}
                            >
                                <MenuItem key={1} value={'SubAgent'}>SubAgent</MenuItem>
                                <MenuItem key={2} value={'Agent'}>Agent</MenuItem>
                                <MenuItem key={3} value={'Admin'}>Admin</MenuItem>

                            </TextField>
                            <TextField
                                sx={{ m: 1, mx: 2 }}
                                name="isActive"
                                select
                                label="Status"
                                fullWidth
                                defaultValue={rowData?.isActive === false ? 0 : 1}
                                onChange={(e) => handleChange(e, 'isActive')}
                            >
                                <MenuItem key={1} value={1}>Active</MenuItem>
                                <MenuItem key={2} value={0}>Inactive</MenuItem>
                            </TextField>
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
        </div >
    );
}
