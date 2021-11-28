
import React from 'react';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';


const AddDoctor = () => {
    const { register, handleSubmit } = useForm();
    
    const onSubmit = data => {
        data.price = parseInt(data.price)
        data.sizes = data.sizes.split(',')
        data.colors = data.colors.split(',')

        fetch('https://ancient-stream-55775.herokuapp.com/products', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            alert('congratulations!! New product have been added')
        })
        
    }
    return (
        <Container>
            <Box className='justify-content-center'> 
            <Grid>
            <h1>Add New Product</h1>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <input type='text' {...register("name", { required: true })} placeholder='Product Name' />
                <input type='number' {...register("price", { required: true })} placeholder='Price' />
                <textarea rows="10" style={{ width: "100%" }} {...register("description", { required: true })} placeholder='Description' />
                <input type='text' {...register("sizes", { required: true })} placeholder='Write all sizes seperate with "," and No space' />
                <input type='text' {...register("colors", { required: true })} placeholder='Write all colors seperate with "," and No space' />
                <input type="url" placeholder="image url" {...register("images")} />
                <input type="submit"/>
            </form>
            </Grid>
            </Box>
        </Container>
    );
};

export default AddDoctor;