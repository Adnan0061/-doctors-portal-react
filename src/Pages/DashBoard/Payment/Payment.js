import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckOutForm from './CheckOutForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51JzDBvLvJQSVbGpz2CkBRQSGBvSHabvA464HW4jm7AKw4zpWvHGbf8ouFc5YhN92As8xUJP7CFfJ9hMmIJHeFrMy00wvf0nZLi');


const Payment = () => {
    const { appointmentId } = useParams()
    const [appointment, setAppointment] = useState({})

    console.log(appointment)

    useEffect(() => {
        fetch(`https://ancient-stream-55775.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
    }, [appointmentId])
    return (
        <Box>
            <Typography variant='h3'>"{appointment.patientName}" please pay for: "{appointment.serviceName}"</Typography>

            {appointment?.price && 
            <Elements 
                stripe={stripePromise} 
            >
                <CheckOutForm appointment={appointment} />
            </Elements>
            }
        </Box>
    );
};

export default Payment;