import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import ContactsTable from '../components/Contact';
import axios from 'axios';
import { Add as AddIcon } from '@mui/icons-material';

const ContactApp = () => {
    // State to hold the list of contacts
    const [contacts, setContacts] = useState([]);

    // State to manage loading status during data fetch
    const [loading, setLoading] = useState(true);

    // State to handle errors
    const [error, setError] = useState(null);

    // State to control the visibility of the "Add Contact" dialog
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    /**
     * Fetch contacts from the API and update the `contacts` state.
     * Handles any errors and manages the loading state.
     */
    const fetchContacts = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/contact");
            setContacts(response.data); // Set fetched contacts to state
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.message); // Capture error message
        } finally {
            setLoading(false); // Set loading to false after the operation
        }
    };

    /**
     * useEffect hook to fetch contacts when the component is first mounted.
     */
    useEffect(() => {
        fetchContacts();
    }, []);

    /**
     * Delete a contact by its ID.
     * Fetches the updated contact list after a successful deletion.
     * @param {string} id - The ID of the contact to delete.
     */
    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/contact/${id}`);
            await fetchContacts(); // Refresh the contact list
        } catch (err) {
            setError(err.message); // Capture error message
        }
    };

    /**
     * Update a contact by its ID.
     * Fetches the updated contact list after a successful update.
     * @param {string} id - The ID of the contact to update.
     * @param {object} updatedContact - The updated contact details.
     */
    const updateContact = async (id, updatedContact) => {
        try {
            await axios.put(`http://localhost:3001/api/contact/${id}`, updatedContact);
            await fetchContacts(); // Refresh the contact list
        } catch (err) {
            setError(err.message); // Capture error message
        }
    };

    /**
     * Add a new contact.
     * Fetches the updated contact list after a successful addition.
     * Closes the "Add Contact" dialog after a successful addition.
     * @param {object} newContact - The details of the new contact to add.
     */
    const addContact = async (newContact) => {
        try {
            await axios.post("http://localhost:3001/api/contact", newContact);
            await fetchContacts(); // Refresh the contact list
            setIsAddDialogOpen(false); // Close the dialog
        } catch (err) {
            setError(err.message); // Capture error message
            throw err; // Propagate error to handle it in the form
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Button to open the "Add Contact" dialog */}
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsAddDialogOpen(true)}
                sx={{ mb: 3 }}
            >
                Add Contact
            </Button>

            {/* ContactsTable component to display and manage contacts */}
            <ContactsTable
                contacts={contacts}
                loading={loading}
                error={error}
                onDelete={deleteContact} // Pass delete handler
                onUpdate={updateContact} // Pass update handler
                onAdd={addContact} // Pass add handler
                isAddDialogOpen={isAddDialogOpen} // Dialog open state
                onAddDialogClose={() => setIsAddDialogOpen(false)} // Dialog close handler
            />
        </Container>
    );
};

export default ContactApp;
