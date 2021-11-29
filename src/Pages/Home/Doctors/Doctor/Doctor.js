import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const Doctor = ({ doctor }) => {
    const { name, email, mobile, image } = doctor;
    return (
        <Grid item xs={12} sm={6} md={4} key={doctor._id}>
            <Card sx={{ maxWidth: 345, textAlign: 'center', border: 'none', boxShadow: 'none' }}>
                <CardMedia
                    component="img"
                    height='240px'
                    sx={{objectPosition: 'top'}}
                    image={`data:image/jpeg;base64,${image}`}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {mobile}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Doctor;