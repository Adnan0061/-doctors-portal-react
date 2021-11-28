import React from 'react';
import { Button, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BookingModal from '../BookingModal/BookingModal';




const Bookings = ({ booking, date, setBookingSuccess }) => {
    const { name, time, space, price } = booking;

    const [openBooking, setOpenBooking] = React.useState(false);
    const handleOpenBooking = () => setOpenBooking(true);
    const handleClose = () => setOpenBooking(false);

    

    return (
        <>
        <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{py: 5, textAlign: 'center'}}>
                <Typography sx={{ fontWeight: 500, color: '#5FC7C7' }} variant="h5" gutterBottom component="div">
                    {name}
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    {time}
                </Typography>    
                <Typography variant="caption" display="block" gutterBottom>
                    Price: ${price}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    {space} spaces Available
                </Typography>
                <Button onClick={handleOpenBooking} sx={{ fontWeight: 400, backgroundColor: '#5FC7C7' }} variant="contained">Book Appointment</Button>
            </Paper>
        </Grid>
        <BookingModal date={date} openBooking={openBooking} setBookingSuccess={setBookingSuccess} handleClose={handleClose} booking={booking} ></BookingModal>
        </>
    );
};

export default Bookings;