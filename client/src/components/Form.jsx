import React from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';

const ContactForm = () => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="company"
            name="company"
            label="Company"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="jobTitle"
            name="jobTitle"
            label="Job Title"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;