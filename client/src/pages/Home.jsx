import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ContactForm from '../components/Form';
import ContactsTable from '../components/Contact';

const ContactApp = () => {
    const [contacts, setContacts] = useState([]);

    const addContact = (newContact) => {
        setContacts([...contacts, { id: contacts.length + 1, ...newContact }]);
    };

    const deleteContact = (id) => {
        setContacts(contacts.filter((c) => c.id !== id));
    };

    const updateContact = (id, updatedContact) => {
        setContacts(
            contacts.map((c) => (c.id === id ? { ...c, ...updatedContact } : c))
        );
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Contact Management
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ContactForm onSubmit={addContact} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ContactsTable data={contacts} onDelete={deleteContact} onUpdate={updateContact} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactApp;