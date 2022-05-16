import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux'
import Loading from "./app/components/Loading";
import CustomBar from "./app/components/CustomBar";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useTheme } from "@emotion/react";
import Toolbar from '@mui/material/Toolbar';


//auth pages
const Login = React.lazy(() => import("./auth/Login"));
const SignUp = React.lazy(() => import("./auth/SignUp"));
//app pages
const Dashboard = React.lazy(() => import("./app/views/dashboard/Dashboard"));
const Users = React.lazy(() => import("./app/views/users/Users"));
const Universities = React.lazy(() => import("./app/views/universities/Universities"));
const Departments = React.lazy(() => import("./app/views/departments/Departments"));
const Apply = React.lazy(() => import("./app/views/apply-now/ApplyNow"));

//public pages
const ApplyNow = React.lazy(() => import("./pages/apply/ApplyNow"));
const NotFound = React.lazy(() => import("./pages/NotFound"));



function App() {
  const theme = useTheme();

  const token = useSelector((state) => state.auth?.loginApp?.token) || null;
  const role = useSelector((state) => state.auth?.loginApp?.user?.role) || null;

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/apply" component={ApplyNow} />
          {
            token && (
              <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                  <CssBaseline />
                  <CustomBar />
                  <Box
                    component="main"
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[100]
                          : theme.palette.grey[900],
                      flexGrow: 1,
                      height: '100vh',
                      overflow: 'auto',
                    }}
                  >
                    <Toolbar />
                    <Switch>
                      <Route path="/app" component={Dashboard} />
                      <Route path="/apply-now" component={Apply} />

                      {
                        role === 'Admin' && (
                          <Switch>
                            <Route path="/users" component={Users} />
                            <Route path="/universities" component={Universities} />
                            <Route path="/departments" component={Departments} />
                            <Route path='/*' render={() => <Redirect to='/app' />} />
                          </Switch>
                        )
                      }
                      <Route path='/*' render={() => <Redirect to='/app' />} />
                      {/* <Route exact component={NotFound} /> */}
                    </Switch>
                  </Box>
                </Box>
              </ThemeProvider>
            )
          }
          <Route path='/*' render={() => <Redirect to={token ? '/app' : '/login'} />} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
