import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux';
import { submitLogin } from './store/loginSlice';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/omarxs/">
                Eduturk
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Login(props) {
    const theme = useTheme()
    let history = useHistory();
    const dispatch = useDispatch();

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const token = useSelector((state) => state.auth.loginApp.token)

    React.useEffect(() => {
        if (token != null) {
          history.push("/app");
        }
      }, []);

    const handleSubmit = (event) => {
        setLoading(true);
        setError(false);
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(submitLogin({
            email: data.get('email'),
            password: data.get('password'),
        })).then((res) => {
            setLoading(false);
            if (res) {
                setError(false)
                history.push("/app");

            } else {
                setError(true)
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(./images/cover.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                defaultValue={'omar@eduturk.net'}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                defaultValue={'1234'}
                                id="password"
                                autoComplete="current-password"
                            />
                            <Grid >
                                {error &&

                                    <Stack spacing={2}>
                                        <Alert sx={{ m: 1, minWidth: 250 }}
                                            severity="error"
                                            onClose={() => { setError(false) }}>
                                            Unauthorized!, Try again later.
                                        </Alert>
                                    </Stack>
                                }
                                {
                                    loading &&
                                    <Stack spacing={2}>
                                        <LinearProgress sx={{ m: 1, minWidth: 250 }} />
                                    </Stack>
                                }
                            </Grid>



                            <Button
                                color='secondary'
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="right">
                                <Grid item>
                                    <Link href="signup" variant="body2">
                                        {"Wanna Became n Agent? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}