import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import { deleteToken } from "../../auth/store/loginSlice";
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from './CustomDialog';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useHistory } from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);



const CustomBar = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const user = useSelector((state) => state.auth.loginApp.user)

  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [pages, setPages] = React.useState(user.role === 'Admin' ? ['Dashboard', 'Apply','Users', 'Universities', 'Departments'] : ['Dashboard','Apply']);



  const toggleDrawer = () => {
    setOpen(!open);
  };


  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const logout = () => {
    dispatch(deleteToken());
  };
  return (
    <>
      <CustomDialog open={openDialog} handleClose={handleClose} rowData={user} />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar sx={{ mr: 1 }} alt="logo" src="/images/logo.png" />

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Eduturk Dashboard - {user.name}
          </Typography>

          <Button
            onClick={handleOpen}
            variant="outlined"
            sx={{ mx: 1, textTransform: "none" }}
            color="inherit"
          >
            Change Password - تغير كلمة المرور
          </Button>

          <Button
            onClick={logout}
            variant="outlined"
            sx={{ textTransform: "none" }}
            color="inherit"
          >
            تسجيل خروج - Logout
          </Button>

        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>

        </Toolbar>

        <Divider />
        <List component="nav">

 {/* ['Dashboard', 'Users', 'Universities', 'Departments'] : ['Dashboard','Apply']); */}

          <List>
            {pages.map((text, index) => (
              <ListItem
                onClick={() => {
                  text === 'Dashboard' ? history.push("/app") :
                  text === 'Users' ? history.push("/users") :
                  text === 'Universities' ? history.push("/universities") :
                  text === 'Apply' ? history.push("/apply-now") :
                        history.push("/departments")
                }}
                button key={text}>
                <ListItemIcon>
                  {text === 'Dashboard' ? <DashboardIcon /> :
                    text === 'Users' ? <PeopleIcon /> :
                    text === 'Universities' ? <BarChartIcon /> :
                    text === 'Apply' ? <AppRegistrationIcon /> :
                        <LayersIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

        </List>
      </Drawer>
    </>
  );
};
export default CustomBar;




