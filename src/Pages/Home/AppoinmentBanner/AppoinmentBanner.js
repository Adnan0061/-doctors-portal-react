import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from '../../../images/doctor.png'
import bg from '../../../images/appointment-bg.png'
import { Button, Container, Typography } from '@mui/material';

const AppoinmentBanner = () => {
    return (
        <Box  container sx={{ flexGrow: 1, background: `URL(${bg})`, backgroundPosition: 'center', backgroundSize: 'inherit', backgroundColor: '#383F52DC', backgroundBlendMode: 'darken, luminosity', mt: 20, mb: 5 }}>
            <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <img style={{maxWidth: '600px', marginTop: -140, marginLeft: -70, marginBottom: -4}} src={doctor} alt="" />
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', alignItems: 'center'}} item xs={12} md={7}>
                    <Box>
                    <Typography  sx={{ fontWeight: 400, color: '#5FC7C7' }} variant='h5' component='div'>Appointment</Typography>
                    <Typography sx={{ fontWeight: 500, color: '#FFF', mt: 2, }} variant='h3' component='div'>Make an appointment Today</Typography>
                    <Typography sx={{ fontWeight: 300, color: '#FFF', my: 5 }} variant='p' component='div'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odit veritatis sequi quisquam facilis amet quaerat ut debitis autem, vero natus, earum error perspiciatis id quibusdam enim vel eum ducimus similique incidunt ea ratione iste. Dolorum numquam dicta laudantium quod?</Typography>
                    <Button sx={{ fontWeight: 400, backgroundColor: '#5FC7C7' }} variant="contained">Contained</Button>
                    </Box>
                </Grid>
            </Grid>
            </Container>
        </Box>
    );
};

export default AppoinmentBanner;