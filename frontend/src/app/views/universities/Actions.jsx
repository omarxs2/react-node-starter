import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormDialog from './FormDialog'
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';

export default function Actions({ columns, rows }) {
  const [openAddRecord, setOpenRecord] = React.useState(false);

  const handleClickOpen = () => {
    setOpenRecord(true);
  };

  const handleClose = () => {
    setOpenRecord(false);
  };


  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <FormDialog open={openAddRecord} handleClose={() => handleClose()} />
      <Typography
        component="h1"
        variant="h7"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        Universities
      </Typography>

      <Button
        onClick={handleClickOpen}
        sx={{ m: 1, minWidth: 120 }}
        variant="contained"
        startIcon={<SchoolIcon />}>
        Add University
      </Button>

    </Grid>
  );
}