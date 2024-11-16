import React, { useState, useCallback } from 'react';
import { Container, Button } from '@mui/material';
import ContactsTable from '../components/Contact';
import { Add as AddIcon } from '@mui/icons-material';
import { useContacts } from '../hooks/useContacts.js';

const ContactApp = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const { contacts, loading, error, deleteContact, updateContact, addContact } = useContacts();

    const handleAddDialogClose = useCallback(() => setIsAddDialogOpen(false), []);
    const handleAddDialogOpen = useCallback(() => setIsAddDialogOpen(true), []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddDialogOpen}
                sx={{ mb: 3 }}
            >
                Add Contact
            </Button>

            <ContactsTable
                contacts={contacts}
                loading={loading}
                error={error}
                onDelete={deleteContact}
                onUpdate={updateContact}
                onAdd={addContact}
                isAddDialogOpen={isAddDialogOpen}
                onAddDialogClose={handleAddDialogClose}
            />
        </Container>
    );
};

export default React.memo(ContactApp);