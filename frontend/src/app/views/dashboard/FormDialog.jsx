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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Universities = [
    {
        value: 'B',
        label: 'Istanbul Bilgi University',
    },
    {
        value: 'BA',
        label: 'Bahcesehir University',
    },
    {
        value: 'M',
        label: 'Medipol University',
    },
];

const deps = [
    {
        value: 'B',
        label: 'Computer Engineering',
    },
    {
        value: 'BA',
        label: 'Medicine',
    },
    {
        value: 'M',
        label: 'Bussiness Adminstration',
    },
];
export default function FormDialog({ open, handleClose, rowData }) {
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <div>
            <Dialog
                TransitionComponent={Transition}
                open={open} onClose={handleClose}>
                <DialogTitle>Add Record</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add new prices, departments and universities..
                    </DialogContentText>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">

                        <Grid
                            sx={{ mt: 2 }}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <TextField
                                sx={{ m: 1, minWidth: 250 }}
                                id="outlined-select-currency"
                                select
                                label="Department"
                                value={'B'}
                                onChange={handleChange}
                            >
                                {deps.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                sx={{ m: 1, minWidth: 250 }}
                                id="outlined-select-currency-native"
                                select
                                label="University"
                                value={'B'}
                                onChange={handleChange}
                            >
                                {Universities.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center">

                            <TextField
                                sx={{ m: 1, minWidth: 250 }}
                                id="outlined-select-currency"
                                select
                                label="Language"
                                value={'EN'}
                                onChange={handleChange}
                            >
                                <MenuItem key={10} value={'EN'}>
                                    {'English'}
                                </MenuItem>
                                <MenuItem key={10} value={'TR'}>
                                    {'Turkish'}
                                </MenuItem>
                                <MenuItem key={10} value={'AR'}>
                                    {'Arabic'}
                                </MenuItem>
                            </TextField>

                            <TextField

                                sx={{ m: 1, minWidth: 250 }}
                                id="outlined-select-currency-native"
                                select
                                label="Years"
                                value={4}
                                onChange={handleChange}
                            >
                                <MenuItem key={10} value={1}>
                                    {'1 Year'}
                                </MenuItem>
                                <MenuItem key={10} value={2}>
                                    {'2 Years'}
                                </MenuItem>
                                <MenuItem key={10} value={3}>
                                    {'3 Years'}
                                </MenuItem>
                                <MenuItem key={10} value={4}>
                                    {'4 Years'}
                                </MenuItem>
                                <MenuItem key={10} value={5}>
                                    {'5 Years'}
                                </MenuItem>
                                <MenuItem key={10} value={6}>
                                    {'6 Years'}
                                </MenuItem>

                            </TextField>

                        </Grid>

                        <TextField
                            sx={{ m: 1, minWidth: 250 }}
                            autoFocus
                            margin="dense"
                            id="price1"
                            label="Price Before $"
                            type="number"
                            variant="standard"
                        />
                        <TextField
                            sx={{ m: 1, minWidth: 250 }}
                            autoFocus
                            margin="dense"
                            id="price2"
                            label="Price After $"
                            type="number"
                            variant="standard"
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
