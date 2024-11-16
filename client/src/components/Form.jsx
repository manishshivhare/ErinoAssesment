import React, { useState, useCallback } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    CircularProgress
} from '@mui/material';

const ContactForm = ({ 
    isOpen,               // Boolean to control whether the dialog is open or not
    onClose,              // Callback to handle closing the dialog
    onSubmit,             // Callback to handle form submission
    initialData = {},     // Initial data for editing an existing contact
    title                // Title for the dialog (Add or Edit)
}) => {
    const [formErrors, setFormErrors] = useState({});  // State to store validation errors
    const [isSubmitting, setIsSubmitting] = useState(false);  // State to manage submission status

    // Form validation function to check for required fields and email format
    const validateForm = useCallback((data) => {
        const errors = {};
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle'];
        
        requiredFields.forEach(field => {
            // Check if the required field is empty
            if (!data[field]?.trim()) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        // Check if the email format is valid
        if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Invalid email format';
        }

        return errors;
    }, []);

    // Handle form submission
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);  // Set submitting state to true

        const formData = new FormData(e.target);  // Get form data
        const data = Object.fromEntries(formData.entries());  // Convert form data to an object

        const errors = validateForm(data);  // Validate the form data
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);  // Set form errors if validation fails
            setIsSubmitting(false);  // Reset submitting state
            return;
        }

        try {
            await onSubmit(data);  // Submit the form data
            setFormErrors({});  // Clear any previous errors
            onClose();  // Close the dialog
        } catch (error) {
            // Error handling can be done here
        } finally {
            setIsSubmitting(false);  // Reset submitting state once the form is handled
        }
    }, [onSubmit, onClose, validateForm]);

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {/* Form Fields */}
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {/* First Name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                fullWidth
                                defaultValue={initialData?.firstName}
                                error={!!formErrors.firstName}  // Show error if validation fails
                                helperText={formErrors.firstName}  // Display error message
                                disabled={isSubmitting}  // Disable field during submission
                            />
                        </Grid>
                        {/* Last Name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                fullWidth
                                defaultValue={initialData?.lastName}
                                error={!!formErrors.lastName}
                                helperText={formErrors.lastName}
                                disabled={isSubmitting}
                            />
                        </Grid>
                        {/* Email */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                defaultValue={initialData?.email}
                                error={!!formErrors.email}
                                helperText={formErrors.email}
                                disabled={isSubmitting}
                            />
                        </Grid>
                        {/* Phone */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="phone"
                                name="phone"
                                label="Phone Number"
                                fullWidth
                                defaultValue={initialData?.phone}
                                error={!!formErrors.phone}
                                helperText={formErrors.phone}
                                disabled={isSubmitting}
                            />
                        </Grid>
                        {/* Company */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="company"
                                name="company"
                                label="Company"
                                fullWidth
                                defaultValue={initialData?.company}
                                error={!!formErrors.company}
                                helperText={formErrors.company}
                                disabled={isSubmitting}
                            />
                        </Grid>
                        {/* Job Title */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="jobTitle"
                                name="jobTitle"
                                label="Job Title"
                                fullWidth
                                defaultValue={initialData?.jobTitle}
                                error={!!formErrors.jobTitle}
                                helperText={formErrors.jobTitle}
                                disabled={isSubmitting}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                {/* Dialog Actions */}
                <DialogActions>
                    {/* Cancel Button */}
                    <Button 
                        onClick={onClose} 
                        disabled={isSubmitting}  // Disable the button during submission
                    >
                        Cancel
                    </Button>
                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}  // Disable the button during submission
                        startIcon={isSubmitting && <CircularProgress size={20} />}  // Show progress spinner when submitting
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}  // Change text when submitting
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default React.memo(ContactForm);
