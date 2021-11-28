import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import chair from '../../../images/chair.png'
import bg from '../../../images/bg.png'
import Calendar from '../../Shared/Calendar/Calendar';

const AppointmentHeader = ({date, setDate}) => {

    return (
        <Box sx={{ py:15, flexGrow: 1, background: `URL(${bg})`, backgroundPosition: 'center', backgroundSize: 'inherit' }} >
            <Container>
            <Grid container spacing={2}>
                <Grid  sx={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left', alignItems: 'center'}} item xs={12} md={5}>
                    <Calendar date={date} setDate={setDate} />
                </Grid>

                <Grid align='right' item xs={12} md={7}>
                    <img width='90%' src={chair} alt="" />
                </Grid>
            </Grid>
            </Container>
        </Box>
    );
};

export default AppointmentHeader;