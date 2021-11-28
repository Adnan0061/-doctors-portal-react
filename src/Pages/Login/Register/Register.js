import { Container, Grid, Typography, Button, CircularProgress, Alert } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import login from '../../../images/login.png'
import { NavLink } from 'react-router-dom';
import { useHistory, useLocation } from "react-router";
import useAuth from '../../../hooks/useAuth';
import Navigation from '../../Shared/Navigation/Navigation';
import { Google } from '@mui/icons-material';

const Register = () => {
    const { user, registerUser, isLoading, authError, googleSignIn } = useAuth();

    const history = useHistory();
    const location = useLocation();
    const url = location?.state?.from || '/';


    const [ loginData, setLoginData ] = useState({})
    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }
    const handleLogin = (e) => {
        if(loginData.password1 !== loginData.password2){
            alert('password doesn\'t match, type again')
            return
        }
        registerUser(loginData.email, loginData.password1, loginData.name)
        
        e.preventDefault()
    }
    return (
        <>
        <Navigation></Navigation>
        <Container>
        <Grid container spacing={2}>
            { isLoading && <CircularProgress />} 
            
                
            <Grid item sx={{mt: 5}} xs={12} md={6}>
                <Typography variant='body1' gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        required
                        style={{width: '75%', margin: '5px 0'}}
                        id="name"
                        label="User Name"
                        name='name'
                        onBlur={handleOnChange}
                        // defaultValue="Hello World"
                        variant="standard"
                        />
                    <TextField
                        required
                        style={{width: '75%', margin: '5px 0'}}
                        id="email"
                        label="Email"
                        type='email'
                        name='email'
                        onChange={handleOnChange}
                        // defaultValue="Hello World"
                        variant="standard"
                        />
                    <TextField
                        required
                        style={{width: '75%', margin: '5px 0'}}
                        id="password1"
                        type="password"
                        label="Password"
                        name='password1'
                        onChange={handleOnChange}
                        variant="standard"
                        // defaultValue=""
                        />
                    <TextField
                        required
                        style={{width: '75%', margin: '5px 0'}}
                        id="password2"
                        type="password"
                        label="Confirm Password"
                        name='password2'
                        onChange={handleOnChange}
                        variant="standard"
                        // defaultValue=""
                        />
                    <br/>
                    <Button type='submit' sx={{ width: '75%', fontWeight: 400, backgroundColor: '#5FC7C7' }} variant="contained">Register</Button>
                    <NavLink to="/login"><Button variant="text">Already have an account?? Login</Button></NavLink><br/>
                </form>
                <Button onClick={()=>googleSignIn(history, url)} sx={{ width: '75%', fontWeight: 400, backgroundColor: 'red' }} variant="contained"><Google/> Sign In With Google</Button>
                {user?.email && <Alert severity="success">Account successfully registered</Alert>}
                {authError && <Alert severity="error">{authError}</Alert>}
            </Grid>
            
            
            <Grid item xs={12} md={6}>
                <img style={{ width: '100%' }} src={login} alt="" />
            </Grid>
        </Grid>
    </Container>
    </>
    );
};

export default Register;