import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PersonalForm from './PersonalForm';
import PreferenceForm from './PreferenceForm';
import { useTheme } from "@emotion/react";
import Grid from '@mui/material/Grid';
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Personal Information', 'Preference Details'];


export default function ApplyNow() {
  let history = useHistory();

  const [activeStep, setActiveStep] = React.useState(0);
  const [personalInfo, setPersonalInfo] = React.useState({});
  const [ref, setRef] = React.useState('');


  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleRedirect = () => {
    history.push("/applications");
  };


  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Apply Now
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === 0 ?
            <React.Fragment>
              <PersonalForm
                personalInfo={personalInfo}
                handleNext={handleNext}
                setPersonalInfo={(data) => setPersonalInfo(data)} />
            </React.Fragment>
            : activeStep === 1 ?
              <React.Fragment>
                <PreferenceForm
                  handleNext={handleNext}
                  handleBack={handleBack}
                  personalInfo={personalInfo}
                  setPersonalInfo={(data) => setPersonalInfo(data)}
                  setRef={(data) => setRef(data)}
                />
              </React.Fragment>
              :
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Your Application Has Been Submitted.
                </Typography>
                <Typography display="inline" variant="subtitle1">
                  {' Your registration code is: '}
                </Typography>
                <Typography display="inline" variant="h6">
                  {ref}
                </Typography>
                <Typography display="inline" variant="subtitle1">
                 {', We have emailed you registration confirmation, and will send you an update when your status has changed.'}
                  
                </Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Start New Application
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleRedirect}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Go To Applications List
                  </Button>
                </Grid>
              </React.Fragment>

          }
        </React.Fragment>
      </Paper >
      <Copyright />
    </Container >
  );
}