import { Button, TextField, Alert } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [ email, setEmail ] = useState('')
    const [ success, setSuccess ] = useState(false)
    const {token} = useAuth()

    const handleOnBlur = (e) => {
        setEmail(e.target.value)
    }

    console.log(email)

    const handleAdimnSubmit = (e) => {
        const user = { email }
        // console.log(user)
        fetch('https://ancient-stream-55775.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data=> {
            if(data.modifiedCount){
                setSuccess(true)
                // console.log(data)
            }
        })

        e.preventDefault()
    }

    return (
        <Box sx={{p: 5, m: 5 }} >
            <form onSubmit={handleAdimnSubmit}>
                <TextField
                    required
                    style={{ width: '50%', margin: '5px 0' }}
                    id="email"
                    label="Email"
                    name='email'
                    onBlur={handleOnBlur}
                    // defaultValue="Hello World"
                    variant="standard"
                />
                <Button type='submit' sx={{  fontWeight: 400, backgroundColor: '#5FC7C7', m: 2}} variant="contained">Make Admin</Button>
            </form>
            {success && <Alert severity="success">Admin made successfully.</Alert>}
        </Box>
    );
};

export default MakeAdmin;