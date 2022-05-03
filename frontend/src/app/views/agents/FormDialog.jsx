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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog({ open, handleClose,rowData }) {

    return (
        <div>
            <Dialog
                TransitionComponent={Transition}
                open={open} onClose={handleClose}>
                <DialogTitle>Add Agent</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add new agent and let them have a great experince..
                    </DialogContentText>
                    <Grid
                        sx={{ mt: 2 }}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">


                        <TextField
                            required
                            sx={{ m: 1, minWidth: 250 }}
                            autoFocus
                            margin="dense"
                            id="price1"
                            label="Name"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            required
                            sx={{ m: 1, minWidth: 250 }}
                            autoFocus
                            margin="dense"
                            id="price1"
                            label="Email"
                            type="email"
                            variant="standard"
                        />
                        <TextField
                            required
                            sx={{ m: 1, minWidth: 250 }}
                            autoFocus
                            margin="dense"
                            id="price1"
                            label="Phone"
                            type="tel"
                            variant="standard"
                        />
                        <TextField
                            required
                            sx={{ m: 1, minWidth: 250 }}
                            autoFocus
                            margin="dense"
                            id="price1"
                            label="Country"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            required
                            sx={{ m: 1, minWidth: 250 }}
                            autoFocus
                            margin="dense"
                            id="price1"
                            label="Company"
                            type="text"
                            variant="standard"
                        />

                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Role
                            </InputLabel>
                            <NativeSelect
                                required
                                defaultValue={10}
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={10}>SubAgent</option>
                                <option value={20}>Employee</option>
                                <option value={30}>Admin</option>

                            </NativeSelect>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 250 }}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Status
                            </InputLabel>
                            <NativeSelect
                                required
                                defaultValue={10}
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={10}>Active</option>
                                <option value={20}>Inactive</option>
                            </NativeSelect>
                        </FormControl>
                    </Grid>



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
