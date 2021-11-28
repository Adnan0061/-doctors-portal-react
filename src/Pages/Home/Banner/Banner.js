import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import chair from '../../../images/chair.png'
import bg from '../../../images/bg.png'
import { Button, Container, Typography } from '@mui/material';

const Banner = () => {
    return (
        <Box sx={{ py:15, flexGrow: 1, background: `URL(${bg})`, backgroundPosition: 'center', backgroundSize: 'inherit' }} >
            <Container>
            <Grid container spacing={2}>
                <Grid  sx={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', alignItems: 'center'}} item xs={12} md={5}>
                <Box>
                    <Typography sx={{ fontWeight: 500, mt: 2, }} variant='h3' component='div'>Make an appointment Today</Typography>
                    <Typography sx={{ fontWeight: 300, my: 5 }} variant='p' component='div'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odit veritatis sequi quisquam facilis amet quaerat ut debitis autem, vero natus, earum error perspiciatis id quibusdam enim vel eum ducimus similique incidunt ea ratione iste. Dolorum numquam dicta laudantium quod?</Typography>
                    <Button sx={{ fontWeight: 400, backgroundColor: '#5FC7C7' }} variant="contained">Contained</Button>
                </Box>
                </Grid>

                <Grid align='right' item xs={12} md={7}>
                    <img width='90%' src={chair} alt="" />
                </Grid>
            </Grid>
            </Container>
        </Box>
    );
};

export default Banner;