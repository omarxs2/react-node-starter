import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import { GithubPicker } from 'react-color';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog({ open, handleClose, rowData }) {

    const handleChangeComplete = (color) => {
        console.log(color.hex)
    };

    return (
        <div>
            <Dialog
                TransitionComponent={Transition}
                open={open} onClose={handleClose}>
                <DialogTitle>Add University</DialogTitle>
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

                        <GithubPicker
                            width='100%'
                            triangle={'hide'}
                            value={'#DB3E00'}
                            onChange={handleChangeComplete}
                        />
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
