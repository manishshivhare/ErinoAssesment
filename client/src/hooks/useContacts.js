import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/contact';

export const useContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContacts = useCallback(async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            setContacts(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const deleteContact = useCallback(async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            await fetchContacts();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, [fetchContacts]);

    const updateContact = useCallback(async (id, updatedContact) => {
        try {
            await axios.put(`${API_BASE_URL}/${id}`, updatedContact);
            await fetchContacts();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, [fetchContacts]);

    const addContact = useCallback(async (newContact) => {
        try {
            await axios.post(API_BASE_URL, newContact);
            await fetchContacts();
            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, [fetchContacts]);

    return { contacts, loading, error, deleteContact, updateContact, addContact };
};