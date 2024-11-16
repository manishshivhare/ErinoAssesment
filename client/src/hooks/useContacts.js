import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// API base URL where the contacts data is fetched from
const API_BASE_URL = 'http://localhost:3001/api/contact';

export const useContacts = () => {
    // State to manage the list of contacts
    const [contacts, setContacts] = useState([]);
    // State to manage the loading status when data is being fetched
    const [loading, setLoading] = useState(true);
    // State to manage any errors that may occur during data fetching or API calls
    const [error, setError] = useState(null);

    // Function to fetch the contacts data from the server
    const fetchContacts = useCallback(async () => {
        try {
            // Sending a GET request to fetch contacts
            const response = await axios.get(API_BASE_URL);
            // Setting the contacts state with the fetched data
            setContacts(response.data);
            // Clearing any previous errors
            setError(null);
        } catch (err) {
            // Setting the error state if the request fails
            setError(err.message);
        } finally {
            // Setting loading to false after the fetch attempt is complete
            setLoading(false);
        }
    }, []); // Empty dependency array ensures this function is created once

    // useEffect to trigger the fetchContacts function when the component mounts
    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]); // Only runs on component mount or if fetchContacts changes

    // Function to handle the deletion of a contact
    const deleteContact = useCallback(async (id) => {
        try {
            // Sending a DELETE request to remove the contact
            await axios.delete(`${API_BASE_URL}/${id}`);
            // Refetch contacts after deletion
            await fetchContacts();
            return true; // Return true if the deletion is successful
        } catch (err) {
            // If an error occurs during deletion, set the error state
            setError(err.message);
            return false; // Return false if the deletion fails
        }
    }, [fetchContacts]); // Re-run this function if fetchContacts changes

    // Function to handle updating a contact
    const updateContact = useCallback(async (id, updatedContact) => {
        try {
            // Sending a PUT request to update the contact
            await axios.put(`${API_BASE_URL}/${id}`, updatedContact);
            // Refetch contacts after update
            await fetchContacts();
            return true; // Return true if the update is successful
        } catch (err) {
            // If an error occurs during the update, set the error state
            setError(err.message);
            return false; // Return false if the update fails
        }
    }, [fetchContacts]); // Re-run this function if fetchContacts changes

    // Function to handle adding a new contact
    const addContact = useCallback(async (newContact) => {
        try {
            // Sending a POST request to add a new contact
            await axios.post(API_BASE_URL, newContact);
            // Refetch contacts after the new contact is added
            await fetchContacts();
            return true; // Return true if the add operation is successful
        } catch (err) {
            // If an error occurs while adding, set the error state and rethrow the error
            setError(err.message);
            throw err; // Rethrow the error so the calling component can handle it
        }
    }, [fetchContacts]); // Re-run this function if fetchContacts changes

    // Returning the contacts data, loading state, error message, and CRUD functions
    return { contacts, loading, error, deleteContact, updateContact, addContact };
};
