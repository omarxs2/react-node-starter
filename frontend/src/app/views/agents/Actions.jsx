import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormDialog from './FormDialog'
import Typography from '@mui/material/Typography';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function Actions({ columns, rows }) {
  const [age, setAge] = React.useState('');
  const [uni, setUni] = React.useState('');
  const [dep, setDep] = React.useState('');
  const [lan, setLan] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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
        Agents
      </Typography>

      <Button 
      onClick={handleClickOpen} 
      sx={{ m: 1, minWidth: 120 }} 
      variant="contained" 
      startIcon={<SupportAgentIcon />}>
        Add Agent
      </Button>

    </Grid>
  );
}