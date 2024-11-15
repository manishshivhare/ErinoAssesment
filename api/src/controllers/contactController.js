import { Contact } from '../../model/contact.model.js';

class ContactController {


    async createContact(req, res) {
        try {
            const { name, email, phone } = req.body;

            // Validate required fields
            if (!name || !email || !phone) {
                return res.status(400).json({ message: 'Name, email, and phone are required.' });
            }

            // Create and save the new contact
            let newContact = new Contact({ name, email, phone });
            newContact = await newContact.save();

            res.status(201).json(newContact);
        } catch (error) {
            console.error('Error creating contact:', {
                message: error.message,
                stack: error.stack,
                data: req.body,
            });
            res.status(500).json({ message: 'Error creating contact' });
        }
    }

    async getAllContacts(req, res) {
        try {
            const contacts = await Contact.find();
            res.status(200).json(contacts);
        } catch (error) {
            console.error('Error retrieving contacts:', {
                message: error.message,
                stack: error.stack,
            });
            res.status(500).json({ message: 'Error retrieving contacts' });
        }
    }

    async updateContact(req, res) {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        try {
            // Validate required fields
            if (!name || !email || !phone) {
                return res.status(400).json({ message: 'Name, email, and phone are required.' });
            }

            const updatedContact = await Contact.findByIdAndUpdate(
                id,
                { name, email, phone },
                { new: true, runValidators: true }
            );

            if (!updatedContact) {
                return res.status(404).json({ message: 'Contact not found' });
            }

            res.status(200).json(updatedContact);
        } catch (error) {
            console.error('Error updating contact:', {
                message: error.message,
                stack: error.stack,
                id,
                data: req.body,
            });
            res.status(500).json({ message: 'Error updating contact' });
        }
    }

    async deleteContact(req, res) {
        const { id } = req.params;

        try {
            const deletedContact = await Contact.findByIdAndDelete(id);

            if (!deletedContact) {
                return res.status(404).json({ message: 'Contact not found' });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting contact:', {
                message: error.message,
                stack: error.stack,
                id,
            });
            res.status(500).json({ message: 'Error deleting contact' });
        }
    }
}

export default ContactController;
