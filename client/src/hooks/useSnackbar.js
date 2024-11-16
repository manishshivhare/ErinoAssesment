import { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const useSnackbar = () => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const showSnackbar = useCallback((message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    }, []);

    const handleClose = useCallback(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
    }, []);

    const SnackbarComponent = useCallback(() => (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert onClose={handleClose} severity={snackbar.severity}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    ), [snackbar, handleClose]);

    return { showSnackbar, SnackbarComponent };
};