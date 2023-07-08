import React from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import * as Yup from 'yup';



const Login = () =>{
    const navigate = useNavigate();

    const validate = Yup.object({  
      name: Yup.string()
      .min(3, 'Must be 15 characters or less')
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      
      })
    
    const handleLogin = (values) => {
      const { name, email } = values;

        axios.post("https://frontend-take-home-service.fetch.com/auth/login", {
          name,
          email
        }, {
          withCredentials: true
        })
          .then((response) => {
            console.log(response.data);
            if (response.status === 200) {
              // Redirect to another page upon successful submission
              navigate('/homepage');
            } else {
              // Handle other response statuses or display error messages
            }
          })
          .catch((error) => {
            console.error(error);
          });
          
        };
      
      

return (
  <Container maxWidth="sm">
    <Typography variant="h4" align="center" gutterBottom>
              Welcome To Dog Adoption Center
    </Typography>
    <Typography variant="h6" align="center" gutterBottom>
              Ready To Meet Your New Friend?
    </Typography>
    <Typography variant="h6" align="center" gutterBottom>
              Just One More Step
    </Typography>
    <Formik
      initialValues={{
        name: '',
        email: '',
        occupation: '',
        zipcode: '',
        favdb: '',
        }}
        validationSchema={validate}
        onSubmit={handleLogin}
      >
      {(formik) => (
          <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                label="Name"
                name="name"
                fullWidth
                sx={{ textAlign: 'left' }} // Align label in left-center
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                label="Email"
                name="email"
                fullWidth
                sx={{ textAlign: 'left' }} // Align label in left-center
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="Occupation"
                name="occupation"
                fullWidth
                sx={{ textAlign: 'left' }} // Align label in left-center
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="Zipcode"
                name="zipcode"
                fullWidth
                sx={{ textAlign: 'left' }} // Align label in left-center
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                label="Fav Dog Breed"
                name="favdb"
                fullWidth
                sx={{ textAlign: 'left' }} // Align label in left-center
              />
            </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" type="submit">
                  Register
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="secondary" type="reset">
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
    </Formik>
  </Container>
  );
};
      
export default Login;
