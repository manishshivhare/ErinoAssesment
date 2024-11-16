import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

/**
 * ContactForm Component
 * A form for submitting contact information.
 * Includes form validation, error handling, and a loading state.
 *
 * @param {Function} onSubmitSuccess - Optional callback for successful submission.
 */
const ContactForm = ({ onSubmitSuccess }) => {
  // State to manage the loading spinner during form submission
  const [loading, setLoading] = useState(false);
  // State to track any errors during the submission process
  const [error, setError] = useState(null);
  // State to show a success message upon successful submission
  const [success, setSuccess] = useState(false);
  // State to store validation errors for form fields
  const [formErrors, setFormErrors] = useState({});

  /**
   * Validates the form data for required fields and proper formats.
   * @param {Object} data - Form data object containing user input.
   * @returns {Object} errors - Object containing validation errors.
   */
  const validateForm = (data) => {
    const errors = {};

    // Check if the first name is provided
    if (!data.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }

    // Check if the last name is provided
    if (!data.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }

    // Check if the email is valid
    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email format';
    }

    // Check if the phone number is provided
    if (!data.phone?.trim()) {
      errors.phone = 'Phone number is required';
    }

    // Check if the company name is provided
    if (!data.company?.trim()) {
      errors.company = 'Company is required';
    }

    // Check if the job title is provided
    if (!data.jobTitle?.trim()) {
      errors.jobTitle = 'Job title is required';
    }

    return errors;
  };

  /**
   * Handles form submission.
   * Sends the data to the server if validation passes.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Extract form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validate form data
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    // Submit data to the API
    try {
      await axios.post('http://localhost:3001/api/contact', data);
      setSuccess(true);
      e.target.reset(); // Reset the form fields
      setFormErrors({}); // Clear validation errors
      if (onSubmitSuccess) {
        onSubmitSuccess(); // Trigger optional callback
      }
    } catch (err) {
      // Handle API errors
      setError(err.response?.data?.message || 'An error occurred while submitting the form');
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  /**
   * Handles closing of the Snackbar notifications.
   */
  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  return (
    <>
      {/* Form Container */}
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* First Name Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              disabled={loading}
            />
          </Grid>
          {/* Last Name Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              disabled={loading}
            />
          </Grid>
          {/* Email Field */}
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              error={!!formErrors.email}
              helperText={formErrors.email}
              disabled={loading}
            />
          </Grid>
          {/* Phone Number Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone Number"
              fullWidth
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              disabled={loading}
            />
          </Grid>
          {/* Company Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="company"
              name="company"
              label="Company"
              fullWidth
              error={!!formErrors.company}
              helperText={formErrors.company}
              disabled={loading}
            />
          </Grid>
          {/* Job Title Field */}
          <Grid item xs={12}>
            <TextField
              required
              id="jobTitle"
              name="jobTitle"
              label="Job Title"
              fullWidth
              error={!!formErrors.jobTitle}
              helperText={formErrors.jobTitle}
              disabled={loading}
            />
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          Contact successfully created!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactForm;
