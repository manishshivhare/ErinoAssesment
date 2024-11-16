import React, { useState, useCallback } from 'react';
import { Container, Button } from '@mui/material';
import ContactsTable from '../components/Contact';  // Import ContactsTable component to display the contacts
import { Add as AddIcon } from '@mui/icons-material';  // Import the "Add" icon for the button
import { useContacts } from '../hooks/useContacts.js';  // Custom hook to manage contacts (fetch, add, update, delete)

const ContactApp = () => {
    // State to manage whether the add contact dialog is open or closed
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    // Destructuring the state and methods from the custom `useContacts` hook
    const { contacts, loading, error, deleteContact, updateContact, addContact } = useContacts();

    // Callback to close the add dialog
    const handleAddDialogClose = useCallback(() => setIsAddDialogOpen(false), []);

    // Callback to open the add dialog
    const handleAddDialogOpen = useCallback(() => setIsAddDialogOpen(true), []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Button to open the Add Contact dialog */}
            <Button
                variant="contained"
                startIcon={<AddIcon />}  // Displays an "Add" icon on the button
                onClick={handleAddDialogOpen}  // Opens the dialog on click
                sx={{ mb: 3 }}  // Margin at the bottom for spacing
            >
                Add Contact  {/* Button text */}
            </Button>

            {/* Pass necessary props to ContactsTable to display contacts */}
            <ContactsTable
                contacts={contacts}  // List of contacts to display
                loading={loading}  // Loading state to show a loading spinner if data is fetching
                error={error}  // Any errors encountered during fetching
                onDelete={deleteContact}  // Callback function to handle contact deletion
                onUpdate={updateContact}  // Callback function to handle contact updates
                onAdd={addContact}  // Callback function to add a new contact
                isAddDialogOpen={isAddDialogOpen}  // Controls the visibility of the add dialog
                onAddDialogClose={handleAddDialogClose}  // Function to close the add dialog
            />
        </Container>
    );
};

export default React.memo(ContactApp);  // Memoize the component to prevent unnecessary re-renders
