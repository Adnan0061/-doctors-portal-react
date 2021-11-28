
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Alert, Container, CircularProgress } from '@mui/material';

const CheckOutForm = ({ appointment }) => {
    const {price, _id} = appointment;
    const stripe = useStripe();
    const elements = useElements();
// console.log(appointment.price, {price})

    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');
    const [ clientSecret, setClientSecret ] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(()=>{
        fetch('https://ancient-stream-55775.herokuapp.com/create-payment-intent',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({price})  //have to pass object price
        })
        .then(res => res.json())
        .then(data=> setClientSecret(data.clientSecret))
    },[price, clientSecret])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        setProcessing(true)
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error);
            setSuccess('')
        } else {
            setError('')
            console.log(paymentMethod);
        }

        // payment intent
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: appointment.patientName,
                  email: appointment.idemail,
                },
              },
            },
        );
        if(intentError){
            setError(intentError.message)
            setSuccess('')
        }else {
            setError('');
            setSuccess('Your payment processed successfully');
            console.log(paymentIntent);
            setProcessing(false);

            //save to db
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                transaction: paymentIntent.client_secret.slice('_secret')[0],
                last4: paymentMethod.card.last4
            }

            fetch(`https://ancient-stream-55775.herokuapp.com/appointments/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment),
            })
        }
    };


    return (
        <Box>
            <Container sx={{ textAlign: 'center' }}>
                <h2>hello from checkout</h2>
                <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto', border: '1px solid lightgray', padding: '15px' }}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    {processing ? <CircularProgress/> : <button style={{ marginTop: '20px' }} type="submit" disabled={!stripe || success || appointment.payment}>
                        Pay ${appointment.price}
                    </button>}
                </form>
                {error && <Alert severity="error">{error.message}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
            </Container>
        </Box>
    );
};

export default CheckOutForm;