import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png'
import cavity from '../../../images/cavity.png'
import whitening from '../../../images/whitening.png'


const Services = () => {
    const services = [
        {
            name: 'Fluoride Treatment',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate possimus officiis beatae inventore laborum eaque omnis natus. Nihil, repellat iste.',
            img: fluoride
        },
        {
            name: 'Cavity Filling',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate possimus officiis beatae inventore laborum eaque omnis natus. Nihil, repellat iste.',
            img: cavity
        },
        {
            name: 'Teath Whitening',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate possimus officiis beatae inventore laborum eaque omnis natus. Nihil, repellat iste.',
            img: whitening
        }
    ]
    return (
        <Box sx={{ flexGrow: 1, my: 10 }}>
        <Container>
            <Typography sx={{ fontWeight: 400, color: '#5FC7C7' }} variant='h4' component='div'>Our Services</Typography>
            <Typography sx={{ fontWeight: 500, mt: 2, mb: 10 }} variant='h2' component='div'>Services We Provide</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                {services.map((service, index) => (
                <Grid item xs={4} sm={4} md={4} key={index}>
                    <Service service={service}></Service>
                </Grid>
                ))}
            </Grid>
        </Container>
        </Box>
    );
};

export default Services;