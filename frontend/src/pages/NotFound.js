
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

export default function NotFound() {
  return (


    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>404 - Page Not Found</h1>
        <p>I'm sorry, the page you were looking for cannot be found!</p>
      </Grid>
    </Container>

  );
}
