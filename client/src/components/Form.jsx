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
    isOpen, 
    onClose, 
    onSubmit, 
    initialData = {}, 
    title 
}) => {
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = useCallback((data) => {
        const errors = {};
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle'];
        
        requiredFields.forEach(field => {
            if (!data[field]?.trim()) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Invalid email format';
        }

        return errors;
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const errors = validateForm(data);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setIsSubmitting(false);
            return;
        }

        try {
            await onSubmit(data);
            setFormErrors({});
            onClose();
        } catch (error) {
            // Form-level errors are handled by the parent component
        } finally {
            setIsSubmitting(false);
        }
    }, [onSubmit, onClose, validateForm]);

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                fullWidth
                                defaultValue={initialData?.firstName}
                                error={!!formErrors.firstName}
                                helperText={formErrors.firstName}
                                disabled={isSubmitting}
                            />
                        </Grid>
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
                <DialogActions>
                    <Button 
                        onClick={onClose} 
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting && <CircularProgress size={20} />}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default React.memo(ContactForm);