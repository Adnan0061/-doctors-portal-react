import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Container } from '@mui/material';

const Navigation = () => {
    const { user, logOutUser } = useAuth();
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Container>
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}><NavLink to='/'  style={{textDecoration: 'none', color: 'white'}}>Doctors Portal
            </NavLink></Typography>

            {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton> */}

        <Link to='/appointment' style={{color:"inherit", textDecoration:'none'}}><Button color="inherit" >Appointment</Button></Link>
        <Link to='/dashboard' style={{color:"inherit", textDecoration:'none'}}><Button color="inherit" >DashBoard</Button></Link>
            {
                user?.email ? <Button onClick={logOutUser} color='inherit'>Log Out</Button>
                :
                <>
                <NavLink to='/login' style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Login</Button></NavLink>
                <NavLink to='/register'  style={{textDecoration: 'none', color: 'white'}}><Button color="inherit">Register</Button></NavLink>
                </>
            }
            
            </Toolbar>
            </Container>
        </AppBar>
        </Box>
    );
};

export default Navigation;