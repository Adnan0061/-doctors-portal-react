import { Container, Grid, Typography, Button, Alert } from '@mui/material';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import TextField from '@mui/material/TextField';
import login from '../../../images/login.png'
import { NavLink } from 'react-router-dom';
import Navigation from '../../Shared/Navigation/Navigation';
import useAuth from '../../../hooks/useAuth';
import { Google } from '@mui/icons-material';

const Login = () => {
    const [ loginData, setLoginData ] = useState({})
    const { user, LoginUser, googleSignIn, authError, setAuthError } = useAuth();

    const history = useHistory();
    const location = useLocation();
    const url = location?.state?.from || '/';

    const handleOnChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }
    const handleLogin = (e) => {
        e.preventDefault()
        // setIsLoading(true)
        LoginUser(loginData.email, loginData.password)
        .then((result) => {
            // alert('Login Successful')
            // setIsLoading(false)
            history.push(url)
        })
        .catch((error) => {
            setAuthError(error.message);
        })
    }
    // console.log(loginData)
    return (
        <>
        <Navigation></Navigation>
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{mt: 5}} xs={12} md={6}>
                    <Typography variant='body1' gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            required
                            style={{width: '75%', margin: '5px 0'}}
                            id="email"
                            type='email'
                            label="Email"
                            name='email'
                            onChange={handleOnChange}
                            // defaultValue="Hello World"
                            variant="standard"
                        />
                        <TextField
                            required
                            style={{width: '75%', margin: '5px 0'}}
                            id="password"
                            type="password"
                            label="Password"
                            name='password'
                            onChange={handleOnChange}
                            variant="standard"
                            // defaultValue=""
                        />
                        <br/>
                        <Button type='submit' sx={{ width: '75%', fontWeight: 400, backgroundColor: '#5FC7C7' }} variant="contained">Login</Button>
                        <NavLink to="/register"><Button variant="text">Don't have an account?? Register</Button></NavLink><br/>
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

export default Login;