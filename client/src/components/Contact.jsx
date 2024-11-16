import React, { useState, useMemo, useCallback } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    CircularProgress,
    Typography,
    Paper,
    TextField,
    InputAdornment,
    Alert,
    Snackbar
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import ContactForm from '../components/Form';

const ContactsTable = ({ 
    contacts, 
    loading, 
    error, 
    onDelete, 
    onUpdate, 
    onAdd,
    isAddDialogOpen,
    onAddDialogClose 
}) => {
    // State variables for pagination, contact editing, and search functionality
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editContact, setEditContact] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Callback to handle page change in pagination
    const handleChangePage = useCallback((_, newPage) => {
        setPage(newPage);
    }, []);

    // Callback to handle rows per page change in pagination
    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10)); // Set new rows per page
        setPage(0); // Reset to first page
    }, []);

    // Callback to set the contact for editing when the edit button is clicked
    const handleEditClick = useCallback((contact) => {
        setEditContact(contact);
    }, []);

    // Close the edit modal when the "close" button is clicked
    const handleCloseEdit = useCallback(() => {
        setEditContact(null);
    }, []);

    // Callback to update the search query and reset to the first page when changed
    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
        setPage(0);
    }, []);

    // Show a snackbar message (either success or error)
    const showSnackbar = useCallback((message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    }, []);

    // Close the snackbar when clicked
    const handleCloseSnackbar = useCallback(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
    }, []);

    // Memoize the filtered contacts based on the search query
    const filteredContacts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return contacts;

        return contacts.filter((contact) => {
            const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
            const phone = contact.phone.toLowerCase();
            return fullName.includes(query) || phone.includes(query);
        });
    }, [contacts, searchQuery]);

    // Handle the contact deletion logic with confirmation
    const handleDelete = useCallback(async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await onDelete(id);
                showSnackbar('Contact deleted successfully!');
            } catch (error) {
                showSnackbar('Error deleting contact', 'error');
            }
        }
    }, [onDelete, showSnackbar]);

    // Handle the edit form submission (update contact)
    const handleSubmitEdit = useCallback(async (data) => {
        try {
            await onUpdate(editContact._id, data); // Call update API with contact data
            handleCloseEdit();
            showSnackbar('Contact updated successfully!');
        } catch (error) {
            showSnackbar('Error updating contact', 'error');
            throw error;
        }
    }, [editContact, onUpdate, handleCloseEdit, showSnackbar]);

    // Handle the add form submission (add new contact)
    const handleSubmitAdd = useCallback(async (data) => {
        try {
            await onAdd(data); // Call add API with new contact data
            onAddDialogClose();
            showSnackbar('Contact added successfully!');
        } catch (error) {
            showSnackbar('Error adding contact', 'error');
            throw error;
        }
    }, [onAdd, onAddDialogClose, showSnackbar]);

    // If contacts are loading, show a loading spinner
    if (loading) {
        return (
            <Typography align="center">
                <CircularProgress />
                Loading Contacts...
            </Typography>
        );
    }

    // If an error occurs while loading contacts, show an error message
    if (error) {
        return (
            <Typography color="error" align="center">
                Error loading contacts: {error}
            </Typography>
        );
    }

    return (
        <>
            {/* Search Bar for filtering contacts */}
            <Paper sx={{ mb: 2, p: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by name or phone number..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            {/* Table for displaying contacts */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredContacts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((contact) => (
                                <TableRow key={contact._id}>
                                    <TableCell>{contact.firstName}</TableCell>
                                    <TableCell>{contact.lastName}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.company}</TableCell>
                                    <TableCell>{contact.jobTitle}</TableCell>
                                    <TableCell>
                                        {/* Edit and Delete Icons */}
                                        <IconButton onClick={() => handleEditClick(contact)} color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(contact._id)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {/* If no contacts match the search filter */}
                        {filteredContacts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No contacts found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {/* Pagination Controls */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredContacts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Edit Contact Form Dialog */}
            <ContactForm
                isOpen={!!editContact}
                onClose={handleCloseEdit}
                onSubmit={handleSubmitEdit}
                initialData={editContact}
                title="Edit Contact"
            />

            {/* Add New Contact Form Dialog */}
            <ContactForm
                isOpen={isAddDialogOpen}
                onClose={onAddDialogClose}
                onSubmit={handleSubmitAdd}
                title="Add Contact"
            />

            {/* Snackbar for success/error messages */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default React.memo(ContactsTable);
