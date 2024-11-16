import { Contact } from '../../model/contact.model.js';

class ContactController {
    /**
     * Create a new contact
     * @param {Object} req - Express request object containing contact details in `req.body`
     * @param {Object} res - Express response object
     */
    async createContact(req, res) {
        try {
            const { firstName, lastName, email, phone, company, jobTitle } = req.body;

            // Validate required fields
            if (!firstName || !lastName || !email || !phone) {
                return res.status(400).json({
                    message: 'First name, last name, email, and phone are required.'
                });
            }

            // Check for existing contact with the same phone number
            const isPhoneTaken = await Contact.exists({ phone });
            if (isPhoneTaken) {
                return res.status(400).json({ message: 'Phone number already taken' });
            }

            // Check for existing contact with the same email address
            const isEmailTaken = await Contact.exists({ email });
            if (isEmailTaken) {
                return res.status(400).json({ message: 'Email already taken' });
            }

            // Create a new contact and save to the database
            let newContact = new Contact({ firstName, lastName, email, phone, company, jobTitle });
            newContact = await newContact.save();

            // Respond with the created contact
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

    /**
     * Retrieve all contacts
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async getAllContacts(req, res) {
        try {
            // Fetch all contacts from the database
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

    /**
     * Update an existing contact by ID
     * @param {Object} req - Express request object containing `id` in `req.params` and updated contact details in `req.body`
     * @param {Object} res - Express response object
     */
    async updateContact(req, res) {
        const { id } = req.params;
        const { firstName, lastName, email, phone, company, jobTitle } = req.body;

        try {
            // Validate required fields
            if (!firstName || !lastName || !email || !phone) {
                return res.status(400).json({
                    message: 'First name, last name, email, and phone are required.'
                });
            }

            // Find and update the contact in the database
            const updatedContact = await Contact.findByIdAndUpdate(
                id,
                { firstName, lastName, email, phone, company, jobTitle },
                { new: true, runValidators: true }
            );

            if (!updatedContact) {
                return res.status(404).json({ message: 'Contact not found' });
            }

            // Respond with the updated contact
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

    /**
     * Delete a contact by ID
     * @param {Object} req - Express request object containing `id` in `req.params`
     * @param {Object} res - Express response object
     */
    async deleteContact(req, res) {
        const { id } = req.params;

        try {
            // Find and delete the contact from the database
            const deletedContact = await Contact.findByIdAndDelete(id);

            if (!deletedContact) {
                return res.status(404).json({ message: 'Contact not found' });
            }

            // Respond with no content status
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
