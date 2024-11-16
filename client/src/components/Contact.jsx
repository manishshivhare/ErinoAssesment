import React, { useState, useMemo } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Paper,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";

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
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (contact) => {
    setEditContact(contact);
    setFormErrors({});
  };

  const handleCloseEdit = () => {
    setEditContact(null);
    setFormErrors({});
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return contacts;

    return contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const phone = contact.phone.toLowerCase();
      
      return (
        fullName.includes(query) ||
        phone.includes(query)
      );
    });
  }, [contacts, searchQuery]);

  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!data.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.phone?.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!data.company?.trim()) {
      errors.company = 'Company is required';
    }

    if (!data.jobTitle?.trim()) {
      errors.jobTitle = 'Job title is required';
    }

    return errors;
  };

  const handleSubmitEdit = async (e) => {
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
      await onUpdate(editContact._id, data);
      handleCloseEdit();
      setSnackbar({
        open: true,
        message: 'Contact updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error updating contact',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAdd = async (e) => {
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
      await onAdd(data);
      setSnackbar({
        open: true,
        message: 'Contact added successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error adding contact',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await onDelete(id);
        setSnackbar({
          open: true,
          message: 'Contact deleted successfully!',
          severity: 'success'
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Error deleting contact',
          severity: 'error'
        });
      }
    }
  };

  const ContactForm = ({ onSubmit, initialData = {}, dialogTitle }) => (
    <form onSubmit={onSubmit}>
      <DialogTitle>{dialogTitle}</DialogTitle>
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
          onClick={initialData ? handleCloseEdit : onAddDialogClose} 
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
  );

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
                    <IconButton
                      onClick={() => handleEditClick(contact)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(contact._id)}
                      color="error"
                    >
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

      {/* Edit Contact Dialog */}
      <Dialog open={!!editContact} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <ContactForm
          onSubmit={handleSubmitEdit}
          initialData={editContact}
          dialogTitle="Edit Contact"
        />
      </Dialog>

      {/* Add Contact Dialog */}
      <Dialog open={isAddDialogOpen} onClose={onAddDialogClose} maxWidth="sm" fullWidth>
        <ContactForm
          onSubmit={handleSubmitAdd}
          dialogTitle="Add Contact"
        />
      </Dialog>

      {/* Snackbar for notifications */}
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

export default ContactsTable;