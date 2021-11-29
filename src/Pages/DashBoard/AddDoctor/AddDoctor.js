
import React, { useState } from 'react';
import { Alert, Button, Container, Grid, Input, TextField } from '@mui/material';
import Box from '@mui/material/Box';


const AddDoctor = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [image, setImage] = useState(null)
    const [ success, setSuccess] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!image) {
            return
        }
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('mobile', mobile)
        formData.append('image', image)

        fetch('https://ancient-stream-55775.herokuapp.com/doctors', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if(result.insertedId){
                    setSuccess(true)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <Container>
            <Box className='justify-content-center'>
                <Grid>
                    <h1>Add Doctor</h1>
                    <form className='form'
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            sx={{ width: '50%' }}
                            required
                            label="Doctor's Name"
                            variant="standard"
                            onBlur={e => setName(e.target.value)}
                        />
                        <br />
                        <TextField
                            sx={{ width: '50%' }}
                            required
                            label="Doctor's Email"
                            type='email'
                            variant="standard"
                            onBlur={e => setEmail(e.target.value)}
                        />
                        <br />
                        <TextField
                            sx={{ width: '50%' }}
                            required
                            label="Doctor's Mobile"
                            type='tel'
                            variant="standard"
                            onBlur={e => setMobile(e.target.value)}
                        />
                        <br />
                        <br />
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" type="file"
                                onBlur={e => setImage(e.target.files[0])}
                            />
                            <br />
                            <br />
                        </label>
                        <Button variant="contained" type='submit'>
                            Upload
                        </Button>
                    </form>
                    {success && <Alert severity="success">doctor added successfully</Alert>}
                </Grid>
            </Box>
        </Container>
    );
};

export default AddDoctor;