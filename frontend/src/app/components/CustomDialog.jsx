import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { resetPass } from '../../auth/store/loginSlice';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function CustomDialog({ open, handleClose, rowData }) {
    const dispatch = useDispatch();
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const handleAdd = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoading(true);
        setError(false);
        let role = rowData.role === "Admin" ? 'admin' : 'user'
        if (data.get('new_password') === data.get('confirm_password')) {
            let dataValues = {
                old_password: data.get('old_password'),
                new_password: data.get('new_password'),
            }
            dispatch(resetPass(dataValues, role)).then((res) => {
                setLoading(false)
                if (res) {
                    data.set('old_password', '');
                    data.set('new_password', '');
                    data.set('confirm_password', '');
                    handleClose();
                    setError(false)
                } else {
                    setError(true)
                }
            });
        } else {
            setError('Passwords do not match!')
            setLoading(false)

        }

    };




    return (
        <div>
            <Dialog
                TransitionComponent={Transition}
                open={open} onClose={handleClose}>
                <Box component="form" onSubmit={handleAdd} sx={{ mt: 1 }}>
                    <DialogTitle>
                        Change Password
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
                                name="old_password"
                                label="Old Password"
                                type="password"

                            />
                            <TextField
                                fullWidth
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="new_password"
                                label="New Password"
                                type="password"

                            />
                            <TextField
                                fullWidth
                                required
                                sx={{ m: 1, minWidth: 250 }}
                                margin="dense"
                                name="confirm_password"
                                label="Confirm Password"
                                type="password"
                            />


                        </Grid>


                        {error &&

                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert sx={{ m: 1, minWidth: 250 }}
                                    severity="error"
                                    onClose={() => { setError(false) }}>
                                    {typeof error === "string" ? error : 'Error, Try again'}
                                </Alert>
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
