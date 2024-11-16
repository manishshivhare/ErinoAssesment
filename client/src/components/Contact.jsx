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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editContact, setEditContact] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChangePage = useCallback((_, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const handleEditClick = useCallback((contact) => {
        setEditContact(contact);
    }, []);

    const handleCloseEdit = useCallback(() => {
        setEditContact(null);
    }, []);

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
        setPage(0);
    }, []);

    const showSnackbar = useCallback((message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    }, []);

    const handleCloseSnackbar = useCallback(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
    }, []);

    const filteredContacts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return contacts;

        return contacts.filter((contact) => {
            const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
            const phone = contact.phone.toLowerCase();
            return fullName.includes(query) || phone.includes(query);
        });
    }, [contacts, searchQuery]);

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

    const handleSubmitEdit = useCallback(async (data) => {
        try {
            await onUpdate(editContact._id, data);
            handleCloseEdit();
            showSnackbar('Contact updated successfully!');
        } catch (error) {
            showSnackbar('Error updating contact', 'error');
            throw error;
        }
    }, [editContact, onUpdate, handleCloseEdit, showSnackbar]);

    const handleSubmitAdd = useCallback(async (data) => {
        try {
            await onAdd(data);
            onAddDialogClose();
            showSnackbar('Contact added successfully!');
        } catch (error) {
            showSnackbar('Error adding contact', 'error');
            throw error;
        }
    }, [onAdd, onAddDialogClose, showSnackbar]);

    if (loading) {
        return (
            <Typography align="center">
                <CircularProgress />
                Loading Contacts...
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center">
                Error loading contacts: {error}
            </Typography>
        );
    }

    return (
        <>
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
                                        <IconButton onClick={() => handleEditClick(contact)} color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(contact._id)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {filteredContacts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No contacts found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
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

            <ContactForm
                isOpen={!!editContact}
                onClose={handleCloseEdit}
                onSubmit={handleSubmitEdit}
                initialData={editContact}
                title="Edit Contact"
            />

            <ContactForm
                isOpen={isAddDialogOpen}
                onClose={onAddDialogClose}
                onSubmit={handleSubmitAdd}
                title="Add Contact"
            />

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