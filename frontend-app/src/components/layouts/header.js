import React, {useContext} from "react";
import './header.css';
import { useNavigate } from "react-router-dom";
import {ParkingContext} from "../../context/ParkingContext";
import {shortenAddress} from "../../utils/shortenAddress";
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ListIcon from '@mui/icons-material/List';

import { 
    Box, Toolbar, IconButton, Typography, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader
} from '@mui/material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open',})(({ theme, open }) => ({
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

const Header = ({page, children}) => {
    const {connectWallet, currentAccount} = useContext(ParkingContext);
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => setOpen(!open);
    let navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar sx={{ pr: '24px' }} > 
                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }), }} > 
                        <MenuIcon /> 
                    </IconButton>

                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} > 
                        {!open && "Parking Manage"} 
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], backgroundColor: '#1976d2' }} >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Box component="div" sx={{ position: 'absolute', left: '20%', top: '2%', fontSize: 'larger', color: 'white' }} >
                    Parking Manage
                </Box>

                <Divider />

                <List component="nav">
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon> <DashboardIcon /> </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    
                    <ListItemButton onClick={() => navigate('/create-parking')}>
                        <ListItemIcon> <LocalParkingIcon /> </ListItemIcon>
                        <ListItemText primary="Create Parking" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate('/parking-list')}>
                        <ListItemIcon> <ListIcon /> </ListItemIcon>
                        <ListItemText primary="Parking List" />
                    </ListItemButton>
                </List>
            </Drawer>
            
            <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                flexGrow: 1, height: '100vh', overflow: 'auto', }} >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}

export default Header