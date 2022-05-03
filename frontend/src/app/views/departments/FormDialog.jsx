import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog({ open, handleClose, rowData }) {


    return (
        <div>
            <Dialog
                TransitionComponent={Transition}
                open={open} onClose={handleClose}>
                <DialogTitle>Add Department</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <TextField
                            fullWidth
                            required
                            sx={{ m: 1, minWidth: 250 }}
                            autoFocus
                            margin="dense"
                            id="price1"
                            label="Name EN"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            fullWidth
                            required
                            sx={{ m: 1, minWidth: 250 }}
                            autoFocus
                            margin="dense"
                            id="price1"
                            label="Name AR"
                            type="text"
                            variant="standard"
                        />

                        <FormControl sx={{ m: 1, minWidth: '100%' }}>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Years
                            </InputLabel>
                            <NativeSelect
                                required
                                defaultValue={40}
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={10}>1 Year</option>
                                <option value={20}>2 Years</option>
                                <option value={30}>3 Years</option>
                                <option value={10}>4 Years</option>
                                <option value={50}>5 Years</option>
                                <option value={60}>6 Years</option>

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
