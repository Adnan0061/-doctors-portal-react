import { Button, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import Doctor from '../Home/Doctors/Doctor/Doctor';
// import Doctor from './Doctor/Doctor';

const DoctorsAll = () => {
    const [ doctors, setDoctors ] = useState([])

    useEffect(()=>{
        fetch('https://ancient-stream-55775.herokuapp.com/doctors')
        .then(res => res.json())
        .then(data => {
            setDoctors(data)
        })
    },[])
    console.log(doctors)
    return (
        <Box sx={{ flexGrow: 1, my: 10 }}>
            <Container>
            <Typography sx={{ fontWeight: 400, color: '#5FC7C7', textAlign: 'center' }} variant='h4' component='div'>Our Doctors</Typography>
            <Typography sx={{ fontWeight: 500, mt: 2, mb: 10, textAlign: 'center' }} variant='h2' component='div'>Trusted Doctors</Typography>
            <Box>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {doctors.map(doctor => (
                        // <Grid item xs={12} sm={6} md={4} key={doctor._id}>
                            <Doctor key={doctor._id} doctor={doctor}></Doctor>
                        // </Grid>
                    ))}
                </Grid>
            </Box>
            </Container>
        </Box>
    );
};

export default DoctorsAll;