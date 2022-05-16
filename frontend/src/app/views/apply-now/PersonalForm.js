import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import applicationService from '../../../services/applicationService';

export default function PersonalForm({ handleNext, setPersonalInfo, personalInfo }) {

  const [exist, setExist] = React.useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let dataValues = {
      full_name: data.get('full_name'),
      father: data.get('father'),
      mother: data.get('mother'),
      email: data.get('email'),
      phone: data.get('phone'),
      passport_number: data.get('passport_number'),
      nationality: data.get('nationality'),
      school_name: data.get('school_name'),
      gpa: data.get('gpa'),
      graduation_year: data.get('graduation_year'),
      address: data.get('address'),
    }

    setPersonalInfo(dataValues)
    handleNext()
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const emailChange = (event) => {
    let email = event.target.value

    if (validateEmail(email) != null) {
      applicationService.checkEmail(email).then(res => {
        if (res.response.exist) {
          setExist(true)
        } else {
          setExist(false)
        }
      })
    }
  }
  
  return (
    <React.Fragment>
      <Box component="form" onSubmit={handleChange} sx={{ mt: 1 }}>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              required
              id="full_name"
              name="full_name"
              label="Full Name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              defaultValue={personalInfo?.full_name}
            />
          </Grid>
          <Grid item xs={6}  >
            <TextField
              required
              error={exist}
              helperText={exist ? "email is already exist in Eduturk database" : null}
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              type="email"
              variant="outlined"
              defaultValue={personalInfo?.email}
              onChange={(e) => emailChange(e)}

            />
          </Grid>


          <Grid item xs={4}  >
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              autoComplete="phone"
              variant="outlined"
              defaultValue={personalInfo?.phone}

            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="father"
              name="father"
              label="Father Name"
              fullWidth
              autoComplete="father-name"
              variant="outlined"
              defaultValue={personalInfo?.father}

            />
          </Grid>
          <Grid item xs={4}  >
            <TextField
              required
              id="mother"
              name="mother"
              label="Mother Name"
              fullWidth
              autoComplete="mother-name"
              variant="outlined"
              defaultValue={personalInfo?.mother}

            />
          </Grid>



          <Grid item xs={12}>
            <Divider>Passport Information</Divider>
          </Grid>
          <Grid item xs={6} >
            <TextField
              required
              id="passport_number"
              name="passport_number"
              label="Passport Number"
              fullWidth
              variant="outlined"
              defaultValue={personalInfo?.passport_number}

            />
          </Grid>
          <Grid item xs={6} >
            <TextField
              required
              id="nationality"
              name="nationality"
              label="Nationality"
              fullWidth
              autoComplete="shipping country"
              variant="outlined"
              defaultValue={personalInfo?.nationality}

            />
          </Grid>
          <Grid item xs={12}>
            <Divider>School Information</Divider>
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="school_name"
              name="school_name"
              label="High School Name"
              fullWidth
              variant="outlined"
              defaultValue={personalInfo?.school_name}

            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              id="gpa"
              name="gpa"
              label="Average (GPA)"
              fullWidth
              variant="outlined"
              defaultValue={personalInfo?.gpa}

            />
          </Grid>
          <Grid item xs={4}  >
            <TextField
              required
              id="graduation_year"
              name="graduation_year"
              label="Graduation Year"
              fullWidth
              variant="outlined"
              defaultValue={personalInfo?.graduation_year}

            />
          </Grid>
          <Grid item xs={12}>
            <Divider>Address Information</Divider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address (City and Country)"
              fullWidth
              variant="outlined"
              defaultValue={personalInfo?.address}

            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="right"
          alignItems="right">
          <Button
            disabled={exist}
            variant="contained"
            type="submit"
            sx={{ mt: 3, ml: 1 }}
          >
            Next
          </Button>
        </Grid>


      </Box>
    </React.Fragment>
  );
}