import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Loading() {
    return (
        <Grid
            direction="row"
            justifyContent="center"
            alignItems="center"
            container>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </Grid>
    );
}
