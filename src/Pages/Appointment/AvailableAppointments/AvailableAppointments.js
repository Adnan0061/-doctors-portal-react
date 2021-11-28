import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Bookings from '../Bookings/Bookings';
import { Alert, Typography } from '@mui/material';

const AvailableAppointments = ({date}) => {
    const [ bookingSuccess, setBookingSuccess ] = useState('')
    const bookings =[
        {
            id: 1,
            name: 'Cosmetic Dentistry',
            time: '10.00 AM - 12.00 PM',
            price: 20,
            space: 5
        },
        {
            id: 2,
            name: 'Cosmetic Dentistry',
            time: '12.00 AM - 14.00 PM',
            price: 17,
            space: 5
        },
        {
            id: 3,
            name: 'Cosmetic Dentistry',
            time: '14.00 AM - 16.00 PM',
            price: 18,
            space: 5
        },
        {
            id: 4,
            name: 'Cosmetic Dentistry',
            time: '16.00 AM - 18.00 PM',
            price: 24,
            space: 5
        },
    ]
    return (
        <div>
           <Typography sx={{ fontWeight: 500, color: '#5FC7C7', my: 3 }} variant="h4" gutterBottom component="div">
            Available Appointments: {date.toDateString()}
           </Typography>
           { bookingSuccess !== '' && <Alert severity="success">{bookingSuccess}</Alert>}
            <Box sx={{ width: '100%' }}>

                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        bookings.map(booking => <Bookings key={booking.id} setBookingSuccess={setBookingSuccess} date={date} booking={booking} />)
                    }
                </Grid>
            </Box>
        </div>
    );
};

export default AvailableAppointments;