import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Box from '@mui/material/Box';
import { Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Calendar from '../../Shared/Calendar/Calendar';
import { Link } from 'react-router-dom';


const AppoinmentsDashBoard = () => {
    const { user, token } = useAuth()
    const [ appointments, setAppointment ] = useState([])
    const [date, setDate] = React.useState(new Date())

    useEffect( ()=> {
        const url = `https://ancient-stream-55775.herokuapp.com/appointments?idemail=${user.email}&date=${date.toLocaleDateString()}`;
        fetch(url, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setAppointment(data)
            // console.log(data)
        })
    }, [date, token, user.email])
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Calendar date={date} setDate={setDate} />
                </Grid>
                <Grid item xs={6}>
                <Box sx={{ border: '1px solid blue', py: 2}}>
                <Container>
                <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Typography>Appoinments</Typography>
                    <Typography>{date.toLocaleDateString()}</Typography>
                </Box>
                <Box>
                <TableContainer>
                    <Table sx={{  }} aria-label="simple table">
                        <TableHead>
                        <TableRow sx={{ border: 'none' }}>
                            <TableCell sx={{ textAlign: 'center', border: 'none'}}>Name</TableCell>
                            <TableCell sx={{ textAlign: 'center', border: 'none'}}>Schedule</TableCell>
                            <TableCell sx={{ textAlign: 'center', border: 'none'}}>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {appointments.map((appointment) => (
                            <TableRow
                            key={appointment._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ textAlign: 'center', border: 'none'}} component="th" scope="row">
                                    {appointment.patientName}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', border: 'none'}}>{appointment.time.split(' -')[0]}</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: 'none'}}>
                                {console.log(appointment)}
                                    { 
                                    appointment.payment ? 
                                    <Button disabled variant="contained">Paid</Button> 
                                    : 
                                    <Link to={`/dashboard/payment/${appointment._id}`} style={{textDecoration: 'none'}}><Button appointment={appointment} variant="contained">Pay</Button></Link>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
                </Container>
            </Box>
                </Grid>
            </Grid>

        </Box>
    );
};

export default AppoinmentsDashBoard;