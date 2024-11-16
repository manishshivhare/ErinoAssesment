import { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Custom hook to handle displaying a Snackbar notification
export const useSnackbar = () => {
    // State to store the Snackbar visibility, message, and severity level
    const [snackbar, setSnackbar] = useState({
        open: false, // Determines if the Snackbar is visible
        message: '', // The message to display in the Snackbar
        severity: 'success' // Severity level for the alert (e.g., success, error, info, warning)
    });

    // Function to trigger the Snackbar display with a custom message and severity
    const showSnackbar = useCallback((message, severity = 'success') => {
        setSnackbar({ open: true, message, severity }); // Set the Snackbar state with the provided message and severity
    }, []); // `showSnackbar` is memoized to avoid re-creation on every render

    // Function to close the Snackbar when the user dismisses it or after auto-hide duration
    const handleClose = useCallback(() => {
        setSnackbar(prev => ({ ...prev, open: false })); // Set the `open` property to false to close the Snackbar
    }, []); // `handleClose` is memoized for performance

    // The actual Snackbar component to be rendered
    const SnackbarComponent = useCallback(() => (
        <Snackbar
            open={snackbar.open} // Controls whether the Snackbar is open
            autoHideDuration={6000} // Time in milliseconds before the Snackbar auto-hides (6 seconds)
            onClose={handleClose} // Close the Snackbar when the duration ends or the user manually dismisses it
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position of the Snackbar on the screen
        >
            <Alert onClose={handleClose} severity={snackbar.severity}> 
                {snackbar.message} {/* The message to display in the alert */}
            </Alert>
        </Snackbar>
    ), [snackbar, handleClose]); // `SnackbarComponent` is memoized so it only updates when `snackbar` or `handleClose` changes

    // Return the function to show the Snackbar and the Snackbar component to render
    return { showSnackbar, SnackbarComponent };
};
